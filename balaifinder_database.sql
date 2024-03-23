-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 23, 2024 at 12:21 PM
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
-- Database: `balaifinder_database`
--

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
  `isnearmall` varchar(255) NOT NULL,
  `numberofbedroom` varchar(255) NOT NULL,
  `numberofbathroom` varchar(255) NOT NULL,
  `typeoflot` varchar(255) NOT NULL,
  `familysize` varchar(255) NOT NULL,
  `nearelementary` varchar(255) NOT NULL,
  `nearhighschool` varchar(255) NOT NULL,
  `nearcollege` varchar(255) NOT NULL,
  `plantodobusiness` varchar(255) NOT NULL,
  `monthly` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `imgsrc` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `propertiestable`
--

INSERT INTO `propertiestable` (`id`, `name`, `type`, `location`, `price`, `isnearschool`, `isnearchurch`, `isnearmall`, `numberofbedroom`, `numberofbathroom`, `typeoflot`, `familysize`, `nearelementary`, `nearhighschool`, `nearcollege`, `plantodobusiness`, `monthly`, `description`, `imgsrc`) VALUES
(1, 'The Veranda Luxury Suites', 'Apartment', 'Makati CBD', '1000000', 'YES', 'NO', 'YES', '3', '1', 'End Lot', 'Medium', 'YES', 'YES', 'NO', 'NO', '95705', 'Experience resort-style living in the comfort of your own home. From the pool and spa to the lush landscaping, every detail has been carefully crafted to create a luxurious oasis.', ''),
(2, 'Brixton Place Condominium', 'Condominium', 'Bonifacio Global City', '800000', 'NO', 'NO', 'YES', '3', '1', 'Intersection Lot', 'Small', 'YES', 'YES', 'YES', 'YES', '56229', 'Embrace the convenience of smart home technology in this modern abode. With automated features and intuitive controls, you can effortlessly manage your home from anywhere.', ''),
(3, 'Fairview Terraces Homes', 'Townhouse', 'Quezon City', '1500000', 'YES', 'YES', 'NO', '3', '3', 'Intersection Lot', 'Small', 'YES', 'NO', 'YES', 'YES', '94031', 'Experience resort-style living in the comfort of your own home. From the pool and spa to the lush landscaping, every detail has been carefully crafted to create a luxurious oasis.', ''),
(4, 'Grand Central Park Tower', 'High-rise condo', 'Mandaluyong', '1200000', 'NO', 'YES', 'YES', '3', '2', 'End Lot', 'Small', 'YES', 'NO', 'NO', 'YES', '51467', 'Embrace the convenience of smart home technology in this modern abode. With automated features and intuitive controls, you can effortlessly manage your home from anywhere.', ''),
(5, 'Nuvali East Lake Villas', 'Villa', 'Sta Rosa Laguna', '2500000', 'YES', 'YES', 'NO', '4', '2', 'Intersection Lot', 'Medium', 'YES', 'YES', 'NO', 'YES', '75244', 'Indulge in the ultimate entertainment experience with a dedicated movie room. With comfortable seating and state-of-the-art audiovisual equipment, movie nights will never be the same.', ''),
(6, 'One Serendra', 'Condominium', 'Taguig', '1800000', 'YES', 'NO', 'YES', '4', '1', 'End Lot', 'Extended', 'YES', 'YES', 'YES', 'NO', '71821', 'Create lasting memories with family and friends in the spacious backyard with a gourmet outdoor kitchen. From BBQs to summer parties, this outdoor space is perfect for entertaining.', ''),
(7, 'Shang Grand Towers', 'Condominium', 'Ortigas Center', '1500000', 'YES', 'YES', 'YES', '1', '4', 'Intersection Lot', 'Large', 'NO', 'YES', 'YES', 'NO', '83372', 'Indulge in the ultimate entertainment experience with a dedicated movie room. With comfortable seating and state-of-the-art audiovisual equipment, movie nights will never be the same.', ''),
(8, 'Acacia Estates', 'Townhouse', 'Taguig', '1200000', 'NO', 'NO', 'YES', '3', '1', 'End Lot', 'Large', 'NO', 'NO', 'YES', 'NO', '51398', 'Create lasting memories with family and friends in the spacious backyard with a gourmet outdoor kitchen. From BBQs to summer parties, this outdoor space is perfect for entertaining.', ''),
(9, 'Cloverleaf Balintawak', 'Condominium', 'Caloocan', '700000', 'YES', 'YES', 'YES', '3', '3', 'Intersection Lot', 'Large', 'YES', 'YES', 'NO', 'NO', '56874', 'Step into a world of culinary delights with the designer kitchen equipped with top-of-the-line appliances. The spacious layout and thoughtful design make this home an entertainer\'s dream.', ''),
(10, 'Forbestown Residences', 'High-rise condo', 'Bonifacio Global City', '1600000', 'NO', 'NO', 'YES', '1', '4', 'End Lot', 'Small', 'NO', 'NO', 'NO', 'NO', '80176', 'Indulge in the ultimate entertainment experience with a dedicated movie room. With comfortable seating and state-of-the-art audiovisual equipment, movie nights will never be the same.', ''),
(11, 'Emerald Suites', 'Condominium', 'Quezon City', '1200000', 'YES', 'NO', 'YES', '2', '3', 'End Lot', 'Medium', 'NO', 'NO', 'YES', 'NO', '80260', 'Embrace the convenience of smart home technology in this modern abode. With automated features and intuitive controls, you can effortlessly manage your home from anywhere.', ''),
(12, 'The Regent Tower', 'High-rise condo', 'Makati CBD', '1500000', 'YES', 'YES', 'NO', '2', '4', 'End Lot', 'Small', 'YES', 'NO', 'NO', 'NO', '60774', 'Indulge in the ultimate entertainment experience with a dedicated movie room. With comfortable seating and state-of-the-art audiovisual equipment, movie nights will never be the same.', ''),
(13, 'Valley View Villas', 'Villa', 'Taguig', '18000000', 'NO', 'YES', 'YES', '3', '1', 'End Lot', 'Large', 'NO', 'NO', 'YES', 'YES', '63088', 'Unwind in the inviting open floor plan with hardwood floors and abundant natural light. Whether you\'re hosting guests or enjoying a quiet evening in, this home offers the perfect backdrop.', ''),
(14, 'Skyline Heights', 'High-rise condo', 'Bonifacio Global City', '2000000', 'NO', 'NO', 'NO', '4', '2', 'Interior Lot', 'Medium', 'NO', 'NO', 'YES', 'NO', '83119', 'Indulge in the ultimate entertainment experience with a dedicated movie room. With comfortable seating and state-of-the-art audiovisual equipment, movie nights will never be the same.', ''),
(15, 'Blue Horizon Condos', 'Low-rise condo', 'Mandaluyong', '800000', 'YES', 'YES', 'YES', '4', '1', 'End Lot', 'Small', 'YES', 'NO', 'NO', 'NO', '76332', 'Step into a world of culinary delights with the designer kitchen equipped with top-of-the-line appliances. The spacious layout and thoughtful design make this home an entertainer\'s dream.', ''),
(16, 'Greenfield Executive Village', 'Townhouse', 'Pasig', '2500000', 'NO', 'NO', 'YES', '2', '1', 'End Lot', 'Medium', 'YES', 'YES', 'NO', 'NO', '82305', 'Experience resort-style living in the comfort of your own home. From the pool and spa to the lush landscaping, every detail has been carefully crafted to create a luxurious oasis.', ''),
(17, 'The Peak Towers', 'Studio Apartment', 'Ortigas Center', '900000', 'YES', 'YES', 'YES', '2', '1', 'Through Lot', 'Medium', 'YES', 'YES', 'NO', 'YES', '82530', 'Immerse yourself in sustainable living with eco-friendly features in this modern residence. Designed for both style and functionality, this home provides a harmonious balance between nature and urban living.', ''),
(18, 'Capitol Commons', 'Mid-rise condo', 'Marikina', '1100000', 'NO', 'NO', 'YES', '1', '1', 'End Lot', 'Large', 'YES', 'YES', 'YES', 'YES', '65732', 'Embrace the convenience of smart home technology in this modern abode. With automated features and intuitive controls, you can effortlessly manage your home from anywhere.', ''),
(19, 'South Forbes Golf City', 'Single-family home', 'Sta. Rosa Laguna', '2100000', 'YES', 'YES', 'NO', '4', '2', 'Corner Lot', 'Large', 'YES', 'YES', 'YES', 'NO', '81074', 'Enjoy breathtaking panoramic views of the city skyline from this stunning property. With elegant and timeless architecture, this home offers a perfect blend of luxury and sophistication.', ''),
(20, 'The Fort Residences', 'High-rise condo', 'Taguig', '2200000', 'YES', 'NO', 'YES', '4', '4', 'Interior Lot', 'Extended', 'NO', 'NO', 'NO', 'NO', '58172', 'Escape to your own private retreat surrounded by nature. With serene views and ample outdoor space, this property offers the perfect sanctuary for relaxation and rejuvenation.', ''),
(21, 'Eagle\'s Nest', 'Apartment', 'Makati CBD', '1500000', 'YES', 'NO', 'YES', '3', '4', 'Through Lot', 'Medium', 'YES', 'NO', 'NO', 'NO', '97641', 'Indulge in the ultimate entertainment experience with a dedicated movie room. With comfortable seating and state-of-the-art audiovisual equipment, movie nights will never be the same.', ''),
(22, 'Emerald Woods', 'High-rise condo', 'Taguig', '2000000', 'NO', 'YES', 'NO', '1', '2', 'Interior Lot', 'Medium', 'YES', 'NO', 'YES', 'NO', '63687', 'Enjoy breathtaking panoramic views of the city skyline from this stunning property. With elegant and timeless architecture, this home offers a perfect blend of luxury and sophistication.', ''),
(23, 'Brighton Way', 'Townhouse', 'Pasig', '1800000', 'YES', 'NO', 'YES', '1', '2', 'End Lot', 'Medium', 'NO', 'YES', 'NO', 'YES', '75515', 'Create lasting memories with family and friends in the spacious backyard with a gourmet outdoor kitchen. From BBQs to summer parties, this outdoor space is perfect for entertaining.', ''),
(24, 'Whispering Winds', 'Apartment', 'Quezon City', '1200000', 'NO', 'YES', 'NO', '3', '3', 'Intersection Lot', 'Medium', 'YES', 'YES', 'YES', 'YES', '86513', 'Step into a world of culinary delights with the designer kitchen equipped with top-of-the-line appliances. The spacious layout and thoughtful design make this home an entertainer\'s dream.', ''),
(25, 'Seascape Retreat', 'High-rise condo', 'Pasay', '2200000', 'YES', 'NO', 'YES', '2', '4', 'Intersection Lot', 'Medium', 'YES', 'YES', 'NO', 'NO', '56021', 'Escape to your own private retreat surrounded by nature. With serene views and ample outdoor space, this property offers the perfect sanctuary for relaxation and rejuvenation.', ''),
(26, 'Willowbrook Lane', 'Townhouse', 'Muntinlupa', '1600000', 'NO', 'YES', 'NO', '3', '4', 'Corner Lot', 'Medium', 'YES', 'YES', 'NO', 'YES', '70568', 'Embrace the convenience of smart home technology in this modern abode. With automated features and intuitive controls, you can effortlessly manage your home from anywhere.', ''),
(27, 'Maple Grove', 'Apartment', 'Mandaluyong', '1400000', 'YES', 'NO', 'YES', '1', '3', 'End Lot', 'Large', 'YES', 'YES', 'NO', 'NO', '84776', 'Immerse yourself in sustainable living with eco-friendly features in this modern residence. Designed for both style and functionality, this home provides a harmonious balance between nature and urban living.', ''),
(28, 'Sunnyvale Manor', 'High-rise condo', 'Makati CBD', '2500000', 'NO', 'YES', 'NO', '2', '2', 'Intersection Lot', 'Small', 'NO', 'NO', 'YES', 'NO', '62178', 'Embrace the convenience of smart home technology in this modern abode. With automated features and intuitive controls, you can effortlessly manage your home from anywhere.', ''),
(29, 'Elm Tree Hollow', 'Townhouse', 'Pasig', '1900000', 'YES', 'NO', 'YES', '4', '2', 'Intersection Lot', 'Large', 'NO', 'NO', 'YES', 'NO', '56561', 'Step into a world of culinary delights with the designer kitchen equipped with top-of-the-line appliances. The spacious layout and thoughtful design make this home an entertainer\'s dream.', ''),
(30, 'Atlantic Point', 'High-rise condo', 'Taguig', '3000000', 'NO', 'YES', 'NO', '2', '1', 'Corner Lot', 'Medium', 'YES', 'NO', 'YES', 'YES', '96274', 'Create lasting memories with family and friends in the spacious backyard with a gourmet outdoor kitchen. From BBQs to summer parties, this outdoor space is perfect for entertaining.', ''),
(31, 'Cherry Blossom Mews', 'Apartment', 'Quezon City', '1300000', 'YES', 'NO', 'YES', '4', '4', 'End Lot', 'Medium', 'NO', 'NO', 'YES', 'YES', '61685', 'Experience resort-style living in the comfort of your own home. From the pool and spa to the lush landscaping, every detail has been carefully crafted to create a luxurious oasis.', ''),
(32, 'Country Haven', 'Townhouse', 'Pasay', '1700000', 'NO', 'YES', 'NO', '2', '4', 'Corner Lot', 'Large', 'YES', 'NO', 'YES', 'YES', '69602', 'Immerse yourself in sustainable living with eco-friendly features in this modern residence. Designed for both style and functionality, this home provides a harmonious balance between nature and urban living.', ''),
(33, 'Breakwater Heights', 'High-rise condo', 'Makati CBD', '2300000', 'YES', 'NO', 'YES', '2', '4', 'Interior Lot', 'Large', 'NO', 'NO', 'NO', 'NO', '62958', 'Embrace the convenience of smart home technology in this modern abode. With automated features and intuitive controls, you can effortlessly manage your home from anywhere.', ''),
(34, 'Poplar Path', 'Apartment', 'Mandaluyong', '2100000', 'NO', 'YES', 'YES', '2', '3', 'End Lot', 'Medium', 'YES', 'YES', 'YES', 'YES', '55985', 'Experience resort-style living in the comfort of your own home. From the pool and spa to the lush landscaping, every detail has been carefully crafted to create a luxurious oasis.', ''),
(35, 'Summit Ridge', 'Apartment', 'Mandaluyong', '2600000', 'YES', 'NO', 'YES', '2', '4', 'End Lot', 'Small', 'YES', 'NO', 'YES', 'NO', '91052', 'Embrace the convenience of smart home technology in this modern abode. With automated features and intuitive controls, you can effortlessly manage your home from anywhere.', ''),
(36, 'Oceanic Drive', 'High-rise condo', 'Taguig', '3200000', 'NO', 'YES', 'NO', '4', '3', 'Interior Lot', 'Small', 'NO', 'NO', 'YES', 'YES', '87306', 'Experience resort-style living in the comfort of your own home. From the pool and spa to the lush landscaping, every detail has been carefully crafted to create a luxurious oasis.', ''),
(37, 'Brookside Walk', 'Apartment', 'Quezon City', '1600000', 'YES', 'NO', 'YES', '1', '4', 'Intersection Lot', 'Extended', 'YES', 'NO', 'NO', 'YES', '63374', 'Immerse yourself in sustainable living with eco-friendly features in this modern residence. Designed for both style and functionality, this home provides a harmonious balance between nature and urban living.', ''),
(38, 'Sequoia Park', 'Townhouse', 'Pasay', '2400000', 'NO', 'YES', 'NO', '3', '4', 'Corner Lot', 'Small', 'NO', 'YES', 'NO', 'YES', '54953', 'Immerse yourself in sustainable living with eco-friendly features in this modern residence. Designed for both style and functionality, this home provides a harmonious balance between nature and urban living.', ''),
(39, 'Riviera Residences', 'High-rise condo', 'Makati CBD', '2700000', 'YES', 'NO', 'YES', '1', '3', 'Corner Lot', 'Medium', 'YES', 'YES', 'NO', 'NO', '84642', 'Embrace the convenience of smart home technology in this modern abode. With automated features and intuitive controls, you can effortlessly manage your home from anywhere.', ''),
(40, 'Birchwood Chase', 'Apartment', 'Mandaluyong', '2500000', 'NO', 'YES', 'NO', '3', '1', 'Interior Lot', 'Extended', 'NO', 'NO', 'NO', 'NO', '58354', 'Embrace the convenience of smart home technology in this modern abode. With automated features and intuitive controls, you can effortlessly manage your home from anywhere.', ''),
(41, 'Peakview Manors', 'Townhouse', 'Pasig', '3000000', 'YES', 'NO', 'YES', '2', '1', 'Corner Lot', 'Medium', 'YES', 'NO', 'YES', 'NO', '87844', 'Experience resort-style living in the comfort of your own home. From the pool and spa to the lush landscaping, every detail has been carefully crafted to create a luxurious oasis.', ''),
(42, 'Coral Reef Cove', 'High-rise condo', 'Taguig', '2800000', 'NO', 'YES', 'NO', '1', '2', 'Interior Lot', 'Large', 'YES', 'NO', 'NO', 'NO', '64159', 'Wake up to breathtaking views from the private balcony overlooking lush gardens. Whether enjoying your morning coffee or watching the sunset, this tranquil space offers a peaceful retreat.', ''),
(43, 'Garden Grove', 'Apartment', 'Quezon City', '1800000', 'YES', 'NO', 'YES', '3', '2', 'End Lot', 'Large', 'NO', 'NO', 'YES', 'YES', '57265', 'Experience resort-style living in the comfort of your own home. From the pool and spa to the lush landscaping, every detail has been carefully crafted to create a luxurious oasis.', ''),
(44, 'Hillcrest Village', 'Townhouse', 'Pasay', '2200000', 'NO', 'YES', 'NO', '3', '3', 'Corner Lot', 'Medium', 'YES', 'YES', 'YES', 'YES', '93846', 'Relax and unwind in front of the cozy fireplace on chilly evenings. With its warm ambiance and inviting atmosphere, this feature adds a touch of comfort to any home.', ''),
(45, 'Blue Ocean Shores', 'High-rise condo', 'Makati CBD', '2900000', 'YES', 'NO', 'YES', '4', '3', 'Intersection Lot', 'Medium', 'YES', 'NO', 'NO', 'NO', '97435', 'Escape to your own private retreat surrounded by nature. With serene views and ample outdoor space, this property offers the perfect sanctuary for relaxation and rejuvenation.', ''),
(46, 'Maplewood Farms', 'Apartment', 'Mandaluyong', '2600000', 'NO', 'YES', 'NO', '2', '1', 'Intersection Lot', 'Large', 'YES', 'YES', 'YES', 'YES', '55638', 'Escape to your own private retreat surrounded by nature. With serene views and ample outdoor space, this property offers the perfect sanctuary for relaxation and rejuvenation.', ''),
(47, 'Aspen Highlands', 'Townhouse', 'Pasig', '3100000', 'YES', 'NO', 'YES', '2', '4', 'Corner Lot', 'Large', 'YES', 'NO', 'NO', 'NO', '85886', 'Step into a world of culinary delights with the designer kitchen equipped with top-of-the-line appliances. The spacious layout and thoughtful design make this home an entertainer\'s dream.', ''),
(48, 'Coastal Living', 'High-rise condo', 'Taguig', '3300000', 'NO', 'YES', 'NO', '4', '4', 'Intersection Lot', 'Medium', 'YES', 'YES', 'NO', 'NO', '62518', 'Relax and unwind in front of the cozy fireplace on chilly evenings. With its warm ambiance and inviting atmosphere, this feature adds a touch of comfort to any home.', ''),
(49, 'Rosebud Row', 'Apartment', 'Quezon City', '2000000', 'YES', 'NO', 'YES', '1', '4', 'End Lot', 'Large', 'NO', 'YES', 'YES', 'YES', '54933', 'Unwind in the inviting open floor plan with hardwood floors and abundant natural light. Whether you\'re hosting guests or enjoying a quiet evening in, this home offers the perfect backdrop.', ''),
(50, 'Sandy Shores', 'Townhouse', 'Pasay', '2700000', 'NO', 'YES', 'NO', '2', '2', 'End Lot', 'Small', 'NO', 'YES', 'NO', 'YES', '87109', 'Embrace the convenience of smart home technology in this modern abode. With automated features and intuitive controls, you can effortlessly manage your home from anywhere.', '');

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
  `numberofbedroom` varchar(255) NOT NULL,
  `numberofbathroom` varchar(255) NOT NULL,
  `typeoflot` varchar(255) NOT NULL,
  `familysize` varchar(255) NOT NULL,
  `nearelementary` varchar(255) NOT NULL,
  `nearhighschool` varchar(255) NOT NULL,
  `nearcollege` varchar(255) NOT NULL,
  `plantodobusiness` varchar(255) NOT NULL,
  `monthly` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `imgsrc` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `userpreferencestable`
--

INSERT INTO `userpreferencestable` (`id`, `user_id`, `type`, `location`, `price`, `isnearschool`, `isnearchurch`, `isnearmall`, `numberofbedroom`, `numberofbathroom`, `typeoflot`, `familysize`, `nearelementary`, `nearhighschool`, `nearcollege`, `plantodobusiness`, `monthly`, `description`, `imgsrc`) VALUES
(1, '1', 'Apartment', 'Makati CBD', '800000', 'YES', 'YES', 'NO', '1', '1', 'End Lot', 'Small', '', '', '', '', '', '', '');

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
-- Indexes for table `propertiestable`
--
ALTER TABLE `propertiestable`
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
-- AUTO_INCREMENT for table `propertiestable`
--
ALTER TABLE `propertiestable`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

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
