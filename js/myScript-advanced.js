				var w = 960;
				var h = 500;
				var r = 20;

				var bst=[];
				var bst_x = [];
				var bst_y = [];

				var minDist = Infinity;
				var maxBene = 0;
				var bestScore = 0;
				
				var gMinDist = Infinity;
				var gMaxBene = 0;
				var gBestScore = 0;
				
				var w1 = 0.5;
				var w2 = 0.5;

				var indexOfNearestArr = [];
				var distToNearestArr = [];
				var isCovering = true;

				var edgesData;
				var threshold = 200;



							 var QueryString = function () {
  // This function is anonymous, is executed immediately and 
  // the return value is assigned to QueryString!
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
        // If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = decodeURIComponent(pair[1]);
        // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
      query_string[pair[0]] = arr;
        // If third or later entry with this name
    } else {
      query_string[pair[0]].push(decodeURIComponent(pair[1]));
    }
  } 
  return query_string;
}();



	var lvl = QueryString.level;





				var svg = d3.select("body").append("svg")
											.attr("width", w)
											.attr("height", h)
											.attr("text-anchor", "middle")
											.attr("xmlns", "http://www.w3.org/2000/svg")
											.attr("xmlns:xlink", "http://www.w3.org/1999/xlink");


				svg.append("rect").attr("x", 0)
									.attr("y", 0)
									.attr("width", w)
									.attr("height", h)
									.style("fill", "rgb(220,255,220)")
									.attr("stroke", "rgb(250,240,230)")
									.attr("stroke-width", "2px");

				svg.append("rect").attr("x", w-205)
									.attr("y", 5)
									.attr("width", 200)
									.attr("height", 150)
									.style("fill", "silver")
									.attr("rx", 10)
							    	.attr("ry", 10)
							    	.attr("stroke", "white")
							    	.attr("stroke-dasharray", "5,5")
							    	.attr("stroke-width", 5);

				svg.append("text").attr("x", w-157)
								.attr("y", 25)
								.text("Distance: ")
								.attr("font-family", "Artifika")
				                .attr("font-size", "13px")
				                .attr("fill", "black")
				                .attr("text-anchor", "left");

				var lblCurDist = svg.append("text").attr("x", w-40)
								.attr("y", 25)
								.text("940.70")
								.attr("font-family", "sans-serif")
				                .attr("font-size", "13px")
				                .attr("fill", "black")
				                .attr("text-anchor", "left")
				                .style("font-weight", "bold");


				svg.append("text").attr("x", w-157)
								.attr("y", 50)
								.text("Benefit: ")
								.attr("font-family", "Artifika")
				                .attr("font-size", "13px")
				                .attr("fill", "black")
				                .attr("text-anchor", "left");

				var lblCurBene = svg.append("text").attr("x", w-40)
								.attr("y", 50)
								.text("285.24")
								.attr("font-family", "sans-serif")
				                .attr("font-size", "13px")
				                .attr("fill", "black")
				                .attr("text-anchor", "left")
				                .style("font-weight", "bold");

				svg.append("text").attr("x", w-157)
								.attr("y", 75)
								.text("My Score: ")
								.attr("font-family", "Artifika")
				                .attr("font-size", "13px")
				                .attr("fill", "black")
				                .attr("text-anchor", "left");

				var lblCurScore = svg.append("text").attr("x", w-40)
								.attr("y", 75)
								.text("0.67")
								.attr("font-family", "sans-serif")
				                .attr("font-size", "13px")
				                .attr("fill", "black")
				                .attr("text-anchor", "left")
				                .style("font-weight", "bold");

				svg.append("text").attr("x", w-145)
								.attr("y", 100)
								.text("My Best Score: ")
								.attr("font-family", "Artifika")
				                .attr("font-size", "13px")
				                .attr("fill", "black")
				                .attr("text-anchor", "left");

				var lblBestScore = svg.append("text").attr("x", w-40)
								.attr("y", 100)
								.text("0.72")
								.attr("font-family", "Artifika")
				                .attr("font-size", "13px")
				                .attr("fill", "black")
				                .attr("text-anchor", "left")
				                .style("font-weight", "bold");

				var btn = svg.append("rect")
							    .attr("x", w-180)
							    .attr("y", 115)
							    .attr("width", 150)
							    .attr("height", 26)
							    .attr("fill", "white")
							    .attr("rx", 10)
							    .attr("ry", 10)
							    .attr("stroke", "#1f628d")
							    .attr("stroke-width", "2px");

				svg.append("text").attr("x", w-107)
								.attr("y", 133)
								.text("Take Me to My Best!")
								.attr("font-family", "Artifika")
				                .attr("font-size", "13px")
				                .attr("fill", "black")
				                .style("font-weight", "bold");

				var btnTakeToBest = svg.append("rect")
							    .attr("x", w-180)
							    .attr("y", 115)
							    .attr("width", 150)
							    .attr("height", 26)
							    .attr("fill", "rgb(200,100,100)")
							    .attr("rx", 10)
							    .attr("ry", 10)
							    .classed("recty", true)
							    .attr("stroke", "#1f628d")
							    .attr("stroke-width", "2px")
							    .on("click", function(){
							    	g_draggableCircles.selectAll("image").remove();
									

							    	$.post('fInit-takeToBest.php',{level:lvl},
									function(data){
									//console.log(data);
									dcd = [];
									var values = data.split(",");
									for(var j = 0; j<values.length-5; j+=2){
										bx = values[j];
										by = values[j+1];
										dcd.push({"x":bx, "y":by});
									}
									populateDraggableCircles(dcd);

				//		gMinDist = values[values.length-6];
				//		gMaxBene = values[values.length-5];
				/*		gBestScore = values[values.length-4];

						myDistance = values[values.length-3];
						myBenefit = values[values.length-2];
						myScore = values[values.length-1];

						if(gBestScore == 0){
							gMinDist = Infinity;
							gMaxBene = 0;
							gBestScore = 0;
						}
						if(myBestScore == 0){
							myMinDistance = calcDistance(null).toFixed(2);
							myMaxBenefit = calcBenefit(null).toFixed(2);
							myBestScore = (gMinDist/myMinDistance)*w1+(myMaxBenefit/gMaxBene)*w2;
						}
						*/
						myDistance = values[values.length-5];//calcDistance(null).toFixed(2);
						myBenefit = values[values.length-4];//calcBenefit(null).toFixed(2);
						myScore = values[values.length-3];
						bestScore = values[values.length-2];
						bestPlayer = values[values.length-1];

						lblCurDist.attr("fill", "white").text(myDistance);
						lblCurBene.attr("fill", "white").text(myBenefit);
						lblCurScore.attr("fill", "white").text(myScore);
						lblBestScore.attr("fill", "white").text(myScore);
						lblOBest.attr("fill", "white").text(bestScore);
						lblBestPlayer.text(bestPlayer);
						lblRank.attr("fill", "white").text("-");

						//console.log(myScore);
						//console.log(bestScore);

						//myMinDistance = myDistance;
						//myMaxBenefit = myBenefit;
						//myBestScore = myScore;

						/*lblBestScore.attr("fill", "green").text(function(){
																	if(gBestScore==0)
																		return "-";
																	else
																		return myBestScore;
																});
						lblCurScore.attr("fill", "green").text(function(){
																	if(gBestScore==0)
																		return "-";
																	else
																		return myBestScore;
																});
						*/
						//lblCurDist.attr("fill", "green").text(myMinDistance);
						//lblCurBene.attr("fill", "green").text(myMaxBenefit);
						
						/*lblOBest.text(function(){
											if(gBestScore==0)
												return "-";
											else	
												return gBestScore;
											});
						lblRank.text("-");
						
						var draggableCircles = g_draggableCircles.selectAll("image")._groups[0];
						for(var j = 0; j<draggableCircles.length; j++){
							bst_x[j] = draggableCircles[j].x.baseVal.value;
							bst_y[j] = draggableCircles[j].y.baseVal.value;
							bst.push({"x":bst_x[j], "y":bst_y[j]});
						}
						*/
						var fixedCircles = g_fixedCircles.selectAll("image")._groups[0];
						var draggableCircles = g_draggableCircles.selectAll("image")._groups[0];
									

						var dist = 0;
						for(var j = 0; j<fixedCircles.length; j++){
							var indexOfNearest = 0;
							var distToNearest = Math.sqrt(Math.pow((fixedCircles[j].x.baseVal.value
													-draggableCircles[0].x.baseVal.value), 2)
													+Math.pow((fixedCircles[j].y.baseVal.value
													-draggableCircles[0].y.baseVal.value), 2)
												); 
							for(var i = 1; i<draggableCircles.length; i++){
								var tmpDist = Math.sqrt(Math.pow((fixedCircles[j].x.baseVal.value
												-draggableCircles[i].x.baseVal.value), 2)
												+Math.pow((fixedCircles[j].y.baseVal.value
												-draggableCircles[i].y.baseVal.value), 2)
											);
								if(tmpDist < distToNearest){
									indexOfNearest = i;
									distToNearest = tmpDist;
								}
							}
							indexOfNearestArr[j] = indexOfNearest;
							distToNearestArr[j] = distToNearest;
							dist += distToNearest;
						}
					

						edgesData = [];
						var fixedCircles = g_fixedCircles.selectAll("image")._groups[0];
						for(var j = 0; j<fixedCircles.length; j++){
							edgesData.push({"x1":fixedCircles[j].x.baseVal.value+20, "y1":fixedCircles[j].y.baseVal.value+20,
								"x2":draggableCircles[indexOfNearestArr[j]].x.baseVal.value+20,
								"y2":draggableCircles[indexOfNearestArr[j]].y.baseVal.value+20});
						}
						//console.log("EDGESDATA"+edgesData);
						g_edges.selectAll("line").remove();
						populateEdges(edgesData);
						lblRank.text(Rank)
					});



						/*			bs = [];
									for(var k = 0; k<bst_x.length; k++){
										bs.push({
											x: bst_x[k],
											y: bst_y[k]
										});
									}
									populateDraggableCircles(bs);
									lblCurScore.attr("fill", "green").text(myBestScore);

									//console.log(edgesData);
									edgesData = [];
									var fixedCircles = g_fixedCircles.selectAll("image")._groups[0];
									var draggableCircles = g_draggableCircles.selectAll("image")._groups[0];
									


									var dist = 0;
									for(var j = 0; j<fixedCircles.length; j++){
										var indexOfNearest = 0;
										var distToNearest = Math.sqrt(Math.pow((fixedCircles[j].x.baseVal.value
																-draggableCircles[0].x.baseVal.value), 2)
														+Math.pow((fixedCircles[j].y.baseVal.value
																-draggableCircles[0].y.baseVal.value), 2)
														); 
										for(var i = 1; i<draggableCircles.length; i++){
											var tmpDist = Math.sqrt(Math.pow((fixedCircles[j].x.baseVal.value
															-draggableCircles[i].x.baseVal.value), 2)
													+Math.pow((fixedCircles[j].y.baseVal.value
															-draggableCircles[i].y.baseVal.value), 2)
														);
											if(tmpDist < distToNearest){
												indexOfNearest = i;
												distToNearest = tmpDist;
											}
										}
										indexOfNearestArr[j] = indexOfNearest;
										distToNearestArr[j] = distToNearest;
										dist += distToNearest;
									}

									for(var j = 0; j<fixedCircles.length; j++){
										edgesData.push({"x1":fixedCircles[j].x.baseVal.value+20, "y1":fixedCircles[j].y.baseVal.value+20,
											"x2":draggableCircles[indexOfNearestArr[j]].x.baseVal.value+20,
											"y2":draggableCircles[indexOfNearestArr[j]].y.baseVal.value+20});
									}
									//console.log(edgesData);
									g_edges.selectAll("line").remove();
									populateEdges(edgesData);
									
									//console.log("1connecting to server...");

									//perform http request
									//refreshScoreBoard();
									//console.log("post done..");

									myDistance = calcDistance(null).toFixed(2);
									myBenefit = calcBenefit(null).toFixed(2);
									myScore = calcScore(myDistance, myBenefit).toFixed(2);
*/
									//refreshScoreBoard();
								})
							    .style("opacity", 0.5);

				svg.append("rect").attr("x", w-205)
									.attr("y", 160)
									.attr("width", 200)
									.attr("height", 60)
									.attr("rx", 10)
									.attr("ry", 10)
									.style("fill", "silver")
									.attr("stroke", "white")
							    	.attr("stroke-dasharray", "5,5")
							    	.attr("stroke-width", 5);

				svg.append("text").attr("x", w-135)
								.attr("y", 185)
								.text("Game Best Score: ")
								.attr("font-family", "Artifika")
				                .attr("font-size", "13px")
				                .attr("fill", "black")
				                .attr("text-anchor", "left");

				
				var lblOBest = svg.append("text").attr("x", w-40)
								.attr("y", 185)
								.text("0.75")
								.attr("font-family", "Artifika")
				                .attr("font-size", "13px")
				                .attr("fill", "black")
				                .attr("text-anchor", "left")
				                .style("font-weight", "bold");

				var lblBestPlayer = svg.append("text").attr("x", w-100)
								.attr("y", 195)
								.text("0.75")
								.attr("font-family", "Artifika")
				                .attr("font-size", "13px")
				                .attr("fill", "red")
				                .attr("text-anchor", "left")
				                .style("font-weight", "bold");

				svg.append("text").attr("x", w-155)
								.attr("y", 210)
								.text("My Rank: ")
								.attr("font-family", "Artifika")
				                .attr("font-size", "13px")
				                .attr("fill", "black")
				                .attr("text-anchor", "left");

				
				var lblRank = svg.append("text").attr("x", w-40)
								.attr("y", 210)
								.text("3")
								.attr("font-family", "Artifika")
				                .attr("font-size", "13px")
				                .attr("fill", "black")
				                .attr("text-anchor", "left")
				                .style("font-weight", "bold");

				/*var btnexit = svg.append("rect")
							    .attr("x", w-180)
							    .attr("y", 235)
							    .attr("width", 150)
							    .attr("height", 26)
							    .attr("fill", "rgb(200,100,100)")
							    .attr("rx", 10)
							    .attr("ry", 10)
							    .classed("recty", true)
							    .attr("stroke", "#1f628d")
							    .attr("stroke-width", "2px")
							    //.on("click", function(){
				*/
				/*			    g_draggableCircles.selectAll("image").remove();
									
							    	var dcd=[];
								

									bs = [];
									for(var k = 0; k<bst_x.length; k++){
										bs.push({
											x: bst_x[k],
											y: bst_y[k]
										});
									}
									populateDraggableCircles(bs);
									lblCurScore.attr("fill", "green").text(myBestScore);

									//console.log(edgesData);
									edgesData = [];
									var fixedCircles = g_fixedCircles.selectAll("image")._groups[0];
									var draggableCircles = g_draggableCircles.selectAll("image")._groups[0];
									


									var dist = 0;
									for(var j = 0; j<fixedCircles.length; j++){
										var indexOfNearest = 0;
										var distToNearest = Math.sqrt(Math.pow((fixedCircles[j].x.baseVal.value
																-draggableCircles[0].x.baseVal.value), 2)
														+Math.pow((fixedCircles[j].y.baseVal.value
																-draggableCircles[0].y.baseVal.value), 2)
														); 
										for(var i = 1; i<draggableCircles.length; i++){
											var tmpDist = Math.sqrt(Math.pow((fixedCircles[j].x.baseVal.value
															-draggableCircles[i].x.baseVal.value), 2)
													+Math.pow((fixedCircles[j].y.baseVal.value
															-draggableCircles[i].y.baseVal.value), 2)
														);
											if(tmpDist < distToNearest){
												indexOfNearest = i;
												distToNearest = tmpDist;
											}
										}
										indexOfNearestArr[j] = indexOfNearest;
										distToNearestArr[j] = distToNearest;
										dist += distToNearest;
									}

									for(var j = 0; j<fixedCircles.length; j++){
										edgesData.push({"x1":fixedCircles[j].x.baseVal.value+20, "y1":fixedCircles[j].y.baseVal.value+20,
											"x2":draggableCircles[indexOfNearestArr[j]].x.baseVal.value+20,
											"y2":draggableCircles[indexOfNearestArr[j]].y.baseVal.value+20});
									}
									//console.log(edgesData);
									g_edges.selectAll("line").remove();
									populateEdges(edgesData);
									
									//console.log("1connecting to server...");

									//perform http request
									//refreshScoreBoard();
									//console.log("post done..");

									myDistance = calcDistance(null).toFixed(2);
									myBenefit = calcBenefit(null).toFixed(2);
									myScore = calcScore(myDistance, myBenefit).toFixed(2);

									refreshScoreBoard();	*/
							    //})
				/*.on("click", function(d){window.location="selectGame.php";});


				var lblexit = svg.append("text").attr("x", w-105)
								.attr("y", 250)
								.text("SAVE & EXIT")
								.attr("font-family", "Artifika")
				                .attr("font-size", "13px")
				                .attr("fill", "black")
				                .attr("text-anchor", "left")
				                .style("font-weight", "bold")
				                .on("click", function(d){window.location="selectGame.php";});

				*/

	





				var g_fixedCircles = svg.append("g");
				var g_draggableCircles = svg.append("g");
				var g_edges = svg.append("g");
				var fixedCirclesData, draggableCircleData;	

				var populateDraggableCircles=function(d){
					g_draggableCircles.selectAll("image")
											.data(d)
											.enter()
											.append("image")
											.attr("xlink:href","images/tower.png")
											.attr("x", function(d){return d.x;})
											.attr("y", function(d){return d.y;})
											.attr("width", 50)
											.attr("height", 50)
											.call(d3.drag()
												.on("start", dragstarted)
												.on("drag", dragged)
												.on("end", dragended));
				}

				var populateFixedCircles=function(d){
					g_fixedCircles.selectAll("image")
											.data(d)
											.enter()
											.append("image")
											.attr("xlink:href","images/home2.png")
											.attr("x", function(d){return d.x;})
											.attr("y", function(d){return d.y;})
											.attr("width", 50)
											.attr("height", 50)
											.attr("weight", function(d){return d.w;});
					g_fixedCircles.selectAll("text")
											.data(d)
											.enter()
											.append("text")
											.attr("x", function(d){return (+d.x + 25);})
											.attr("y", function(d){return (+d.y + 22);})
											.text(function(d){return d.w;})
											.style("font-weight","900");
				}


				var populateEdges = function(d){
					g_edges.selectAll("line")
									.data(d)
									.enter()
									.append("line")
									.attr("x1", function(d){return d.x1;})
									.attr("y1", function(d){return d.y1;})
									.attr("x2", function(d){return d.x2;})
									.attr("y2", function(d){return d.y2;})
									.style("stroke-dasharray", function(d){
										l = Math.sqrt(Math.pow((d.x1-d.x2),2)+Math.pow((d.y1-d.y2),2));
										dfrac = 1-l/threshold;
										b=dfrac*5;
										c=(1-dfrac)*3;
										a = (b).toString()+","+c.toString();
										return a;
									})
									.attr("stroke-width", 2)
									.attr("stroke", function(d){
										l = Math.sqrt(Math.pow((d.x1-d.x2),2)+Math.pow((d.y1-d.y2),2));
										//console.log(l);
										if(l>threshold)
											return ;
										if(l>(0.75*threshold))
											return "red";
										else
											return "black";
									});
				}

				var fcd=[];

				$.post('cInit.php',{level: lvl},
					function(data){
						console.log(data);
						var values = data.split(",");
						for(var j = 0; j<values.length; j+=3){
							bx = values[j];
							by = values[j+1];
							bw = values[j+2]
							fcd.push({"x":bx, "y":by, "w":bw});
						}
						populateFixedCircles(fcd);
						initiateFacilitiesData();
					});
				//console.log("isset");

				var initiateFacilitiesData = function(){
				var dcd=[];
				$.post('fInit-advanced.php',{level: lvl},
					function(data){
						//console.log(data);
						var values = data.split(",");
						for(var j = 0; j<values.length-3; j+=2){
							bx = values[j];
							by = values[j+1];
							dcd.push({"x":bx, "y":by});
						}
						populateDraggableCircles(dcd);

				//		gMinDist = values[values.length-6];
				//		gMaxBene = values[values.length-5];
				/*		gBestScore = values[values.length-4];

						myDistance = values[values.length-3];
						myBenefit = values[values.length-2];
						myScore = values[values.length-1];

						if(gBestScore == 0){
							gMinDist = Infinity;
							gMaxBene = 0;
							gBestScore = 0;
						}
						if(myBestScore == 0){
							myMinDistance = calcDistance(null).toFixed(2);
							myMaxBenefit = calcBenefit(null).toFixed(2);
							myBestScore = (gMinDist/myMinDistance)*w1+(myMaxBenefit/gMaxBene)*w2;
						}
						*/
						myDistance = calcDistance(null).toFixed(2);
						myBenefit = calcBenefit(null).toFixed(2);
						myScore = values[values.length-3];
						bestScore = values[values.length-2];
						bestPlayer = values[values.length-1];

						lblCurDist.attr("fill", "white").text(myDistance);
						lblCurBene.attr("fill", "white").text(myBenefit);
						lblCurScore.attr("fill", "white").text(myScore);
						lblBestScore.attr("fill", "white").text(myScore);
						lblOBest.attr("fill", "white").text(bestScore);
						lblBestPlayer.text(bestPlayer);
						lblRank.attr("fill", "white").text("-");

						//console.log(myScore);
						//console.log(bestScore);

						//myMinDistance = myDistance;
						//myMaxBenefit = myBenefit;
						//myBestScore = myScore;

						/*lblBestScore.attr("fill", "green").text(function(){
																	if(gBestScore==0)
																		return "-";
																	else
																		return myBestScore;
																});
						lblCurScore.attr("fill", "green").text(function(){
																	if(gBestScore==0)
																		return "-";
																	else
																		return myBestScore;
																});
						*/
						//lblCurDist.attr("fill", "green").text(myMinDistance);
						//lblCurBene.attr("fill", "green").text(myMaxBenefit);
						
						/*lblOBest.text(function(){
											if(gBestScore==0)
												return "-";
											else	
												return gBestScore;
											});
						lblRank.text("-");
						
						var draggableCircles = g_draggableCircles.selectAll("image")._groups[0];
						for(var j = 0; j<draggableCircles.length; j++){
							bst_x[j] = draggableCircles[j].x.baseVal.value;
							bst_y[j] = draggableCircles[j].y.baseVal.value;
							bst.push({"x":bst_x[j], "y":bst_y[j]});
						}
						*/
						var fixedCircles = g_fixedCircles.selectAll("image")._groups[0];
						var draggableCircles = g_draggableCircles.selectAll("image")._groups[0];
									

						var dist = 0;
						for(var j = 0; j<fixedCircles.length; j++){
							var indexOfNearest = 0;
							var distToNearest = Math.sqrt(Math.pow((fixedCircles[j].x.baseVal.value
													-draggableCircles[0].x.baseVal.value), 2)
													+Math.pow((fixedCircles[j].y.baseVal.value
													-draggableCircles[0].y.baseVal.value), 2)
												); 
							for(var i = 1; i<draggableCircles.length; i++){
								var tmpDist = Math.sqrt(Math.pow((fixedCircles[j].x.baseVal.value
												-draggableCircles[i].x.baseVal.value), 2)
												+Math.pow((fixedCircles[j].y.baseVal.value
												-draggableCircles[i].y.baseVal.value), 2)
											);
								if(tmpDist < distToNearest){
									indexOfNearest = i;
									distToNearest = tmpDist;
								}
							}
							indexOfNearestArr[j] = indexOfNearest;
							distToNearestArr[j] = distToNearest;
							dist += distToNearest;
						}
					

						edgesData = [];
						var fixedCircles = g_fixedCircles.selectAll("image")._groups[0];
						for(var j = 0; j<fixedCircles.length; j++){
							edgesData.push({"x1":fixedCircles[j].x.baseVal.value+20, "y1":fixedCircles[j].y.baseVal.value+20,
								"x2":draggableCircles[indexOfNearestArr[j]].x.baseVal.value+20,
								"y2":draggableCircles[indexOfNearestArr[j]].y.baseVal.value+20});
						}
						//console.log("EDGESDATA"+edgesData);
						populateEdges(edgesData);
					});
				};
				//* todo
				//setInterval(refreshScoreBoard, 1000);

				var calcDistance = function(d){
					//isCovering = true;
					var dist = 0;
					var fixedCircles = g_fixedCircles.selectAll("image")._groups[0];
					var draggableCircles = g_draggableCircles.selectAll("image")._groups[0];
					for(var j = 0; j<fixedCircles.length; j++){
						var indexOfNearest = 0;
						//console.log(draggableCircles);
						var distToNearest = Math.sqrt(Math.pow((fixedCircles[j].x.baseVal.value
																-draggableCircles[0].x.baseVal.value), 2)
														+Math.pow((fixedCircles[j].y.baseVal.value
																-draggableCircles[0].y.baseVal.value), 2)
														); 
						for(var i = 1; i<draggableCircles.length; i++){
							var tmpDist = Math.sqrt(Math.pow((fixedCircles[j].x.baseVal.value
															-draggableCircles[i].x.baseVal.value), 2)
													+Math.pow((fixedCircles[j].y.baseVal.value
															-draggableCircles[i].y.baseVal.value), 2)
														);
							if(tmpDist < distToNearest){
								indexOfNearest = i;
								distToNearest = tmpDist;
							}
						}
						indexOfNearestArr[j] = indexOfNearest;
						distToNearestArr[j] = distToNearest;
						dist += distToNearest;
						if(distToNearest > threshold)
							isCovering = false;
					}

					if(!isCovering){
						dist = 0;
						for(var j = 0; j<fixedCircles.length; j++){
							var distToFarthest = Math.sqrt(Math.pow((fixedCircles[j].x.baseVal.value
															-draggableCircles[0].x.baseVal.value), 2)
														+Math.pow((fixedCircles[j].y.baseVal.value
																-draggableCircles[0].y.baseVal.value), 2)
														); 
							for(var i = 1; i<draggableCircles.length; i++){
								var tmpDist = Math.sqrt(Math.pow((fixedCircles[j].x.baseVal.value
															-draggableCircles[i].x.baseVal.value), 2)
													+Math.pow((fixedCircles[j].y.baseVal.value
															-draggableCircles[i].y.baseVal.value), 2)
														);
								if(tmpDist > distToFarthest){
									distToFarthest = tmpDist;
								}
							}
							dist += distToFarthest;
						}
					}
					return dist;		
				};
