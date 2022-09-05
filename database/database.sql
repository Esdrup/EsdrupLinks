CREATE TABLE `user` (
  `idUser` int NOT NULL AUTO_INCREMENT,
  `nameUser` varchar(100) NOT NULL,
  `passwordUser` varchar(100) NOT NULL,
  `fullnameUser` varchar(150) DEFAULT NULL,
  `emailUser` varchar(100) NOT NULL,
  `newpasswordUser` varchar(100) DEFAULT NULL,
  `linksUser` int NOT NULL,
  PRIMARY KEY (`idUser`)
);

CREATE TABLE `link` (
  `idLink` int NOT NULL AUTO_INCREMENT,
  `titleLink` varchar(45) NOT NULL,
  `urlLink` varchar(100) DEFAULT NULL,
  `descriptionLink` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `USER_IDUSER` int NOT NULL,
  PRIMARY KEY (`idLink`),
  KEY `fk_Link_User_idx` (`USER_IDUSER`),
  CONSTRAINT `fk_Link_User` FOREIGN KEY (`USER_IDUSER`) REFERENCES `user` (`idUser`)
);