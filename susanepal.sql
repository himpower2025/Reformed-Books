-- MySQL dump 10.13  Distrib 8.0.18, for Win64 (x86_64)
--
-- Host: localhost    Database: susanepal
-- ------------------------------------------------------
-- Server version	8.4.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `article_category`
--

DROP TABLE IF EXISTS `article_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `article_category` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `article_id` bigint unsigned NOT NULL,
  `category_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `article_category_article_id_foreign` (`article_id`),
  KEY `article_category_category_id_foreign` (`category_id`),
  CONSTRAINT `article_category_article_id_foreign` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id`),
  CONSTRAINT `article_category_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article_category`
--

LOCK TABLES `article_category` WRITE;
/*!40000 ALTER TABLE `article_category` DISABLE KEYS */;
INSERT INTO `article_category` VALUES (1,31,2,NULL,NULL),(2,31,3,NULL,NULL),(3,32,2,NULL,NULL),(4,32,4,NULL,NULL);
/*!40000 ALTER TABLE `article_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `article_tags`
--

DROP TABLE IF EXISTS `article_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `article_tags` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `article_id` bigint unsigned NOT NULL,
  `tag_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `article_tags_article_id_foreign` (`article_id`),
  KEY `article_tags_tag_id_foreign` (`tag_id`),
  CONSTRAINT `article_tags_article_id_foreign` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id`),
  CONSTRAINT `article_tags_tag_id_foreign` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article_tags`
--

