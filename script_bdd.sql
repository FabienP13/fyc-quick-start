-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mer. 07 fév. 2024 à 13:48
-- Version du serveur : 8.0.31
-- Version de PHP : 8.2.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `fyc_api`
--

-- --------------------------------------------------------

--
-- Structure de la table `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Déchargement des données de la table `roles`
--

INSERT INTO `roles` (`id`, `name`, `created_at`, `updated_at`) VALUES
(2, 'Maj name role', '2023-11-25 13:53:51', '2023-12-01 15:15:30'),
(4, 'ffff', '2023-11-27 10:35:55', NULL),
(5, 'Maj du name role', '2023-11-27 10:37:37', '2024-02-07 13:54:18'),
(6, 'ffff', '2023-11-27 10:38:04', NULL),
(7, 'ffff', '2023-11-27 10:38:54', NULL),
(8, 'fffeeffff', '2023-11-27 10:48:19', NULL),
(9, 'fffeeffff', '2023-11-27 10:48:24', NULL),
(10, 'fffeeffff', '2023-11-27 10:48:26', NULL),
(11, 'fffeeffff', '2023-11-27 10:50:03', NULL),
(14, 'fffeefffff', '2023-11-27 10:56:36', NULL),
(15, 'fffeeffffgfgf', '2023-11-27 10:59:21', NULL),
(16, 'fffeeffffgfgf', '2023-11-27 10:59:22', NULL),
(17, 'fffeeffffgfgf', '2023-11-27 10:59:24', NULL),
(18, 'fffeeffffgfgf', '2023-11-27 11:00:05', NULL),
(19, 'fffeeffffgfgf', '2023-11-27 11:00:06', NULL),
(20, 'fffeeffffgfgf', '2023-11-27 11:00:06', NULL),
(21, 'fffeeffffgfgf', '2023-11-27 11:00:37', NULL),
(22, 'fffeeffffgfgf', '2023-11-27 11:01:38', NULL),
(23, 'fffeeffffgfgf', '2023-11-27 11:01:59', NULL),
(24, 'fffeeffffgfgf', '2023-11-27 11:02:15', NULL),
(25, 'fffeeffffgfgf', '2023-11-27 11:02:16', NULL),
(26, 'fffeeffzffgfgf', '2023-11-27 11:02:23', NULL),
(27, 'fffeeffzfffgfgf', '2023-11-27 11:06:30', NULL),
(28, 'dsdf', '2023-11-27 17:09:01', NULL),
(29, 'ddsdf', '2023-11-28 20:12:28', NULL),
(30, 'zadzadazd', '2023-11-28 20:12:48', NULL),
(31, 'Test create', '2023-12-01 14:50:30', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `share_prices`
--

DROP TABLE IF EXISTS `share_prices`;
CREATE TABLE IF NOT EXISTS `share_prices` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `value` decimal(10,2) NOT NULL,
  `volume` decimal(10,2) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Déchargement des données de la table `share_prices`
--

INSERT INTO `share_prices` (`id`, `name`, `value`, `volume`, `created_at`, `updated_at`) VALUES
(2, 'Maj action', '505.00', '5.34', '2023-11-26 13:23:36', '2024-02-07 14:00:45'),
(3, 'Test création sharePrice Fab', '23.99', '45.34', '2024-02-07 14:00:29', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
CREATE TABLE IF NOT EXISTS `transactions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `volume` decimal(10,2) NOT NULL,
  `type_transaction` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `transacted_at` datetime NOT NULL,
  `user_id` int DEFAULT NULL,
  `share_price_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`user_id`),
  KEY `sharePriceId` (`share_price_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Déchargement des données de la table `transactions`
--

INSERT INTO `transactions` (`id`, `volume`, `type_transaction`, `transacted_at`, `user_id`, `share_price_id`) VALUES
(3, '33.00', 'Test', '2023-11-26 13:30:58', 3, 2),
(4, '21.00', 'Test création typeTransaction v2', '2024-02-07 14:02:29', 3, 2);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `last_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `account` decimal(10,2) NOT NULL,
  `is_cdu` tinyint(1) NOT NULL,
  `cdu_accepted_at` datetime DEFAULT NULL,
  `register_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `role_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `roleId` (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `account`, `is_cdu`, `cdu_accepted_at`, `register_at`, `updated_at`, `role_id`) VALUES
(3, 'Basile', 'Regnault', 'basile.regnault.com', '$2a$08$mtuCzycHxfo/xlnWpWFWOeCnJ1dzUwSOOagn0KGQegBdKcoc0SWnG', '3000.00', 0, NULL, '2023-11-25 16:16:32', '2024-02-07 13:58:51', 2),
(5, 'Lewis', 'Poncet', 'fponcet@gmail.com', 'password', '111.00', 0, NULL, '2023-11-29 19:27:30', '2024-02-07 13:56:35', 4),
(8, 'Bilal', 'Bouterbiat', 'bbouterbiat@gmail.com', 'password', '19.00', 0, NULL, '2023-11-30 22:45:23', NULL, 2),
(11, 'Walid', 'Hallouli', 'whallouli@gmail.com', 'password', '1000.00', 0, NULL, '2024-02-07 13:52:58', NULL, 2);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `transactions_ibfk_2` FOREIGN KEY (`share_price_id`) REFERENCES `share_prices` (`id`);

--
-- Contraintes pour la table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
