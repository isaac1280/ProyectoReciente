CREATE DATABASE  IF NOT EXISTS `proyecto_lunes_noche` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `proyecto_lunes_noche`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: proyecto_lunes_noche
-- ------------------------------------------------------
-- Server version	5.5.5-10.1.26-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categoria`
--

DROP TABLE IF EXISTS `categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categoria` (
  `idcategoria` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idcategoria`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
INSERT INTO `categoria` VALUES (1,'Tarjetas Madre'),(2,'Tarjetas de Video'),(3,'Procesadores'),(4,'Memoria Ram'),(5,'Teclados');
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedidos`
--

DROP TABLE IF EXISTS `pedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pedidos` (
  `idPedidos` int(11) NOT NULL AUTO_INCREMENT,
  `fecha` varchar(1000) DEFAULT NULL,
  `idUsuarios` int(11) NOT NULL,
  `total` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idPedidos`),
  KEY `fk_Ordenes de Compra_Usuarios1_idx` (`idUsuarios`),
  CONSTRAINT `fk_Ordenes de Compra_Usuarios1` FOREIGN KEY (`idUsuarios`) REFERENCES `usuarios` (`idUsuarios`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidos`
--

LOCK TABLES `pedidos` WRITE;
/*!40000 ALTER TABLE `pedidos` DISABLE KEYS */;
INSERT INTO `pedidos` VALUES (1,'Sun Apr 15 2018 16:11:45 GMT-0600 (Hora estándar, América Central)',1,'13000'),(2,'Sun Apr 15 2018 16:12:35 GMT-0600 (Hora estándar, América Central)',2,'16500');
/*!40000 ALTER TABLE `pedidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedidos_has_productos`
--

DROP TABLE IF EXISTS `pedidos_has_productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pedidos_has_productos` (
  `idpedidos_has_productos` int(11) NOT NULL AUTO_INCREMENT,
  `idproductos` varchar(45) DEFAULT NULL,
  `idpedidos` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idpedidos_has_productos`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidos_has_productos`
--

LOCK TABLES `pedidos_has_productos` WRITE;
/*!40000 ALTER TABLE `pedidos_has_productos` DISABLE KEYS */;
INSERT INTO `pedidos_has_productos` VALUES (1,'6','7'),(2,'5','7'),(3,'4','7'),(4,'15','8'),(5,'6','8'),(6,'5','1'),(7,'4','1'),(8,'8','2'),(9,'15','2');
/*!40000 ALTER TABLE `pedidos_has_productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `productos` (
  `idproductos` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `descripcion` varchar(500) DEFAULT NULL,
  `modelo` varchar(100) DEFAULT NULL,
  `idCategoria` int(11) DEFAULT NULL,
  `precio` varchar(50) DEFAULT NULL,
  `caracteristicas` varchar(500) DEFAULT NULL,
  `precioOferta` varchar(45) DEFAULT NULL,
  `fechaIngreso` varchar(45) DEFAULT NULL,
  `fechaInicioOferta` varchar(45) DEFAULT NULL,
  `fechaFinOferta` varchar(45) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `imagen` varchar(100) DEFAULT NULL,
  `marca` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idproductos`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (4,'Blusas','En las prendas para dama se habla de calidad y comodidad para que te sientas bien con lo que traes puesto al mismo tiempo que lo proyectas y resaltas la belleza admirable que te distingue con una bonita blusa de trabajo como la que a continuación se muestra.','Arsenal Gaming',1,'5000','Supports 7th/6th Gen Intel Core/Pentium/Celeron processors for LGA 1151 socket;','25000',NULL,'2018-04-07','2018-04-14',12,'msi_2.jpg','MSI '),(5,'Gabacha','En las prendas para dama se habla de calidad y comodidad para que te sientas bien con lo que traes puesto al mismo tiempo que lo proyectas y resaltas la belleza admirable que te distingue con una bonita blusa de trabajo como la que a continuación se muestra.','GA-H110M-A ',1,'8000','LGA1151, Supports 7th/ 6th Generation Intel Core Processors',NULL,NULL,NULL,NULL,45,'gigabyte_2.jpg','GIGABYTE '),(6,'Paños','En las prendas para dama se habla de calidad y comodidad para que te sientas bien con lo que traes puesto al mismo tiempo que lo proyectas y resaltas la belleza admirable que te distingue con una bonita blusa de trabajo como la que a continuación se muestra.','MSI Computer Video Graphic Cards GeForce GTX 1050 TI GAMING X 4G',1,'6000','100% algodón natural;Video Memory: 4GB GDDR5;Memory Interface: 128-bit;Max. Resolution: 2560 x 1600, Support 3x Display Monitors',NULL,NULL,NULL,NULL,10,'p1.jpg','MSI'),(8,'Manteles','En las prendas para dama se habla de calidad y comodidad para que te sientas bien con lo que traes puesto al mismo tiempo que lo proyectas y resaltas la belleza admirable que te distingue con una bonita blusa de trabajo como la que a continuación se muestra.','Radeon HD 5450 1 GB DDR3',1,'14000','Interfaz de bus PCI-Express 2.1 x16;Memoria DDR3;Compatibilidad con Microsoft DirectX 11;Soporte de Microsoft Windows 7',NULL,NULL,NULL,NULL,15,'p3.jpg','AMD'),(15,'Gorras','En las prendas para dama se habla de calidad y comodidad para que te sientas bien con lo que traes puesto al mismo tiempo que lo proyectas y resaltas la belleza admirable que te distingue con una bonita blusa de trabajo como la que a continuación se muestra.','200',1,'2500','FDSFS',NULL,'14/04/2018',NULL,NULL,100,'lisa100-121.jpg','Nike'),(16,'Mochilas','En las prendas para dama se habla de calidad y comodidad para que te sientas bien con lo que traes puesto al mismo tiempo que lo proyectas y resaltas la belleza admirable que te distingue con una bonita blusa de trabajo como la que a continuación se muestra.','sadasd',1,'5000','sadas',NULL,'14/04/2018',NULL,NULL,200,'mochila.jpg','sadasd');
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuarios` (
  `idUsuarios` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `correo` varchar(45) DEFAULT NULL,
  `telefono` varchar(45) DEFAULT NULL,
  `direccion` varchar(120) DEFAULT NULL,
  `usuario` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `pregunta_secreta` varchar(45) DEFAULT NULL,
  `respuesta` varchar(45) DEFAULT NULL,
  `rol` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idUsuarios`),
  UNIQUE KEY `usuario_UNIQUE` (`usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Isaac UmaÃ±a UmaÃ±a','admin@admin.com','254669875','Tres Marias','admin','admin','1','','0'),(2,'Pablo UmaÃ±a UmaÃ±a','pablo@gmail.com','88888888','San Marcos','1234','1234','2','coco','1'),(3,'Luz UmaÃ±a','Luz@correo.com','88888888','San Marcos','Luzita','1234','3','New England','1'),(4,'Victor UmaÃ±a','ViK@correo.com','88888888','San Marcos','Vik007','1234','1','Alpizar','1'),(17,'Isaac UmaÃ±a','isaacfeli72@gmail.com','25466987','San Marcos','Izack12','1234','1','Badilla','1'),(18,'Pablo','Pablo@gmail.com','25466987','Tres  Marias','Pablo12','12345','1','madres','1');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'proyecto_lunes_noche'
--

--
-- Dumping routines for database 'proyecto_lunes_noche'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-04-15 16:19:12
