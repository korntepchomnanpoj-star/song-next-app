SET FOREIGN_KEY_CHECKS = 0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

-- ล้างตารางเดิมออกก่อนเพื่อป้องกัน Table already exists
DROP TABLE IF EXISTS `reviews`;
DROP TABLE IF EXISTS `games`;
DROP TABLE IF EXISTS `users`;
DROP TABLE IF EXISTS `platforms`;
DROP TABLE IF EXISTS `categories`;
DROP TABLE IF EXISTS `admins`;

-- --------------------------------------------------------
-- ตาราง `admins`
-- --------------------------------------------------------
CREATE TABLE `admins` (
  `admin_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`admin_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `admins` (`admin_id`, `username`, `password`) VALUES
(1, 'admin', 'admin123');

-- --------------------------------------------------------
-- ตาราง `categories`
-- --------------------------------------------------------
CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(50) NOT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `categories` (`category_id`, `category_name`) VALUES
(1, 'Simulation'),
(2, 'Farming'),
(3, 'Building'),
(4, 'Action-Adventure');

-- --------------------------------------------------------
-- ตาราง `platforms`
-- --------------------------------------------------------
CREATE TABLE `platforms` (
  `platform_id` int(11) NOT NULL AUTO_INCREMENT,
  `platform_name` varchar(100) NOT NULL,
  PRIMARY KEY (`platform_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `platforms` (`platform_id`, `platform_name`) VALUES
(1, '["PC"]'),
(2, '["PC", "Switch"]'),
(3, '["PC", "PlayStation", "Xbox"]'),
(4, '["PC", "PlayStation", "Xbox", "Switch"]'),
(5, '["PC", "PlayStation", "Xbox", "Switch", "iOS", "Android"]'),
(6, '["PC","PlayStation","Xbox","Switch","iOS","Android"]'),
(7, '["PC","PlayStation","Xbox"]'),
(8, '["PC","PlayStation","Xbox","Switch"]'),
(9, '["PC","Switch"]'),
(10, '["PC","PlayStation"]'),
(11, '["Switch"]'),
(12, '["PlayStation"]');

-- --------------------------------------------------------
-- ตาราง `users`
-- --------------------------------------------------------
CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `status` varchar(20) DEFAULT 'active',
  `created_at` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `users` (`user_id`, `username`, `email`, `password_hash`, `status`, `created_at`) VALUES
(1, 'xamp', 'myname@gmail.com', 'aZ09aZ09#$', 'active', '2026-10-23 17:43:36');

-- --------------------------------------------------------
-- ตาราง `games`
-- --------------------------------------------------------
CREATE TABLE `games` (
  `game_id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` int(11) DEFAULT NULL,
  `platform_id` int(11) DEFAULT NULL,
  `game_title` varchar(100) NOT NULL,
  `developer` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `download_url` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`game_id`),
  KEY `category_id` (`category_id`),
  KEY `platform_id` (`platform_id`),
  CONSTRAINT `games_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`),
  CONSTRAINT `games_ibfk_2` FOREIGN KEY (`platform_id`) REFERENCES `platforms` (`platform_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `games` (`game_id`, `category_id`, `platform_id`, `game_title`, `developer`, `description`, `download_url`, `image`, `is_active`, `created_at`) VALUES
(1, 1, 9, 'Dinkum', 'James Bendon', 'เกมจำลองการใช้ชีวิตสไตล์เอาชีวิตรอดและพัฒนาชุมชน', 'https://store.steampowered.com/app/1062520/Dinkum/', 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1062520/header.jpg', 1, '2026-10-23 17:42:26'),
(2, 2, 6, 'Stardew Valley', 'ConcernedApe', 'เกมทำฟาร์ม ปลูกผัก เลี้ยงสัตว์ ใช้ชีวิตสโลว์ไลฟ์', 'https://store.steampowered.com/app/413150/Stardew_Valley/', 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/413150/header.jpg', 1, '2026-10-23 17:42:26'),
(3, 3, 6, 'Townscaper', 'Oskar Stålberg', 'เกมสร้างเมืองบนผืนน้ำที่ไร้เป้าหมายและไม่มีบทลงโทษ', 'https://store.steampowered.com/app/1291340/Townscaper/', 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1291340/header.jpg', 1, '2026-10-23 17:42:26'),
(4, 3, 9, 'Dorfromantik', 'Toukana Interactive', 'เกมต่อไพ่หกเหลี่ยมสร้างภูมิประเทศอันเงียบสงบ', 'https://store.steampowered.com/app/1455840/Dorfromantik/', 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1455840/header.jpg', 1, '2026-10-23 17:42:26'),
(5, 2, 8, 'Slime Rancher', 'Monomi Park', 'เกมทำฟาร์มสำรวจโลกมุมมองบุคคลที่หนึ่ง เลี้ยงดูสไลม์', 'https://store.steampowered.com/app/433340/Slime_Rancher/', 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/433340/header.jpg', 1, '2026-10-23 17:42:26'),
(6, 4, 6, 'Terraria', 'Re-Logic', 'เกม Sandbox 2D สไตล์ Action-Adventure', 'https://store.steampowered.com/app/105600/Terraria/', 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/105600/header.jpg', 1, '2026-10-23 17:42:26'),
(7, 1, 1, 'Insaniquarium Deluxe', 'PopCap Games, Inc.', 'เกมเลี้ยงปลาสุดคลาสสิก ให้อาหาร เก็บเหรียญ', 'https://store.steampowered.com/app/3320/Insaniquarium_Deluxe/', 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3320/header.jpg', 1, '2026-10-23 17:42:26'),
(8, 4, 8, 'Minecraft Dungeons', 'Mojang Studios', 'เกมตะลุยดันเจี้ยนในโลก Minecraft ผจญภัยไปกับเพื่อน', 'https://store.steampowered.com/app/1672970/Minecraft_Dungeons/', 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1672970/header.jpg', 1, '2026-10-23 17:42:26'),
(9, 4, 8, 'Subnautica', 'Unknown Worlds Entertainment', 'เกมผจญภัยเอาชีวิตรอดใต้ท้องทะเลลึกในต่างดาว', 'https://store.steampowered.com/app/264710/Subnautica/', 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/264710/header.jpg', 1, '2026-10-23 17:42:26'),
(10, 1, 7, 'Jurassic World Evolution 2', 'Frontier Developments', 'เกมจำลองการสร้างและบริหารสวนสนุกไดโนเสาร์ระดับโลก', 'https://store.steampowered.com/app/1244460/Jurassic_World_Evolution_2/', 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1244460/header.jpg', 1, '2026-10-23 17:42:26');

-- --------------------------------------------------------
-- ตาราง `reviews`
-- --------------------------------------------------------
CREATE TABLE `reviews` (
  `review_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `game_id` int(11) NOT NULL,
  `rating_score` int(11) NOT NULL CHECK (`rating_score` >= 1 and `rating_score` <= 5),
  `comment_text` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`review_id`),
  KEY `user_id` (`user_id`),
  KEY `game_id` (`game_id`),
  CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`game_id`) REFERENCES `games` (`game_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `reviews` (`review_id`, `user_id`, `game_id`, `rating_score`, `comment_text`, `created_at`) VALUES
(1001, 1, 2, 5, 'เกมดูดเวลาอันดับหนึ่ง ปลูกผักสร้างฟาร์มเพลินมาก', '2026-10-07 19:45:00'),
(1002, 1, 1, 5, 'บรรยากาศดี ฟังสบาย ผ่อนคลายมาก จับจระเข้ ตกปลา ขุดเหมือง', '2026-10-07 20:00:00'),
(1003, 1, 3, 5, 'เล่นตอนเครียดๆ ฟังเสียงวางบล็อกน้ำสบายใจมาก', '2026-10-08 10:15:00'),
(1004, 1, 5, 5, 'สไลม์น่ารักทุกตัว กราฟิกสีสันสดใสถูกใจ', '2026-10-08 11:20:00'),
(1005, 1, 6, 5, 'เกม 2D ที่คอนเทนต์แน่นที่สุด ขุดเหมืองตีบอสกับเพื่อนสนุกมาก', '2026-10-08 14:00:00'),
(1006, 1, 4, 4, 'ต่อกระเบื้องสร้างป่าเพลินๆ ฝึกสมองแบบไม่กดดัน', '2026-10-09 09:30:00'),
(1007, 1, 9, 5, 'ภาพใต้ทะเลสวยงามอลังการ สำรวจโลกใต้น้ำได้ลึกซึ้ง', '2026-10-09 15:45:00'),
(1008, 1, 8, 4, 'เล่นตะลุยด่านกับเพื่อนสนุก เพลินตามสไตล์ Minecraft', '2026-10-10 18:00:00'),
(1009, 1, 10, 4, 'บริหารสวนไดโนเสาร์ภาพสวยสมจริงมาก ชอบธีมจูราสสิค', '2026-10-11 21:10:00'),
(1010, 1, 7, 5, 'เกมเลี้ยงปลาในตำนาน สนุกไม่เคยเปลี่ยน เล่นฆ่าเวลาดีมาก', '2026-10-12 16:30:00');

-- --------------------------------------------------------
-- คืนค่าการตั้งค่าเดิม
-- --------------------------------------------------------
ALTER TABLE `admins` AUTO_INCREMENT = 3;
ALTER TABLE `categories` AUTO_INCREMENT = 5;
ALTER TABLE `games` AUTO_INCREMENT = 11;
ALTER TABLE `platforms` AUTO_INCREMENT = 13;
ALTER TABLE `reviews` AUTO_INCREMENT = 1011;
ALTER TABLE `users` AUTO_INCREMENT = 2;

SET FOREIGN_KEY_CHECKS = 1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;