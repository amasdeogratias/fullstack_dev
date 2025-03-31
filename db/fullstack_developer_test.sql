-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 31, 2025 at 09:44 PM
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
-- Database: `fullstack_developer_test`
--

-- --------------------------------------------------------

--
-- Table structure for table `models`
--

CREATE TABLE `models` (
  `id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `properties`
--

CREATE TABLE `properties` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `type` enum('Residential','Commercial') NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `properties`
--

INSERT INTO `properties` (`id`, `name`, `type`, `address`, `createdAt`, `updatedAt`) VALUES
(1, 'shopper plaza', 'Residential', 'Mikocheni', '2025-03-31 12:18:43', '2025-03-31 12:18:43'),
(2, 'jmall1 block', 'Commercial', 'Mbezi beach', '2025-03-31 13:00:46', '2025-03-31 13:00:46'),
(3, 'power house', 'Residential', 'Makumbusho', '2025-03-31 17:44:30', '2025-03-31 17:44:30'),
(4, 'mwenge complex', 'Commercial', 'Mwenge', '2025-03-31 19:25:12', '2025-03-31 19:25:12'),
(5, 'nssf building', 'Commercial', 'Ubungo', '2025-03-31 19:25:55', '2025-03-31 19:25:55'),
(6, 'nhc building', 'Residential', 'Kawe', '2025-03-31 19:26:24', '2025-03-31 19:26:24');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `createdAt`, `updatedAt`) VALUES
(1, 'Deo Amasi', 'admin@gmail.com', '$2b$10$nzjhhFqfKUFvJsaxaCKEb./RUtfQqCBjOhgpJl3wCA15MVOyqnMcq', '2025-03-29 16:17:30', '2025-03-29 16:17:30'),
(2, 'Oswald gerald', 'oswald@gmail.com', '$2b$10$0Dn1Ts5AjRIIKIXLS0WsqOCSJGT5YHTZOLzuaLsJWV0u0BU0xBUVG', '2025-03-30 19:14:22', '2025-03-30 19:14:22'),
(3, 'Abubakar Ismail', 'abuuawesome@gmail.com', '$2b$10$PMuhMjIzuiLY6Wlq2qOEOuHUKX8RLdyNHu4ZyESfhKywjhmjrPJtC', '2025-03-31 19:06:52', '2025-03-31 19:06:52');

-- --------------------------------------------------------

--
-- Table structure for table `utility_bills`
--

CREATE TABLE `utility_bills` (
  `id` int(11) NOT NULL,
  `type` varchar(255) NOT NULL,
  `amount` float NOT NULL,
  `date` datetime NOT NULL,
  `property_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `utility_bills`
--

INSERT INTO `utility_bills` (`id`, `type`, `amount`, `date`, `property_id`, `createdAt`, `updatedAt`) VALUES
(1, 'Gas', 3000, '2024-03-31 00:00:00', 1, '2025-03-31 13:32:31', '2025-03-31 13:32:31'),
(2, 'electricity', 10000, '2025-03-31 00:00:00', 2, '2025-03-31 17:17:41', '2025-03-31 17:17:41'),
(3, 'water', 7000, '2025-03-31 00:00:00', 2, '2025-03-31 17:18:05', '2025-03-31 17:18:05'),
(4, 'electricity', 2000, '2025-03-30 00:00:00', 6, '2025-03-31 19:39:45', '2025-03-31 19:39:45'),
(5, 'water', 5000, '2025-03-31 00:00:00', 6, '2025-03-31 19:40:02', '2025-03-31 19:40:02'),
(6, 'gas', 10000, '2025-04-01 00:00:00', 6, '2025-03-31 19:40:22', '2025-03-31 19:40:22'),
(7, 'electricity', 10000, '2025-04-01 00:00:00', 1, '2025-03-31 19:41:03', '2025-03-31 19:41:03'),
(8, 'water', 1000, '2025-03-31 00:00:00', 1, '2025-03-31 19:41:27', '2025-03-31 19:41:27'),
(9, 'electricity', 6000, '2025-04-01 00:00:00', 4, '2025-03-31 19:42:20', '2025-03-31 19:42:20'),
(10, 'water', 4000, '2025-04-01 00:00:00', 4, '2025-03-31 19:42:36', '2025-03-31 19:42:36'),
(11, 'gas', 3000, '2025-04-01 00:00:00', 4, '2025-03-31 19:43:07', '2025-03-31 19:43:07'),
(12, 'electricity', 10000, '2025-04-01 00:00:00', 3, '2025-03-31 19:43:33', '2025-03-31 19:43:33'),
(13, 'water', 20000, '2025-04-01 00:00:00', 3, '2025-03-31 19:43:55', '2025-03-31 19:43:55'),
(14, 'gas', 30000, '2025-04-01 00:00:00', 3, '2025-03-31 19:44:17', '2025-03-31 19:44:17');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `models`
--
ALTER TABLE `models`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `properties`
--
ALTER TABLE `properties`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `utility_bills`
--
ALTER TABLE `utility_bills`
  ADD PRIMARY KEY (`id`),
  ADD KEY `property_id` (`property_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `models`
--
ALTER TABLE `models`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `properties`
--
ALTER TABLE `properties`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `utility_bills`
--
ALTER TABLE `utility_bills`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `utility_bills`
--
ALTER TABLE `utility_bills`
  ADD CONSTRAINT `utility_bills_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
