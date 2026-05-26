-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: May 24, 2026 at 06:52 AM
-- Server version: 10.6.26-MariaDB
-- PHP Version: 8.4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `susanepa_live`
--

-- --------------------------------------------------------

--
-- Table structure for table `articles`
--

CREATE TABLE `articles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `author_id` bigint(20) UNSIGNED DEFAULT NULL,
  `thumbnail_image` varchar(255) NOT NULL,
  `content_image` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1 COMMENT '1 on | 0 off',
  `description` varchar(255) NOT NULL,
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`content`)),
  `type` varchar(255) NOT NULL,
  `uploaded_by` bigint(20) UNSIGNED NOT NULL,
  `extra` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`extra`)),
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `view_count` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `articles`
--

INSERT INTO `articles` (`id`, `title`, `slug`, `author_id`, `thumbnail_image`, `content_image`, `status`, `description`, `content`, `type`, `uploaded_by`, `extra`, `deleted_at`, `created_at`, `updated_at`, `view_count`) VALUES
(1, 'My Past Experience with Holy Spirit', 'my-past-experience-with-holy-spirit', 2, 'articles/CnN04pf4tIROqvku8i5c.webp', 'articles/QlkesLPivJ0CKcH0VUPj.webp', 1, 'I was brought up in an animistic religious culture, where we used to worship nature and ancestral spirits, to show us the path they have trodden in th...', '\"<p>I was brought up in an animistic religious culture, where we used to worship nature and ancestral spirits, to show us the path they have trodden in the walk of life and the afterlife. So, when I started going to the church in my adolescence, I observed people evoking the name of Holy Spirit during worship time. At that moment people used to cry and shout in loud voice. The worship leader used to declare that now the Holy Spirit has come in our midst. We were instructed to open our hearts to Him, so that He could work in our lives. The pastor or religious leaders used to move around, touching people (sometime laying people down on ground), and calling out loudly that this person has done certain things and that they need to repent before God. People who talked in tongues, were considered spiritually elite and glossolalia was seen as the major sign of a Spirit-filled person. Hence, everybody sought to speak in tongues.<\\/p><p>At first, I found this act similar to ancestral worship, where the shaman evokes the name of ancestral spirits for certain illumination. Also, during that time, the shaman is possessed by the spirits and reveals hidden things that the person has done.<\\/p><p>When I became Christian during high school, I was overwhelmed by Jesus\\u2019 sacrifice and the Father\\u2019s love. But I was afraid of the presence of Holy Spirit. I was especially afraid during the worship time, when I feared He would expose my sins publicly. He would embarrass me.<\\/p><p>Countless times, I tried to mimic glossolalia, I never had any success. Once someone tried to lay me down on ground by the power of the Holy Spirit. But I would not. These kinds of experiences brought an inner-struggle to me. I felt that I must not have the Holy Spirit.<\\/p><p>But then I found Reformed theology. Through the Reformed tradition, I found that the Holy Spirit is ever-present in me. He is the one who regenerated me in the first place! In fact, only after His regenerative work was I able to accept Jesus as my Lord and Savior. He is continuously renewing me, providing strength in my weakness, and leading me to repentance. He does not embarrass me in my sin. Rather, I am being renewed day by day.<\\/p>\"', 'Article', 1, NULL, NULL, '2024-11-28 17:53:16', '2026-04-14 06:51:06', 196),
(2, 'Council, Creeds and their Heroes and Heretics: Niceno-Constantinople Creed', 'council-creeds-and-their-heroes-and-heretics-niceno-constantinople-creed', 3, 'articles/wwplE3t7x1JHypplxvo2.jpg', 'articles/trZfz1wfTjDGUELIaXrG.jpg', 1, 'After the Council of Nicea dealt with the Arian heresy, many other unorthodoxy heresies came along to challenge the mainstream Christianity. One schol...', '\"<p>After the Council of Nicea dealt with the Arian heresy, many other unorthodoxy heresies came along to challenge the mainstream Christianity. One scholar compared heresies with an ancient Greek mythical three-headed creature Hydra. The more its head is chopped off, the more it grows! This comparison is probably true because as soon as the Arian heresy is chopped off, another heretical head grew up that sought to devour orthodoxy. This heresy is none other than the doctrine of <i>monophysitism<\\/i> (one nature). The evidences show that this heresy had sprung up from the docetic heresy that claimed that Christ did not have true physical body rather he just looked like a human body, but in actuality he is a sprite, a disembodied spirit! It is also sprung from the over-reaction to Arianism.<\\/p><figure class=\\\"image\\\"><img style=\\\"aspect-ratio:474\\/474;\\\" src=\\\"http:\\/\\/localhost\\/susanepal\\/wp-content\\/uploads\\/2023\\/03\\/hydra-1.jpeg\\\" alt=\\\"\\\" srcset=\\\"http:\\/\\/localhost\\/susanepal\\/wp-content\\/uploads\\/2023\\/03\\/hydra-1.jpeg 474w, http:\\/\\/localhost\\/susanepal\\/wp-content\\/uploads\\/2023\\/03\\/hydra-1-300x300.jpeg 300w, http:\\/\\/localhost\\/susanepal\\/wp-content\\/uploads\\/2023\\/03\\/hydra-1-150x150.jpeg 150w, http:\\/\\/localhost\\/susanepal\\/wp-content\\/uploads\\/2023\\/03\\/hydra-1-100x100.jpeg 100w\\\" sizes=\\\"100vw\\\" width=\\\"474\\\" height=\\\"474\\\"><\\/figure><p><strong>The Heretical Hydrian Head of Apollinarism<\\/strong><\\/p><p>The two giant theologians propagated this unbiblical doctrine in two different ways; nonetheless, both denied the true and proper humanity of Christ. The first one was Apollinarius who was a pupil and close friend of Athanasius. Athanasius had vehemently defended the divinity of Christ; however, he was unsure whether or not Christ had a human mind. Apollinaris tried to solve this problem by stressing Christ\\u2019s divinity but rejecting, if not reducing, his absolute humanity. He argued that Christ\\u2019s normal, fallible human mind and spirit was replaced or usurped by the Word. In other words, God incarnate in human flesh is Mind, which cannot be overcome by the passions of soul and flesh, because the divine energy fulfils the role of animating spirit and of the human mind. Christ\\u2019s two natures \\u2018being \\u201cmixed\\u201d or \\u201ccommingled\\u201d, but this always leaves the divine nature unaffected.<\\/p><p>Since the human mind is enslaved to sin, how the divine Word could assume a human mind and spirit was Apollinarius\\u2019 crucial argument in denying Christ\\u2019s humanity. As his theory was condemned by a synod of Alexandria in 362, Apollinaris slightly altered his theory by arguing that Jesus had at least the body and animal soul of a man, yet he denied the proper humanity of Christ. In other words, Christ had a soul of a man but he is not truly human. He is almost certainly human but not fully human.<\\/p><p>Apollinarius saw a big problem in Christ\\u2019s two natures indwelling together without any conflict. He argued that Christ\\u2019s two natures\\u2019 dwelling together is incompatible; if that occurred then there would be perpetual turmoil, distracted by the conflicting wishes of the elements of which it consists. Eventually, his view pushed him even to doubt Christ\\u2019s real incarnation and his human psychology as he strongly asserted that Christ is not man, though like man since He is not consubstantial with man in the most important element.<\\/p><p><strong>The Heretical Hydrian Head of Eutychianism<\\/strong><\\/p><p>Another head of heretical Hydra is Eutyches who aligned with Apollinarius in the similar fashion. Eutyches claimed that Christ\\u2019s humanity had been swallowed up by his divinity in the union [i.e. incarnation].&nbsp; Before the union he believed that Christ had two natures; but after the union the humanity and divinity of Christ had fused into one nature. He said that the humanity of Christ is like a drop of vinegar that is dissolved in the ocean. In other words, Christ\\u2019s humanity is there in the ocean of divinity, yet in a very tiniest manner.<\\/p><p>God raised the Cappadocian fathers, namely Basil, bishop of Cappadocian Caesarea, Gregory, bishop of Nyssa, and Gregory of Nazianzus to chop off this the head of Hydra. They strongly condemned <i>monophysitism<\\/i>. Having adhered to Nicaean Creed, they advocated Christ\\u2019s two natures (dyophysite<i>),<\\/i> which are perfectly <i>homoousios<\\/i> (same or equal) to God and perfectly <i>homoousios<\\/i> (same or equal) to man, except sin. Gregory of Nazianzus declared that the most grievous item of all in the woes of the Church is the boldness of the Apollinarians. He rightly questioned that if Christ\\u2019s manhood is without soul, then they may attribute his Passion to the Godhead, as that which gives motion to the body is also that which suffers. But if he has a soul, and yet is without a mind, how is he man, for man is not a mindless animal? If anyone had put his trust in him as a man without a human mind, he further wrote, he is wholly bereft of mind, and quite unworthy of salvation. This shows that if the church believes in the mindless human Christ then we are doomed and loose the salvation. To say Christ had a human body and yet no human mind is to believe a body without head.<\\/p><p><strong>The Creed of the Council of Constantinople in 381 A.D.<\\/strong><\\/p><p>The Apollorian heresy and Eutychian heresy were both condemned at the council of Constantinople in 381<strong>.<\\/strong>&nbsp; Additionally, Arius was deposed at Nicaea, but his influence didn\\u2019t cease to spread.Arianism appeared in the form of \\u201csemi-Arianism\\u201d and \\u201cextreme Arianism\\u201d. Therefore, the second ecumenical council condemned Arius again as a heretic. Then the Niceno-Constantinopolitan creed was composed and made the sole legal religion in the empire.<\\/p>\"', 'Article', 1, NULL, NULL, '2024-11-28 18:09:46', '2025-12-05 05:01:07', 19),
(3, 'Council, Creeds and their Heroes and Heretics: Nicea Creed', 'council-creeds-and-their-heroes-and-heretics-nicea-creed', 3, 'articles/Gn2uBpccV3vj35kuiVnh.jpg', 'articles/FrmVlGK6pzyWZZBNBgx1.jpg', 1, 'IntroductionThere were many philosophical and heretical storms blowing, threatening to destroy the true Church’s doctrines laid down by the apostles....', '\"<h2><strong>Introduction<\\/strong><\\/h2><p>There were many philosophical and heretical storms blowing, threatening to destroy the true Church\\u2019s doctrines laid down by the apostles. Simultaneously, the two predominating rival heavyweights, namely the school of Antioch and Alexandria, clashed in their teachings of the doctrine of the Person of Christ and as a result, produced champions of orthodoxy and heresy. In order to approve the Scripturally attested doctrines and anathematize the heretics and their heresies, in systematic debates and discussions, many church councils were held in different parts of the Empire. We will explore four general councils and their heroes and heretics along with their Christological teachings.<\\/p><p>&nbsp;<\\/p><h3><strong>Hero &amp; Heretic of the Council of Nicaea: The Christological clash between the heterodoxy of Arius and the orthodoxy of Athanasius<\\/strong><\\/h3><p>Soon after the rise of the Christianity during the reign of Constantine, the first Christian Emperor, the school of Antioch produced a scholarly giant, Arius (c. 250-336), an elder in Alexandria. He was heavily influenced by Origen\\u2019s doctrine of subordination and Sabellius\\u2019 doctrine of Monarchianism. Moreover, he also borrowed the teaching of Adoptionism propagated by Paul of Samosata, and his own teacher Lucian\\u2019s teaching of the Son\\u2019s as not fully divine. Stoic and Platonic philosophies were perfectly blended in his theology, which pushed Arius even further than earlier heretics. This then laid the foundation of the most dangerous heresy the church had encountered.<\\/p><p>Arius advocated One God, who is alone unbegun, unbegotten, unoriginated, possessing immortality, and eternal. This is why he argued that it is impossible to be another God in the proper sense of the word beside Him. Initially, the notion of two Gods tempted him at some point, but he balanced his doctrine by placing the Son somewhere between God and man, if not, neither God nor man (tertium quid). He reasoned that the Son is neither part of God, nor of any lower essence, rather Jesus\\u2019 deity had been partially derived from the Father. For him, the Son was homoiousios (of similar substance), but never homoousios (of same substance) with God the Father.<\\/p><p>Despite Origen\\u2019s teaching influenced him, he avoided the idea of a hierarchy in the Godhead, as well as the doctrine of Son\\u2019s eternal generation. Even if the Son is God, he claimed, He is God merely by the participation in grace and merely because of the name only. This suggests that Arius seemed to be saying that the Father declared Jesus God only by the virtue of the gift of divinity. In this way, having safeguarding the One infinite God, he limited Jesus\\u2019 divinity. In addition, he argued that it is impossible for God to suffer. Since Jesus suffered on the cross, he claimed, that the Son couldn\\u2019t be truly divine.<\\/p><p>However, he did not make the Son an ordinary creature, rather he believed him to be the special and perfect product, made out of nothing before all ages. He was created for our sake in order that God should create us through him as an instrument. Since the Son was not co-equal and co-eternal with the Father, there was surely the time when the Son was not. He argued that before he was begotten, or created or determined or established he did not exist. Unlike the Father, the Son is finite, which means he is mutable or subject of change, even liable to sin; so, the created order couldn\\u2019t bear the weight of the direct action of the increate and eternal God. Jesus\\u2019 humanity was overstated and hyper-exalted, but his divinity was completely discarded by Arius.<\\/p><p>God raised a hero of Christology, namely Athanasius (c. 293-373) to counter Arian heresy. Athanasius, safeguarding the deity of the Son, argued that if Christ is the creature he has no ability to redeem another creature and he is not a redeemer at all. It is only God that can save, and if Christ is a saviour, then he has to be God. Athanasius rightly argued that even if the Son was the supreme creature, it is an idolatry to worship a creature. Jesus is not just like God, but he is God co-equal and co-eternal with the Father. He is not merely a creature, but a creator himself! Over against Arius\\u2019 argument, Athanasius argued that there was never a time when the Son was not because the Son did not come into existence in time and space but rather he already existed as God from the eternity past. For this very reason, the Son must be worshipped along with the Father. He famously said that the Son of God became man so that we might become God. Only God can save, and not a creature is Athanasius\\u2019 recurring strong argument that smashed Arius\\u2019 heretical claims into pieces.<\\/p><p>Arius is probably the father Jehovah\\u2019s Witness, Mormon, Zion Church and all modern Christological heresy that deny Jesus as God. The council of Nicaea (c. 325) condemned Arius overwhelmingly as a heretic and subsequently exiled him. This was the first ecumenical Church council that had taken her first great step to define doctrine more precisely in response to a challenge from a heretical theology. The formation of the anti-Arian confession secured the divinity of the Son as consubstantial with the Father. The anathemas were added at the end of the creed: \\u201cThere was when he was not,\\u201d and \\u201cbefore his generation he was not,\\u201d and \\u201cHe came to be from nothing,\\u201d or those who pretend that the Son of God is of other reality [hypostasis] or substance [ousia], the catholic and apostolic church anathematizes. After the Council of Nicaea, it was mainly by way of reaction to heresy that the Catholic Church went on to formulate her belief more and more explicitly.<br>&nbsp;<\\/p><p><a href=\\\"http:\\/\\/localhost\\/susanepal\\/tag\\/rev-suraj-kasula\\/\\\">Rev. Suraj Kasula<\\/a><\\/p>\"', 'Article', 1, NULL, NULL, '2024-11-28 18:12:46', '2026-02-01 09:39:21', 20),
(4, 'क्यारोलः खेल्ने, गाउने, नाच्ने कि खाने हो ?', 'kayaral-khalna-gauna-nacana-ka-khana-ha', 4, 'articles/Xy4mjPgqiyUZAMxSTpTt.jpg', 'articles/869cYVlV62KRwluQtFZB.jpg', 1, 'ख्रीष्टमस अर्थात बडादिनको पूर्वसन्ध्यामा नेपाली मण्डलीहरूले अभ्यास गर्दै आएको एउटा विशेष कार्यक्रम हो क्यारोल । यसलाई सामान्य भाषामा क्यारोल खेल्ने पन...', '\"<p>\\u0916\\u094d\\u0930\\u0940\\u0937\\u094d\\u091f\\u092e\\u0938 \\u0905\\u0930\\u094d\\u0925\\u093e\\u0924 \\u092c\\u0921\\u093e\\u0926\\u093f\\u0928\\u0915\\u094b \\u092a\\u0942\\u0930\\u094d\\u0935\\u0938\\u0928\\u094d\\u0927\\u094d\\u092f\\u093e\\u092e\\u093e \\u0928\\u0947\\u092a\\u093e\\u0932\\u0940 \\u092e\\u0923\\u094d\\u0921\\u0932\\u0940\\u0939\\u0930\\u0942\\u0932\\u0947 \\u0905\\u092d\\u094d\\u092f\\u093e\\u0938 \\u0917\\u0930\\u094d\\u0926\\u0948 \\u0906\\u090f\\u0915\\u094b \\u090f\\u0909\\u091f\\u093e \\u0935\\u093f\\u0936\\u0947\\u0937 \\u0915\\u093e\\u0930\\u094d\\u092f\\u0915\\u094d\\u0930\\u092e \\u0939\\u094b \\u0915\\u094d\\u092f\\u093e\\u0930\\u094b\\u0932 \\u0964 \\u092f\\u0938\\u0932\\u093e\\u0908 \\u0938\\u093e\\u092e\\u093e\\u0928\\u094d\\u092f \\u092d\\u093e\\u0937\\u093e\\u092e\\u093e \\u0915\\u094d\\u092f\\u093e\\u0930\\u094b\\u0932 \\u0916\\u0947\\u0932\\u094d\\u0928\\u0947 \\u092a\\u0928\\u093f \\u092d\\u0928\\u093f\\u0928\\u094d\\u091b \\u0964 \\u091c\\u0941\\u0928 \\u0938\\u2013\\u0938\\u093e\\u0928\\u094b \\u091d\\u0941\\u0923\\u094d\\u0921 \\u092c\\u0928\\u093e\\u090f\\u0930 \\u092e\\u0923\\u094d\\u0921\\u0932\\u0940\\u0939\\u0930\\u0942\\u0932\\u0947 \\u092a\\u094d\\u0930\\u093e\\u092f\\u0903 \\u092a\\u094d\\u0930\\u0924\\u094d\\u092f\\u0947\\u0915 \\u0935\\u093f\\u0936\\u094d\\u0935\\u093e\\u0938\\u0940\\u0915\\u094b \\u0918\\u0930\\u2013\\u0918\\u0930\\u092e\\u093e \\u0917\\u090f\\u0930 \\u0935\\u093e \\u0938\\u094d\\u0925\\u093e\\u0928 \\u0935\\u093f\\u0936\\u0947\\u0937 \\u0938\\u093e\\u092e\\u0941\\u0939\\u093f\\u0915 \\u0930\\u0942\\u092a\\u092e\\u093e \\u0916\\u0947\\u0932\\u094d\\u0928\\u0947 \\u0917\\u0930\\u0947\\u0915\\u094b \\u092a\\u093e\\u0908\\u0928\\u094d\\u091b \\u0964 \\u091c\\u0939\\u093e\\u0901 \\u0935\\u093f\\u0936\\u0947\\u0937 \\u0917\\u0930\\u0947\\u0930 \\u092c\\u093e\\u091c\\u093e\\u0917\\u093e\\u091c\\u093e \\u0938\\u0939\\u093f\\u0924, \\u0916\\u094d\\u0930\\u0940\\u0937\\u094d\\u091f\\u0915\\u094b \\u091c\\u0928\\u094d\\u092e\\u0938\\u0901\\u0917 \\u0938\\u092e\\u094d\\u092c\\u0928\\u094d\\u0927\\u093f\\u0924 \\u0917\\u093e\\u0928\\u093e\\u0939\\u0930\\u0942 \\u0917\\u093e\\u0909\\u0901\\u0926\\u0948 \\u0928\\u093e\\u091a\\u094d\\u0926\\u0948 \\u0905\\u0928\\u093f \\u092a\\u0930\\u092e\\u0947\\u0936\\u094d\\u0935\\u0930\\u0915\\u094b \\u0935\\u091a\\u0928\\u092c\\u093e\\u091f \\u092a\\u094d\\u0930\\u091a\\u093e\\u0930 \\u0917\\u0930\\u094d\\u0926\\u0948 \\u0938\\u092e\\u094d\\u092d\\u0935 \\u092d\\u090f \\u0935\\u0930\\u093f\\u092a\\u0930\\u093f\\u0915\\u093e \\u0905\\u2013\\u0907\\u0938\\u093e\\u0908 \\u091b\\u093f\\u092e\\u0947\\u0915\\u0940\\u0939\\u0930\\u0942\\u0932\\u093e\\u0908 \\u092a\\u0928\\u093f \\u092c\\u094b\\u0932\\u093e\\u090f\\u0930 \\u0938\\u0941\\u0938\\u092e\\u093e\\u091a\\u093e\\u0930 \\u0938\\u0941\\u0928\\u093e\\u0909\\u0928\\u0947 \\u090f\\u0915 \\u0905\\u0935\\u0938\\u0930\\u0915\\u094b \\u0930\\u0942\\u092a\\u092e\\u093e \\u092a\\u0928\\u093f \\u092f\\u0938\\u0932\\u093e\\u0908 \\u0932\\u093f\\u0907\\u0928\\u094d\\u091b \\u0964 \\u0915\\u0924\\u093f\\u092a\\u092f \\u0920\\u093e\\u0909\\u0901\\u0939\\u0930\\u0942\\u0924\\u093f\\u0930 \\u0935\\u093f\\u0936\\u0947\\u0937 \\u092d\\u0947\\u091f\\u0940 \\u092a\\u0928\\u093f \\u0909\\u0920\\u093e\\u0909\\u0928\\u0947 \\u0917\\u0930\\u093f\\u0928\\u094d\\u091b \\u0964 \\u0905\\u0928\\u094d\\u0924\\u093f\\u092e\\u092e\\u093e \\u092e\\u093f\\u0937\\u094d\\u0920\\u093e\\u0928\\u094d\\u0928 \\u092d\\u094b\\u091c\\u0928\\u0926\\u094d\\u0927\\u093e\\u0930\\u093e \\u0938\\u092e\\u093e\\u0939\\u093f\\u0924 \\u0939\\u0941\\u0928\\u094d\\u091b \\u0964<\\/p><p>\\u0936\\u0939\\u0930\\u0940\\u0915\\u0930\\u0923\\u0915\\u094b \\u092a\\u094d\\u0930\\u092d\\u093e\\u0935 \\u0930 \\u0938\\u093e\\u0902\\u0938\\u094d\\u0915\\u0943\\u0924\\u093f\\u0915 \\u092a\\u0930\\u093f\\u0935\\u0947\\u0936\\u0932\\u0947 \\u092f\\u0938\\u0915\\u094b \\u0938\\u094d\\u0935\\u0930\\u0942\\u092a\\u092e\\u093e \\u0905\\u0932\\u093f \\u092a\\u0930\\u093f\\u0935\\u0930\\u094d\\u0924\\u0928 \\u0939\\u0941\\u0901\\u0926 \\u0917\\u0907\\u0930\\u0939\\u0947\\u0915\\u094b \\u092a\\u093e\\u0907\\u0928\\u094d\\u091b \\u0964 \\u0936\\u0939\\u0930\\u0924\\u093f\\u0930 \\u092a\\u094d\\u0930\\u0936\\u0938\\u094d\\u0924 \\u0920\\u093e\\u0909\\u0901\\u0915\\u094b \\u0905\\u092d\\u093e\\u0935\\u0915\\u093e \\u0938\\u093e\\u0925\\u0948 \\u091c\\u092e\\u0918\\u091f\\u0932\\u0947 \\u0909\\u0924\\u094d\\u092a\\u0928\\u094d\\u0928 \\u0917\\u0930\\u093e\\u0909\\u0928\\u0947 \\u0927\\u094d\\u0935\\u0928\\u0940\\u0932\\u0947 \\u091b\\u093f\\u092e\\u0947\\u0915\\u0940\\u0932\\u093e\\u0908 \\u0938\\u0902\\u0935\\u0947\\u0926\\u0928\\u0936\\u0940\\u0932 \\u0917\\u0930\\u093e\\u0909\\u0928\\u0947 \\u0939\\u0941\\u0928\\u093e\\u0932\\u0947 \\u0938\\u093e\\u0928\\u093e\\u0924\\u093f\\u0928\\u093e \\u092d\\u0947\\u091f\\u0918\\u093e\\u091f\\u092e\\u0948 \\u0938\\u0940\\u092e\\u093f\\u0924 \\u0939\\u0941\\u0928 \\u0925\\u093e\\u0932\\u0947\\u0915\\u094b \\u091b \\u0964 \\u0938\\u093e\\u0902\\u0938\\u094d\\u0915\\u0943\\u0924\\u093f\\u0915 \\u092a\\u0930\\u093f\\u0935\\u0947\\u0936\\u0915\\u094b \\u0938\\u0928\\u094d\\u0926\\u0930\\u094d\\u092d\\u092e\\u093e \\u0939\\u0947\\u0930\\u094d\\u0928\\u0947 \\u0939\\u094b \\u092d\\u0928\\u0947 \\u0924\\u093f\\u0939\\u093e\\u0930\\u092e\\u093e \\u0916\\u0947\\u0932\\u093f\\u0928\\u0947 \\u0926\\u0947\\u0909\\u0938\\u0940\\u092d\\u0948\\u0932\\u094b \\u091c\\u0938\\u094d\\u0924\\u0948 \\u0926\\u0947\\u0916\\u093f\\u0928\\u0947 \\u092d\\u090f\\u0915\\u094b\\u0932\\u0947 \\u0905\\u0932\\u093f\\u0915 \\u092b\\u0930\\u0915 \\u092a\\u094d\\u0930\\u0915\\u093e\\u0930\\u0932\\u0947 \\u092f\\u0938\\u0915\\u094b \\u0905\\u092d\\u094d\\u092f\\u093e\\u0938 \\u0917\\u0930\\u094d\\u0928\\u0947 \\u0915\\u093f \\u092f\\u093e \\u092f\\u094b \\u0915\\u094d\\u092f\\u093e\\u0930\\u094b\\u0932 \\u0928\\u0948 \\u0928\\u0916\\u0947\\u0932\\u094d\\u0928\\u0947 \\u0915\\u093f \\u092d\\u0928\\u094d\\u0928\\u0947 \\u0924\\u0930\\u094d\\u0915\\u0939\\u0930\\u0942 \\u092a\\u0928\\u093f \\u0938\\u0924\\u0939\\u092e\\u093e \\u0906\\u090f\\u0915\\u093e \\u091b\\u0928\\u094d \\u0964<\\/p><p>\\u0924\\u0930 \\u092f\\u094b \\u0915\\u094d\\u092f\\u094b\\u0930\\u094b\\u0932 \\u092d\\u0928\\u0947\\u0915\\u094b \\u0915\\u0947 \\u0939\\u094b ? \\u092f\\u094b \\u0916\\u0947\\u0932\\u094d\\u0928\\u0947 \\u0939\\u094b \\u0915\\u093f ? \\u0917\\u093e\\u0909\\u0928\\u0947 \\u0939\\u094b \\u0915\\u093f ? \\u0928\\u093e\\u091a\\u094d\\u0928\\u0947 \\u0939\\u094b ? \\u092f\\u093e \\u092e\\u091c\\u094d\\u091c\\u093e\\u0932\\u0947 \\u0916\\u093e\\u0928\\u0947 \\u0939\\u094b ? \\u092f\\u0938\\u0915\\u094b \\u092c\\u093e\\u0930\\u0947\\u092e\\u093e \\u0939\\u093e\\u092e\\u0940\\u0932\\u0947 \\u0915\\u0924\\u093f\\u0915\\u094b \\u0935\\u093f\\u091a\\u093e\\u0930 \\u0917\\u0930\\u0947\\u0915\\u093e \\u091b\\u094c\\u0902 ? \\u0915\\u0924\\u093f\\u092a\\u092f \\u0905\\u0935\\u0938\\u094d\\u0925\\u093e\\u092e\\u093e \\u0939\\u093e\\u092e\\u094d\\u0930\\u093e \\u0907\\u0938\\u093e\\u0930\\u094d\\u0908 \\u091c\\u0940\\u0935\\u0928\\u0936\\u0948\\u0932\\u0940 \\u0905\\u0928\\u093f \\u0907\\u0938\\u093e\\u0908 \\u0935\\u093f\\u0936\\u094d\\u0935\\u093e\\u0938\\u0915\\u094b \\u0905\\u092d\\u094d\\u092f\\u093e\\u0938\\u0939\\u0930\\u0942 \\u0928\\u091c\\u093e\\u0928\\u0940\\u0915\\u0928 \\u0928\\u0948 \\u0905\\u092d\\u094d\\u092f\\u093e\\u0938 \\u0917\\u0930\\u093f\\u0930\\u0939\\u0947\\u0915\\u093e \\u0939\\u0941\\u0928\\u094d\\u091b\\u094c\\u0902 \\u0905\\u0925\\u0935\\u093e \\u092a\\u0930\\u092e\\u094d\\u092a\\u0930\\u093e\\u0932\\u093e\\u0908 \\u0924\\u094d\\u092f\\u0924\\u093f\\u0915\\u0948 \\u0905\\u0919\\u094d\\u0917\\u093e\\u0932\\u0940 \\u0930\\u0939\\u0947\\u0915\\u093e \\u092a\\u0928\\u093f \\u0939\\u0941\\u0928\\u094d\\u091b\\u094c\\u0902 \\u0964 \\u0905\\u0928\\u093f \\u0924\\u094d\\u092f\\u0924\\u093f \\u092c\\u0941\\u091d\\u094d\\u0928\\u0947 \\u0906\\u0935\\u0936\\u094d\\u092f\\u0915\\u0924\\u093e \\u092a\\u0928\\u093f \\u0926\\u0947\\u0916\\u094d\\u0926\\u0948\\u0928\\u094c\\u0902 \\u0930 \\u0939\\u0938\\u094d\\u0924\\u093e\\u0928\\u094d\\u0924\\u0930\\u0923 \\u0917\\u0930\\u094d\\u0928\\u0947 \\u092a\\u0941\\u0938\\u094d\\u0924\\u093e\\u0932\\u0947 \\u092a\\u0928\\u093f \\u0924\\u094d\\u092f\\u0938\\u0915\\u094b \\u091a\\u0941\\u0930\\u094b \\u092f\\u094b \\u0939\\u094b \\u092d\\u0928\\u094d\\u0928\\u0947 \\u092c\\u093e\\u0930\\u0947 \\u092c\\u0924\\u093e\\u0907\\u0926\\u093f\\u0901\\u0926\\u0948\\u0928\\u0928\\u094d \\u0935\\u093e \\u092d\\u0928\\u094d\\u0928\\u0947 \\u0906\\u0935\\u0936\\u094d\\u092f\\u0915\\u0924\\u093e \\u0926\\u0947\\u0916\\u094d\\u0926\\u0948\\u0928\\u0928\\u094d \\u092f\\u093e \\u0925\\u093e\\u0939\\u093e \\u092a\\u0928\\u093f \\u0939\\u0941\\u0901\\u0926\\u0948\\u0928 \\u0964 \\u0924\\u0930 \\u0905\\u0939\\u093f\\u0932\\u0947\\u0915\\u094b \\u091c\\u092e\\u093e\\u0928\\u093e \\u092b\\u0930\\u0915 \\u092d\\u090f\\u0915\\u094b \\u091b \\u0964 \\u092e\\u093e\\u0928\\u093f\\u0938 \\u0905\\u091d \\u092c\\u0922\\u094d\\u0924\\u093e \\u091c\\u093f\\u091c\\u094d\\u091e\\u093e\\u0938\\u0941 \\u092d\\u090f\\u0915\\u094b \\u091b \\u0964 \\u0938\\u093e\\u092e\\u093e\\u091c\\u093f\\u0915 \\u0938\\u091e\\u094d\\u091c\\u093e\\u0932\\u0939\\u0930\\u0942\\u0932\\u0947 \\u0905\\u0938\\u0932\\u2013\\u0916\\u0930\\u093e\\u092c \\u0938\\u092c\\u0948 \\u092a\\u094d\\u0930\\u0915\\u093e\\u0930\\u0915\\u093e \\u091c\\u093e\\u0928\\u0915\\u093e\\u0930\\u0940 \\u092a\\u0938\\u094d\\u0915\\u093f\\u0930\\u0939\\u0947\\u0915\\u093e \\u0939\\u0941\\u0928\\u094d\\u091b\\u0928\\u094d \\u0964 \\u092f\\u0938\\u0930\\u094d\\u0925 \\u0939\\u093e\\u092e\\u0940 \\u0905\\u091d \\u092c\\u0922\\u093f \\u0938\\u091a\\u0947\\u0924 \\u0939\\u0941\\u0928\\u0941\\u092a\\u0930\\u094d\\u0928\\u0947 \\u0905\\u0935\\u0938\\u094d\\u0925\\u093e \\u0906\\u090f\\u0915\\u094b \\u091b \\u0964 \\u092f\\u0938\\u0930\\u094d\\u0925 \\u092f\\u0938 \\u0932\\u0947\\u0916\\u092e\\u093e Carol \\u0915\\u094b \\u092c\\u093e\\u0930\\u0947\\u092e\\u093e \\u091b\\u094b\\u091f\\u094b \\u090f\\u0924\\u093f\\u0939\\u093e\\u0938\\u093f\\u0915 \\u091f\\u093f\\u092a\\u094d\\u092a\\u0923\\u0940 \\u092a\\u094d\\u0930\\u0938\\u094d\\u0924\\u0941\\u0924 \\u0917\\u0930\\u094d\\u0928 \\u0917\\u0907\\u0930\\u0939\\u0947\\u0915\\u094b \\u091b\\u0941 \\u0964 \\u092e\\u0942\\u0932\\u094d\\u092f\\u093e\\u0902\\u0915\\u0928 \\u0906\\u092b\\u0948\\u0932\\u0947 \\u0917\\u0930\\u094d\\u0928\\u0941\\u0939\\u094b\\u0932\\u093e \\u0964<\\/p><p>\\u0905\\u0902\\u0917\\u094d\\u0930\\u0947\\u091c\\u0940 \\u0936\\u092c\\u094d\\u0926 Carol (\\u0915\\u094d\\u092f\\u093e\\u0930\\u094b\\u0932) Carole \\u092d\\u0928\\u093f\\u0928\\u0947 \\u092b\\u094d\\u0930\\u093e\\u0928\\u094d\\u0938\\u0947\\u0932\\u0940 \\u0936\\u092c\\u094d\\u0926\\u092c\\u093e\\u091f \\u0935\\u094d\\u092f\\u0941\\u0924\\u094d\\u092a\\u0924\\u094d\\u0924\\u093f \\u092d\\u090f\\u0930 \\u0906\\u090f\\u0915\\u094b \\u0939\\u094b \\u0964 \\u092f\\u0938\\u0915\\u094b \\u0936\\u093e\\u092c\\u094d\\u0926\\u093f\\u0915 \\u0905\\u0930\\u094d\\u0925 \\u091a\\u093e\\u0939\\u093f\\u0901 \\u0917\\u094b\\u0932\\u093e\\u0915\\u093e\\u0930 \\u0928\\u0943\\u0924\\u094d\\u092f \\u0939\\u094b \\u0964 \\u0938\\u093e\\u091d\\u093e \\u092a\\u094d\\u0930\\u0915\\u093e\\u0936\\u0928\\u0932\\u0947 \\u092a\\u094d\\u0930\\u0915\\u093e\\u0936\\u0928 \\u0917\\u0930\\u0947\\u0915\\u094b \\u0905\\u0902\\u0917\\u094d\\u0930\\u091c\\u0940\\u2013\\u0928\\u0947\\u092a\\u093e\\u0932\\u0940 \\u0936\\u092c\\u094d\\u0926\\u0915\\u094b\\u0937\\u0915\\u093e \\u0905\\u0928\\u0941\\u0938\\u093e\\u0930 Carol \\u0936\\u092c\\u094d\\u0926\\u0915\\u094b \\u0905\\u0930\\u094d\\u0925 <strong>\\u201c\\u0917\\u0940\\u0924\\u201d, \\u201c\\u0938\\u094d\\u0924\\u094b\\u0924\\u094d\\u0930\\u201d, \\u201c\\u0926\\u094d\\u092f\\u094c\\u0938\\u093f \\u0930\\u0947\\u201d <\\/strong>\\u092d\\u0928\\u0947\\u0930 \\u0932\\u0947\\u0916\\u0947\\u0915\\u094b \\u091b \\u0964 \\u0935\\u093f\\u0936\\u0947\\u0937\\u0917\\u0930\\u0940 \\u0927\\u093e\\u0930\\u094d\\u092e\\u093f\\u0915 \\u0935\\u093e \\u091a\\u093e\\u0921\\u092c\\u093e\\u0921\\u0938\\u0901\\u0917 \\u0938\\u092e\\u094d\\u092c\\u0928\\u094d\\u0927\\u093f\\u0924 \\u0917\\u0940\\u0924\\u0939\\u0930\\u0942 \\u0917\\u093e\\u090f\\u0930 \\u0938\\u092e\\u0942\\u0939\\u092e\\u093e \\u0928\\u093e\\u091a\\u093f\\u0928\\u0947 \\u0928\\u0943\\u0924\\u094d\\u092f \\u0939\\u094b \\u0964 \\u0915\\u094d\\u092f\\u093e\\u0930\\u094b\\u0932\\u0932\\u093e\\u0908 \\u0928\\u0947\\u092a\\u093e\\u0932\\u0940 \\u0938\\u093e\\u0902\\u0938\\u094d\\u0915\\u0943\\u0924\\u093f\\u0915 \\u0938\\u0928\\u094d\\u0926\\u0930\\u094d\\u092d\\u092e\\u093e \\u0939\\u0947\\u0930\\u094d\\u0928\\u0947 \\u0939\\u094b \\u092d\\u0928\\u0947 \\u0930\\u093e\\u0908\\u0915\\u094b \\u0938\\u093e\\u0915\\u0947\\u0932\\u093e, \\u0932\\u093f\\u092e\\u094d\\u092c\\u0941\\u0915\\u094b \\u0927\\u093e\\u0928 \\u0928\\u093e\\u091a, \\u092a\\u0936\\u094d\\u091a\\u093f\\u092e \\u0928\\u0947\\u092a\\u093e\\u0932\\u092e\\u093e \\u0928\\u093e\\u091a\\u093f\\u0928\\u0947 \\u0926\\u0947\\u0909\\u0921\\u093e \\u0924\\u0925\\u093e \\u0925\\u093e\\u0930\\u0942\\u0915\\u094b \\u092e\\u093e\\u0918\\u0940 \\u0928\\u093e\\u091a \\u0907\\u0924\\u094d\\u092f\\u093e\\u0926\\u093f\\u0939\\u0930\\u0942\\u0938\\u0901\\u0917 \\u092e\\u0947\\u0932 \\u0916\\u093e\\u0928\\u094d\\u091b \\u0964 \\u0932\\u094c \\u0916\\u094d\\u0930\\u0940\\u0937\\u094d\\u091f\\u092e\\u0938 \\u092e\\u0928\\u093e\\u0909\\u0928\\u0947 \\u0938\\u0928\\u094d\\u0926\\u0930\\u094d\\u092d\\u092e\\u093e \\u0924 \\u092a\\u094d\\u0930\\u0936\\u094d\\u0928 \\u091a\\u093f\\u0928\\u094d\\u0939 \\u0909\\u0920\\u093e\\u0909\\u0928 \\u0925\\u093e\\u0932\\u0947\\u0915\\u094b \\u090f\\u0909\\u091f\\u093e \\u091c\\u092e\\u093e\\u0924\\u0932\\u0947 \\u0915\\u094d\\u092f\\u093e\\u0930\\u094b\\u0932\\u0932\\u093e\\u0908 \\u0915\\u0938\\u0930\\u0940 \\u092e\\u0942\\u0932\\u094d\\u092f\\u093e\\u0919\\u094d\\u0915\\u0928 \\u0917\\u0930\\u094d\\u0932\\u093e \\u0924 \\u0905\\u092c \\u0964 \\u0939\\u0947\\u0930\\u094c\\u0902 \\u0964 \\u0906\\u092e\\u094d\\u092e \\u092e\\u2026 \\u0938\\u093e\\u0902\\u0938\\u093e\\u0930\\u093f\\u0915 \\u0928\\u093e\\u091a, \\u0905\\u0930\\u0942 \\u0927\\u0930\\u094d\\u092e\\u0915\\u094b \\u0928\\u093e\\u091a\\u0917\\u093e\\u0928\\u0932\\u093e\\u0908 \\u0907\\u0938\\u093e\\u0908\\u092e\\u0924\\u092e\\u093e \\u091c\\u094b\\u0921\\u094d\\u0928\\u0947 ? \\u0915\\u0938\\u094d\\u0924\\u093e \\u092e\\u093e\\u0928\\u094d\\u091b\\u0947\\u0939\\u0930\\u0942 \\u092d\\u0928\\u094d\\u0928\\u0947 \\u091c\\u0938\\u094d\\u0924\\u093e \\u091f\\u093f\\u092a\\u094d\\u092a\\u0923\\u0940\\u0939\\u0930\\u0942 \\u0905\\u0935\\u0936\\u094d\\u092f \\u092a\\u0928\\u093f \\u0906\\u0909\\u0932\\u093e\\u0928\\u094d \\u0964 \\u0924\\u0930 \\u0924\\u0925\\u094d\\u092f \\u092d\\u0928\\u0947\\u0915\\u094b \\u0924\\u0925\\u094d\\u092f \\u0928\\u0948 \\u0939\\u094b \\u0964<\\/p><p>\\u092c\\u093e\\u0907\\u092c\\u0932 \\u0935\\u093f\\u0926\\u094d\\u0927\\u093e\\u0928\\u0939\\u0930\\u0942\\u0915\\u093e \\u0905\\u0928\\u0941\\u0938\\u093e\\u0930 \\u092a\\u0939\\u093f\\u0932\\u094b \\u0915\\u094d\\u092f\\u093e\\u0930\\u094b\\u0932 \\u0917\\u0940\\u0924 \\u0907.\\u0938. \\u0967\\u0968\\u096f \\u092e\\u093e \\u0932\\u0942\\u0915\\u093e \\u0968:\\u0967\\u096a \\u0932\\u093e\\u0908 \\u0938\\u093e\\u092d\\u093e\\u0930 \\u0917\\u0930\\u0947\\u0930 \\u0932\\u0947\\u0916\\u093f\\u090f\\u0915\\u094b \\u0925\\u093f\\u092f\\u094b \\u0964 \\u092a\\u091b\\u093f \\u092e\\u0927\\u094d\\u092f\\u0915\\u093e\\u0932\\u093f\\u0928 \\u0907\\u0938\\u093e\\u0908 \\u0907\\u0924\\u093f\\u0939\\u093e\\u0938\\u092e\\u093e \\u0918\\u0930\\u2013\\u0918\\u0930 \\u0917\\u090f\\u0930 \\u0917\\u093e\\u0909\\u0928\\u0947 \\u0905\\u0928\\u093f \\u092f\\u0947\\u0936\\u0942 \\u0916\\u094d\\u0930\\u0940\\u0937\\u094d\\u091f\\u0915\\u094b \\u091c\\u0928\\u094d\\u092e\\u0915\\u093e \\u092c\\u093e\\u0930\\u0947\\u092e\\u093e \\u0928\\u093e\\u091f\\u0915 \\u092e\\u091e\\u094d\\u091a\\u0928 \\u0917\\u0930\\u094d\\u0928\\u0947 \\u0905\\u092d\\u094d\\u092f\\u093e\\u0938 \\u092f\\u0941\\u0930\\u094b\\u092a\\u0924\\u093f\\u0930 \\u092b\\u0948\\u0932\\u093f\\u090f\\u0915\\u094b \\u092a\\u093e\\u0907\\u0928\\u094d\\u091b \\u0964 \\u092a\\u091b\\u093f \\u0935\\u093f\\u0938\\u094d\\u0924\\u093e\\u0930\\u0948 \\u0915\\u094d\\u092f\\u093e\\u0930\\u094b\\u0932\\u092e\\u093e \\u0917\\u093e\\u0909\\u0928\\u0947-\\u0928\\u093e\\u091a\\u094d\\u0928\\u0947 \\u0905\\u092d\\u094d\\u092f\\u093e\\u0938 \\u0907\\u0938\\u093e\\u0908 \\u0927\\u0930\\u094d\\u092e\\u0915\\u094b \\u090f\\u0909\\u091f\\u093e \\u0905\\u092d\\u093f\\u0928\\u094d\\u0928 \\u0905\\u0919\\u094d\\u0917\\u0915\\u094b \\u0930\\u0942\\u092a\\u092e\\u093e \\u091c\\u094b\\u0921\\u093f\\u0928 \\u092a\\u0941\\u0917\\u094d\\u092f\\u094b \\u0964 <strong>\\u0936\\u093e\\u0928\\u094d\\u0924\\u092e\\u092f \\u0930\\u093e\\u0924, \\u0906\\u0928\\u0928\\u094d\\u0926 \\u092e\\u0928\\u093e\\u0909, \\u0939\\u093e\\u0901\\u0938\\u0916\\u0947\\u0932 \\u0917\\u0930\\u094d\\u0926\\u0948 \\u092d\\u0928\\u093f\\u0926\\u0947\\u0909, \\u092d\\u0947\\u0921\\u0940 \\u0917\\u094b\\u0920 \\u091a\\u0930\\u094d\\u0926\\u093e \\u0928\\u093f \\u091a\\u0930\\u094d\\u0926\\u0948, \\u0916\\u091a\\u093e\\u0916\\u091a \\u092d\\u094b, \\u0939\\u0947\\u0930\\u0928 \\u0906\\u0915\\u093e\\u0936\\u092e\\u093e<\\/strong> \\u091c\\u0938\\u094d\\u0924\\u093e \\u0917\\u0940\\u0924\\u0939\\u0930\\u0942 \\u0915\\u094d\\u092f\\u093e\\u0930\\u094b\\u0932\\u092e\\u093e \\u0917\\u093e\\u0907\\u0928\\u0947 \\u092a\\u094d\\u0930\\u091a\\u0932\\u093f\\u0924 \\u092d\\u091c\\u0928\\u0939\\u0930\\u0942 \\u0939\\u0941\\u0928\\u094d \\u0964 \\u092f\\u093f\\u0928\\u0940\\u0939\\u0930\\u0942\\u0932\\u0947 \\u092c\\u0921\\u094b \\u0938\\u0941\\u0928\\u094d\\u0926\\u0930\\u0924\\u093e\\u092a\\u0942\\u0930\\u094d\\u0935\\u0915 \\u092f\\u0947\\u0936\\u0942 \\u0916\\u094d\\u0930\\u0940\\u0937\\u094d\\u091f\\u0915\\u094b \\u091c\\u0928\\u094d\\u092e, \\u0909\\u0939\\u093e\\u0901\\u0915\\u094b \\u0938\\u0947\\u0935\\u0915\\u093e\\u0907 \\u0930 \\u0909\\u0939\\u093e\\u0901\\u0932\\u0947 \\u0939\\u093e\\u092e\\u0940\\u0932\\u093e\\u0908 \\u0909\\u092a\\u0932\\u092c\\u094d\\u0927 \\u0917\\u0930\\u093e\\u0909\\u0928\\u0941 \\u092d\\u090f\\u0915\\u094b \\u0909\\u0926\\u094d\\u0927\\u093e\\u0930\\u092e\\u093e \\u0939\\u093e\\u092e\\u0940 \\u0915\\u0938\\u0930\\u0940 \\u0915\\u0943\\u0924\\u091c\\u094d\\u091e \\u0939\\u0941\\u0928\\u0947 \\u0930 \\u0930\\u092e\\u093e\\u0909\\u0928\\u0947 \\u0915\\u0941\\u0930\\u093e \\u092a\\u094d\\u0930\\u0938\\u094d\\u0924\\u0941\\u0924 \\u0917\\u0930\\u0947\\u0915\\u093e \\u091b\\u0928\\u094d \\u0964<\\/p><p>\\u091c\\u092c\\u0938\\u092e\\u094d\\u092e \\u0939\\u093e\\u092e\\u0940\\u0932\\u0947 \\u0917\\u093e\\u0909\\u0928\\u0947 \\u0917\\u093e\\u0928\\u093e, \\u0928\\u093e\\u091a\\u094d\\u0928\\u0947 \\u0928\\u093e\\u091a \\u0905\\u0928\\u093f \\u0917\\u094d\\u0930\\u0939\\u0923 \\u0917\\u0930\\u094d\\u0928\\u0947 \\u092e\\u093f\\u0937\\u094d\\u0920\\u093e\\u0928\\u094d\\u0928 \\u092d\\u094b\\u091c\\u0928\\u0932\\u0947 \\u092a\\u0930\\u092e\\u0947\\u0936\\u094d\\u0935\\u0930\\u0915\\u094b \\u092e\\u0939\\u093f\\u092e\\u093e\\u0932\\u093e\\u0908 \\u092a\\u094d\\u0930\\u0924\\u093f\\u0938\\u094d\\u0925\\u093e\\u092a\\u0928 \\u0917\\u0930\\u094d\\u0926\\u0948\\u0928\\u0928\\u094d, \\u0924\\u092c\\u0938\\u092e\\u094d\\u092e \\u0915\\u094d\\u092f\\u093e\\u0930\\u094b\\u0932 \\u090f\\u0915\\u0926\\u092e \\u0920\\u0940\\u0915 \\u091b \\u0964 \\u0915\\u094d\\u092f\\u093e\\u0930\\u094b\\u0932\\u0932\\u0947 \\u0939\\u093e\\u092e\\u0940\\u0932\\u093e\\u0908 \\u090f\\u0909\\u091f\\u093e \\u0910\\u0924\\u093f\\u0939\\u093e\\u0938\\u093f\\u0915 \\u092a\\u0932\\u0915\\u094b \\u0938\\u094d\\u092e\\u0930\\u0923 \\u0917\\u0930\\u093e\\u0909\\u0901\\u091b \\u2013 \\u090f\\u0915 \\u092e\\u093e\\u0924\\u094d\\u0930 \\u092a\\u0930\\u092e\\u0947\\u0936\\u094d\\u0935\\u0930\\u0915\\u094b \\u092a\\u0941\\u0924\\u094d\\u0930, \\u0905\\u0928\\u0928\\u094d\\u0924\\u0926\\u0947\\u0916\\u093f \\u0939\\u0941\\u0928\\u0941\\u0939\\u0941\\u0928\\u094d\\u0925\\u094d\\u092f\\u094b \\u0930 \\u0924\\u094b\\u0915\\u093f\\u090f\\u0915\\u094b \\u0938\\u092e\\u092f\\u092e\\u093e \\u0915\\u0928\\u094d\\u092f\\u093e \\u092e\\u0930\\u093f\\u092f\\u092e\\u0915\\u094b \\u0915\\u094b\\u0916\\u092c\\u093e\\u091f \\u091c\\u0928\\u094d\\u092e\\u0928\\u0941 \\u092d\\u092f\\u094b \\u0964 \\u091c\\u0941\\u0928 \\u0906\\u0928\\u0928\\u094d\\u0926\\u0915\\u094b \\u0916\\u092c\\u0930 \\u0925\\u093f\\u092f\\u094b, \\u091b, \\u0930 \\u0939\\u0941\\u0928\\u0947\\u091b \\u0964 \\u092f\\u094b \\u0916\\u092c\\u0930 \\u0905\\u0930\\u0942\\u0932\\u093e\\u0908 \\u0938\\u0941\\u0928\\u093e\\u0909\\u0928\\u0947 \\u092e\\u093e\\u0924\\u094d\\u0930 \\u0928\\u092d\\u0908 \\u0938\\u094d\\u0935\\u092f\\u092e\\u094d \\u0906\\u092b\\u0948\\u0902\\u0932\\u093e\\u0908 \\u092a\\u0928\\u093f \\u0938\\u094d\\u092e\\u0930\\u0923 \\u0917\\u0930\\u093e\\u0907\\u0930\\u0939\\u0928\\u0941 \\u092a\\u0930\\u094d\\u0926\\u091b\\u0903 \\u0906\\u0924\\u094d\\u092e\\u093f\\u0915 \\u0938\\u091a\\u0947\\u0924\\u0928\\u093e\\u0915\\u093e \\u0932\\u093e\\u0917\\u093f \\u0964 \\u092f\\u0938\\u0930\\u094d\\u0925 \\u0916\\u094d\\u0930\\u0940\\u0937\\u094d\\u091f\\u092e\\u0938\\u0915\\u094b \\u0938\\u092e\\u092f\\u092e\\u093e \\u0917\\u093e\\u0907\\u0928\\u0947 \\u0915\\u094d\\u092f\\u093e\\u0930\\u094b\\u0932 \\u0924\\u0925\\u093e \\u0917\\u0930\\u093f\\u0928\\u0947 \\u0905\\u0930\\u0942 \\u0915\\u093e\\u0930\\u094d\\u092f\\u0915\\u0932\\u093e\\u092a\\u0939\\u0930\\u0942\\u0932\\u0947 \\u092a\\u0930\\u092e\\u0947\\u0936\\u094d\\u0935\\u0930\\u0938\\u0901\\u0917\\u0915\\u094b \\u0938\\u092e\\u094d\\u092c\\u0928\\u094d\\u0927\\u092e\\u093e \\u0905\\u091d\\u0948 \\u091a\\u0941\\u0938\\u094d\\u0924\\u0924\\u093e \\u0932\\u094d\\u092f\\u093e\\u0913\\u0938 \\u0964 \\u0939\\u093e\\u092e\\u0940 \\u0916\\u093e\\u0914\\u0902, \\u092a\\u093f\\u0914\\u0902 \\u0905\\u0928\\u093f \\u0930\\u092e\\u093e\\u0907\\u0932\\u094b \\u0917\\u0930\\u094c\\u0902 \\u0924\\u0930 \\u0915\\u0947\\u0935\\u0932 \\u0909\\u0939\\u093e\\u0901\\u0915\\u094b \\u092e\\u0939\\u093f\\u092e\\u093e\\u0915\\u094b \\u0928\\u093f\\u092e\\u094d\\u0924\\u093f (\\u0967 \\u0915\\u094b\\u0930 \\u0967\\u0966:\\u0969\\u0967) \\u0964 \\u092f\\u0938\\u0930\\u094d\\u0925 \\u0915\\u094d\\u092f\\u093e\\u0930\\u094b\\u0932\\u092e\\u093e \\u0917\\u093e\\u0909\\u0928\\u0947 \\u0939\\u094b, \\u0928\\u093e\\u091a\\u094d\\u0928\\u0947 \\u0939\\u094b, \\u092e\\u093f\\u0937\\u094d\\u0920\\u093e\\u0928\\u094d\\u0928 \\u092d\\u094b\\u091c\\u0928 \\u092a\\u0928\\u093f \\u0916\\u093e\\u0928\\u0947 \\u0939\\u094b \\u0964 \\u0924\\u0930 \\u0916\\u0947\\u0932\\u094d\\u0928\\u0947 \\u091a\\u093e\\u0939\\u093f\\u0901 \\u0939\\u094b \\u0915\\u093f \\u0939\\u0948\\u0928 \\u0939\\u094c ?<\\/p>\"', 'Article', 1, NULL, NULL, '2024-11-28 18:17:09', '2026-04-29 23:47:12', 677);
INSERT INTO `articles` (`id`, `title`, `slug`, `author_id`, `thumbnail_image`, `content_image`, `status`, `description`, `content`, `type`, `uploaded_by`, `extra`, `deleted_at`, `created_at`, `updated_at`, `view_count`) VALUES
(5, 'ख्रीष्टको मृत्यु र उद्धार', 'kharashhataka-mataya-ra-uthathhara', 2, 'articles/6cJJG7aIZFqCeAoIKCSY.jpg', 'articles/e0lkD71ls6jy0U1VRLu4.jpg', 1, 'ख्रीष्टको मृत्युमा मृत्युको मृत्यु हुन्छ – जोन ओवेन ।&nbsp;ख्रीष्टको मृत्युमा हाम्रो जीवन छ (२ कोर ४:१०) । यो सत्यतालाई आत्मसात् गर्दा हामी बाँचुञ्जेल...', '\"<p>\\u0916\\u094d\\u0930\\u0940\\u0937\\u094d\\u091f\\u0915\\u094b \\u092e\\u0943\\u0924\\u094d\\u092f\\u0941\\u092e\\u093e \\u092e\\u0943\\u0924\\u094d\\u092f\\u0941\\u0915\\u094b \\u092e\\u0943\\u0924\\u094d\\u092f\\u0941 \\u0939\\u0941\\u0928\\u094d\\u091b \\u2013 \\u091c\\u094b\\u0928 \\u0913\\u0935\\u0947\\u0928 \\u0964<\\/p><p>&nbsp;<\\/p><p>\\u0916\\u094d\\u0930\\u0940\\u0937\\u094d\\u091f\\u0915\\u094b \\u092e\\u0943\\u0924\\u094d\\u092f\\u0941\\u092e\\u093e \\u0939\\u093e\\u092e\\u094d\\u0930\\u094b \\u091c\\u0940\\u0935\\u0928 \\u091b (\\u0968 \\u0915\\u094b\\u0930 \\u096a:\\u0967\\u0966) \\u0964 \\u092f\\u094b \\u0938\\u0924\\u094d\\u092f\\u0924\\u093e\\u0932\\u093e\\u0908 \\u0906\\u0924\\u094d\\u092e\\u0938\\u093e\\u0924\\u094d \\u0917\\u0930\\u094d\\u0926\\u093e \\u0939\\u093e\\u092e\\u0940 \\u092c\\u093e\\u0901\\u091a\\u0941\\u091e\\u094d\\u091c\\u0947\\u0932 \\u092a\\u0930\\u092e\\u0947\\u0936\\u094d\\u0935\\u0930\\u092a\\u094d\\u0930\\u0924\\u093f \\u0915\\u0943\\u0924\\u091c\\u094d\\u091e \\u0939\\u0941\\u0928\\u094d\\u091b\\u094c\\u0902 \\u0964 \\u0930 \\u092e\\u0943\\u0924\\u094d\\u092f\\u0941\\u0915\\u094b \\u092e\\u0941\\u0916\\u092e\\u093e \\u092a\\u0941\\u0917\\u094d\\u0926\\u093e \\u092a\\u0928\\u093f \\u092e\\u0943\\u0924\\u094d\\u092f\\u0941\\u092a\\u091b\\u093f\\u0915\\u094b \\u091c\\u0940\\u0935\\u0928\\u0915\\u094b \\u0906\\u0936\\u093e\\u092e\\u093e \\u0906\\u0928\\u0928\\u094d\\u0926\\u093f\\u0924 \\u092d\\u0908 \\u0930\\u092e\\u093e\\u0909\\u0901\\u091b\\u094c\\u0902 \\u0964 \\u0916\\u094d\\u0930\\u0940\\u0937\\u094d\\u091f\\u0915\\u094b \\u092e\\u0943\\u0924\\u094d\\u092f\\u0941\\u0932\\u093e\\u0908 \\u0905\\u0919\\u094d\\u0917\\u093e\\u0932\\u094d\\u0928\\u0947 \\u0935\\u094d\\u092f\\u0915\\u094d\\u0924\\u093f \\u0906\\u092b\\u094d\\u0928\\u094b \\u092e\\u0943\\u0924\\u094d\\u092f\\u0941\\u092e\\u093e \\u0909\\u0924\\u094d\\u0938\\u0935 \\u092e\\u0928\\u093e\\u0909\\u0901\\u091b (\\u092b\\u093f\\u0932\\u093f \\u0967:\\u0968\\u0967) \\u0964 \\u0915\\u093e\\u0930\\u0923 \\u092e\\u0943\\u0924\\u094d\\u092f\\u0941 \\u0905\\u0928\\u094d\\u0924\\u094d\\u092f \\u0928\\u092d\\u0908 \\u092e\\u0943\\u0924\\u094d\\u092f\\u0941\\u092a\\u093e\\u0930\\u093f\\u0915\\u094b \\u091c\\u0940\\u0935\\u0928\\u0915\\u094b \\u0938\\u0941\\u0930\\u0941\\u0935\\u093e\\u0924 \\u0939\\u094b (\\u092f\\u0942\\u0939 \\u096b:\\u0968\\u096a; \\u0967\\u0967:\\u0968\\u096b) \\u0964 \\u092e\\u0943\\u0924\\u094d\\u092f\\u0941 \\u090f\\u0909\\u091f\\u093e \\u092c\\u093f\\u092e\\u093e\\u0930 \\u0939\\u094b, \\u091c\\u0938\\u0915\\u094b \\u0909\\u092a\\u091a\\u093e\\u0930 \\u0915\\u0947\\u0935\\u0932 \\u0916\\u094d\\u0930\\u0940\\u0937\\u094d\\u091f\\u0915\\u094b \\u092e\\u0943\\u0924\\u094d\\u092f\\u0941\\u092e\\u093e \\u091b (\\u0930\\u094b\\u092e \\u096c:\\u0967\\u0966\\u2013\\u0967\\u0967; \\u0967 \\u0925\\u0947\\u0938 \\u096b:\\u0967\\u0966) \\u0964<\\/p><p>\\u0924\\u0932 \\u092a\\u094d\\u0930\\u0938\\u094d\\u0924\\u0941\\u0924 \\u0917\\u0930\\u093f\\u090f\\u0915\\u094b \\u0938\\u093e\\u092e\\u0917\\u094d\\u0930\\u0940 \\u092e\\u0943\\u0924\\u094d\\u092f\\u0941\\u0936\\u092f\\u094d\\u092f\\u093e\\u092e\\u093e \\u092d\\u090f\\u0915\\u094b \\u092c\\u093f\\u0930\\u093e\\u092e\\u0940\\u0932\\u093e\\u0908 \\u092d\\u0947\\u091f\\u094d\\u0928 \\u091c\\u093e\\u0901\\u0926\\u093e \\u0939\\u0941\\u0928\\u0947 \\u0935\\u093e\\u0930\\u094d\\u0924\\u093e\\u0932\\u093e\\u092a\\u0915\\u094b \\u090f\\u0909\\u091f\\u093e \\u0922\\u093e\\u0901\\u091a\\u093e \\u0939\\u094b, \\u091c\\u0938\\u0932\\u093e\\u0908 \\u0915\\u094d\\u092f\\u093e\\u0923\\u094d\\u091f\\u0947\\u092c\\u0930\\u0940\\u0915\\u094b \\u090f\\u0928\\u094d\\u0938\\u0947\\u0932\\u094d\\u092e\\u0932\\u0947 \\u0924\\u092f\\u093e\\u0930 \\u092a\\u093e\\u0930\\u0947\\u0915\\u093e \\u0925\\u093f\\u090f (\\u0915\\u0930\\u093f\\u092c \\u0907.\\u0938. \\u0967\\u0966\\u096f\\u0969 \\u0924\\u093f\\u0930) \\u0964 \\u092f\\u094b \\u0935\\u093e\\u0930\\u094d\\u0924\\u093e\\u0932\\u093e\\u092a \\u092e\\u0943\\u0924\\u094d\\u092f\\u0941\\u0915\\u094b \\u092e\\u0941\\u0916\\u092e\\u093e \\u092a\\u0941\\u0917\\u0947\\u0915\\u094b \\u090f\\u0915 \\u0907\\u0938\\u093e\\u0908\\u0932\\u093e\\u0908 \\u0905\\u0930\\u094d\\u0915\\u094b \\u0907\\u0938\\u093e\\u0908\\u0932\\u0947 \\u092d\\u0947\\u091f\\u094d\\u0928 \\u091c\\u093e\\u0901\\u0926\\u093e \\u0915\\u0938\\u0930\\u0940 \\u0938\\u093e\\u0928\\u094d\\u0924\\u094d\\u0935\\u0928\\u093e \\u0926\\u093f\\u0928\\u0947 \\u0930 \\u0916\\u094d\\u0930\\u0940\\u0937\\u094d\\u091f\\u0915\\u094b \\u092e\\u0943\\u0924\\u094d\\u092f\\u0941\\u092c\\u093e\\u091f \\u0915\\u0938\\u0930\\u0940 \\u0938\\u093e\\u0928\\u094d\\u0924\\u094d\\u0935\\u0928\\u093e \\u0932\\u093f\\u0928\\u0947 \\u092d\\u0928\\u094d\\u0928\\u0947 \\u092c\\u093e\\u0930\\u0947\\u092e\\u093e \\u091b \\u0964<\\/p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;\\u092a\\u094d\\u0930\\u0938\\u0919\\u094d\\u0917, \\u092e\\u0943\\u0924\\u094d\\u092f\\u0941\\u0936\\u092f\\u094d\\u092f\\u093e\\u092e\\u093e \\u092d\\u090f\\u0915\\u094b \\u092c\\u093f\\u0930\\u093e\\u092e\\u0940\\u0932\\u093e\\u0908 \\u092d\\u0947\\u091f\\u094d\\u0928 \\u091c\\u093e\\u0901\\u0926\\u093e, \\u0909\\u0938\\u0932\\u093e\\u0908 \\u0938\\u094b\\u0927\\u093f\\u0928\\u0947 \\u090f\\u0909\\u091f\\u093e \\u092a\\u094d\\u0930\\u0936\\u094d\\u0928\\u0903 \\u201c\\u0915\\u0947 \\u0924\\u093f\\u092e\\u0940\\u0932\\u093e\\u0908 \\u092f\\u0938\\u094d\\u0924\\u094b \\u0932\\u093e\\u0917\\u094d\\u091b \\u0915\\u093f \\u0916\\u094d\\u0930\\u0940\\u0937\\u094d\\u091f\\u0915\\u094b \\u092e\\u0943\\u0924\\u094d\\u092f\\u0941 \\u092c\\u093e\\u0939\\u0947\\u0915 \\u0905\\u0930\\u0942 \\u092e\\u093e\\u0927\\u094d\\u092f\\u092e\\u092c\\u093e\\u091f \\u0924\\u093f\\u092e\\u0940 \\u092c\\u093e\\u0901\\u091a\\u094d\\u0928 \\u0938\\u0915\\u094d\\u0926\\u0948\\u0928\\u094c&nbsp;?<\\/p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;\\u092c\\u093f\\u0930\\u093e\\u092e\\u0940 \\u092e\\u093e\\u0928\\u094d\\u091b\\u0947\\u0915\\u094b \\u0909\\u0924\\u094d\\u0924\\u0930, \\u201c\\u0939\\u091c\\u0941\\u0930, \\u0916\\u094d\\u0930\\u0940\\u0937\\u094d\\u091f\\u0915\\u094b \\u092e\\u0943\\u0924\\u094d\\u092f\\u0941\\u092e\\u093e \\u092e\\u093e\\u0924\\u094d\\u0930\\u0948 \\u092e\\u0947\\u0930\\u094b \\u0909\\u0926\\u094d\\u0927\\u093e\\u0930 \\u091b \\u092d\\u0928\\u093f \\u092e \\u0926\\u0943\\u0922 \\u092d\\u0930\\u094b\\u0938\\u093e \\u0917\\u0930\\u094d\\u091b\\u0941 \\u0964\\u201d<\\/p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; \\u0909\\u0938\\u0932\\u0947 \\u092d\\u0928\\u0947\\u091c\\u0938\\u094d\\u0924\\u0948 \\u0939\\u094b\\u0938\\u094d \\u0964 \\u0906\\u092e\\u0947\\u0928\\u094d \\u0964<\\/p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; \\u0924\\u094d\\u092f\\u0938\\u092a\\u091b\\u093f \\u092c\\u093f\\u0930\\u093e\\u092e\\u0940\\u0932\\u093e\\u0908 \\u092d\\u0928\\u094d\\u0928\\u0941\\u092a\\u0930\\u094d\\u091b, \\u201c\\u0936\\u093e\\u0928\\u094d\\u0924\\u093f\\u0938\\u093f\\u0924 \\u091c\\u093e\\u090a \\u0964 \\u0930 \\u091c\\u092c\\u0938\\u092e\\u094d\\u092e \\u0924\\u093f\\u092e\\u094d\\u0930\\u094b \\u0906\\u0924\\u094d\\u092e\\u093e \\u0924\\u093f\\u092e\\u094d\\u0930\\u094b \\u0936\\u0930\\u0940\\u0930\\u092e\\u093e \\u091b, \\u0924\\u092c\\u0938\\u092e\\u094d\\u092e \\u0924\\u093f\\u092e\\u094d\\u0930\\u094b \\u0938\\u092e\\u094d\\u092a\\u0942\\u0930\\u094d\\u0923 \\u092d\\u0930\\u094b\\u0938\\u093e \\u0916\\u094d\\u0930\\u0940\\u0937\\u094d\\u091f\\u0915\\u094b \\u092f\\u0939\\u0940 \\u092e\\u0943\\u0924\\u094d\\u092f\\u0941\\u092e\\u093e\\u0925\\u093f \\u0930\\u093e\\u0916 \\u0964 \\u0915\\u0941\\u0928\\u0948 \\u0905\\u0930\\u0942 \\u0915\\u0941\\u0930\\u093e\\u092e\\u093e\\u0925\\u093f \\u092d\\u0930 \\u0928\\u092a\\u0930 \\u0964 \\u092a\\u0942\\u0930\\u093e \\u092e\\u0928\\u0932\\u0947 \\u0906\\u092b\\u0948\\u0902\\u0932\\u093e\\u0908 \\u0916\\u094d\\u0930\\u0940\\u0937\\u094d\\u091f \\u0915\\u0948 \\u092e\\u0943\\u0924\\u094d\\u092f\\u0941\\u092e\\u093e \\u0938\\u092e\\u0930\\u094d\\u092a\\u0923 \\u0917\\u0930 \\u0964 \\u0906\\u092b\\u0948\\u0902\\u0932\\u093e\\u0908 \\u0916\\u094d\\u0930\\u0940\\u0937\\u094d\\u091f \\u0915\\u0948 \\u092e\\u0943\\u0924\\u094d\\u092f\\u0941\\u0932\\u0947 \\u0922\\u092a\\u0915\\u094d\\u0915\\u0948 \\u0922\\u093e\\u0915 \\u0964 \\u092a\\u0942\\u0930\\u094d\\u0923\\u0924\\u093e\\u092e\\u093e \\u0906\\u092b\\u0948\\u0902\\u092e\\u093e \\u0916\\u094d\\u0930\\u0940\\u0937\\u094d\\u091f \\u0915\\u0948 \\u092e\\u0943\\u0924\\u094d\\u092f\\u0941\\u0915\\u094b \\u091b\\u093e\\u092a \\u0932\\u0917\\u093e\\u090a \\u0964 \\u0906\\u092b\\u0948\\u0902\\u0932\\u093e\\u0908 \\u0916\\u094d\\u0930\\u0940\\u0937\\u094d\\u091f \\u0915\\u0948 \\u092e\\u0943\\u0924\\u094d\\u092f\\u0941\\u0932\\u0947 \\u0932\\u092a\\u0915\\u094d\\u0915\\u0948 \\u0932\\u092a\\u0947\\u091f \\u0964 \\u0930 \\u092f\\u0926\\u093f \\u092a\\u0930\\u092e\\u0947\\u0936\\u094d\\u0935\\u0930\\u0932\\u0947 \\u0924\\u093f\\u092e\\u094d\\u0930\\u094b \\u0928\\u094d\\u092f\\u093e\\u092f \\u0917\\u0930\\u094d\\u0928\\u0941\\u092d\\u092f\\u094b \\u092d\\u0928\\u0947 \\u092d\\u0928, \\u2018\\u0939\\u0947 \\u092a\\u0930\\u092e\\u092a\\u094d\\u0930\\u092d\\u0941, \\u092e \\u0930 \\u0924\\u092a\\u093e\\u0908\\u0902\\u0915\\u094b \\u0928\\u094d\\u092f\\u093e\\u092f\\u0915\\u094b \\u092c\\u093f\\u091a\\u092e\\u093e \\u092e \\u0939\\u093e\\u092e\\u094d\\u0930\\u094b \\u092a\\u094d\\u0930\\u092d\\u0941 \\u092f\\u0947\\u0936\\u0942 \\u0916\\u094d\\u0930\\u0940\\u0937\\u094d\\u091f\\u0915\\u094b \\u092e\\u0943\\u0924\\u094d\\u092f\\u0941\\u0932\\u093e\\u0908 \\u0930\\u093e\\u0916\\u094d\\u0926\\u091b\\u0941 \\u0964 \\u0928\\u0924\\u094d\\u0930 \\u092d\\u0928\\u0947 \\u092e \\u0924\\u092a\\u093e\\u0908\\u0902\\u0915\\u094b \\u0938\\u093e\\u092e\\u0941 \\u091f\\u093f\\u0915\\u094d\\u0928 \\u0938\\u0915\\u094d\\u0926\\u093f\\u0928\\u0901 \\u0964\\u2019&nbsp;<\\/p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;\\u0930 \\u092f\\u0926\\u093f \\u0909\\u0939\\u093e\\u0901\\u0932\\u0947 \\u0924\\u093f\\u092e\\u0940\\u0932\\u093e\\u0908 \\u0924\\u093f\\u092e\\u0940 \\u092a\\u093e\\u092a\\u0940 \\u0939\\u094c \\u092d\\u0928\\u093f \\u092d\\u0928\\u094d\\u0928\\u0941\\u092d\\u092f\\u094b \\u092d\\u0928\\u0947, \\u092f\\u0938\\u094b \\u092d\\u0928, \\u2018\\u092e \\u0930 \\u092e\\u0947\\u0930\\u093e \\u092a\\u093e\\u092a\\u0939\\u0930\\u0942\\u0915\\u094b \\u092c\\u093f\\u091a\\u092e\\u093e \\u092e \\u0939\\u093e\\u092e\\u094d\\u0930\\u094b \\u092a\\u094d\\u0930\\u092d\\u0941 \\u092f\\u0947\\u0936\\u0942 \\u0916\\u094d\\u0930\\u0940\\u0937\\u094d\\u091f\\u0915\\u094b \\u092e\\u0943\\u0924\\u094d\\u092f\\u0941\\u0932\\u093e\\u0908 \\u0930\\u093e\\u0916\\u094d\\u0926\\u091b\\u0941 \\u0964\\u2019&nbsp;<\\/p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; \\u092f\\u0926\\u093f \\u0909\\u0939\\u093e\\u0901\\u0932\\u0947 \\u0924\\u093f\\u092e\\u0940\\u0932\\u093e\\u0908 \\u0924\\u093f\\u092e\\u0940 \\u0924 \\u0926\\u0923\\u094d\\u0921\\u0915\\u094b \\u092f\\u094b\\u0917\\u094d\\u092f \\u091b\\u094c \\u092d\\u0928\\u093f \\u092d\\u0928\\u094d\\u0928\\u0941\\u092d\\u092f\\u094b \\u092d\\u0928\\u0947, \\u092f\\u0938\\u094b \\u092d\\u0928, \\u2018\\u0939\\u0947 \\u092a\\u0930\\u092e\\u092a\\u094d\\u0930\\u092d\\u0941, \\u092e\\u0947\\u0930\\u093e \\u092a\\u093e\\u092a\\u0939\\u0930\\u0942 \\u0930 \\u0924\\u092a\\u093e\\u0908\\u0902\\u0915\\u094b \\u092c\\u093f\\u091a\\u092e\\u093e \\u092e \\u0939\\u093e\\u092e\\u094d\\u0930\\u094b \\u092a\\u094d\\u0930\\u092d\\u0941 \\u092f\\u0947\\u0936\\u0942 \\u0916\\u094d\\u0930\\u0940\\u0937\\u094d\\u091f\\u0915\\u094b \\u092e\\u0943\\u0924\\u094d\\u092f\\u0941\\u0932\\u093e\\u0908 \\u0930\\u093e\\u0916\\u094d\\u0926\\u091b\\u0941 \\u0964 \\u0930 \\u092e\\u092e\\u093e \\u0939\\u0941\\u0928\\u0941\\u092a\\u0930\\u094d\\u0928\\u0947 \\u0924\\u0930 \\u0928\\u092d\\u090f\\u0915\\u093e \\u0917\\u0941\\u0923\\u0939\\u0930\\u0942\\u0915\\u094b \\u0938\\u093e\\u091f\\u094b \\u0909\\u0939\\u093e\\u0901\\u0915\\u093e \\u0917\\u0941\\u0923\\u0939\\u0930\\u0942, \\u091c\\u0941\\u0928 \\u092e\\u0947\\u0930\\u093e \\u092d\\u090f, \\u0924\\u093f\\u0928\\u0940\\u0939\\u0930\\u0942\\u0932\\u093e\\u0908 \\u0905\\u092a\\u0930\\u094d\\u0923 \\u0917\\u0930\\u094d\\u0926\\u091b\\u0941 \\u0964\\u2019&nbsp;<\\/p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; \\u092f\\u0926\\u093f \\u0909\\u0939\\u093e\\u0901\\u0932\\u0947 \\u0924\\u093f\\u092e\\u0940\\u0938\\u0901\\u0917 \\u0915\\u094d\\u0930\\u094b\\u0927\\u093f\\u0924 \\u091b\\u0941 \\u092d\\u0928\\u093f \\u092d\\u0928\\u094d\\u0928\\u0941\\u092d\\u092f\\u094b \\u092d\\u0928\\u0947, \\u092f\\u0938\\u094b \\u092d\\u0928, \\u2018\\u0939\\u0947 \\u092a\\u0930\\u092e\\u092a\\u094d\\u0930\\u092d\\u0941, \\u092e \\u0930 \\u0924\\u092a\\u093e\\u0908\\u0902\\u0915\\u094b \\u0915\\u094d\\u0930\\u094b\\u0927\\u0915\\u094b \\u092c\\u093f\\u091a\\u092e\\u093e \\u092e \\u0939\\u093e\\u092e\\u094d\\u0930\\u094b \\u092a\\u094d\\u0930\\u092d\\u0941 \\u092f\\u0947\\u0936\\u0942 \\u0916\\u094d\\u0930\\u0940\\u0937\\u094d\\u091f\\u0915\\u094b \\u092e\\u0943\\u0924\\u094d\\u092f\\u0941\\u0932\\u093e\\u0908 \\u0930\\u093e\\u0916\\u094d\\u0926\\u091b\\u0941 \\u0964\\u2019\\u201d<\\/p><p>\\u0916\\u094d\\u0930\\u0940\\u0937\\u094d\\u091f\\u0915\\u094b \\u092e\\u0943\\u0924\\u094d\\u092f\\u0941\\u0932\\u0947 \\u0939\\u093e\\u092e\\u094d\\u0930\\u094b \\u091c\\u0940\\u0935\\u0928\\u092e\\u093e \\u0938\\u0915\\u093e\\u0930\\u093e\\u0924\\u094d\\u092e\\u0915 \\u0939\\u0938\\u094d\\u0924\\u0915\\u094d\\u0937\\u0947\\u092a \\u0917\\u0930\\u094d\\u0926\\u091b (\\u0930\\u094b\\u092e \\u096b:\\u0967\\u0966; \\u0968 \\u0915\\u094b\\u0930 \\u096b:\\u0967\\u096a\\u2013\\u0967\\u096b) \\u0964 \\u092f\\u0938\\u0932\\u0947 \\u0939\\u093e\\u092e\\u0940\\u0932\\u093e\\u0908 \\u092a\\u0930\\u092e\\u0947\\u0936\\u094d\\u0935\\u0930\\u0915\\u094b \\u0915\\u094d\\u0930\\u094b\\u0927\\u092c\\u093e\\u091f \\u092c\\u091a\\u093e\\u0909\\u0901\\u091b (\\u0967 \\u0925\\u0947\\u0938 \\u0967:\\u0967\\u0966) \\u0964 \\u0939\\u093e\\u092e\\u094d\\u0930\\u094b \\u092a\\u093e\\u092a\\u0932\\u093e\\u0908 \\u0939\\u093e\\u092e\\u0940\\u092c\\u093e\\u091f \\u0905\\u0932\\u0917 \\u0917\\u0930\\u093e\\u0909\\u0901\\u091b \\u0964 \\u0939\\u093e\\u092e\\u0940\\u092e\\u093e \\u0908\\u0936\\u094d\\u0935\\u0930\\u0940\\u092f \\u0917\\u0941\\u0923\\u0939\\u0930\\u0942 \\u092d\\u0930\\u0947\\u0930 \\u092a\\u0930\\u092e\\u0947\\u0936\\u094d\\u0935\\u0930\\u0915\\u094b \\u0928\\u093f\\u092e\\u094d\\u0924\\u093f \\u091c\\u093f\\u0909\\u0928\\u0947 \\u092c\\u0928\\u093e\\u0909\\u0901\\u091b (\\u0968 \\u0915\\u094b\\u0930 \\u096b:\\u0968\\u0967) \\u0964 \\u0924\\u094d\\u092f\\u0938\\u0948\\u0932\\u0947 \\u0906\\u092b\\u094d\\u0928\\u094b \\u0909\\u0926\\u094d\\u0927\\u093e\\u0930\\u0915\\u094b \\u0928\\u093f\\u092e\\u094d\\u0924\\u093f \\u0906\\u092b\\u0948\\u0902\\u0932\\u093e\\u0908 \\u0916\\u094d\\u0930\\u0940\\u0937\\u094d\\u091f\\u0915\\u094b \\u092e\\u0943\\u0924\\u094d\\u092f\\u0941\\u092e\\u093e \\u0905\\u092a\\u0930\\u094d\\u0923 \\u0917\\u0930\\u094c\\u0902 \\u0964 \\u0915\\u093e\\u0930\\u0923 \\u092f\\u0938\\u0932\\u0947 \\u0939\\u093e\\u092e\\u094d\\u0930\\u094b \\u0935\\u093f\\u0935\\u0947\\u0915\\u092e\\u093e \\u0936\\u093e\\u0928\\u094d\\u0924\\u093f \\u0932\\u094d\\u092f\\u093e\\u0909\\u0901\\u091b \\u0964 \\u0930 \\u0939\\u093e\\u092e\\u094d\\u0930\\u094b \\u091c\\u0940\\u0935\\u0928 \\u0930 \\u092e\\u0943\\u0924\\u094d\\u092f\\u0941 \\u0926\\u0941\\u0935\\u0948\\u0932\\u093e\\u0908 \\u0939\\u0930\\u094d\\u0937\\u092e\\u092f \\u092c\\u0928\\u093e\\u0909\\u0901\\u091b \\u0964<\\/p>\"', 'Article', 1, NULL, NULL, '2024-12-01 07:25:28', '2026-04-17 15:25:04', 188);

-- --------------------------------------------------------

--
-- Table structure for table `article_category`
--

CREATE TABLE `article_category` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `article_id` bigint(20) UNSIGNED NOT NULL,
  `category_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `article_tags`