//////////////////////////////calac Benefit////////////////////////////////////////////////////////////
				var calcBenefit = function(d){
					//isCovering = true;
					var benefit = 0;
					var fixedCircles = g_fixedCircles.selectAll("image")._groups[0];
					var draggableCircles = g_draggableCircles.selectAll("image")._groups[0];
					for(var j = 0; j<fixedCircles.length; j++){
						var indexOfNearest = 0;
						//console.log(draggableCircles);
						var distToNearest = Math.sqrt(Math.pow((fixedCircles[j].x.baseVal.value
																-draggableCircles[0].x.baseVal.value), 2)
														+Math.pow((fixedCircles[j].y.baseVal.value
																-draggableCircles[0].y.baseVal.value), 2)
														); 
						for(var i = 1; i<draggableCircles.length; i++){
							var tmpDist = Math.sqrt(Math.pow((fixedCircles[j].x.baseVal.value
															-draggableCircles[i].x.baseVal.value), 2)
													+Math.pow((fixedCircles[j].y.baseVal.value
															-draggableCircles[i].y.baseVal.value), 2)
														);
							if(tmpDist < distToNearest){
								indexOfNearest = i;
								distToNearest = tmpDist;
							}
						}
						//indexOfNearestArr[j] = indexOfNearest;
						//distToNearestArr[j] = distToNearest;
						//console.log(distToNearest);
						if(distToNearest<1)
							distToNearest = 1;
						if(distToNearest < threshold){
							benefit += (1-distToNearest/threshold)* +fixedCircles[j].getAttribute("weight");
							//console.log(fixedCircles[j].getAttribute("weight"));
						}
						//else{}				
					}
					return benefit;		
				};

	//////////////////////////////////////////////calc score/////////////////////////////////////////////////////
				//var calcScore = function(d, b){
				//	return ((gMinDist/d)*w1 + b/gMaxBene*w2);
				//}
	////////////////////////////////////////////////////////////////////////////////////////////////////////////
				function calcAjaxStringx(){
					var str = "";
					var draggableCircles = g_draggableCircles.selectAll("image")._groups[0];
					var level = g_draggableCircles.selectAll("image")._groups[0].length;
					for(var i = 0; i<level-1; i++)
					{
						//str += bst_x[i].toString()+",";
						str += draggableCircles[i].x.baseVal.value.toString()+",";
					}
					str+= draggableCircles[level-1].x.baseVal.value.toString();
					return str;
				}

				function calcAjaxStringy(){
					var str = "";
					var draggableCircles = g_draggableCircles.selectAll("image")._groups[0];
					var level = g_draggableCircles.selectAll("image")._groups[0].length;
					for(var i = 0; i<level-1; i++)
					{
						//str += bst_y[i].toString()+",";
						str += draggableCircles[i].y.baseVal.value.toString()+",";
					}
					str+= draggableCircles[level-1].y.baseVal.value.toString();
					return str;
				}

				function refreshScoreBoard(){

					$.post('settings-advanced.php', 
										{
										 level:lvl,
										 distance:myDistance,
										 benefit:myBenefit,
										 //score: myScore,
										 x: calcAjaxStringx(),
										 y: calcAjaxStringy()
										 },
										function(data){
											//alert(data);
											var values = data.split(",");
								            console.log(values);
											
											myScore = values[0];
											myBestScore = values[1];
											bestScore = values[2];
											bestPlayer = values[3];
											Rank = values[4];

											lblCurScore.text(myScore);
											lblBestScore.text(myBestScore);
											lblOBest.text(bestScore);
											lblBestPlayer.text(bestPlayer);
											lblRank.text(Rank);
										}
									);
				}

				function dragstarted(d){
					d3.select(this).raise().classed("active", true);
				}
				
				function dragged(d){
					d3.select(this).attr("x", d.x = d3.event.x).attr("y", d.y = d3.event.y);
					//console.log(this);
					//console.log(d.x+" , "+d.y);
					isCovering = true;
					myDistance = parseFloat(calcDistance(d).toFixed(2));
					myBenefit = parseFloat(calcBenefit(d).toFixed(2));
					//myScore = parseFloat(calcScore(myDistance, myBenefit));
					//console.log("before lblcurscore");
					
					lblCurDist.attr("fill", function(){
				                	if(isCovering)
				                		return "yellow";
				                	else
				                		return "red";
				                })
							.text(function(){
								if(isCovering)
									return myDistance;
								else
									return "Not Covering";
							});
					lblCurBene.attr("fill", function(){
				                	if(isCovering)
				                		return "yellow";
				                	else
				                		return "red";
				                })
							.text(function(){
								if(isCovering)
									return myBenefit;
								else
									return "Not Covering";
							});
					/*lblCurScore.attr("fill", function(){
						//console.log("inside lblcurscore");
						if(isCovering)
							return "yellow";
						else
							return "red";
					})
					.text(function(){
						if(isCovering)
							return myScore;
						else
							return "Not Covering";
					});*/
					//console.log(dist+" , "+ myBestScore);
					//if(dist.toString().length <= myBestScore.toString().length){
					
					/*if(myScore > myBestScore && isCovering){	
							//console.log("dist("+dist+") is lower than myBestScore("+myBestScore+")");
							bst = [];			
							myBestScore = myScore;
							lblCurScore.attr("fill", "green").text(myScore);
							lblBestScore.text(myScore);
								//lblBest.text(myBestScore);
							var draggableCircles = g_draggableCircles.selectAll("image")._groups[0];
							
							for(var j = 0; j<draggableCircles.length; j++){
								//bst[j]={"x": draggableCircles[j].x.baseVal.value, "y":draggableCircles[j].y.baseVal.value};
								bst_x[j] = draggableCircles[j].x.baseVal.value;
								bst_y[j] = draggableCircles[j].y.baseVal.value;
								bst.push({"x":bst_x[j], "y":bst_y[j]});
								//bst[j] = {"x":bst_x[j], "y":bst_y[j]};
								//console.log("pushed");
							}
							//console.log(bst);
							//bst_score = myBestScore;
					}*/
					//}

					/////if(bene >= myMaxBenefit && isCovering){
						//maxP = []
						/////myMaxBenefit = bene;
						/////lblCurBene.attr("fill", "green").text(bene);

						/*var draggableCircles = g_draggableCircles.selectAll("image")._groups[0];
							
						for(var j = 0; j<draggableCircles.length; j++){
							bstP_x[j] = draggableCircles[j].x.baseVal.value;
							bstP_y[j] = draggableCircles[j].y.baseVal.value;
							bstP.push({"x":bstP_x[j], "y":bstP_y[j]});
								//bst[j] = {"x":bst_x[j], "y":bst_y[j]};
								//console.log("pushed");
							}
							//console.log(bst);
							max_profit = myMaxProfit;
						*/
					/////}

					edgesData = [];
					var fixedCircles = g_fixedCircles.selectAll("image")._groups[0];
					var draggableCircles = g_draggableCircles.selectAll("image")._groups[0];
					for(var j = 0; j<fixedCircles.length; j++){
						edgesData.push({"x1":fixedCircles[j].x.baseVal.value+20, "y1":fixedCircles[j].y.baseVal.value+20,
								"x2":draggableCircles[indexOfNearestArr[j]].x.baseVal.value+20,
								"y2":draggableCircles[indexOfNearestArr[j]].y.baseVal.value+20});
					}
					//console.log(edgesData);
					g_edges.selectAll("line").remove();
					populateEdges(edgesData);
					//setInterval(refreshScoreBoard, 1000);
				}

				function dragended(d){

					/*lblCurScore.attr("fill", function(){
						if(myScore==myBestScore)
							return "green";
						else
							return "yellow";
					})
*/
					refreshScoreBoard();
					d3.select(this).classed("active", false);
					//console.log(d3.select(this).class);
				}

				