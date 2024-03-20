-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 18, 2024 at 12:42 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bahay`
--

-- --------------------------------------------------------

--
-- Table structure for table `preferencestable`
--

CREATE TABLE `preferencestable` (
  `id` int(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `housetype` varchar(255) NOT NULL,
  `lottype` varchar(255) NOT NULL,
  `price` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `preferencestable`
--

INSERT INTO `preferencestable` (`id`, `location`, `housetype`, `lottype`, `price`) VALUES
(1, 'Quezon City', '', '', ''),
(2, 'Caloocan City', '', '', ''),
(3, 'Makati City', '', '', ''),
(4, 'Pasig City', '', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `propertiestable`
--

CREATE TABLE `propertiestable` (
  `id` int(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `price` varchar(255) NOT NULL,
  `isnearschool` varchar(255) NOT NULL,
  `isnearchurch` varchar(255) NOT NULL,
  `isnearmall` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `propertiestable`
--

INSERT INTO `propertiestable` (`id`, `name`, `type`, `location`, `price`, `isnearschool`, `isnearchurch`, `isnearmall`) VALUES
(1, 'The Veranda Luxury Suites', 'Apartment', 'Makati CBD', '1000000', 'YES', 'NO', 'YES'),
(2, 'Brixton Place Condominium', 'Condominium', 'Bonifacio Global City', '800000', 'NO', 'NO', 'YES'),
(3, 'Fairview Terraces Homes', 'Townhouse', 'Quezon City', '1500000', 'YES', 'YES', 'NO'),
(4, 'Grand Central Park Tower', 'High-rise condo', 'Mandaluyong', '1200000', 'NO', 'YES', 'YES'),
(5, 'Nuvali East Lake Villas', 'Villa', 'Sta Rosa Laguna', '2500000', 'YES', 'YES', 'NO'),
(6, 'One Serendra', 'Condominium', 'Taguig', '1800000', 'YES', 'NO', 'YES'),
(7, 'Shang Grand Towers', 'Condominium', 'Ortigas Center', '1500000', 'YES', 'YES', 'YES'),
(8, 'Acacia Estates', 'Townhouse', 'Taguig', '1200000', 'NO', 'NO', 'YES'),
(9, 'Cloverleaf Balintawak', 'Condominium', 'Caloocan', '700000', 'YES', 'YES', 'YES'),
(10, 'Forbestown Residences', 'High-rise condo', 'Bonifacio Global City', '1600000', 'NO', 'NO', 'YES'),
(11, 'Emerald Suites', 'Condominium', 'Quezon City', '1200000', 'YES', 'NO', 'YES'),
(12, 'The Regent Tower', 'High-rise condo', 'Makati CBD', '1500000', 'YES', 'YES', 'NO'),
(13, 'Valley View Villas', 'Villa', 'Taguig', '18000000', 'NO', 'YES', 'YES'),
(14, 'Skyline Heights', 'High-rise condo', 'Bonifacio Global City', '2000000', 'NO', 'NO', 'NO'),
(15, 'Blue Horizon Condos', 'Low-rise condo', 'Mandaluyong', '800000', 'YES', 'YES', 'YES'),
(16, 'Greenfield Executive Village', 'Townhouse', 'Pasig', '2500000', 'NO', 'NO', 'YES'),
(17, 'The Peak Towers', 'Studio Apartment', 'Ortigas Center', '900000', 'YES', 'YES', 'YES'),
(18, 'Capitol Commons', 'Mid-rise condo', 'Marikina', '1100000', 'NO', 'NO', 'YES'),
(19, 'South Forbes Golf City', 'Single-family home', 'Sta. Rosa Laguna', '2100000', 'YES', 'YES', 'NO'),
(20, 'The Fort Residences', 'High-rise condo', 'Taguig', '2200000', 'YES', 'NO', 'YES'),
(21, 'Eagle\'s Nest', 'Apartment', 'Makati CBD', '1500000', 'YES', 'NO', 'YES'),
(22, 'Emerald Woods', 'High-rise condo', 'Taguig', '2000000', 'NO', 'YES', 'NO'),
(23, 'Brighton Way', 'Townhouse', 'Pasig', '1800000', 'YES', 'NO', 'YES'),
(24, 'Whispering Winds', 'Apartment', 'Quezon City', '1200000', 'NO', 'YES', 'NO'),
(25, 'Seascape Retreat', 'High-rise condo', 'Pasay', '2200000', 'YES', 'NO', 'YES'),
(26, 'Willowbrook Lane', 'Townhouse', 'Muntinlupa', '1600000', 'NO', 'YES', 'NO'),
(27, 'Maple Grove', 'Apartment', 'Mandaluyong', '1400000', 'YES', 'NO', 'YES'),
(28, 'Sunnyvale Manor', 'High-rise condo', 'Makati CBD', '2500000', 'NO', 'YES', 'NO'),
(29, 'Elm Tree Hollow', 'Townhouse', 'Pasig', '1900000', 'YES', 'NO', 'YES'),
(30, 'Atlantic Point', 'High-rise condo', 'Taguig', '3000000', 'NO', 'YES', 'NO'),
(31, 'Cherry Blossom Mews', 'Apartment', 'Quezon City', '1300000', 'YES', 'NO', 'YES'),
(32, 'Country Haven', 'Townhouse', 'Pasay', '1700000', 'NO', 'YES', 'NO'),
(33, 'Breakwater Heights', 'High-rise condo', 'Makati CBD', '2300000', 'YES', 'NO', 'YES'),
(34, 'Poplar Path', 'Apartment', 'Mandaluyong', '2100000', 'NO', 'YES', 'YES'),
(35, 'Summit Ridge', 'Apartment', 'Mandaluyong', '2600000', 'YES', 'NO', 'YES'),
(36, 'Oceanic Drive', 'High-rise condo', 'Taguig', '3200000', 'NO', 'YES', 'NO'),
(37, 'Brookside Walk', 'Apartment', 'Quezon City', '1600000', 'YES', 'NO', 'YES'),
(38, 'Sequoia Park', 'Townhouse', 'Pasay', '2400000', 'NO', 'YES', 'NO'),
(39, 'Riviera Residences', 'High-rise condo', 'Makati CBD', '2700000', 'YES', 'NO', 'YES'),
(40, 'Birchwood Chase', 'Apartment', 'Mandaluyong', '2500000', 'NO', 'YES', 'NO'),
(41, 'Peakview Manors', 'Townhouse', 'Pasig', '3000000', 'YES', 'NO', 'YES'),
(42, 'Coral Reef Cove', 'High-rise condo', 'Taguig', '2800000', 'NO', 'YES', 'NO'),
(43, 'Garden Grove', 'Apartment', 'Quezon City', '1800000', 'YES', 'NO', 'YES'),
(44, 'Hillcrest Village', 'Townhouse', 'Pasay', '2200000', 'NO', 'YES', 'NO'),
(45, 'Blue Ocean Shores', 'High-rise condo', 'Makati CBD', '2900000', 'YES', 'NO', 'YES'),
(46, 'Maplewood Farms', 'Apartment', 'Mandaluyong', '2600000', 'NO', 'YES', 'NO'),
(47, 'Aspen Highlands', 'Townhouse', 'Pasig', '3100000', 'YES', 'NO', 'YES'),
(48, 'Coastal Living', 'High-rise condo', 'Taguig', '3300000', 'NO', 'YES', 'NO'),
(49, 'Rosebud Row', 'Apartment', 'Quezon City', '2000000', 'YES', 'NO', 'YES'),
(50, 'Sandy Shores', 'Townhouse', 'Pasay', '2700000', 'NO', 'YES', 'NO');

-- --------------------------------------------------------

--
-- Table structure for table `testtable`
--

CREATE TABLE `testtable` (
  `id` int(255) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `testtable`
--

INSERT INTO `testtable` (`id`, `name`) VALUES
(1, 'Paul'),
(2, 'Admin');

-- --------------------------------------------------------

--
-- Table structure for table `userpreferencestable`
--

CREATE TABLE `userpreferencestable` (
  `id` int(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `price` varchar(255) NOT NULL,
  `isnearschool` varchar(255) NOT NULL,
  `isnearchurch` varchar(255) NOT NULL,
  `isnearmall` varchar(255) NOT NULL,
  `matchedpropertiesid` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `userpreferencestable`
--

INSERT INTO `userpreferencestable` (`id`, `user_id`, `type`, `location`, `price`, `isnearschool`, `isnearchurch`, `isnearmall`, `matchedpropertiesid`) VALUES
(1, '1', 'Apartment', 'Mandaluyong', '2100000', 'NO', 'YES', 'NO', '');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `bday` varchar(255) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `region` varchar(255) NOT NULL,
  `province` varchar(255) NOT NULL,
  `municipality` varchar(255) NOT NULL,
  `verification` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `bday`, `gender`, `address`, `region`, `province`, `municipality`, `verification`) VALUES
(3, 'admin', 'admin', 'test@test.com', '$2a$10$6LUl7p8CXb6.wqMNSDSXtO9SoY362LF81xSdyn.8P.1gMjqKaVo7q', '2000-02-05', 'Male', 'ADMIN', '12', '1265', '126509', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `preferencestable`
--
ALTER TABLE `preferencestable`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `propertiestable`
--
ALTER TABLE `propertiestable`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `testtable`
--
ALTER TABLE `testtable`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `userpreferencestable`
--
ALTER TABLE `userpreferencestable`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `preferencestable`
--
ALTER TABLE `preferencestable`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `propertiestable`
--
ALTER TABLE `propertiestable`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `testtable`
--
ALTER TABLE `testtable`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `userpreferencestable`
--
ALTER TABLE `userpreferencestable`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