--

CREATE TABLE `article_tags` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `article_id` bigint(20) UNSIGNED NOT NULL,
  `tag_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `article_tags`
--

INSERT INTO `article_tags` (`id`, `article_id`, `tag_id`, `created_at`, `updated_at`) VALUES
(1, 5, 5, NULL, NULL),
(2, 5, 7, NULL, NULL),
(3, 5, 11, NULL, NULL),
(4, 5, 10, NULL, NULL),
(5, 5, 1, NULL, NULL),
(6, 4, 1, NULL, NULL),
(7, 4, 2, NULL, NULL),
(8, 4, 4, NULL, NULL),
(9, 4, 11, NULL, NULL),
(10, 1, 1, NULL, NULL),
(11, 1, 5, NULL, NULL),
(12, 1, 11, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `authors`
--

CREATE TABLE `authors` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `authors`
--

INSERT INTO `authors` (`id`, `name`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 'Youbin', NULL, '2024-11-28 17:47:55', '2024-11-28 17:47:55'),
(2, 'Binod Rai', NULL, '2024-11-28 17:51:30', '2024-11-28 17:51:30'),
(3, 'Suraj Kasula', NULL, '2024-11-28 18:03:54', '2024-11-28 18:03:54'),
(4, 'Mani Koirala', NULL, '2024-11-28 18:15:49', '2024-11-28 18:15:49');

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `author_id` bigint(20) UNSIGNED DEFAULT NULL,
  `cover_image` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1 COMMENT '1 on | 0 off',
  `discount_percentage` double DEFAULT NULL,
  `price` double NOT NULL,
  `uploaded_by` bigint(20) UNSIGNED NOT NULL,
  `updated_by` bigint(20) UNSIGNED NOT NULL,
  `book_sold` int(11) NOT NULL DEFAULT 0,
  `description` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`description`)),
  `pdf_file` varchar(255) NOT NULL,
  `extra` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`extra`)),
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`id`, `title`, `slug`, `author_id`, `cover_image`, `status`, `discount_percentage`, `price`, `uploaded_by`, `updated_by`, `book_sold`, `description`, `pdf_file`, `extra`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 'मेरो मास्क खोइ ?', 'mara-masaka-khai', 2, 'books/rxN5ubXDeLKECSxF37bN.jpg', 1, NULL, 375, 1, 1, 0, '\"\\u092e\\u0947\\u0930\\u094b \\u092e\\u093e\\u0938\\u094d\\u0915 \\u0916\\u094b\\u0907 ?\"', 'Book_PdfFile1732818109.pdf', NULL, NULL, '2024-11-28 18:21:49', '2024-11-29 19:32:49');

-- --------------------------------------------------------

--
-- Table structure for table `book_category`
--

CREATE TABLE `book_category` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `book_id` bigint(20) UNSIGNED NOT NULL,
  `category_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `book_tags`
