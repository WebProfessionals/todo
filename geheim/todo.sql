/*
 Navicat MySQL Data Transfer

 Source Server         : Localhost
 Source Server Version : 50505
 Source Host           : localhost
 Source Database       : todo

 Target Server Version : 50505
 File Encoding         : utf-8

 Date: 03/19/2016 11:19:40 AM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `projekt`
-- ----------------------------
DROP TABLE IF EXISTS `projekt`;
CREATE TABLE `projekt` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `label` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `projekt`
-- ----------------------------
BEGIN;
INSERT INTO `projekt` VALUES ('1', 'Banane');
COMMIT;

-- ----------------------------
--  Table structure for `task`
-- ----------------------------
DROP TABLE IF EXISTS `task`;
CREATE TABLE `task` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `label` varchar(100) NOT NULL,
  `checked` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `projekt_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `projekt_idx` (`projekt_id`),
  CONSTRAINT `projekt` FOREIGN KEY (`projekt_id`) REFERENCES `projekt` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `task`
-- ----------------------------
BEGIN;
INSERT INTO `task` VALUES ('4', 'Kaufen', '0', '1');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