LOCK TABLES `article_tags` WRITE;
/*!40000 ALTER TABLE `article_tags` DISABLE KEYS */;
INSERT INTO `article_tags` VALUES (1,32,2,NULL,NULL),(2,32,4,NULL,NULL);
/*!40000 ALTER TABLE `article_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `articles`
--

DROP TABLE IF EXISTS `articles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `articles` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `author_id` bigint unsigned DEFAULT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'draft' COMMENT 'draft | published',
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` json NOT NULL,
  `uploaded_by` bigint unsigned NOT NULL,
  `view_count` int NOT NULL DEFAULT '0',
  `published_at` timestamp NULL DEFAULT NULL,
  `updated_by` bigint unsigned DEFAULT NULL,
  `created_by` bigint unsigned DEFAULT NULL,
  `extra` json DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `articles_author_id_foreign` (`author_id`),
  KEY `articles_uploaded_by_foreign` (`uploaded_by`),
  KEY `articles_updated_by_foreign` (`updated_by`),
  KEY `articles_created_by_foreign` (`created_by`),
  CONSTRAINT `articles_author_id_foreign` FOREIGN KEY (`author_id`) REFERENCES `authors` (`id`) ON DELETE SET NULL,
  CONSTRAINT `articles_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `articles_updated_by_foreign` FOREIGN KEY (`updated_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `articles_uploaded_by_foreign` FOREIGN KEY (`uploaded_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articles`
--

LOCK TABLES `articles` WRITE;
/*!40000 ALTER TABLE `articles` DISABLE KEYS */;
INSERT INTO `articles` VALUES (1,'id-perspiciatis-accusantium-qui-ab-dignissimos-molestiae-similique','',1,'/article2.jpg','published','Minus qui non fugit omnis beatae ut culpa. Impedit non temporibus ipsam maxime aut perferendis non. Doloribus voluptatem enim repudiandae qui. Consequ...','\"<p>Minus qui non fugit omnis beatae ut culpa. Impedit non temporibus ipsam maxime aut perferendis non. Doloribus voluptatem enim repudiandae qui. Consequatur aut adipisci autem debitis perspiciatis omnis.</p>\\n<p>Rerum officiis voluptatem nihil officiis. Atque sequi totam doloremque eum maxime consequatur molestiae. Nostrum deleniti itaque dolore dolorem ad. Blanditiis pariatur assumenda voluptatem eveniet cum. Itaque repellat nihil dicta.</p>\\n<p>Perspiciatis est esse id mollitia ducimus nihil officia. Expedita sit voluptatibus quisquam dolor laudantium iusto enim. Saepe rerum in libero aliquam quis veritatis saepe aperiam.</p>\\n<p>Aut provident quo delectus corporis inventore. Consequatur error ipsum nemo omnis aut deleniti dolorem. Illum non molestias itaque id perferendis at voluptate deleniti. Assumenda omnis voluptates modi deleniti quia et.</p>\\n<p>Earum aut repellendus perferendis laudantium beatae ut. Iure qui officia quas unde. Quisquam eveniet sequi nemo vero nisi nihil ipsum.</p>\"',1,0,NULL,NULL,NULL,NULL,NULL,'2026-02-17 09:32:31','2026-02-17 09:32:31'),(2,'soluta-aspernatur-aut-voluptate-et-ipsa-ullam-beatae-ut','',2,'/article2.jpg','published','Consequatur et voluptatum voluptas quo. Minima repudiandae et asperiores impedit. Quis aut dolores aut impedit.\nDolor excepturi voluptatem nam. Quas q...','\"<p>Consequatur et voluptatum voluptas quo. Minima repudiandae et asperiores impedit. Quis aut dolores aut impedit.</p>\\n<p>Dolor excepturi voluptatem nam. Quas quo qui totam ab quibusdam animi incidunt.</p>\\n<p>Consequatur rem beatae aut fugiat. Fuga esse at amet nobis quidem sed. Occaecati sit quasi nulla libero consequatur molestiae. Aut soluta excepturi veniam.</p>\\n<p>Dicta deserunt enim nisi rerum consequatur tempore quia. Ducimus quia unde omnis est quod in voluptatum. Eveniet repellendus ut debitis tempore.</p>\\n<p>Odio qui est consequatur incidunt non dolorem. Quod consequatur repellendus eaque illum qui. Recusandae officiis et commodi porro voluptas facilis qui.</p>\"',2,0,NULL,NULL,NULL,NULL,NULL,'2026-02-17 09:32:31','2026-02-17 09:32:31'),(3,'sed-et-animi-aut-velit-sunt','',3,'/article2.jpg','published','Perferendis blanditiis exercitationem et perferendis qui autem. Quo dolorum quia excepturi hic voluptatem quis dolor. Voluptatibus aliquam voluptatem...','\"<p>Perferendis blanditiis exercitationem et perferendis qui autem. Quo dolorum quia excepturi hic voluptatem quis dolor. Voluptatibus aliquam voluptatem quos sapiente voluptatem laudantium quas. Ut qui omnis vel.</p>\\n<p>Necessitatibus dolore provident omnis nemo. Veniam quos nulla harum. Accusantium et dolorem consequatur sit ipsum cumque. Corrupti pariatur aut impedit ut nemo exercitationem.</p>\\n<p>Occaecati eum dolore eius aut porro. Voluptate id rem exercitationem id. Deleniti excepturi omnis et eligendi.</p>\\n<p>Dolor neque assumenda harum in sint illo. Accusamus velit neque nesciunt explicabo voluptatem pariatur. Enim molestiae suscipit consequatur quia incidunt quia. Voluptatem minima recusandae ipsa natus qui quod et. Esse ea voluptas saepe ab.</p>\\n<p>Est cum cumque dolores eius illo quo. Culpa in autem veniam. Nihil voluptatem quo harum doloremque perspiciatis quae maiores.</p>\"',3,0,NULL,NULL,NULL,NULL,NULL,'2026-02-17 09:32:31','2026-02-17 09:32:31'),(4,'non-eligendi-voluptatum-unde-et','',4,'/article2.jpg','published','Sint et non incidunt laudantium ipsum fugit tenetur. Est debitis non recusandae quo aspernatur ea pariatur. Velit voluptas sit id alias amet amet. Mol...','\"<p>Sint et non incidunt laudantium ipsum fugit tenetur. Est debitis non recusandae quo aspernatur ea pariatur. Velit voluptas sit id alias amet amet. Molestiae sit alias omnis.</p>\\n<p>Mollitia sit temporibus voluptatibus beatae reprehenderit. Voluptatem labore et incidunt esse corporis sed nulla quod. Occaecati vitae dolorem quia corrupti nostrum nobis tempore. Modi eum laudantium et voluptatem ipsum necessitatibus. Cupiditate qui voluptatem dolorum alias occaecati voluptatem rem.</p>\\n<p>Autem voluptas quas est et temporibus. Doloremque modi voluptates quam. Autem accusantium quaerat eos id dignissimos modi alias optio.</p>\\n<p>Numquam quam est soluta nesciunt non neque illum. Ut nesciunt iusto aut praesentium.</p>\\n<p>Voluptatem mollitia eius assumenda accusantium ut ratione et. Saepe architecto cumque delectus sequi est. Quia quam facere rerum et.</p>\"',4,0,NULL,NULL,NULL,NULL,NULL,'2026-02-17 09:32:31','2026-02-17 09:32:31'),(5,'eos-neque-magni-omnis-quo-consequatur-sit-vero-voluptatibus','',5,'/article2.jpg','published','Quibusdam est debitis molestias. Modi aliquid ut corrupti rerum ut dicta. Ut molestiae sint neque qui quasi voluptates. Sed odio quis amet optio est l...','\"<p>Quibusdam est debitis molestias. Modi aliquid ut corrupti rerum ut dicta. Ut molestiae sint neque qui quasi voluptates. Sed odio quis amet optio est laborum eos.</p>\\n<p>Nulla eos excepturi id sed voluptates modi. Natus ex dolor et delectus velit voluptatem. Autem in enim iusto quam placeat totam.</p>\\n<p>Odit quidem aut labore corporis rerum sit praesentium autem. Corrupti illum consequatur non itaque. Deleniti a qui ut officia aut reiciendis. Dolor doloremque nesciunt et est laborum rerum quia.</p>\\n<p>Debitis facilis voluptas necessitatibus vel aperiam autem. Fugit optio officia et facilis et ipsum omnis. Voluptatem fugit veritatis fugit quia similique atque deleniti enim. Beatae hic omnis maxime optio consequatur.</p>\\n<p>Dolore esse qui dolor beatae tempore. Accusantium voluptatem voluptates reprehenderit beatae. Beatae repudiandae quo quia error fugiat quam.</p>\"',5,0,NULL,NULL,NULL,NULL,NULL,'2026-02-17 09:32:31','2026-02-17 09:32:31'),(6,'voluptatibus-omnis-tempore-accusantium-pariatur-nulla-tempore','',6,'/article2.jpg','published','Beatae velit consequatur eum incidunt aut. Ab labore reiciendis porro illo incidunt. Temporibus modi in ut velit voluptates. Ut dolores corrupti aut a...','\"<p>Beatae velit consequatur eum incidunt aut. Ab labore reiciendis porro illo incidunt. Temporibus modi in ut velit voluptates. Ut dolores corrupti aut aut velit et praesentium et. Similique nesciunt et in amet et et neque fugiat.</p>\\n<p>Occaecati aut autem reiciendis assumenda excepturi sint nam. Ea dolore adipisci ut debitis quibusdam est aut. Pariatur ut nesciunt cum est.</p>\\n<p>Asperiores vel at sit et illum. Corporis non quo cumque dolores explicabo.</p>\\n<p>Et numquam enim incidunt nemo similique et. Et ipsa itaque autem vitae. Et cum sapiente ut odio. Eligendi optio neque est saepe neque veniam. Consequatur ab sequi quidem sint.</p>\\n<p>Cumque impedit quo saepe quia nisi voluptatem aspernatur. Consectetur illum sed nihil quis. Nemo quidem hic est voluptates ipsum.</p>\"',6,0,NULL,NULL,NULL,NULL,NULL,'2026-02-17 09:32:31','2026-02-17 09:32:31'),(7,'sunt-molestiae-ex-qui-ut-ut-voluptas-velit','',7,'/article2.jpg','published','Rerum nulla consequatur occaecati et aperiam quaerat. Commodi tempore ullam nesciunt. Qui dolorem molestiae aut sit. Occaecati occaecati ipsa omnis no...','\"<p>Rerum nulla consequatur occaecati et aperiam quaerat. Commodi tempore ullam nesciunt. Qui dolorem molestiae aut sit. Occaecati occaecati ipsa omnis non qui.</p>\\n<p>Veniam voluptatem fuga optio illum. Est autem dolores dolor. Expedita adipisci ex est aperiam incidunt repudiandae. Quaerat sunt quia veniam quis.</p>\\n<p>Ut cumque vel nisi sed. Qui eligendi ab omnis illo est asperiores. Suscipit quos ipsa incidunt neque qui suscipit.</p>\\n<p>Sit atque delectus libero odit excepturi. Eum deleniti nobis ullam veniam in. Totam cumque incidunt sapiente laudantium sunt. Qui rem culpa ut excepturi eius.</p>\\n<p>Facere dolores nam perspiciatis necessitatibus sequi numquam. Illo dolores alias blanditiis eum doloribus natus. Inventore doloribus nihil neque cupiditate reiciendis ut. Id velit in dicta ipsum officiis quod. Aperiam explicabo dolore quod.</p>\"',7,0,NULL,NULL,NULL,NULL,NULL,'2026-02-17 09:32:31','2026-02-17 09:32:31'),(8,'officia-illo-maiores-vero-voluptatem','',8,'/article2.jpg','published','Officia possimus delectus consequuntur et enim. Ut accusantium facilis eveniet impedit sed. Tempore dolorum doloribus impedit rerum.\nTotam error exped...','\"<p>Officia possimus delectus consequuntur et enim. Ut accusantium facilis eveniet impedit sed. Tempore dolorum doloribus impedit rerum.</p>\\n<p>Totam error expedita deserunt mollitia laboriosam. Facere aliquid enim omnis enim deleniti aut et. Vel deserunt architecto rem aut debitis cumque et vel.</p>\\n<p>Qui voluptatum repellendus et quod vel atque nihil. Corporis beatae ullam repellat accusantium velit. Occaecati aperiam fugit vel. Modi quaerat dolore voluptas odit quam autem et et. Soluta cupiditate voluptas quo.</p>\\n<p>Ipsa fugit ea tempora accusamus. Corrupti officiis quasi dolorum asperiores voluptatum.</p>\\n<p>Dicta neque quis debitis dolorum. Rem eum sunt aliquam. Praesentium aliquid et est voluptas vel officia quasi numquam. Exercitationem modi quo dolorem qui.</p>\"',8,0,NULL,NULL,NULL,NULL,NULL,'2026-02-17 09:32:31','2026-02-17 09:32:31'),(9,'cupiditate-sed-asperiores-et-eos','',9,'/article2.jpg','published','Sapiente molestiae tenetur iste consequuntur ut necessitatibus ut autem. Adipisci rerum et perspiciatis. Numquam quis est rerum et nam architecto. Et...','\"<p>Sapiente molestiae tenetur iste consequuntur ut necessitatibus ut autem. Adipisci rerum et perspiciatis. Numquam quis est rerum et nam architecto. Et quaerat est voluptas beatae similique dolorem.</p>\\n<p>Dolore error sit voluptas aut rem. Velit laboriosam dolores hic non cupiditate sapiente repellat.</p>\\n<p>Temporibus voluptates consequuntur debitis esse nobis nihil fugiat. Dolorem itaque occaecati qui. Placeat vero qui vel odit et possimus eum. Voluptas sit molestiae culpa omnis at eligendi quo eos.</p>\\n<p>Magnam eos magni harum eos sunt dolorem repudiandae. Non aut et nostrum. Est velit quae praesentium qui reprehenderit et.</p>\\n<p>Asperiores error non possimus ut dolor voluptas. Molestiae et culpa ab dolore. Sed laborum nobis et ullam itaque tenetur dolorem. Eligendi ipsam totam quo consectetur. Officiis rerum explicabo minus dolorem quod non.</p>\"',9,0,NULL,NULL,NULL,NULL,NULL,'2026-02-17 09:32:31','2026-02-17 09:32:31'),(10,'a-iure-enim-aut-delectus-exercitationem-molestias-cumque','',10,'/article2.jpg','published','Reiciendis est qui et ex nam. Ab non ex et tempora necessitatibus cum. Autem similique mollitia voluptatem voluptas omnis voluptatem.\nEt fugit quia qu...','\"<p>Reiciendis est qui et ex nam. Ab non ex et tempora necessitatibus cum. Autem similique mollitia voluptatem voluptas omnis voluptatem.</p>\\n<p>Et fugit quia quis deserunt facilis dolorem vel. Velit similique quia quia. Sit praesentium necessitatibus veniam incidunt voluptas.</p>\\n<p>Doloribus et voluptas quo eaque dignissimos odit. Voluptate doloremque voluptatem asperiores ea eos numquam dignissimos numquam. Deleniti eos necessitatibus sapiente itaque aut. Sint deserunt laborum officiis consectetur et delectus maiores.</p>\\n<p>Dignissimos ea quo ipsum praesentium amet. Et quae eum ut qui aut tempora voluptas magni. Voluptatem laboriosam ut tenetur ut nihil ex recusandae.</p>\\n<p>Est iusto nihil molestiae et. Accusamus est fuga nam recusandae illo dolorem. Accusamus et sunt omnis est aut illum consectetur. Sit pariatur dolorem est aut officiis.</p>\"',10,0,NULL,NULL,NULL,NULL,NULL,'2026-02-17 09:32:31','2026-02-17 09:32:31'),(11,'consequatur-quod-non-aut','',11,'/article2.jpg','published','Voluptas minus eaque expedita. Eos animi eos optio expedita. Est reiciendis nisi et eveniet voluptas. Id consequatur in explicabo esse minus.\nTempora...','\"<p>Voluptas minus eaque expedita. Eos animi eos optio expedita. Est reiciendis nisi et eveniet voluptas. Id consequatur in explicabo esse minus.</p>\\n<p>Tempora nostrum repellendus quas voluptates aut. Et sunt et fugiat culpa. Aut aut rerum autem et aut quia.</p>\\n<p>Debitis aliquid autem nam et aut dicta. Eum explicabo perferendis omnis veritatis quam error cum cumque. Id suscipit est minima possimus reprehenderit. Illum delectus voluptatem sit saepe.</p>\\n<p>Officiis id placeat qui facere. Eveniet doloremque repellat laudantium ut. Magni nisi qui non unde.</p>\\n<p>Optio expedita voluptas atque earum. Exercitationem ab amet temporibus est minima quis officia dicta. Voluptas nobis ipsa fugiat labore rerum.</p>\"',11,0,NULL,NULL,NULL,NULL,NULL,'2026-02-17 09:32:31','2026-02-17 09:32:31'),(12,'recusandae-qui-rem-vel-natus-quod-et-recusandae-harum','',12,'/article2.jpg','published','Quo exercitationem provident veritatis nisi quae et nulla. Et vel quos rerum saepe.\nNihil porro qui harum et alias quisquam ullam. Dolores et nemo odi...','\"<p>Quo exercitationem provident veritatis nisi quae et nulla. Et vel quos rerum saepe.</p>\\n<p>Nihil porro qui harum et alias quisquam ullam. Dolores et nemo odit dolor enim. Sed sint cupiditate praesentium suscipit ut.</p>\\n<p>Exercitationem sit deleniti autem odio beatae consequuntur. Omnis atque molestiae non error facilis. Quia dolorem ut quia ut nam totam iusto et. Sint iusto maxime possimus cum eligendi voluptatem vel amet. Illo rerum atque beatae et dolorem quae nobis.</p>\\n<p>Vitae similique et facere. Reprehenderit est temporibus ratione. Nam id deleniti est enim.</p>\\n<p>Recusandae deserunt neque et quia quam nisi voluptatem. Quaerat consectetur ad id sint autem atque. Molestiae amet maiores molestias ullam temporibus et rerum enim. Maiores repellat doloremque consectetur earum. Voluptatem voluptatibus eos aut ducimus ratione inventore vitae.</p>\"',12,0,NULL,NULL,NULL,NULL,NULL,'2026-02-17 09:32:31','2026-02-17 09:32:31'),(13,'harum-accusantium-rem-doloremque-soluta','',13,'/article2.jpg','published','Et enim quisquam quia quibusdam enim rerum. Est vitae adipisci quia hic aliquid ea quibusdam. Velit eligendi dolores tempora magnam enim quasi rerum....','\"<p>Et enim quisquam quia quibusdam enim rerum. Est vitae adipisci quia hic aliquid ea quibusdam. Velit eligendi dolores tempora magnam enim quasi rerum.</p>\\n<p>Repellendus tempora saepe quia ad nostrum neque et. Itaque iste voluptatem neque autem voluptatibus. Expedita qui quo occaecati aliquam.</p>\\n<p>Earum eum odit numquam reprehenderit nihil. Laboriosam quis voluptatibus sequi aut et odit. Dolor natus molestias nam nobis. Eum non fuga exercitationem dicta asperiores eos.</p>\\n<p>Velit saepe odio ut quasi maxime itaque odio consequatur. Qui non ea ex est hic quaerat commodi ex. Quis natus nam est placeat ut consequatur. Perferendis dicta velit magni facilis possimus aperiam et.</p>\\n<p>Accusantium perspiciatis ut dolorem qui nulla. Sed porro omnis fuga illum perferendis quo. Magni quibusdam eum doloribus fugiat fugiat dolorum aliquid.</p>\"',13,0,NULL,NULL,NULL,NULL,NULL,'2026-02-17 09:32:31','2026-02-17 09:32:31'),(14,'recusandae-ipsa-voluptates-odit-deleniti','',14,'/article2.jpg','published','Ex adipisci fugiat eum qui dolorum. Rerum in est magnam molestiae sapiente omnis consequatur. Quasi aspernatur asperiores reiciendis provident perfere...','\"<p>Ex adipisci fugiat eum qui dolorum. Rerum in est magnam molestiae sapiente omnis consequatur. Quasi aspernatur asperiores reiciendis provident perferendis quidem aut. Pariatur qui dolorem omnis odio possimus velit aspernatur nihil.</p>\\n<p>Et atque perferendis necessitatibus voluptas. Laborum eum ad inventore iure soluta impedit. Occaecati nesciunt et et similique.</p>\\n<p>Dolore veniam ratione et totam. Nihil incidunt est eum reiciendis aspernatur asperiores. Consequuntur eaque et nemo nisi sapiente consequuntur. Et cum qui fuga molestiae molestias excepturi. Id necessitatibus maxime ut quos expedita eos.</p>\\n<p>Velit labore maxime amet. Enim doloremque nihil ea omnis consequatur sit. Voluptas possimus distinctio neque repellat recusandae.</p>\\n<p>Consequatur praesentium est laudantium aut et ratione consequatur. Optio ea quaerat voluptatum dolorem et at delectus. Magnam excepturi qui molestiae sit et. Excepturi est rerum nam rem in mollitia.</p>\"',14,0,NULL,NULL,NULL,NULL,NULL,'2026-02-17 09:32:31','2026-02-17 09:32:31'),(15,'mollitia-esse-occaecati-ipsa-adipisci-et-aut-est-facilis','',15,'/article2.jpg','published','Aut in velit delectus nostrum deserunt. Minima illum esse illum sit officiis et tempora. Sed optio esse laudantium necessitatibus voluptatibus similiq...','\"<p>Aut in velit delectus nostrum deserunt. Minima illum esse illum sit officiis et tempora. Sed optio esse laudantium necessitatibus voluptatibus similique illum.</p>\\n<p>Sit numquam occaecati rerum non explicabo veritatis fugit animi. Incidunt eius ratione id aut molestias. Cum velit aut et optio dolorem. Sed ab laboriosam incidunt eveniet neque similique.</p>\\n<p>Rerum eaque cupiditate unde adipisci assumenda. Eligendi voluptas impedit magnam est et in. Consequuntur consequatur dolorem occaecati facilis aut sit. Quae explicabo fugit est beatae.</p>\\n<p>Quos explicabo sequi nesciunt ipsa veritatis ut. Qui porro quam dolorum aut autem.</p>\\n<p>Architecto harum velit numquam cumque corporis. Aut quis dolorum occaecati adipisci minima. Assumenda doloremque in rerum ea ipsum iste voluptas.</p>\"',15,0,NULL,NULL,NULL,NULL,NULL,'2026-02-17 09:32:31','2026-02-17 09:32:31'),(16,'atque-reprehenderit-vel-dolores-quia-quam-accusantium-ut','',16,'/article2.jpg','published','Voluptatem quisquam quo voluptas a voluptatibus expedita eaque. A praesentium est et. Labore dolores pariatur dolorem neque temporibus maiores et rem....','\"<p>Voluptatem quisquam quo voluptas a voluptatibus expedita eaque. A praesentium est et. Labore dolores pariatur dolorem neque temporibus maiores et rem.</p>\\n<p>Voluptatem fugiat sunt omnis qui reprehenderit quam aut. Mollitia voluptates cum suscipit ut qui et eum eos. Eos quia non autem debitis delectus ducimus iste.</p>\\n<p>Impedit ipsa officiis aut voluptatem eius ut. Fuga vel et tempore eligendi quaerat libero quos. Exercitationem est illo quo omnis in. Sit amet corrupti consequatur iure necessitatibus et natus.</p>\\n<p>Cumque minima omnis natus minus quo esse commodi. Aperiam voluptas nihil possimus.</p>\\n<p>Quas aut temporibus quae dolor ad totam fugit. Saepe necessitatibus veniam est. Ut officiis nobis libero reiciendis voluptatem. Veniam nulla eligendi dolorum eaque. Aut iure facilis maiores tempora blanditiis sed.</p>\"',16,0,NULL,NULL,NULL,NULL,NULL,'2026-02-17 09:32:31','2026-02-17 09:32:31'),(17,'quaerat-accusamus-ut-vitae','',17,'/article2.jpg','published','Aut ut veniam velit aut nemo consequatur. Et sint neque et dolorum. Enim dolorem distinctio qui repellendus impedit ut eveniet eos.\nAut ad eveniet rep...','\"<p>Aut ut veniam velit aut nemo consequatur. Et sint neque et dolorum. Enim dolorem distinctio qui repellendus impedit ut eveniet eos.</p>\\n<p>Aut ad eveniet reprehenderit aliquam cupiditate beatae expedita dignissimos. Incidunt minus quia incidunt incidunt iure sed vel. Ullam sed velit a ad voluptatem qui. Eos quae eos expedita doloribus quas quasi. Vel qui quas similique quis ipsam ut.</p>\\n<p>Sapiente labore vel et alias error. Vel aut blanditiis est. Corporis voluptates qui dolorum magnam nisi vel at officia. Blanditiis odio quo quos debitis impedit placeat quia.</p>\\n<p>Id qui repellendus perferendis voluptas repellendus culpa. Ut sit quibusdam error. Et tempora voluptatem doloremque dolores rem. Fuga provident amet ea dolores dolor.</p>\\n<p>In ullam sit architecto. Aut placeat illo consequatur necessitatibus voluptas. Expedita eos commodi in assumenda voluptatibus praesentium. Aspernatur et nisi architecto doloremque ut sunt ab veniam.</p>\"',17,0,NULL,NULL,NULL,NULL,NULL,'2026-02-17 09:32:31','2026-02-17 09:32:31'),(18,'et-voluptas-non-voluptas-repellat-provident-nihil-sed','',18,'/article2.jpg','published','Eos est reprehenderit deserunt laboriosam consequatur alias possimus labore. Ullam dolorem pariatur repudiandae et ipsum. Voluptas cupiditate quia qui...','\"<p>Eos est reprehenderit deserunt laboriosam consequatur alias possimus labore. Ullam dolorem pariatur repudiandae et ipsum. Voluptas cupiditate quia quis deleniti repellendus dolor quia.</p>\\n<p>Labore quasi aliquam consectetur voluptatem. In commodi ut dicta aut blanditiis explicabo sint. Minus illo et possimus sint distinctio sed. Adipisci consequatur officia rem quae repellat id sunt velit.</p>\\n<p>Minima iure quis explicabo autem est voluptatem rerum rerum. Ex est est rerum.</p>\\n<p>Aut ut nostrum fuga ea reiciendis molestias. Libero eligendi iste ut temporibus. Totam nihil cum dolor rerum pariatur voluptas facere reiciendis.</p>\\n<p>Excepturi atque qui distinctio. Qui aut esse impedit perspiciatis alias atque autem.</p>\"',18,0,NULL,NULL,NULL,NULL,NULL,'2026-02-17 09:32:31','2026-02-17 09:32:31'),(19,'quam-tempora-ipsum-tenetur-corrupti-quasi','',19,'/article2.jpg','published','Reiciendis maxime qui eos dolorem rem quo aut. Hic veniam nulla ut rem explicabo soluta impedit. Unde cumque recusandae atque qui id nostrum est. Eum...','\"<p>Reiciendis maxime qui eos dolorem rem quo aut. Hic veniam nulla ut rem explicabo soluta impedit. Unde cumque recusandae atque qui id nostrum est. Eum eius recusandae qui quia ducimus magni nisi.</p>\\n<p>Est ut ullam ut consectetur dolores illo. Quia non necessitatibus eum reprehenderit excepturi repudiandae voluptatibus in. Aut ut a omnis laboriosam voluptate rerum facere. Aut in necessitatibus sequi quaerat dignissimos non iste.</p>\\n<p>Commodi aut consectetur ducimus quae velit. Et velit sed quis. Omnis deserunt impedit enim velit qui.</p>\\n<p>Et quod et doloribus libero. Quis harum dolorem voluptas veritatis impedit temporibus. Adipisci non natus fuga ut harum sunt. Non rerum rem cumque recusandae atque eos. Sit reprehenderit sapiente velit.</p>\\n<p>Est molestiae ut sit asperiores. Eligendi quaerat est perspiciatis officia. Necessitatibus magni animi dolorem rem modi. Esse aut explicabo quidem autem facere vel iste. Corrupti a ut quia.</p>\"',19,0,NULL,NULL,NULL,NULL,NULL,'2026-02-17 09:32:31','2026-02-17 09:32:31'),(20,'consectetur-voluptatem-qui-sunt-error-saepe-velit-hic','',20,'/article2.jpg','published','Dolorem esse nulla accusamus dolor neque vitae. Est ab laboriosam quo qui voluptatibus. Quasi sit magni quae. Eveniet molestiae quis deleniti rerum er...','\"<p>Dolorem esse nulla accusamus dolor neque vitae. Est ab laboriosam quo qui voluptatibus. Quasi sit magni quae. Eveniet molestiae quis deleniti rerum error.</p>\\n<p>Sunt animi sed adipisci eum delectus odit. Deleniti aliquid inventore unde occaecati omnis tempore dolorem. Et aperiam explicabo pariatur fugit. Et recusandae nihil eos aut fuga possimus.</p>\\n<p>Omnis cumque quibusdam quis recusandae. Suscipit ad incidunt eligendi qui reprehenderit est reiciendis.</p>\\n<p>Quibusdam commodi possimus inventore aspernatur. Enim ipsum voluptatem velit ab. Quia ratione iusto ullam voluptatem omnis distinctio. Et qui ab rerum dolores odio.</p>\\n<p>Nisi voluptatem officiis quo consequatur eum ab. Exercitationem eligendi autem a officiis aliquam possimus unde ducimus. Quia minima debitis nihil ut. Aut et saepe consequatur et aut ea est. Molestiae dolores optio reprehenderit repellat odit voluptatum molestias.</p>\"',20,0,NULL,NULL,NULL,NULL,NULL,'2026-02-17 09:32:31','2026-02-17 09:32:31'),(21,'nesciunt-similique-accusamus-rerum-error-debitis-natus-vitae','',21,'/article2.jpg','published','Sit earum cupiditate consequatur et repudiandae. Voluptate ea similique possimus iusto. Ipsa et vel perferendis eum aliquam nemo. Quae harum sint non...','\"<p>Sit earum cupiditate consequatur et repudiandae. Voluptate ea similique possimus iusto. Ipsa et vel perferendis eum aliquam nemo. Quae harum sint non sed aperiam quasi.</p>\\n<p>Ducimus earum unde omnis. Voluptas delectus blanditiis repellendus sed id ut rerum. Aliquam nam mollitia autem qui ea est. Veniam iure aut nostrum qui.</p>\\n<p>Aut ipsam in praesentium molestiae quod. Maxime dolorum consequatur doloribus architecto dignissimos blanditiis. Corporis error omnis nihil ipsum aut numquam unde. Porro ad libero fugiat asperiores ut odio.</p>\\n<p>Aut autem ducimus dolores unde nostrum. Sed qui ipsa maxime labore. Distinctio consequatur ut vitae quis.</p>\\n<p>Ratione voluptas qui dolore aut est velit. Qui earum voluptate et nihil velit quis. Possimus voluptates qui ipsum optio at.</p>\"',21,0,NULL,NULL,NULL,NULL,NULL,'2026-02-17 09:32:31','2026-02-17 09:32:31'),(22,'nihil-nihil-asperiores-iure-provident-libero-ut','',22,'/article2.jpg','published','Quam numquam nostrum molestiae debitis adipisci voluptas excepturi. Qui dolores et explicabo iusto. Praesentium temporibus praesentium autem sit asper...','\"<p>Quam numquam nostrum molestiae debitis adipisci voluptas excepturi. Qui dolores et explicabo iusto. Praesentium temporibus praesentium autem sit aspernatur.</p>\\n<p>Eligendi dolore voluptatem omnis quos. Illum aut et modi voluptatum et qui. Accusantium maiores velit dolorem nesciunt ut est veritatis dolorem. Molestias suscipit similique veniam.</p>\\n<p>Delectus rerum sit velit. Ad voluptas ad atque fugiat. Harum cumque dolorem quidem voluptas. Totam accusantium fugit nisi veritatis omnis qui.</p>\\n<p>Nihil illum ratione iste illo enim. Sunt et quos iure odit dolorem. Qui nobis omnis illo voluptatibus doloribus reprehenderit.</p>\\n<p>Eaque eum iste dignissimos maiores maxime explicabo animi. Fugiat dolorem error quidem vel iste illo. Ducimus quidem cupiditate nemo aut. Voluptatem et et quod debitis quia eos.</p>\"',22,0,NULL,NULL,NULL,NULL,NULL,'2026-02-17 09:32:31','2026-02-17 09:32:31'),(23,'architecto-blanditiis-voluptatem-numquam','',23,'/article2.jpg','published','Quaerat deleniti impedit nobis occaecati veniam suscipit. Modi voluptatum voluptas debitis soluta ipsa. Adipisci aut accusantium molestiae alias conse...','\"<p>Quaerat deleniti impedit nobis occaecati veniam suscipit. Modi voluptatum voluptas debitis soluta ipsa. Adipisci aut accusantium molestiae alias consequatur impedit eveniet vel. Qui placeat dolor hic maiores.</p>\\n<p>Pariatur voluptatem similique reiciendis quam. Corrupti quo sit rerum voluptate vitae non. Maiores officia vero magnam et quae ut. Minus sed quam et rerum aut dolorem.</p>\\n<p>Vel sit sint reprehenderit atque veritatis quam. Neque modi maxime aut ut doloremque. Quo saepe et incidunt deleniti nihil.</p>\\n<p>Quo repudiandae et aliquam eum et veniam voluptatem. Ea quos eos velit vel. Voluptatum dolor perspiciatis et aut et fugit ipsam maiores. Voluptatem pariatur neque cum magni enim debitis eum et.</p>\\n<p>Consequatur ut rerum voluptate mollitia. Odio aperiam quisquam modi consectetur. Commodi et sed sit deserunt. Minus cupiditate reprehenderit aut.</p>\"',23,0,NULL,NULL,NULL,NULL,NULL,'2026-02-17 09:32:31','2026-02-17 09:32:31'),(24,'corporis-et-fugit-nobis-eum-modi','',24,'/article2.jpg','published','Veniam libero aut temporibus quo officia. Laboriosam eaque illum eum velit hic et. Praesentium ratione perspiciatis illum corrupti saepe.\nOdio labore...','\"<p>Veniam libero aut temporibus quo officia. Laboriosam eaque illum eum velit hic et. Praesentium ratione perspiciatis illum corrupti saepe.</p>\\n<p>Odio labore voluptatem est sit. Accusantium quasi ipsam qui eligendi corporis natus ducimus accusamus. Corporis temporibus a aliquid ut eveniet autem.</p>\\n<p>Expedita sit sapiente quo facere. Aut reiciendis officiis velit quo modi voluptatem. Consequuntur itaque libero voluptas est harum occaecati. Reprehenderit enim dolores aliquid enim deserunt quam.</p>\\n<p>Aut occaecati quibusdam eveniet aut in doloribus. Dolor vitae exercitationem sit similique consectetur odio. Ut fugiat ab at esse.</p>\\n<p>Inventore quos assumenda sint odit id enim voluptate. Officiis sunt laudantium mollitia maiores nihil molestiae provident. Ipsam eum nam error dicta. Inventore quisquam sequi rerum accusantium eveniet laboriosam dolores eos.</p>\"',24,0,NULL,NULL,NULL,NULL,NULL,'2026-02-17 09:32:31','2026-02-17 09:32:31'),(25,'et-sequi-commodi-repellendus-nostrum','',25,'/article2.jpg','published','Necessitatibus omnis beatae omnis eos ad. Iure tenetur voluptate dolor ab corrupti. Ut dignissimos aut repudiandae eos. Officia inventore unde expedit...','\"<p>Necessitatibus omnis beatae omnis eos ad. Iure tenetur voluptate dolor ab corrupti. Ut dignissimos aut repudiandae eos. Officia inventore unde expedita corporis.</p>\\n<p>Natus ad omnis perferendis sunt qui. Vel ut nostrum distinctio rerum et veniam. Exercitationem non quos quia recusandae omnis ipsa. Laudantium laborum soluta nesciunt ex.</p>\\n<p>Ut impedit odio qui quas cum natus dolor. Non mollitia temporibus molestiae enim et consequatur. Et facilis qui vero nesciunt. Cupiditate omnis vel unde aut quo nemo impedit.</p>\\n<p>Adipisci minus voluptatem magni. Voluptatem nostrum error inventore dolores. Ut iusto voluptatem officiis omnis omnis odit ut. A veritatis quae aliquam amet.</p>\\n<p>Natus amet nam rem quis qui. Sunt dolorem recusandae sint ut doloribus ut dolor. Ut qui ipsa sequi consequatur deleniti ut sit.</p>\"',25,0,NULL,NULL,NULL,NULL,NULL,'2026-02-17 09:32:31','2026-02-17 09:32:31'),(26,'odit-facilis-sunt-enim-possimus-deserunt-impedit','',26,'/article2.jpg','published','Mollitia totam vitae sunt ut. Saepe quis enim alias incidunt nisi deleniti quis. Eius distinctio ullam ex ut non pariatur ut.\nPossimus voluptas conseq...','\"<p>Mollitia totam vitae sunt ut. Saepe quis enim alias incidunt nisi deleniti quis. Eius distinctio ullam ex ut non pariatur ut.</p>\\n<p>Possimus voluptas consequatur libero illum similique. Omnis possimus sit itaque sunt voluptas. Dolorem rerum sint praesentium est omnis id.</p>\\n<p>Vero sed fuga in nisi vel quas omnis natus. Et saepe temporibus voluptas magnam dolore qui aspernatur. Est voluptas repellendus consequuntur voluptatum possimus quo modi.</p>\\n<p>Eum blanditiis repellat blanditiis fugit. Pariatur enim ipsa excepturi dignissimos et ex amet aut. Qui provident est cupiditate. Maxime nesciunt eos aut nobis nostrum molestiae. Magni distinctio explicabo harum quos quia qui est quia.</p>\\n<p>Eos exercitationem molestiae ab omnis voluptatem in voluptatem. Nulla expedita quod sed qui non. Rerum ex repudiandae fuga ipsam. Voluptatem assumenda et natus sint inventore doloribus. Hic expedita excepturi fugiat cumque repudiandae iste atque dolore.</p>\"',26,0,NULL,NULL,NULL,NULL,NULL,'2026-02-17 09:32:31','2026-02-17 09:32:31'),(27,'tempore-optio-mollitia-perspiciatis-tempore-sequi-eveniet-deserunt','',27,'/article2.jpg','published','Eveniet quia quam rem vel itaque corporis saepe cumque. Quo quas natus officia totam.\nReprehenderit sit deserunt hic quam. Velit molestias est cum mol...','\"<p>Eveniet quia quam rem vel itaque corporis saepe cumque. Quo quas natus officia totam.</p>\\n<p>Reprehenderit sit deserunt hic quam. Velit molestias est cum molestiae. Nulla quis velit illum cupiditate non inventore dolorum.</p>\\n<p>Similique est incidunt qui error similique amet. Nam commodi maiores id enim rerum. Qui et iure suscipit quisquam. Ut cupiditate aliquam cumque. Laborum ab architecto fugit at molestias sit ut error.</p>\\n<p>Officiis suscipit voluptatum molestias id natus a. Fuga totam velit explicabo consequuntur. Quae minus quas provident sit aut. Dignissimos iusto nemo saepe alias atque in aliquam. Excepturi qui in magni aspernatur magni ex animi.</p>\\n<p>Nobis facilis repellendus vel corporis necessitatibus magnam. Nulla sint cum eligendi soluta qui autem voluptatem qui. Sed voluptas dolor commodi ea. Facere laboriosam voluptatum quia rerum. Eos dolore odio et.</p>\"',27,0,NULL,NULL,NULL,NULL,NULL,'2026-02-17 09:32:31','2026-02-17 09:32:31'),(28,'aut-totam-eligendi-eaque-sunt','',28,'/article2.jpg','published','Qui eos repellat est nostrum recusandae quia. Corrupti sint laudantium quis aliquam harum. Qui aut suscipit atque consequatur cumque et.\nUnde quis eve...','\"<p>Qui eos repellat est nostrum recusandae quia. Corrupti sint laudantium quis aliquam harum. Qui aut suscipit atque consequatur cumque et.</p>\\n<p>Unde quis eveniet voluptates soluta quia veniam. Eius dolores explicabo nostrum sed. Sapiente voluptate aut quo qui nobis beatae. Corrupti blanditiis tenetur non pariatur.</p>\\n<p>Est est quia sit quidem minima. Sit et nobis similique eum tempore. At nihil veritatis est in delectus.</p>\\n<p>Omnis sapiente ratione maiores ut est quo ex. Ut occaecati ut autem repellat alias. Nam ipsam eius deleniti eligendi sed. Mollitia ipsum iure corporis quas quo soluta.</p>\\n<p>Rerum et nisi voluptate incidunt quasi totam. Ducimus doloremque molestias qui recusandae iure commodi harum.</p>\"',28,0,NULL,NULL,NULL,NULL,NULL,'2026-02-17 09:32:31','2026-02-17 09:32:31'),(29,'temporibus-sed-ut-sunt-unde-fugit-ex-quidem','',29,'/article2.jpg','published','Similique omnis mollitia ut perferendis voluptates aperiam molestias accusamus. Harum consequatur enim earum harum consectetur nemo beatae non. Nihil...','\"<p>Similique omnis mollitia ut perferendis voluptates aperiam molestias accusamus. Harum consequatur enim earum harum consectetur nemo beatae non. Nihil odio dolor vel dolores sint est beatae.</p>\\n<p>Nam et maxime quia quibusdam. Vitae vel molestias saepe assumenda. Dolores autem voluptas hic consectetur praesentium laudantium. Hic magnam repudiandae doloremque voluptas.</p>\\n<p>Quisquam id non optio ea repellat ratione. A est officiis quis natus autem. Deleniti ut aut provident repellendus placeat sit. Magnam suscipit inventore non asperiores blanditiis molestiae voluptatem aliquam.</p>\\n<p>Voluptas voluptate nobis porro doloremque incidunt fugiat in ipsam. Facilis labore enim animi et recusandae et. Blanditiis qui blanditiis quos debitis. Tenetur expedita nesciunt qui delectus esse beatae.</p>\\n<p>Explicabo ipsa dolor ut consequatur et nemo blanditiis. Id et voluptate optio aut commodi iusto. Qui adipisci cum distinctio facilis dolorem at.</p>\"',29,0,NULL,NULL,NULL,NULL,NULL,'2026-02-17 09:32:31','2026-02-17 09:32:31'),(30,'velit-consectetur-libero-ea-rerum','',30,'/article2.jpg','published','Porro qui et voluptas et iusto enim aperiam. Consequatur reprehenderit quaerat dolor quam qui rerum libero quas. Sit sequi voluptatem non. Qui vero qu...','\"<p>Porro qui et voluptas et iusto enim aperiam. Consequatur reprehenderit quaerat dolor quam qui rerum libero quas. Sit sequi voluptatem non. Qui vero quaerat nam ut ducimus harum.</p>\\n<p>Aut maiores quibusdam ea ipsa molestiae. Consequatur nostrum magni velit voluptatem quo facilis esse. Rerum impedit voluptatem iusto unde fugiat sed fugiat. Nam aliquid repellat aliquid reprehenderit sequi quibusdam.</p>\\n<p>Provident culpa perferendis non doloremque optio dolorem et nesciunt. Sunt corporis et eveniet nulla eveniet maxime recusandae. Nisi atque totam ratione nobis. Aliquid nemo dolor repellat perspiciatis veniam.</p>\\n<p>Praesentium et accusantium autem perspiciatis numquam. Iure nobis aut enim ut repellat quia voluptates eaque. Eligendi repudiandae voluptas et nostrum. Similique ea consequatur autem nihil. Neque numquam est sit ut velit.</p>\\n<p>Voluptate porro maiores asperiores. Quam est unde magni quia sint voluptas natus. Autem provident quia ut voluptas qui voluptas.</p>\"',30,0,NULL,NULL,NULL,NULL,NULL,'2026-02-17 09:32:31','2026-02-17 09:32:31'),(31,'Something about article','',5,'articles/SKk0qSmRQ9FTK1zamQPW.png','draft','test','\"<p>test</p>\"',31,0,NULL,31,31,NULL,NULL,'2026-02-17 09:36:25','2026-02-17 09:36:25'),(32,'test','',2,'articles/0dcJKDCtPIMu0kZ6UShg.png','draft','test','\"<p>test</p>\"',31,0,NULL,31,31,NULL,NULL,'2026-02-17 12:37:26','2026-02-17 12:37:26'),(33,'Something about article','',2,'articles/PfOLQLTs1sm0QX4MfVOw.png','draft','test','\"<p>test</p>\"',31,0,NULL,31,31,NULL,NULL,'2026-02-17 12:37:55','2026-02-17 12:37:55');
/*!40000 ALTER TABLE `articles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `authors`
--

DROP TABLE IF EXISTS `authors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `authors` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authors`
--

LOCK TABLES `authors` WRITE;
/*!40000 ALTER TABLE `authors` DISABLE KEYS */;
INSERT INTO `authors` VALUES (1,'Woodrow Trantow','/image.jpg','Prof.',NULL,'2026-02-17 09:32:30','2026-02-17 09:32:30'),(2,'Dr. Price Hills DVM','/image.jpg','Dr.',NULL,'2026-02-17 09:32:31','2026-02-17 09:32:31'),(3,'Prof. Elroy Little IV','/image.jpg','Mr.',NULL,'2026-02-17 09:32:31','2026-02-17 09:32:31'),(4,'Clementina Rutherford','/image.jpg','Mr.',NULL,'2026-02-17 09:32:31','2026-02-17 09:32:31'),(5,'Moriah Wehner V','/image.jpg','Mr.',NULL,'2026-02-17 09:32:31','2026-02-17 09:32:31'),(6,'Monty Denesik','/image.jpg','Dr.',NULL,'2026-02-17 09:32:31','2026-02-17 09:32:31'),(7,'Antonio Carroll','/image.jpg','Mrs.',NULL,'2026-02-17 09:32:31','2026-02-17 09:32:31'),(8,'Ms. Laurie Gusikowski IV','/image.jpg','Dr.',NULL,'2026-02-17 09:32:31','2026-02-17 09:32:31'),(9,'Ms. Chanelle Kunde','/image.jpg','Miss',NULL,'2026-02-17 09:32:31','2026-02-17 09:32:31'),(10,'Milford Marquardt','/image.jpg','Ms.',NULL,'2026-02-17 09:32:31','2026-02-17 09:32:31'),(11,'Jackeline Smith','/image.jpg','Prof.',NULL,'2026-02-17 09:32:31','2026-02-17 09:32:31'),(12,'Everette Block','/image.jpg','Prof.',NULL,'2026-02-17 09:32:31','2026-02-17 09:32:31'),(13,'Frederick Pouros','/image.jpg','Mr.',NULL,'2026-02-17 09:32:31','2026-02-17 09:32:31'),(14,'Ora Fadel','/image.jpg','Prof.',NULL,'2026-02-17 09:32:31','2026-02-17 09:32:31'),(15,'Mona Homenick','/image.jpg','Prof.',NULL,'2026-02-17 09:32:31','2026-02-17 09:32:31'),(16,'Xander Von','/image.jpg','Miss',NULL,'2026-02-17 09:32:31','2026-02-17 09:32:31'),(17,'Joesph Bahringer MD','/image.jpg','Dr.',NULL,'2026-02-17 09:32:31','2026-02-17 09:32:31'),(18,'Prof. Jared Goodwin DDS','/image.jpg','Mr.',NULL,'2026-02-17 09:32:31','2026-02-17 09:32:31'),(19,'Courtney Langworth I','/image.jpg','Mr.',NULL,'2026-02-17 09:32:31','2026-02-17 09:32:31'),(20,'Haven Hand','/image.jpg','Mr.',NULL,'2026-02-17 09:32:31','2026-02-17 09:32:31'),(21,'Stephen Hirthe','/image.jpg','Dr.',NULL,'2026-02-17 09:32:31','2026-02-17 09:32:31'),(22,'Antonina O\'Connell Jr.','/image.jpg','Miss',NULL,'2026-02-17 09:32:31','2026-02-17 09:32:31'),(23,'Rodrick Kirlin PhD','/image.jpg','Ms.',NULL,'2026-02-17 09:32:31','2026-02-17 09:32:31'),(24,'Miss Hanna Thiel','/image.jpg','Mr.',NULL,'2026-02-17 09:32:31','2026-02-17 09:32:31'),(25,'Roselyn Runolfsdottir','/image.jpg','Prof.',NULL,'2026-02-17 09:32:31','2026-02-17 09:32:31'),(26,'Miss Mina Reichel','/image.jpg','Prof.',NULL,'2026-02-17 09:32:31','2026-02-17 09:32:31'),(27,'Darby Schmitt','/image.jpg','Mr.',NULL,'2026-02-17 09:32:31','2026-02-17 09:32:31'),(28,'Madie Mills','/image.jpg','Dr.',NULL,'2026-02-17 09:32:31','2026-02-17 09:32:31'),(29,'Mr. Johnpaul Ferry III','/image.jpg','Ms.',NULL,'2026-02-17 09:32:31','2026-02-17 09:32:31'),(30,'Jace Wiegand','/image.jpg','Ms.',NULL,'2026-02-17 09:32:31','2026-02-17 09:32:31');
/*!40000 ALTER TABLE `authors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `book_category`
--

DROP TABLE IF EXISTS `book_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book_category` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `book_id` bigint unsigned NOT NULL,
  `category_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `book_category_book_id_foreign` (`book_id`),
  KEY `book_category_category_id_foreign` (`category_id`),
  CONSTRAINT `book_category_book_id_foreign` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`),
  CONSTRAINT `book_category_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book_category`
--

LOCK TABLES `book_category` WRITE;
/*!40000 ALTER TABLE `book_category` DISABLE KEYS */;
/*!40000 ALTER TABLE `book_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `book_tags`
--

DROP TABLE IF EXISTS `book_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book_tags` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `book_id` bigint unsigned NOT NULL,
  `tag_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `book_tags_book_id_foreign` (`book_id`),
  KEY `book_tags_tag_id_foreign` (`tag_id`),
  CONSTRAINT `book_tags_book_id_foreign` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`),
  CONSTRAINT `book_tags_tag_id_foreign` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book_tags`
--

LOCK TABLES `book_tags` WRITE;
/*!40000 ALTER TABLE `book_tags` DISABLE KEYS */;
/*!40000 ALTER TABLE `book_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `books` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `author_id` bigint unsigned DEFAULT NULL,
  `cover_image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1 on | 0 off',
  `original_price` double DEFAULT NULL,
  `current_price` double NOT NULL,
  `uploaded_by` bigint unsigned NOT NULL,
  `book_sold` int NOT NULL DEFAULT '0',
  `description` json NOT NULL,
  `pdf_file` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated_by` bigint unsigned NOT NULL,
  `extra` json DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `books_author_id_foreign` (`author_id`),
  KEY `books_uploaded_by_foreign` (`uploaded_by`),
  KEY `books_updated_by_foreign` (`updated_by`),
  CONSTRAINT `books_author_id_foreign` FOREIGN KEY (`author_id`) REFERENCES `authors` (`id`) ON DELETE SET NULL,
  CONSTRAINT `books_updated_by_foreign` FOREIGN KEY (`updated_by`) REFERENCES `users` (`id`),
  CONSTRAINT `books_uploaded_by_foreign` FOREIGN KEY (`uploaded_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache`
--

DROP TABLE IF EXISTS `cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache`
--

LOCK TABLES `cache` WRITE;
/*!40000 ALTER TABLE `cache` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache_locks`
--

LOCK TABLES `cache_locks` WRITE;
/*!40000 ALTER TABLE `cache_locks` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache_locks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carts` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `book_id` bigint unsigned NOT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  `extra` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `carts_user_id_foreign` (`user_id`),
  KEY `carts_book_id_foreign` (`book_id`),
  CONSTRAINT `carts_book_id_foreign` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`),
  CONSTRAINT `carts_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'article',
  `icon` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'fas fa-book-open',
  `extra` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `categories_slug_unique` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Worldview','worldview','article','fas fa-book-open',NULL,'2026-02-17 09:32:30','2026-02-17 09:32:30'),(2,'Christ and culture','christ-and-culture','article','fas fa-pencil-alt',NULL,'2026-02-17 09:32:30','2026-02-17 09:32:30'),(3,'Doctrine','doctrine','article','fas fa-book',NULL,'2026-02-17 09:32:30','2026-02-17 09:32:30'),(4,'Practical theology','practical-theology','article','fas fa-user',NULL,'2026-02-17 09:32:30','2026-02-17 09:32:30'),(5,'Stroy poem','stroy-poem','article','fas fa-newspaper',NULL,'2026-02-17 09:32:30','2026-02-17 09:32:30');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned DEFAULT NULL,
  `article_id` bigint unsigned NOT NULL,
  `content` json NOT NULL,
  `likes` int NOT NULL DEFAULT '0',
  `dislikes` int NOT NULL DEFAULT '0',
  `parent_id` bigint unsigned DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `extra` json DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genres`
--

DROP TABLE IF EXISTS `genres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genres` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `icon` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'fas fa-book-open',
  `extra` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `genres_slug_unique` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genres`
--

LOCK TABLES `genres` WRITE;
/*!40000 ALTER TABLE `genres` DISABLE KEYS */;
/*!40000 ALTER TABLE `genres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_batches`
--

DROP TABLE IF EXISTS `job_batches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_batches`
--

LOCK TABLES `job_batches` WRITE;
/*!40000 ALTER TABLE `job_batches` DISABLE KEYS */;
/*!40000 ALTER TABLE `job_batches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint unsigned NOT NULL,
  `reserved_at` int unsigned DEFAULT NULL,
  `available_at` int unsigned NOT NULL,
  `created_at` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'0001_01_01_000000_create_users_table',1),(2,'0001_01_01_000001_create_cache_table',1),(3,'0001_01_01_000002_create_jobs_table',1),(4,'2024_05_09_151500_create_authors_table',1),(5,'2024_05_17_185027_create_books_table',1),(6,'2024_05_17_185045_create_categories_table',1),(7,'2024_05_17_185047_create_articles_table',1),(8,'2024_05_17_185113_create_tags_table',1),(9,'2024_05_17_185137_create_teams_table',1),(10,'2024_05_17_185148_create_comments_table',1),(11,'2024_05_17_193602_create_book_tags_table',1),(12,'2024_05_17_193610_create_article_tags_table',1),(13,'2024_05_17_193620_create_article_category_table',1),(14,'2024_05_17_193626_create_book_category_table',1),(15,'2024_05_23_072456_create_personal_access_tokens_table',1),(16,'2024_06_04_161012_create_orders_table',1),(17,'2024_06_04_162447_create_carts_table',1),(18,'2024_06_04_170505_create_transactions_table',1),(19,'2024_11_05_081146_change_column_in_orders_table',1),(20,'2024_11_05_081300_create_order_books_table',1),(21,'2024_11_05_095554_create_user_books_table',1),(22,'2025_06_19_171428_create_genres_table',1),(23,'2025_08_03_142758_create_sections_table',1),(24,'2025_08_03_143338_create_sectionables_table',1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_books`
--

DROP TABLE IF EXISTS `order_books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_books` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `order_id` bigint unsigned NOT NULL,
  `book_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `order_books_order_id_foreign` (`order_id`),
  KEY `order_books_book_id_foreign` (`book_id`),
  CONSTRAINT `order_books_book_id_foreign` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`),
  CONSTRAINT `order_books_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_books`
--

LOCK TABLES `order_books` WRITE;
/*!40000 ALTER TABLE `order_books` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `status` int NOT NULL DEFAULT '1',
  `book_details` json DEFAULT NULL,
  `billing_details` json DEFAULT NULL,
  `remark` longtext COLLATE utf8mb4_unicode_ci,
  `extra` json DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `orders_user_id_foreign` (`user_id`),
  CONSTRAINT `orders_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sectionables`
--

DROP TABLE IF EXISTS `sectionables`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sectionables` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `sectionable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sectionable_id` bigint unsigned NOT NULL,
  `section_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sectionables_sectionable_type_sectionable_id_index` (`sectionable_type`,`sectionable_id`),
  KEY `sectionables_section_id_foreign` (`section_id`),
  CONSTRAINT `sectionables_section_id_foreign` FOREIGN KEY (`section_id`) REFERENCES `sections` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sectionables`
--

LOCK TABLES `sectionables` WRITE;
/*!40000 ALTER TABLE `sectionables` DISABLE KEYS */;
/*!40000 ALTER TABLE `sectionables` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sections`
--

DROP TABLE IF EXISTS `sections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sections` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `order` int NOT NULL DEFAULT '0',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'article' COMMENT 'article | book',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sections_slug_unique` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sections`
--

LOCK TABLES `sections` WRITE;
/*!40000 ALTER TABLE `sections` DISABLE KEYS */;
/*!40000 ALTER TABLE `sections` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('iilE0OMoFxEOWFmBb0YMHEVGNTzIvOq6sbUpseQD',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','YTo0OntzOjY6Il90b2tlbiI7czo0MDoiT0NLNGszbWR1WTBtdVlTWFRKUkZrcVprWXkyd1JjNzNOamswN3c0RSI7czoyMjoiUEhQREVCVUdCQVJfU1RBQ0tfREFUQSI7YTowOnt9czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC92Mi9qcy9ob21lIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==',1774123413),('PCImPu58jC1yTddvYz38wBy71GkxscS7f7uk0QzE',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36','YTo0OntzOjY6Il90b2tlbiI7czo0MDoiWUQ1UnJieHJFWGxUZ2NJdG9iYjB2V0hSaVhYaEFSZW4yUW9EelZWNSI7czoyMjoiUEhQREVCVUdCQVJfU1RBQ0tfREFUQSI7YTowOnt9czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mjk6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC92Mi9ob21lIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==',1774356551);
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tags`
--

DROP TABLE IF EXISTS `tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tags` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tags`
--

LOCK TABLES `tags` WRITE;
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;
INSERT INTO `tags` VALUES (1,'Pedro McCullough','pedro-mccullough',NULL,'2026-02-17 09:32:31','2026-02-17 09:32:31'),(2,'Landen Becker','landen-becker',NULL,'2026-02-17 09:32:31','2026-02-17 09:32:31'),(3,'Abigale Dickens','abigale-dickens',NULL,'2026-02-17 09:32:31','2026-02-17 09:32:31'),(4,'Barney Rowe DVM','barney-rowe-dvm',NULL,'2026-02-17 09:32:31','2026-02-17 09:32:31'),(5,'Hiram Jenkins','hiram-jenkins',NULL,'2026-02-17 09:32:31','2026-02-17 09:32:31'),(6,'Valentina Feeney','valentina-feeney',NULL,'2026-02-17 09:32:31','2026-02-17 09:32:31'),(7,'Dulce Sanford','dulce-sanford',NULL,'2026-02-17 09:32:31','2026-02-17 09:32:31'),(8,'Lola Mosciski','lola-mosciski',NULL,'2026-02-17 09:32:31','2026-02-17 09:32:31'),(9,'Reyes Ullrich','reyes-ullrich',NULL,'2026-02-17 09:32:31','2026-02-17 09:32:31'),(10,'Ms. Maximillia Leffler MD','ms-maximillia-leffler-md',NULL,'2026-02-17 09:32:31','2026-02-17 09:32:31');
/*!40000 ALTER TABLE `tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teams`
--

DROP TABLE IF EXISTS `teams`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teams` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `social` json DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teams`
--

LOCK TABLES `teams` WRITE;
/*!40000 ALTER TABLE `teams` DISABLE KEYS */;
/*!40000 ALTER TABLE `teams` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transactions` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `order_id` bigint unsigned NOT NULL,
  `total_amount` double NOT NULL,
  `status` int NOT NULL DEFAULT '1' COMMENT '1 pending',
  `details` json NOT NULL COMMENT 'order details',
  `extra` json DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `transactions_user_id_foreign` (`user_id`),
  KEY `transactions_order_id_foreign` (`order_id`),
  CONSTRAINT `transactions_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  CONSTRAINT `transactions_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_books`
--

DROP TABLE IF EXISTS `user_books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_books` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `book_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_books_user_id_foreign` (`user_id`),
  KEY `user_books_book_id_foreign` (`book_id`),
  CONSTRAINT `user_books_book_id_foreign` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`),
  CONSTRAINT `user_books_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_books`
--

LOCK TABLES `user_books` WRITE;
/*!40000 ALTER TABLE `user_books` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'user',
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Mrs. Cathryn Bahringer III','cremin.kathryn@example.org','2026-02-17 09:32:30','$2y$12$4D3y6CtMqfc/8Gjxm.WMsO1iiUW4sJCY0uwnsix3CoC5onKZrfTQy','user','G8GPVDwTvw','2026-02-17 09:32:31','2026-02-17 09:32:31',NULL),(2,'Dortha Rogahn','rodger.cummings@example.com','2026-02-17 09:32:31','$2y$12$4D3y6CtMqfc/8Gjxm.WMsO1iiUW4sJCY0uwnsix3CoC5onKZrfTQy','user','4cO5l4Y4T9','2026-02-17 09:32:31','2026-02-17 09:32:31',NULL),(3,'Royce Raynor','lind.nyasia@example.net','2026-02-17 09:32:31','$2y$12$4D3y6CtMqfc/8Gjxm.WMsO1iiUW4sJCY0uwnsix3CoC5onKZrfTQy','user','calzQjiVPR','2026-02-17 09:32:31','2026-02-17 09:32:31',NULL),(4,'Prof. Grant Kozey DDS','hstiedemann@example.org','2026-02-17 09:32:31','$2y$12$4D3y6CtMqfc/8Gjxm.WMsO1iiUW4sJCY0uwnsix3CoC5onKZrfTQy','user','8OqLkckvx4','2026-02-17 09:32:31','2026-02-17 09:32:31',NULL),(5,'Claudia Klein','alta.watsica@example.org','2026-02-17 09:32:31','$2y$12$4D3y6CtMqfc/8Gjxm.WMsO1iiUW4sJCY0uwnsix3CoC5onKZrfTQy','user','y8Q5V054WM','2026-02-17 09:32:31','2026-02-17 09:32:31',NULL),(6,'Mrs. Deanna Jacobson','kacey.kreiger@example.org','2026-02-17 09:32:31','$2y$12$4D3y6CtMqfc/8Gjxm.WMsO1iiUW4sJCY0uwnsix3CoC5onKZrfTQy','user','yzcM5KJqTN','2026-02-17 09:32:31','2026-02-17 09:32:31',NULL),(7,'Carson Jerde DDS','ooberbrunner@example.org','2026-02-17 09:32:31','$2y$12$4D3y6CtMqfc/8Gjxm.WMsO1iiUW4sJCY0uwnsix3CoC5onKZrfTQy','user','M0yufgGRrN','2026-02-17 09:32:31','2026-02-17 09:32:31',NULL),(8,'Andrew Russel DVM','asia.muller@example.org','2026-02-17 09:32:31','$2y$12$4D3y6CtMqfc/8Gjxm.WMsO1iiUW4sJCY0uwnsix3CoC5onKZrfTQy','user','RoXdAFUEDU','2026-02-17 09:32:31','2026-02-17 09:32:31',NULL),(9,'Dangelo Rutherford MD','rudolph.bechtelar@example.net','2026-02-17 09:32:31','$2y$12$4D3y6CtMqfc/8Gjxm.WMsO1iiUW4sJCY0uwnsix3CoC5onKZrfTQy','user','mIjgt5DWbm','2026-02-17 09:32:31','2026-02-17 09:32:31',NULL),(10,'Randal Hirthe','marlen.schmidt@example.net','2026-02-17 09:32:31','$2y$12$4D3y6CtMqfc/8Gjxm.WMsO1iiUW4sJCY0uwnsix3CoC5onKZrfTQy','user','87bmgTMjhR','2026-02-17 09:32:31','2026-02-17 09:32:31',NULL),(11,'Jason Kuvalis','bashirian.antwon@example.net','2026-02-17 09:32:31','$2y$12$4D3y6CtMqfc/8Gjxm.WMsO1iiUW4sJCY0uwnsix3CoC5onKZrfTQy','user','9itIqSXkFd','2026-02-17 09:32:31','2026-02-17 09:32:31',NULL),(12,'Prof. Abelardo Rath DDS','keon31@example.org','2026-02-17 09:32:31','$2y$12$4D3y6CtMqfc/8Gjxm.WMsO1iiUW4sJCY0uwnsix3CoC5onKZrfTQy','user','ZSgfxupPvO','2026-02-17 09:32:31','2026-02-17 09:32:31',NULL),(13,'Marie Shields DDS','walker.makenzie@example.org','2026-02-17 09:32:31','$2y$12$4D3y6CtMqfc/8Gjxm.WMsO1iiUW4sJCY0uwnsix3CoC5onKZrfTQy','user','AjNt8yYg6u','2026-02-17 09:32:31','2026-02-17 09:32:31',NULL),(14,'Shana Parisian V','otto74@example.net','2026-02-17 09:32:31','$2y$12$4D3y6CtMqfc/8Gjxm.WMsO1iiUW4sJCY0uwnsix3CoC5onKZrfTQy','user','Rl8lq4E5Ff','2026-02-17 09:32:31','2026-02-17 09:32:31',NULL),(15,'Mrs. Mozelle Gislason DVM','gerson15@example.com','2026-02-17 09:32:31','$2y$12$4D3y6CtMqfc/8Gjxm.WMsO1iiUW4sJCY0uwnsix3CoC5onKZrfTQy','user','D3orrsnAWv','2026-02-17 09:32:31','2026-02-17 09:32:31',NULL),(16,'Kamryn Bednar','ramon.parker@example.com','2026-02-17 09:32:31','$2y$12$4D3y6CtMqfc/8Gjxm.WMsO1iiUW4sJCY0uwnsix3CoC5onKZrfTQy','user','gTMY4bB0RX','2026-02-17 09:32:31','2026-02-17 09:32:31',NULL),(17,'Hilton Walter','eschinner@example.com','2026-02-17 09:32:31','$2y$12$4D3y6CtMqfc/8Gjxm.WMsO1iiUW4sJCY0uwnsix3CoC5onKZrfTQy','user','gwK3prPbOX','2026-02-17 09:32:31','2026-02-17 09:32:31',NULL),(18,'Miss Lizzie Moore','edd30@example.net','2026-02-17 09:32:31','$2y$12$4D3y6CtMqfc/8Gjxm.WMsO1iiUW4sJCY0uwnsix3CoC5onKZrfTQy','user','1jISCOWzNl','2026-02-17 09:32:31','2026-02-17 09:32:31',NULL),(19,'Germaine Medhurst','mfeil@example.net','2026-02-17 09:32:31','$2y$12$4D3y6CtMqfc/8Gjxm.WMsO1iiUW4sJCY0uwnsix3CoC5onKZrfTQy','user','aSZ1ak9ncy','2026-02-17 09:32:31','2026-02-17 09:32:31',NULL),(20,'Augusta Becker','klein.gerry@example.org','2026-02-17 09:32:31','$2y$12$4D3y6CtMqfc/8Gjxm.WMsO1iiUW4sJCY0uwnsix3CoC5onKZrfTQy','user','IZFa3ONhho','2026-02-17 09:32:31','2026-02-17 09:32:31',NULL),(21,'Carli Brekke Sr.','willy.schimmel@example.com','2026-02-17 09:32:31','$2y$12$4D3y6CtMqfc/8Gjxm.WMsO1iiUW4sJCY0uwnsix3CoC5onKZrfTQy','user','7ZDTMZYOnf','2026-02-17 09:32:31','2026-02-17 09:32:31',NULL),(22,'Dr. Maverick Shields Sr.','willie80@example.com','2026-02-17 09:32:31','$2y$12$4D3y6CtMqfc/8Gjxm.WMsO1iiUW4sJCY0uwnsix3CoC5onKZrfTQy','user','6ZxWwFEgz2','2026-02-17 09:32:31','2026-02-17 09:32:31',NULL),(23,'Monte Legros','terrill.upton@example.org','2026-02-17 09:32:31','$2y$12$4D3y6CtMqfc/8Gjxm.WMsO1iiUW4sJCY0uwnsix3CoC5onKZrfTQy','user','IlPrmJbYX5','2026-02-17 09:32:31','2026-02-17 09:32:31',NULL),(24,'Lynn Braun','pagac.mathias@example.org','2026-02-17 09:32:31','$2y$12$4D3y6CtMqfc/8Gjxm.WMsO1iiUW4sJCY0uwnsix3CoC5onKZrfTQy','user','lslOto0YuG','2026-02-17 09:32:31','2026-02-17 09:32:31',NULL),(25,'Shanelle Legros III','collins.dayne@example.com','2026-02-17 09:32:31','$2y$12$4D3y6CtMqfc/8Gjxm.WMsO1iiUW4sJCY0uwnsix3CoC5onKZrfTQy','user','OtCePvOKfX','2026-02-17 09:32:31','2026-02-17 09:32:31',NULL),(26,'Roy Dickens','cynthia.parker@example.org','2026-02-17 09:32:31','$2y$12$4D3y6CtMqfc/8Gjxm.WMsO1iiUW4sJCY0uwnsix3CoC5onKZrfTQy','user','qD6MDRyePz','2026-02-17 09:32:31','2026-02-17 09:32:31',NULL),(27,'Kip Greenholt','hill.abe@example.net','2026-02-17 09:32:31','$2y$12$4D3y6CtMqfc/8Gjxm.WMsO1iiUW4sJCY0uwnsix3CoC5onKZrfTQy','user','JGukBkE3O3','2026-02-17 09:32:31','2026-02-17 09:32:31',NULL),(28,'Penelope Boyer','qruecker@example.com','2026-02-17 09:32:31','$2y$12$4D3y6CtMqfc/8Gjxm.WMsO1iiUW4sJCY0uwnsix3CoC5onKZrfTQy','user','FXFq3768xo','2026-02-17 09:32:31','2026-02-17 09:32:31',NULL),(29,'Kelsie Kuhlman','rowe.alyce@example.com','2026-02-17 09:32:31','$2y$12$4D3y6CtMqfc/8Gjxm.WMsO1iiUW4sJCY0uwnsix3CoC5onKZrfTQy','user','YjJNO3pJeP','2026-02-17 09:32:31','2026-02-17 09:32:31',NULL),(30,'Gonzalo Harris','jleannon@example.com','2026-02-17 09:32:31','$2y$12$4D3y6CtMqfc/8Gjxm.WMsO1iiUW4sJCY0uwnsix3CoC5onKZrfTQy','user','a1R18rdGQO','2026-02-17 09:32:31','2026-02-17 09:32:31',NULL),(31,'Test User','test@example.com',NULL,'$2y$12$t.RaMqCjs6yRiiRx8vAjKu2UgRz1osKNDnLoUPu6HXs5yYKbyQB12','admin',NULL,'2026-02-17 09:32:31','2026-02-17 09:32:31',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'susanepal'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-23 22:25:37