--

CREATE TABLE `book_tags` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `book_id` bigint(20) UNSIGNED NOT NULL,
  `tag_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cache`
--

INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES
('davidrai441@gmail.com|103.163.182.0', 'i:1;', 1734261985),
('davidrai441@gmail.com|103.163.182.0:timer', 'i:1734261985;', 1734261985),
('rawaljeevan123@gmail.com|103.163.182.0', 'i:1;', 1734262262),
('rawaljeevan123@gmail.com|103.163.182.0:timer', 'i:1734262262;', 1734262262);

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `book_id` bigint(20) UNSIGNED NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `extra` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`extra`)),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `carts`
--

INSERT INTO `carts` (`id`, `user_id`, `book_id`, `quantity`, `extra`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 1, NULL, '2024-12-16 12:22:16', '2024-12-16 12:22:16'),
(4, 3, 1, 1, NULL, '2024-12-22 16:52:31', '2024-12-22 16:52:31');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `article_id` bigint(20) UNSIGNED NOT NULL,
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`content`)),
  `likes` int(11) NOT NULL DEFAULT 0,
  `dislikes` int(11) NOT NULL DEFAULT 0,
  `parent_id` bigint(20) UNSIGNED DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `extra` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`extra`)),
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `user_id`, `article_id`, `content`, `likes`, `dislikes`, `parent_id`, `status`, `extra`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, NULL, 4, '\"Thank You Sir....\"', 0, 0, NULL, 1, NULL, NULL, '2024-12-06 10:37:10', '2024-12-06 10:37:10'),
(2, NULL, 1, '\"Thanks for writing Binod! Keep up the ministry. \\nIn Christ\\nTroy\"', 0, 0, NULL, 1, NULL, NULL, '2024-12-29 20:31:32', '2024-12-29 20:31:32'),
(3, NULL, 1, '\"sfdgsdfgsdfg\"', 0, 0, NULL, 1, NULL, NULL, '2025-06-20 17:49:15', '2025-06-20 17:49:15'),
(4, NULL, 1, '\"fdgsdfgsdfgsdg\"', 0, 0, 3, 1, NULL, NULL, '2025-06-20 17:50:07', '2025-06-20 17:50:07'),
(5, NULL, 1, '\"Beautiful testimony!  May God continue to fill you, use you and encourage you and your ministry!\"', 0, 0, NULL, 1, NULL, NULL, '2026-01-08 13:59:26', '2026-01-08 13:59:26');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2024_05_09_151500_create_authors_table', 1),
(5, '2024_05_17_185027_create_books_table', 1),
(6, '2024_05_17_185047_create_articles_table', 1),
(7, '2024_05_17_185113_create_tags_table', 1),
(8, '2024_05_17_185123_create_categories_table', 1),
(9, '2024_05_17_185137_create_teams_table', 1),
(10, '2024_05_17_185148_create_comments_table', 1),
(11, '2024_05_17_193602_create_book_tags_table', 1),
(12, '2024_05_17_193610_create_article_tags_table', 1),
(13, '2024_05_17_193620_create_article_category_table', 1),
(14, '2024_05_17_193626_create_book_category_table', 1),
(15, '2024_05_23_072456_create_personal_access_tokens_table', 1),
(16, '2024_06_04_161012_create_orders_table', 1),
(17, '2024_06_04_162447_create_carts_table', 1),
(18, '2024_06_04_170505_create_transactions_table', 1),
(19, '2024_11_05_081146_change_column_in_orders_table', 1),
(20, '2024_11_05_081300_create_order_books_table', 1),
(21, '2024_11_05_095554_create_user_books_table', 1),
(22, '2024_11_07_064821_add_type_to_categories_table', 1),
(23, '2024_11_15_205212_add_view_count_in_articles_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `book_details` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`book_details`)),
  `billing_details` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`billing_details`)),
  `remark` longtext DEFAULT NULL,
  `extra` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`extra`)),
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `status`, `book_details`, `billing_details`, `remark`, `extra`, `deleted_at`, `created_at`, `updated_at`) VALUES
(100, 3, 1, '[{\"id\":1,\"title\":\"\\u092e\\u0947\\u0930\\u094b \\u092e\\u093e\\u0938\\u094d\\u0915 \\u0916\\u094b\\u0907 ?\",\"slug\":\"mara-masaka-khai\",\"author_id\":2,\"cover_image\":\"books\\/rxN5ubXDeLKECSxF37bN.jpg\",\"status\":1,\"discount_percentage\":null,\"price\":375,\"uploaded_by\":1,\"updated_by\":1,\"book_sold\":0,\"description\":\"\\u092e\\u0947\\u0930\\u094b \\u092e\\u093e\\u0938\\u094d\\u0915 \\u0916\\u094b\\u0907 ?\",\"pdf_file\":\"Book_PdfFile1732818109.pdf\",\"extra\":null,\"deleted_at\":null,\"created_at\":\"2024-11-28T18:21:49.000000Z\",\"updated_at\":\"2024-11-29T19:32:49.000000Z\"}]', '{\"total\":375}', NULL, '{\"receipt\":\"payment_statements\\/eeCYhhaev0uzHjUR9aH1SoUKFiF3nFf1c9YDbpbr.png\"}', NULL, '2024-12-22 16:49:36', '2024-12-22 16:49:36');

