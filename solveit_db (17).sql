-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: May 17, 2017 at 10:21 AM
-- Server version: 10.1.16-MariaDB
-- PHP Version: 5.6.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `solveit_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `number` int(11) NOT NULL,
  `level` int(10) NOT NULL,
  `x` double NOT NULL,
  `y` double NOT NULL,
  `weight` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`number`, `level`, `x`, `y`, `weight`) VALUES
(0, 101, 400, 150, 10),
(0, 102, 150, 200, 100),
(0, 103, 100, 100, 50),
(0, 201, 400, 150, 50),
(0, 202, 150, 200, 100),
(0, 203, 100, 100, 50),
(1, 101, 500, 300, 10),
(1, 102, 400, 100, 30),
(1, 103, 370, 170, 70),
(1, 201, 500, 300, 10),
(1, 202, 400, 100, 30),
(1, 203, 370, 170, 70),
(2, 101, 300, 270, 10),
(2, 102, 650, 300, 80),
(2, 103, 100, 250, 100),
(2, 201, 300, 270, 90),
(2, 202, 650, 300, 80),
(2, 203, 100, 250, 100),
(3, 102, 300, 400, 20),
(3, 103, 250, 400, 50),
(3, 202, 300, 400, 20),
(3, 203, 250, 400, 50),
(4, 102, 200, 450, 50),
(4, 103, 200, 300, 50),
(4, 202, 200, 450, 50),
(4, 203, 200, 300, 50),
(5, 103, 700, 320, 150),
(5, 203, 700, 320, 150),
(6, 100, 600, 50, 20),
(6, 103, 600, 50, 20),
(6, 203, 600, 50, 20);

-- --------------------------------------------------------

--
-- Table structure for table `facilities`
--

CREATE TABLE `facilities` (
  `number` int(11) NOT NULL,
  `level` int(10) NOT NULL,
  `player` int(11) NOT NULL,
  `bestx` double NOT NULL,
  `besty` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

--
-- Dumping data for table `facilities`
--

INSERT INTO `facilities` (`number`, `level`, `player`, `bestx`, `besty`) VALUES
(0, 101, 50, 392.66778564453125, 227.95858764648438),
(0, 102, 50, 200, 300),
(0, 103, 50, 595.6095581054688, 322.7768859863281),
(1, 102, 50, 513.9736938476562, 189.68124389648438),
(1, 103, 50, 601.4932250976562, 51.448577880859375),
(2, 103, 50, 198.52908325195312, 222.06375122070312);

-- --------------------------------------------------------

--
-- Table structure for table `facilities-advanced`
--

CREATE TABLE `facilities-advanced` (
  `player` int(11) NOT NULL,
  `level` int(11) NOT NULL,
  `timestamp` int(11) NOT NULL,
  `number` int(11) NOT NULL,
  `x` double NOT NULL,
  `y` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

--
-- Dumping data for table `facilities-advanced`
--

INSERT INTO `facilities-advanced` (`player`, `level`, `timestamp`, `number`, `x`, `y`) VALUES
(50, 201, 0, 0, 200, 150),
(50, 201, 1495006984, 0, 340, 215),
(50, 201, 1495006998, 0, 427, 278),
(50, 201, 1495007048, 0, 373, 257),
(50, 201, 1495007072, 0, 361, 258),
(50, 201, 1495007751, 0, 405, 257),
(50, 201, 1495007752, 0, 403, 281),
(50, 201, 1495007753, 0, 451, 247),
(50, 201, 1495007755, 0, 599, 263),
(50, 201, 1495007757, 0, 544, 230),
(50, 201, 1495007761, 0, 373, 258),
(50, 201, 1495008078, 0, 404, 258),
(50, 201, 1495008082, 0, 409, 222.00001525878906),
(50, 201, 1495008085, 0, 357, 258),
(50, 202, 0, 0, 200, 300),
(50, 202, 0, 1, 500, 300),
(50, 202, 1495007010, 0, 200, 300),
(50, 202, 1495007010, 1, 505, 209.00001525878906),
(50, 202, 1495007059, 0, 505, 209.00001525878906),
(50, 202, 1495007059, 1, 205, 347),
(50, 202, 1495007097, 0, 505, 209.00001525878906),
(50, 202, 1495007097, 1, 202, 371),
(50, 202, 1495007103, 0, 505, 209.00001525878906),
(50, 202, 1495007103, 1, 191, 304),
(50, 202, 1495007110, 0, 505, 209.00001525878906),
(50, 202, 1495007110, 1, 171, 319),
(50, 202, 1495007116, 0, 191, 304),
(50, 202, 1495007116, 1, 514, 203.00001525878906),
(50, 203, 0, 0, 200, 200),
(50, 203, 0, 1, 500, 150),
(50, 203, 0, 2, 500, 400),
(50, 203, 1495007246, 0, 200, 200),
(50, 203, 1495007246, 1, 500, 150),
(50, 203, 1495007246, 2, 582, 317),
(50, 203, 1495007248, 0, 500, 150),
(50, 203, 1495007248, 1, 582, 317),
(50, 203, 1495007248, 2, 195, 230),
(50, 203, 1495007441, 0, 582, 317),
(50, 203, 1495007441, 1, 195, 230),
(50, 203, 1495007441, 2, 477, 122),
(50, 203, 1495007458, 0, 582, 317),
(50, 203, 1495007458, 1, 195, 230),
(50, 203, 1495007458, 2, 477, 117),
(50, 203, 1495007461, 0, 195, 230),
(50, 203, 1495007461, 1, 477, 117),
(50, 203, 1495007461, 2, 648, 289);

-- --------------------------------------------------------

--
-- Table structure for table `players`
--

CREATE TABLE `players` (
  `id` int(11) NOT NULL,
  `username` varchar(50) COLLATE utf8_persian_ci NOT NULL,
  `email` varchar(50) COLLATE utf8_persian_ci NOT NULL,
  `password` varchar(50) COLLATE utf8_persian_ci NOT NULL,
  `confirmed` varchar(50) COLLATE utf8_persian_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

--
-- Dumping data for table `players`
--

INSERT INTO `players` (`id`, `username`, `email`, `password`, `confirmed`) VALUES
(50, 'a', 'a@a.a', 'a', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `scores`
--

CREATE TABLE `scores` (
  `player` int(11) NOT NULL,
  `level` int(10) NOT NULL,
  `bestscore` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

--
-- Dumping data for table `scores`
--

INSERT INTO `scores` (`player`, `level`, `bestscore`) VALUES
(50, 101, 309.33),
(50, 102, 723.39),
(50, 103, 808.17);

-- --------------------------------------------------------

--
-- Table structure for table `scores-advanced`
--

CREATE TABLE `scores-advanced` (
  `player` int(11) NOT NULL,
  `level` double NOT NULL,
  `timestamp` int(11) NOT NULL,
  `distance` double NOT NULL,
  `benefit` double NOT NULL,
  `score` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

--
-- Dumping data for table `scores-advanced`
--

INSERT INTO `scores-advanced` (`player`, `level`, `timestamp`, `distance`, `benefit`, `score`) VALUES
(50, 201, 1495008085, 323.54, 87.27, 1),
(50, 202, 1495007116, 724, 83.15, 1),
(50, 203, 1495007461, 826.96, 237.79, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`number`,`level`);

--
-- Indexes for table `facilities`
--
ALTER TABLE `facilities`
  ADD PRIMARY KEY (`number`,`level`,`player`);

--
-- Indexes for table `facilities-advanced`
--
ALTER TABLE `facilities-advanced`
  ADD PRIMARY KEY (`player`,`level`,`timestamp`,`number`);

--
-- Indexes for table `players`
--
ALTER TABLE `players`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `scores`
--
ALTER TABLE `scores`
  ADD PRIMARY KEY (`player`,`level`);

--
-- Indexes for table `scores-advanced`
--
ALTER TABLE `scores-advanced`
  ADD PRIMARY KEY (`player`,`level`,`timestamp`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `players`
--
ALTER TABLE `players`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
