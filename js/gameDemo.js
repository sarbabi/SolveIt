				var w = 1000;
				var h = 600;
				var r = 20;

				var bst=[];
				var bst_x = [];
				var bst_y = [];
				var myBestScore;
				var bst_score=0;
				bst_x[0]=100;
				bst_y[0]=100;
				myBestScore=100000.01;
				var indexOfNearestArr = [];
				var distToNearestArr = [];
				var isCovering = true;

				var edgesData;
				var threshold = 200;

				var sess = "IAMSESSION";
				jQuery(document).ready(function ($) {
        			sess = '@Request.RequestContext.HttpContext.Session["playerid"]';
    			}); 

				var svg = d3.select(".d3div").append("div")
							.classed("svg-container", true) //container class to make it responsive
   							.append("svg")
   							//responsive SVG needs these 2 attributes and no width and height attr
   							.attr("preserveAspectRatio", "xMinYMin meet")
   							.attr("viewBox", "0 0 1000 700")
   							//class to make it responsive
   							.classed("svg-content-responsive", true); 


				/*d3.select(".d3div").append("svg")
											.attr("width", w)
											.attr("height", h)
											.attr("text-anchor", "middle")
											.attr("xmlns", "http://www.w3.org/2000/svg")
											.attr("xmlns:xlink", "http://www.w3.org/1999/xlink");
*/
svg.append("defs")
                  .append('pattern')
                    .attr('id', 'locked2')
                    .attr('patternUnits', 'userSpaceOnUse')
                    .attr('width', w)
                    .attr('height', h)
                   .append("image")
                    .attr("xlink:href", "images/bg.jpg")
                    .attr('width', w)
                    .attr('height', h);

   
				
				svg.append("rect").attr("x", 0)
									.attr("y", 0)
									.attr("width", w)
									.attr("height", h)
									.attr("stroke", "rgb(250,240,230)")
									.attr("stroke-width", "2px")
									.attr("fill", "url(#locked2)");

				svg.append("rect").attr("x", w-205)
									.attr("y", 5)
									.attr("width", 200)
									.attr("height", 100)
									.style("fill", "silver")
									.attr("rx", 10)
							    	.attr("ry", 10)
							    	.attr("stroke", "white")
							    	.attr("stroke-dasharray", "5,5")
							    	.attr("stroke-width", 5);

				svg.append("text").attr("x", w-177)
								.attr("y", 25)
								.text("My Score: ")
								.attr("font-family", "Artifika")
				                .attr("font-size", "13px")
				                .attr("fill", "black")
				                .attr("text-anchor", "left");

				var lblCur = svg.append("text").attr("x", w-60)
								.attr("y", 25)
								.text("-")
								.attr("font-family", "sans-serif")
				                .attr("font-size", "14px")
				                .attr("fill", "black")
				                .attr("text-anchor", "left")
				                .style("font-weight", "bold");

				svg.append("text").attr("x", w-175)
								.attr("y", 50)
								.text("My Best Score: ")
								.attr("font-family", "Artifika")
				                .attr("font-size", "14px")
				                .attr("fill", "black")
				                .attr("text-anchor", "left");

				var lblBest = svg.append("text").attr("x", w-60)
								.attr("y", 50)
								.text("-")
								.attr("font-family", "Artifika")
				                .attr("font-size", "13px")
				                .attr("fill", "black")
				                .attr("text-anchor", "left")
				                .style("font-weight", "bold");

				var btn = svg.append("rect")
							    .attr("x", w-180)
							    .attr("y", 65)
							    .attr("width", 150)
							    .attr("height", 26)
							    .attr("fill", "white")
							    .attr("rx", 10)
							    .attr("ry", 10)
							    .attr("stroke", "#1f628d")
							    .attr("stroke-width", "2px");

				svg.append("text").attr("x", w-157)
								.attr("y", 83)
								.text("Take Me to My Best!")
								.attr("font-family", "Artifika")
				                .attr("font-size", "13px")
				                .attr("fill", "black")
				                .style("font-weight", "bold");

				var btn = svg.append("rect")
							    .attr("x", w-180)
							    .attr("y", 65)
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
									bs = [];
									for(var k = 0; k<bst_x.length; k++){
										bs.push({
											x: bst_x[k],
											y: bst_y[k]
										});
									}
									populateDraggableCircles(bs);
									lblCur.attr("fill", "green").text(myBestScore);

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
								})
							    .style("opacity", 0.5);

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
											//console.log(d);
				}

				var populateFixedCircles=function(d){
					g_fixedCircles.selectAll("image")
											.data(d)
											.enter()
											.append("image")
											.attr("xlink:href","images/home2.jpg")
											.attr("x", function(d){return d.x;})
											.attr("y", function(d){return d.y;})
											.attr("width", 50)
											.attr("height", 50);
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
										b=dfrac*8;
										c=(1-dfrac)*5;
										a = (b).toString()+","+c.toString();
										return a;
									})
									.attr("stroke-width", 4)
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



				
				var draggableCirclesData;
				d3.csv("data_files/movablePoints.csv", function(d){
											draggableCirclesData=d;
											populateDraggableCircles(draggableCirclesData);
											fpload();
											});

				var fixedCirclesData;
				var fpload = function(){
					d3.csv("data_files/fixedPoints.csv", function(d){
											fixedCirclesData=d;
											populateFixedCircles(fixedCirclesData);

											myBestScore = calcDistance(null).toFixed(2);
											//console.log(myBestScore);
											lblCur.attr("fill", "green").text(myBestScore);		
											lblBest.text(myBestScore);

											var draggableCircles = g_draggableCircles.selectAll("image")._groups[0];
						 	
						for(var j = 0; j<draggableCircles.length; j++){
							bst_x[j] = draggableCircles[j].x.baseVal.value;
							bst_y[j] = draggableCircles[j].y.baseVal.value;
							bst.push({"x":bst_x[j], "y":bst_y[j]});
						}
						
						edgesData = [];
						var fixedCircles = g_fixedCircles.selectAll("image")._groups[0];
						for(var j = 0; j<fixedCircles.length; j++){
							edgesData.push({"x1":fixedCircles[j].x.baseVal.value+20, "y1":fixedCircles[j].y.baseVal.value+20,
								"x2":draggableCircles[indexOfNearestArr[j]].x.baseVal.value+20,
								"y2":draggableCircles[indexOfNearestArr[j]].y.baseVal.value+20});
						}
						g_edges.selectAll("line").remove();
						populateEdges(edgesData);
						
										});}
				/*var fcd=[];
				$.post('cInit.php',{},
					function(data){
						//console.log(data);
						var values = data.split(",");
						for(var j = 0; j<values.length; j+=3){
							bx = values[j];
							by = values[j+1];
							bw = values[j+2]
							fcd.push({"x":bx, "y":by, "w":bw});
						}
						fixedCirclesData = fcd;
						populateFixedCircles(fcd);
					});
*/
				/*
				var dcd=[];
				$.post('fInit.php',{},
					function(data){
						//console.log(data);
						if(data == "0"){
							populateDraggableCircles(draggableCirclesData);
							isCovering = true;
							myBestScore = calcDistance(null).toFixed(2);
							console.log(myBestScore);
							lblCur.attr("fill", function(){
			    				if(isCovering)
				                	return "green";
				    			else
	            					return "red";
								}).text(myBestScore);
							lblBest.text(myBestScore);
						}
						else{
							var values = data.split(",");
							for(var j = 0; j<values.length-1; j+=2){
								bx = values[j];
								by = values[j+1];
								dcd.push({"x":bx, "y":by});
							}
							populateDraggableCircles(dcd);

							myBestScore = values[values.length-1];
							//console.log(myBestScore);
							myBestScore = calcDistance(null).toFixed(2);
							//console.log(myBestScore);
							lblCur.attr("fill", "green").text(myBestScore);		
							lblBest.text(myBestScore);
											
						}

						var draggableCircles = g_draggableCircles.selectAll("image")._groups[0];
						 	
						for(var j = 0; j<draggableCircles.length; j++){
							bst_x[j] = draggableCircles[j].x.baseVal.value;
							bst_y[j] = draggableCircles[j].y.baseVal.value;
							bst.push({"x":bst_x[j], "y":bst_y[j]});
						}
						
						edgesData = [];
						var fixedCircles = g_fixedCircles.selectAll("image")._groups[0];
						for(var j = 0; j<fixedCircles.length; j++){
							edgesData.push({"x1":fixedCircles[j].x.baseVal.value+20, "y1":fixedCircles[j].y.baseVal.value+20,
								"x2":draggableCircles[indexOfNearestArr[j]].x.baseVal.value+20,
								"y2":draggableCircles[indexOfNearestArr[j]].y.baseVal.value+20});
						}
						g_edges.selectAll("line").remove();
						populateEdges(edgesData);
						
					}
				);
*/
				
				
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

				function calcAjaxStringx(){
					var str = "";
					var level = g_draggableCircles.selectAll("image")._groups[0].length;
					for(var i = 0; i<level-1; i++)
					{
						str += bst_x[i].toString()+",";
					}
					str+= bst_x[level-1].toString();
					return str;
				}
				function calcAjaxStringy(){
					var str = "";
					var level = g_draggableCircles.selectAll("image")._groups[0].length;
					for(var i = 0; i<level-1; i++)
					{
						str += bst_y[i].toString()+",";
					}
					str+= bst_y[level-1].toString();
					return str;
				}

				/*function refreshScoreBoard(){
					$.post('settings.php', 
										{
										 level: g_draggableCircles.selectAll("image")._groups[0].length,
										 bst_x: calcAjaxStringx(),
										 bst_y: calcAjaxStringy(), 
										 bst_score: myBestScore},
										function(data){
											//alert(data);
											var values = data.split(",");
								            
											lblOBest.text(values[0]);
											lblRank.text(values[1]);
										}
									);

				}*/


				function dragstarted(d){
					d3.select(this).raise().classed("active", true);
				}
				
				function dragged(d){
					d3.select(this).attr("x", d.x = d3.event.x).attr("y", d.y = d3.event.y);
					//console.log(this);
					//console.log(d.x+" , "+d.y);
					isCovering = true;
					dist = parseFloat(calcDistance(d).toFixed(2));
					lblCur.attr("fill", function(){
				                	if(isCovering)
				                		return "yellow";
				                	else
				                		return "red";
				                })
							.text(function(){
								if(isCovering)
									return dist;
								else return "disconnected";
							})
							.attr("x", function(){
								if(isCovering)
									return w-60;
								else return w-95;
							} );
					//console.log(dist+" , "+ myBestScore);
					//if(dist.toString().length <= myBestScore.toString().length){
						if(dist < myBestScore && isCovering){	
							//console.log("dist("+dist+") is lower than myBestScore("+myBestScore+")");
							bst = [];			
							myBestScore = dist;
							lblCur.attr("fill", "green").text(dist);
							lblBest.text(myBestScore);
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
							bst_score = myBestScore;
							
						}
					//}

					edgesData = [];
					var fixedCircles = g_fixedCircles.selectAll("image")._groups[0];
					var draggableCircles = g_draggableCircles.selectAll("image")._groups[0];
					for(var j = 0; j<fixedCircles.length; j++){
						edgesData.push({"x1":fixedCircles[j].x.baseVal.value+20, "y1":fixedCircles[j].y.baseVal.value+20,
								"x2":draggableCircles[indexOfNearestArr[j]].x.baseVal.value+20,
								"y2":draggableCircles[indexOfNearestArr[j]].y.baseVal.value+20});
					}
					g_edges.selectAll("line").remove();
					populateEdges(edgesData);
					//setInterval(refreshScoreBoard, 1000);
				}
				function dragended(d){
					d3.select(this).classed("active", false);
					//console.log(d3.select(this).class);
				}

				