-- --------------------------------------------------------

--
-- Table structure for table `order_books`
--

CREATE TABLE `order_books` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `order_id` bigint(20) UNSIGNED NOT NULL,
  `book_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `order_books`
--

INSERT INTO `order_books` (`id`, `order_id`, `book_id`, `created_at`, `updated_at`) VALUES
(1, 100, 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('8iQqSDbHlDvMNIxhcVMITMonUDPIkfo4CTbXkx4Z', NULL, '43.228.157.73', '', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiT0xIQlBjY0VwV2ZyNHViaVhZdk5CRmMyNDBoYmdkektDalhDMTdBcCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHBzOi8vc3VzYW5lcGFsLmNvbSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1777443116),
('90M21FLU9rSqz1WwCq5asVnom4CQ52lkWQhvlykg', NULL, '43.157.170.13', 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoid0pWTG1XdUZJS3ZXN3ZaRXkzRzFSeHROSzJOZWE1WjRGU3ExM00ySCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHBzOi8vc3VzYW5lcGFsLmNvbSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1777452918),
('AEApyHbzQyTi5a2QaqshP24ZEFtKwcZvtsY2JSaC', NULL, '40.77.167.126', 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm) Chrome/116.0.1938.76 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoicmZvQU84Y1VZSkJVSHlLM0I3bWM1ZkRib05DOXpGR1FmeThCWFJJZSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NzQ6Imh0dHBzOi8vd3d3LnN1c2FuZXBhbC5jb20vYXJ0aWNsZXMva2F5YXJhbC1raGFsbmEtZ2F1bmEtbmFjYW5hLWthLWtoYW5hLWhhIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1777506432),
('AJcEwvYRukPrQUlW3aeaBwkweUopGXViNXl16vwD', NULL, '66.249.77.71', 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.7727.116 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiOTFWb3BPVHNqUERCYUZKc1pLZmRzeVJmSWRxUVUzaUNSNFdXdGNpbCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHBzOi8vc3VzYW5lcGFsLmNvbSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1777434951),
('au7VFQnME9XLN3CbzJ00apew45EF6R99Te6TfiSq', NULL, '54.37.118.76', 'Mozilla/5.0 (compatible; AhrefsBot/7.0; +http://ahrefs.com/robot/)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiTlVsQlpxbWpUbDdWUExKWW11RzhqeFRTTkJsM3lqcnZOUEhhRndXNSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHBzOi8vc3VzYW5lcGFsLmNvbS9hcnRpY2xlcyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1777503772),
('bOWXjMbvjWn7zch47zkajuA60t6qZjmJ6Qb7qxjP', NULL, '17.246.19.195', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Safari/605.1.15 (Applebot/0.1; +http://www.apple.com/go/applebot)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoid1ZESE5CNU93d2pVdzlSbDNPaTdwT3VqUllMQUlWYXdOMXp1RHo2VSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDc6Imh0dHBzOi8vd3d3LnN1c2FuZXBhbC5jb20vcHVibGljL2NocmlzdC1jdWx0dXJlIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1777396413),
('Dht6H7V8E7pc4hYiaQelfc7KMHdybzWoVVBmNGF3', NULL, '34.174.173.81', 'Mozilla/5.0 (Linux; Android 11; RMX2195) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.6099.210 Mobile Safari/537.36 OPR/75.2.3995.72468', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiWklJVzhUUm5SOGZYQlE5WlNqVm5FRzdNZ3RsUWt3MEJ1ZEQ5SWF6QyI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1777412647),
('DXwwO3Ei9f284MOOrlCnoBbtbvxk0Xb6zCTiPCvV', NULL, '94.23.188.200', 'Mozilla/5.0 (compatible; AhrefsBot/7.0; +http://ahrefs.com/robot/)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiV1pFUjg5VEVmMzI5a3pVNUk2NDZHbGRRRVVpVnBKOVg3ZDZTV2E0VyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHBzOi8vc3VzYW5lcGFsLmNvbS9jaHJpc3QtY3VsdHVyZSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1777418963),
('edjHEScpAH0YLmfEn1Lbogtiyth9vdlIerhfNSPt', NULL, '43.157.170.13', 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiNVBSbGtFdHBpZ3FnblN2dEkwd0VvQjM2aVlTdWhNNkZmVmFZaHI0TyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjU6Imh0dHBzOi8vd3d3LnN1c2FuZXBhbC5jb20iO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1777395428),
('Eg6mNtcRLHnLyuKuxdq48Z2GELBya7H5UevjiUGm', NULL, '52.207.189.123', 'Mozilla/5.0 AppleWebKit/605.1.15 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/605.1.15', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoibDRKa2lCUUxHU0VLV0JrbWJkYmprM01uZGpPSXppUlhwbmlldWpjUiI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1777490975),
('elKrqDPNa08lux4B7RcWv6XltRPIZcMJs9XPo6iw', NULL, '43.164.190.28', 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoicDB1empobUcydVh4cVlkdHBNWmN1RTgwOWR4OU1jS0xoZUxsTG1FNCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHBzOi8vc3VzYW5lcGFsLmNvbSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1777489890),
('eURm3ru30l8568f2WQ1cxkjngistdIn8SeRZEdSa', NULL, '43.130.154.157', 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiOWRST2hqRHZmV1VHdjI5Zk5XcFpXNjBsMGtpbHVXMWhVNE16cmRMdCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHBzOi8vc3VzYW5lcGFsLmNvbSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1777436332),
('GBTONR7cyFu9c4UhUWNO07HJPCFpk8kPNTcjw3ya', NULL, '66.249.77.71', 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.7727.116 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoieUZyNUwyZloyM29LYzlXQ2VzMTA1NExmcE5IWnNXWEtZMHAxYnJaSyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHBzOi8vc3VzYW5lcGFsLmNvbSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1777500369),
('JYLjw5W9e0E4fr5UpghQXMmecWIbi2fpzn7uTAdx', NULL, '34.162.244.241', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiTHRFd0QyTmFCT2hGYVpPZmRaVHlTdUszcUNVTVZyTHZKSXBOdkMxMCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1777498327),
('Kcc336Wbndk1ETtk7EKpZdSN80YKcL3bIqw7e0Fg', NULL, '148.251.4.168', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiaVNxYzZNWW42NzY5YUsxeWVrTWM0U0JSNW8wMk9TRFNrdmFzd2I5byI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHBzOi8vc3VzYW5lcGFsLmNvbSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1777401284),
('LwqJlRxLYPgo1zq2CK9X6Ygf5SDDKwthjd8hkkLS', NULL, '114.119.151.153', 'Mozilla/5.0 (Linux; Android 7.0;) AppleWebKit/537.36 (HTML, like Gecko) Mobile Safari/537.36 (compatible; PetalBot;+https://webmaster.petalsearch.com/site/petalbot)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiTVV5SEtGWEluNVQ5TTZjZVdTSXY0VU1kbEVSeFdZUFJjdDJqSnEzTiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mzg6Imh0dHBzOi8vd3d3LnN1c2FuZXBhbC5jb20vcHVibGljL2xvZ2luIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1777510960),
('M1t5wr9qzrHrDSBsGAP64xybpKIzsv5IqhhevVb1', NULL, '51.68.247.200', 'Mozilla/5.0 (compatible; AhrefsBot/7.0; +http://ahrefs.com/robot/)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoicUxaRzdDdkNORFhMcGNRRE9xdkdyT2FtaTZSZ1FBdXU0ZHdhODQ2ayI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHBzOi8vc3VzYW5lcGFsLmNvbS9jaHJpc3QtY3VsdHVyZSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1777413850),
('MlIcPGByKuJaRZzVFe5728SqFhCnIMR3rFkWyVvN', NULL, '23.81.70.158', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoicXd5ZGY3bWtrU0VtRGhGTlZyTVZ5N0lKQXY5V3FuUEJBQmNMMmZNaCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjU6Imh0dHBzOi8vd3d3LnN1c2FuZXBhbC5jb20iO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1777474988),
('MrgbeTyFmiQHY4OBE8tKw2xTsscCtc0GZ921rF0d', NULL, '43.157.46.118', 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiemtUTnNFUVk1QVpvd09TcGFFeFA5bWQ1aGU0YjFsQnlLaVJXMEoxSiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHBzOi8vc3VzYW5lcGFsLmNvbSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1777410256),
('msYx1y8o4LAWxSQZtIl7Rd8a5ykkm0XfIDMJKcSw', NULL, '114.119.151.153', 'Mozilla/5.0 (Linux; Android 7.0;) AppleWebKit/537.36 (HTML, like Gecko) Mobile Safari/537.36 (compatible; PetalBot;+https://webmaster.petalsearch.com/site/petalbot)', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiaTFpZ0J6NEo4Q0NhNkZQUVpuaFc5ZDB6aDJsSGVKWWcwbjFBZUh5RCI7czozOiJ1cmwiO2E6MTp7czo4OiJpbnRlbmRlZCI7czozNzoiaHR0cHM6Ly93d3cuc3VzYW5lcGFsLmNvbS9wdWJsaWMvY2FydCI7fXM6OToiX3ByZXZpb3VzIjthOjE6e3M6MzoidXJsIjtzOjM3OiJodHRwczovL3d3dy5zdXNhbmVwYWwuY29tL3B1YmxpYy9jYXJ0Ijt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1777510959),
('N1u1SoQWQgVw5YVGKdQy8oZRdo863az4VMcoAuwb', NULL, '66.249.77.72', 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.7727.116 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiWDNJRDg2bUhuckhQSXA1SG1oYUQ2Q1BYb25Zblc1MjdLN3d3alI2dyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHBzOi8vc3VzYW5lcGFsLmNvbSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1777435445),
('OVcVJwLHKjTklYbyBP1qPUuTNwCbXNcI0hh07Lq7', NULL, '205.169.39.26', 'Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZ2UxdG1XTFVZVjJIa1kxSFZaSDg1VmVkc29KdEVQNVpYRHZaN2FCRyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHBzOi8vc3VzYW5lcGFsLmNvbSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1777482462),
('rk139ELy3DjLAUqmcGLQo9yPGOtXouAyN5b2xEcF', NULL, '34.27.169.91', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiMnRBc1ppM3dXWDB3eFJBN0RWM01QU0xkR3loN2l2ZmNqRFNLd2x4ZyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHBzOi8vc3VzYW5lcGFsLmNvbSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1777456915),
('RRQqsVkog9KKZ5YmXbluXfAN9aBRGTqvkjDdutFQ', NULL, '66.249.77.70', 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.7727.116 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiQTZoN2RmaUdHYTU2Zm9lZWlzVlB0RXRCSXZWYUc5OHhNaDd6WUxOUiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHBzOi8vc3VzYW5lcGFsLmNvbSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1777500435),
('teDmJw1jkUnxQGP9T23kH54aQhDSHVRWs2iJEllI', NULL, '34.225.147.195', 'Mozilla/5.0 AppleWebKit/605.1.15 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/605.1.15', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiZFFnamlZQmVuWXNLeTRUVWxuVXlXZ3pjeWRpZHE3ZlpSNmhxeFJsZSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1777423891),
('u9JXns5xzr7EUS4DIFKrPWYC8JY84o4jFIUl64td', NULL, '43.157.172.39', 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiMURuTDhKSTNpcUFuSFUydVZTR0l3ZDFvQUxmWGthZ094bVd0U3JBTyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjU6Imh0dHBzOi8vd3d3LnN1c2FuZXBhbC5jb20iO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1777500766),
('uqlYABno5upqYFCuKo4gBshRHYQ7RvFpGGthQRIP', NULL, '185.242.3.216', '', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiREJFQ3o4VWxYUHBvT0l6NHRJNXNCOVg2Z3dtbDZFMERkZEJQdktIZSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHBzOi8vc3VzYW5lcGFsLmNvbSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1777389594),
('uQnHtz1DNDPkXe4oyZuO274dQUju6DcoFQBX1dFA', NULL, '20.151.138.87', '', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiNk10T2NpNmlpS25EckVyUU9RSTJsSnVVbmVWMEdKbnU1OTBmYWp1ZiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mzg6Imh0dHBzOi8vc3VzYW5lcGFsLmNvbS9wdWJsaWMvaW5kZXgucGhwIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1777468257),
('VDCkfQjlHwI8SGDc4SDkGqyFPYwqLR6mVHzt9hzV', NULL, '51.75.236.158', 'Mozilla/5.0 (compatible; AhrefsBot/7.0; +http://ahrefs.com/robot/)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiaUdJVTZvRlY5eTVSekM4TmZNMU44ZVp3Rm5aTktmMjFhWlUyNjE5ZSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHBzOi8vc3VzYW5lcGFsLmNvbS9jaHJpc3QtY3VsdHVyZSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1777424599),
('vE5Bq9elQ4OZAHJIeLy98zLqVkwDW2KL67jGyN63', NULL, '5.175.178.7', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiUmtpeXhOdVNNdjlhajVRQ0Zpd2xmdjNDZHJ0amhpckR0M0k5NnJFZCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHBzOi8vc3VzYW5lcGFsLmNvbSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1777477152),
('VLI6z3TiTare7iv4XtLPwOmHkZ3GmuekPpSQFp0A', NULL, '87.236.176.6', 'Mozilla/5.0 (compatible; InternetMeasurement/1.0; +https://internet-measurement.com/)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoidWk3ZEFxN29JUWttTGU0YWh2SHdiNWQ3SmVEYzJvVzRacGhHRUlaNyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjU6Imh0dHBzOi8vd3d3LnN1c2FuZXBhbC5jb20iO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1777504727),
('wPzkC0qKr2grwTBgZGCNbf867UnA143RVA0FEL1y', NULL, '114.119.147.73', 'Mozilla/5.0 (Linux; Android 7.0;) AppleWebKit/537.36 (HTML, like Gecko) Mobile Safari/537.36 (compatible; PetalBot;+https://webmaster.petalsearch.com/site/petalbot)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiOVd1NzBkWWdrSFI4Mm9aV0RVd0xmN1NXbFJQM0s0MFNtNmFaNmFNdiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDE6Imh0dHBzOi8vd3d3LnN1c2FuZXBhbC5jb20vcHVibGljL2RvY3RyaW5lIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1777510858);

-- --------------------------------------------------------

--
-- Table structure for table `tags`
--

CREATE TABLE `tags` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tags`
--

INSERT INTO `tags` (`id`, `name`, `slug`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 'Nepali Christianity', 'nepali-christianity', NULL, '2024-12-01 13:18:46', '2024-12-01 13:18:46'),
(2, 'Christ and Culture', 'christ-and-culture', NULL, '2024-12-01 13:18:46', '2024-12-01 13:18:46'),
(3, 'Nepal', 'nepal', NULL, '2024-12-01 13:18:46', '2024-12-01 13:18:46'),
(4, 'Christianity in Nepal', 'christianity-in-nepal', NULL, '2024-12-01 13:18:46', '2024-12-01 13:18:46'),
(5, 'Christian Practices', 'christian-practices', NULL, '2024-12-01 13:18:46', '2024-12-01 13:18:46'),
(6, 'Reformed Theology', 'reformed-theology', NULL, '2024-12-01 13:18:46', '2024-12-01 13:18:46'),
(7, 'Reformed Worldview', 'reformed-worldview', NULL, '2024-12-01 13:18:46', '2024-12-01 13:18:46'),
(8, 'Christian Articles', 'christian-articles', NULL, '2024-12-01 13:18:46', '2024-12-01 13:18:46'),
(9, 'Doctrine', 'doctrine', NULL, '2024-12-01 13:21:50', '2024-12-01 13:21:50'),
(10, 'Doctrinal Practices', 'doctrinal-practices', NULL, '2024-12-01 13:21:50', '2024-12-01 13:21:50'),
(11, 'Practicing Theology', 'practicing-theology', NULL, '2024-12-01 13:21:50', '2024-12-01 13:21:50');

-- --------------------------------------------------------

--
-- Table structure for table `teams`
--

CREATE TABLE `teams` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `image` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `social` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`social`)),
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `teams`
--

INSERT INTO `teams` (`id`, `image`, `name`, `title`, `social`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 'teams/nxZVkumtZcZH93PHjB2x.jpg', 'Binod Rai', 'Director, Reformed Books House', NULL, NULL, '2024-11-29 19:38:48', '2024-11-29 20:02:28'),
(2, 'teams/RLoZHSVJHLfFMCTl1jQs.jpg', 'Rev. Mani Koirala', 'Principal, Reformed & Presbyterian Seminary, Senior Pastor, Nepal Logos Church Chairman, Reformed Books House', NULL, NULL, '2024-11-29 19:40:08', '2024-11-29 20:04:38'),
(3, 'teams/YHSy1BDGE38ssqk3Axf4.jpg', 'Rev. Suraj Kasula', 'President, Bhaktapur Theological Seminary Pastor, Shekinah Evangelical Church', NULL, NULL, '2024-11-29 19:41:52', '2024-11-29 19:41:52');

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` char(36) NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `order_id` bigint(20) UNSIGNED NOT NULL,
  `total_amount` double NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1 COMMENT '1 pending',
  `details` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'order details' CHECK (json_valid(`details`)),
  `extra` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`extra`)),
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL DEFAULT 'user',
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `type`, `remember_token`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'susanepal admin', 'test@example.com', '2024-11-28 23:29:58', '$2y$12$MIo7gNkRa3gGNxqDTpfd/Oll6QRGJPbAdXatGzuLxxM48z.ffp4ey', 'admin', 'WmwUKH59E1roCZTR7m43aEmdbmqoruzkLf9HjxGD1iqCGBIIJPWACfEVIASH', NULL, NULL, NULL),
(2, 'Jeevan Rawal', 'rawaljeevan123@gmail.com', NULL, '$2y$12$yHlmkcEF9cDrzF6tpo2wKenyWr6tmDlluzxS0e3/iWEnRQaK/U0JW', 'user', NULL, '2024-12-15 11:30:50', '2024-12-15 11:30:50', NULL),
(3, 'Jeevan Rawal', 'rawaljeevan113@gmail.com', NULL, '$2y$12$4MPwL.lA9AixWhDnCdcXhOK34zpCqvrTQUPq8xG9tgqHh.xlC.PBG', 'user', NULL, '2024-12-22 16:45:34', '2024-12-22 16:45:34', NULL),
(4, 'Sajit Panta', 'pantasajit@gmail.com', NULL, '$2y$12$UE.JhAARMaYm.6haaZnppOHYsopXbeTQ5aIh8SSD/gVjkVgFv6PUW', 'user', NULL, '2025-02-09 10:00:50', '2025-02-09 10:00:50', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_books`
--

CREATE TABLE `user_books` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `book_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `articles_author_id_foreign` (`author_id`),
  ADD KEY `articles_uploaded_by_foreign` (`uploaded_by`);

--
-- Indexes for table `article_category`
--
ALTER TABLE `article_category`
  ADD PRIMARY KEY (`id`),
  ADD KEY `article_category_article_id_foreign` (`article_id`),
  ADD KEY `article_category_category_id_foreign` (`category_id`);

--
-- Indexes for table `article_tags`
--
ALTER TABLE `article_tags`
  ADD PRIMARY KEY (`id`),
  ADD KEY `article_tags_article_id_foreign` (`article_id`),
  ADD KEY `article_tags_tag_id_foreign` (`tag_id`);

--
-- Indexes for table `authors`
--
ALTER TABLE `authors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`),
  ADD KEY `books_author_id_foreign` (`author_id`),
  ADD KEY `books_uploaded_by_foreign` (`uploaded_by`),
  ADD KEY `books_updated_by_foreign` (`updated_by`);

--
-- Indexes for table `book_category`
--
ALTER TABLE `book_category`
  ADD PRIMARY KEY (`id`),
  ADD KEY `book_category_book_id_foreign` (`book_id`),
  ADD KEY `book_category_category_id_foreign` (`category_id`);

--
-- Indexes for table `book_tags`
--
ALTER TABLE `book_tags`
  ADD PRIMARY KEY (`id`),
  ADD KEY `book_tags_book_id_foreign` (`book_id`),
  ADD KEY `book_tags_tag_id_foreign` (`tag_id`);

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `carts_user_id_foreign` (`user_id`),
  ADD KEY `carts_book_id_foreign` (`book_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orders_user_id_foreign` (`user_id`);

--
-- Indexes for table `order_books`
--
ALTER TABLE `order_books`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_books_order_id_foreign` (`order_id`),
  ADD KEY `order_books_book_id_foreign` (`book_id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `teams`
--
ALTER TABLE `teams`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `transactions_user_id_foreign` (`user_id`),
  ADD KEY `transactions_order_id_foreign` (`order_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `user_books`
--
ALTER TABLE `user_books`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_books_user_id_foreign` (`user_id`),
  ADD KEY `user_books_book_id_foreign` (`book_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `articles`
--
ALTER TABLE `articles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `article_category`
--
ALTER TABLE `article_category`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `article_tags`
--
ALTER TABLE `article_tags`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `authors`
--
ALTER TABLE `authors`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `book_category`
--
ALTER TABLE `book_category`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `book_tags`
--
ALTER TABLE `book_tags`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

--
-- AUTO_INCREMENT for table `order_books`
--
ALTER TABLE `order_books`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tags`
--
ALTER TABLE `tags`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `teams`
--
ALTER TABLE `teams`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `user_books`
--
ALTER TABLE `user_books`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `articles`
--
ALTER TABLE `articles`
  ADD CONSTRAINT `articles_author_id_foreign` FOREIGN KEY (`author_id`) REFERENCES `authors` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `articles_uploaded_by_foreign` FOREIGN KEY (`uploaded_by`) REFERENCES `users` (`id`);

--
-- Constraints for table `article_category`
--
ALTER TABLE `article_category`
  ADD CONSTRAINT `article_category_article_id_foreign` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id`),
  ADD CONSTRAINT `article_category_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);

--
-- Constraints for table `article_tags`
--
ALTER TABLE `article_tags`
  ADD CONSTRAINT `article_tags_article_id_foreign` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id`),
  ADD CONSTRAINT `article_tags_tag_id_foreign` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`);

--
-- Constraints for table `books`
--
ALTER TABLE `books`
  ADD CONSTRAINT `books_author_id_foreign` FOREIGN KEY (`author_id`) REFERENCES `authors` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `books_updated_by_foreign` FOREIGN KEY (`updated_by`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `books_uploaded_by_foreign` FOREIGN KEY (`uploaded_by`) REFERENCES `users` (`id`);

--
-- Constraints for table `book_category`
--
ALTER TABLE `book_category`
  ADD CONSTRAINT `book_category_book_id_foreign` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`),
  ADD CONSTRAINT `book_category_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);

--
-- Constraints for table `book_tags`
--
ALTER TABLE `book_tags`
  ADD CONSTRAINT `book_tags_book_id_foreign` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`),
  ADD CONSTRAINT `book_tags_tag_id_foreign` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`);

--
-- Constraints for table `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `carts_book_id_foreign` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`),
  ADD CONSTRAINT `carts_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `order_books`
--
ALTER TABLE `order_books`
  ADD CONSTRAINT `order_books_book_id_foreign` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`),
  ADD CONSTRAINT `order_books_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`);

--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `transactions_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `user_books`
--
ALTER TABLE `user_books`
  ADD CONSTRAINT `user_books_book_id_foreign` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`),
  ADD CONSTRAINT `user_books_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
