-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 21, 2019 at 05:39 PM
-- Server version: 10.1.28-MariaDB
-- PHP Version: 5.6.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `turing_node`
--

-- --------------------------------------------------------

--
-- Table structure for table `base_all_skills_v4`
--

CREATE TABLE `base_all_skills_v4` (
  `id` int(11) NOT NULL,
  `skill_name` varchar(100) NOT NULL,
  `skill_count` int(11) NOT NULL,
  `demand_scale` int(11) NOT NULL,
  `skill_type_id` int(11) NOT NULL,
  `created_by` int(11) NOT NULL DEFAULT '-1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `base_all_skills_v4`
--

INSERT INTO `base_all_skills_v4` (`id`, `skill_name`, `skill_count`, `demand_scale`, `skill_type_id`, `created_by`) VALUES
(2, 'Selenium', 0, 0, 15, -1),
(3, 'Selenium WebDriver', 0, 0, 15, -1),
(4, 'Automation Testing Using Selenium', 0, 0, 15, -1),
(5, 'Develop Test Plans', 0, 0, 2, -1),
(6, 'Report and Track Software Defects', 0, 0, 16, -1),
(7, 'SDLC', 0, 0, 16, -1),
(8, 'Solve Ssemi-Complex Problems', 0, 0, 16, -1),
(9, 'Mobile Testing Frameworks/Tools', 0, 0, 15, -1),
(10, 'Understanding of Mobile Technologies (iOS and/or Android)', 0, 0, 5, -1),
(11, 'Problem Solver and Critical Thinker', 0, 0, 15, -1),
(12, 'CI', 0, 0, 16, -1),
(13, 'Jenkins', 0, 0, 2, -1),
(14, 'Unit Testing', 0, 0, 15, -1),
(15, 'A/B Testing', 0, 0, 15, -1),
(16, 'iOS Development', 0, 0, 5, -1),
(17, 'Xcode', 0, 0, 10, -1),
(18, 'Software Design Skills', 0, 0, 15, -1),
(19, 'Ruby', 0, 0, 1, -1),
(20, 'Python', 0, 6, 1, -1),
(21, 'Groovy', 0, 0, 17, -1),
(22, 'Bash', 0, 0, 16, -1),
(23, 'Ps1', 0, 0, 16, -1),
(24, 'NGINX', 0, 0, 2, -1),
(25, 'Django', 0, 0, 1, -1),
(26, 'Golang', 0, 0, 17, -1),
(27, 'C++', 0, 0, 17, -1),
(28, 'C', 0, 0, 17, -1),
(29, 'Java', 0, 7, 17, -1),
(30, 'Ruby on Rails', 0, 0, 1, -1),
(31, 'Flask', 0, 0, 1, -1),
(32, 'Linux (Centos/Redhat/Ubuntu)', 0, 0, 10, -1),
(33, 'Windows', 0, 0, 10, -1),
(34, 'MacOS', 0, 0, 10, -1),
(35, 'ICMP', 0, 0, 16, -1),
(36, 'SSH', 0, 0, 16, -1),
(37, 'DNS', 0, 0, 16, -1),
(38, 'HTTP', 0, 0, 16, -1),
(39, 'SSL/TLS Knowledge', 0, 0, 16, -1),
(40, 'RAID', 0, 0, 16, -1),
(41, 'Distributed File Systems', 0, 0, 16, -1),
(42, 'NFS', 0, 0, 16, -1),
(43, 'iSCSI / CIFS', 0, 0, 16, -1),
(44, 'Firewalls', 0, 0, 16, -1),
(45, 'VPN', 0, 0, 16, -1),
(46, 'Routing', 0, 0, 16, -1),
(47, 'Switching', 0, 0, 16, -1),
(48, 'Load Balancing', 0, 0, 16, -1),
(49, 'Security', 0, 0, 16, -1),
(50, 'TLS', 0, 0, 16, -1),
(51, 'Unix Command Line', 0, 0, 16, -1),
(52, 'Shell Scripting', 0, 0, 16, -1),
(53, 'Configuring Systems Monitoring Tools', 0, 0, 16, -1),
(54, 'DevOps', 0, 0, 2, -1),
(55, 'Docker', 0, 0, 12, -1),
(56, 'Cyber Security', 0, 0, 16, -1),
(57, 'Information Technology', 0, 0, 16, -1),
(58, 'Internal Audit', 0, 0, 16, -1),
(59, 'Help Desk', 0, 0, 16, -1),
(60, 'Google Cloud Platform', 0, 0, 11, -1),
(61, 'Kubernetes', 0, 0, 12, -1),
(62, 'Ansible', 0, 0, 2, -1),
(63, 'Automation CI/CD', 0, 0, 2, -1),
(64, 'Rust', 0, 0, 17, -1),
(65, 'Apache Spark', 0, 0, 16, -1),
(66, 'Cassandra', 0, 0, 9, -1),
(67, 'Kafka', 0, 0, 16, -1),
(68, 'AWS', 0, 0, 11, -1),
(69, 'Azure', 0, 0, 11, -1),
(70, 'GCP', 0, 0, 11, -1),
(71, 'Atlassian', 0, 0, 14, -1),
(72, 'SaltStack', 0, 0, 2, -1),
(73, 'GitHub', 0, 0, 13, -1),
(74, 'Travis CI', 0, 0, 2, -1),
(75, 'Gerrit', 0, 0, 13, -1),
(76, 'ElasticSearch', 0, 0, 9, -1),
(77, 'Consul', 0, 0, 16, -1),
(78, 'Vault', 0, 0, 16, -1),
(79, 'Zookeeper', 0, 0, 16, -1),
(80, 'Terraform', 0, 0, 16, -1),
(81, 'Vagrant', 0, 0, 12, -1),
(82, 'Packer', 0, 0, 16, -1),
(83, 'Prometheus', 0, 0, 16, -1),
(84, 'StatsD', 0, 0, 16, -1),
(85, 'Grafana', 0, 0, 16, -1),
(86, 'PostgreSQL', 0, 0, 9, -1),
(87, 'Redis', 0, 0, 9, -1),
(88, 'Chef', 0, 0, 16, -1),
(89, 'Rxjava', 0, 0, 5, -1),
(90, 'Dagger', 0, 0, 5, -1),
(91, 'C#', 0, 0, 17, -1),
(92, 'Lua', 0, 0, 17, -1),
(93, 'JavaScript', 0, 0, 0, -1),
(94, 'Design Modular APIs', 0, 0, 1, -1),
(95, 'RESTful Web Services', 0, 0, 1, -1),
(96, 'Writing Unit-tests', 0, 0, 15, -1),
(97, 'Android SDK', 0, 0, 5, -1),
(98, 'Data Structures', 0, 0, 16, -1),
(99, 'Problem Solving', 0, 0, 16, -1),
(100, 'Android Development', 0, 0, 5, -1),
(101, 'MVP', 0, 0, 16, -1),
(102, 'MVVM', 0, 0, 16, -1),
(103, 'Go', 0, 0, 17, -1),
(104, 'Scala', 0, 0, 17, -1),
(105, 'Swift', 0, 0, 17, -1),
(106, 'HTML', 0, 0, 0, -1),
(107, 'CSS', 0, 0, 0, -1),
(108, 'Android', 0, 0, 5, -1),
(109, '.NET', 0, 5, 17, -1),
(110, 'REST APIs', 0, 0, 1, -1),
(111, 'REST', 0, 0, 1, -1),
(112, 'MSSQL', 0, 0, 9, -1),
(113, 'MySQL', 0, 0, 9, -1),
(114, 'SQL', 0, 0, 9, -1),
(115, 'SQLalchemy', 0, 0, 9, -1),
(116, 'MongoDB', 0, 0, 9, -1),
(117, 'React.js', 0, 9, 0, -1),
(118, 'Angular.js', 0, 5, 0, -1),
(119, 'Ember.js', 0, 1, 0, -1),
(120, 'Node.js', 0, 9, 1, -1),
(121, 'Redux', 0, 0, 0, -1),
(122, 'Vue.js', 0, 6, 0, -1),
(123, 'Coffeescript', 0, 0, 0, -1),
(124, 'Software Architecture', 0, 0, 16, -1),
(125, 'API Design', 0, 0, 1, -1),
(126, 'BDD/TDD', 0, 0, 15, -1),
(127, 'Open Source', 0, 0, 16, -1),
(128, 'Unix Development Environments', 0, 0, 16, -1),
(129, 'HAProxy', 0, 0, 16, -1),
(130, 'Google Apps', 0, 0, 11, -1),
(131, 'Heroku', 0, 0, 11, -1),
(132, 'Firebase', 0, 0, 5, -1),
(133, 'Apache Beam', 0, 0, 16, -1),
(134, 'Scrum/Agile', 0, 0, 16, -1),
(135, 'ELK stack', 0, 0, 16, -1),
(136, 'StatsD/Graphite', 0, 0, 16, -1),
(137, 'CalDav/CardDav', 0, 0, 16, -1),
(138, 'Exchange ActiveSync', 0, 0, 16, -1),
(139, 'Embedded Systems', 0, 0, 16, -1),
(140, 'Robotics', 0, 0, 16, -1),
(141, 'Laboratory Automation', 0, 0, 16, -1),
(142, 'MVC Framework', 0, 0, 16, -1),
(143, 'GRPC', 0, 0, 16, -1),
(144, 'TCP', 0, 0, 16, -1),
(145, 'Web Sockets', 0, 0, 1, -1),
(146, 'Server-Sent Events', 0, 0, 1, -1),
(147, 'SMTP', 0, 0, 16, -1),
(148, 'IMAP', 0, 0, 16, -1),
(149, 'CircleCI', 0, 0, 16, -1),
(150, 'BDD', 0, 0, 16, -1),
(151, 'TDD', 0, 0, 16, -1),
(152, 'Unit Test', 0, 0, 15, -1),
(153, 'Integration Test', 0, 0, 15, -1),
(154, 'Load Test', 0, 0, 15, -1),
(155, 'Benchmarks', 0, 0, 16, -1),
(156, 'Amazon Web Services', 0, 0, 11, -1),
(157, 'Objective-C', 0, 0, 17, -1),
(158, 'Typescript', 0, 0, 0, -1),
(159, 'GraphQL', 0, 0, 1, -1),
(160, 'React Native', 0, 0, 5, -1),
(161, 'DOM and Scrapers', 0, 0, 16, -1),
(162, 'Open Source Frameworks', 0, 0, 16, -1),
(163, 'SpriteKit', 0, 0, 5, -1),
(164, 'Scene Kit', 0, 0, 5, -1),
(165, 'PHP', 0, 3, 1, -1),
(166, 'Linux ', 0, 0, 10, -1),
(167, 'Algorithms and Data Structures', 0, 0, 16, -1),
(168, 'Hadoop', 0, 0, 16, -1),
(169, 'Clojure', 0, 0, 17, -1),
(170, 'Apache Solr', 0, 0, 16, -1),
(171, 'EC2', 0, 0, 11, -1),
(172, 'CoreOS', 0, 0, 12, -1),
(173, 'Linux Tools ', 0, 0, 10, -1),
(174, 'Unix', 0, 0, 10, -1),
(175, 'Puppet', 0, 0, 2, -1),
(176, 'IPMI', 0, 0, 16, -1),
(177, 'Arista', 0, 0, 16, -1),
(178, 'Cisco', 0, 0, 16, -1),
(179, 'Network Protocols', 0, 0, 16, -1),
(180, 'TCP/IP', 0, 0, 16, -1),
(181, 'Layer2 Networking', 0, 0, 16, -1),
(182, 'TLS & Certificate Authorities', 0, 0, 16, -1),
(183, 'Stripe', 0, 0, 16, -1),
(184, 'C/C++', 0, 0, 17, -1),
(185, 'MATLAB', 0, 0, 17, -1),
(186, 'R', 0, 0, 17, -1),
(187, 'SAS', 0, 0, 16, -1),
(188, 'D3.js', 0, 0, 0, -1),
(189, 'Tableau', 0, 0, 16, -1),
(190, 'Nifi', 0, 0, 16, -1),
(191, 'Assembly', 0, 0, 17, -1),
(192, 'Big Data', 0, 0, 16, -1),
(193, 'Computer Vision', 0, 0, 18, -1),
(194, 'Natural Language Processing (NLP)', 0, 0, 18, -1),
(195, 'Code Reviews', 0, 0, 16, -1),
(196, 'Object-Oriented Design', 0, 0, 16, -1),
(197, 'Retesting', 0, 0, 15, -1),
(198, 'Troubleshooting', 0, 0, 16, -1),
(199, 'Iterative Testing', 0, 0, 15, -1),
(200, 'Image Recognition', 0, 0, 18, -1),
(201, 'Linux Environment', 0, 0, 16, -1),
(202, 'Refinement of Models', 0, 0, 16, -1),
(203, 'Voice Recognition', 0, 0, 18, -1),
(204, 'Deep Learning Algorithms', 0, 0, 18, -1),
(205, 'Artificial Neural Networks', 0, 0, 18, -1),
(206, 'Bayesian Models', 0, 0, 18, -1),
(207, 'Linear and Nonlinear Regression', 0, 0, 18, -1),
(208, 'Nearest Neighbors', 0, 0, 18, -1),
(209, 'Decision trees', 0, 0, 18, -1),
(210, 'Instance-Based and Association Learning', 0, 0, 18, -1),
(211, 'Bias-Variance Tradeoff', 0, 0, 18, -1),
(212, 'Exploration/Exploitation', 0, 0, 18, -1),
(213, 'Ensemble Methods', 0, 0, 18, -1),
(214, 'Discriminant Analysis', 0, 0, 18, -1),
(215, 'Scipy', 0, 0, 16, -1),
(216, 'Pandas', 0, 0, 16, -1),
(217, 'Numpy', 0, 0, 16, -1),
(218, 'Dplyr', 0, 0, 16, -1),
(219, 'Map-reduce', 0, 0, 16, -1),
(220, 'HBase', 0, 0, 9, -1),
(221, 'Spark', 0, 0, 16, -1),
(222, 'Keras', 0, 0, 18, -1),
(223, 'Tensorflow', 0, 0, 18, -1),
(224, 'SciKit-Learn', 0, 0, 18, -1),
(225, 'Caffe', 0, 0, 18, -1),
(226, 'PyTorch', 0, 0, 18, -1),
(227, 'MXNet', 0, 0, 18, -1),
(228, 'Torch', 0, 0, 18, -1),
(229, 'Theano', 0, 0, 16, -1),
(230, 'YARN', 0, 0, 16, -1),
(231, 'NoSQL engines', 0, 0, 9, -1),
(232, 'DynamoDB', 0, 0, 9, -1),
(233, 'Alteryx', 0, 0, 18, -1),
(234, 'AWS Glue', 0, 0, 11, -1),
(235, 'Matillion', 0, 0, 11, -1),
(236, 'Matplotlib', 0, 0, 16, -1),
(237, 'Plotly', 0, 0, 16, -1),
(238, 'Ggplot2', 0, 0, 16, -1),
(239, 'LIDAR', 0, 0, 16, -1),
(240, 'SAR', 0, 0, 16, -1),
(241, 'EO/IR', 0, 0, 16, -1),
(242, 'Airflow', 0, 0, 16, -1),
(243, 'Neo4j', 0, 0, 9, -1),
(244, 'Apache Storm', 0, 0, 16, -1),
(245, 'Apache Kafka', 0, 0, 16, -1),
(246, 'RDBMS', 0, 0, 9, -1),
(247, 'HDFS', 0, 0, 16, -1),
(248, 'On-Prem', 0, 0, 16, -1),
(249, 'Cloud', 0, 0, 11, -1),
(250, 'Amazon Redshift', 0, 0, 11, -1),
(251, 'Amazon Kinesis', 0, 0, 11, -1),
(252, 'Amazon Firehose', 0, 0, 11, -1),
(253, 'Machine Learning Concepts', 0, 0, 18, -1),
(254, 'Grasp of Statistics', 0, 0, 16, -1),
(255, 'Quantitative Analysis', 0, 0, 16, -1),
(256, 'Data Warehousing', 0, 0, 16, -1),
(257, 'Business Intelligence', 0, 0, 16, -1),
(258, 'Git', 0, 0, 13, -1),
(259, 'SSIS', 0, 0, 9, -1),
(260, 'Informatica', 0, 0, 11, -1),
(261, 'SAP', 0, 0, 16, -1),
(262, 'OWB', 0, 0, 16, -1),
(263, 'Free form', 0, 0, 16, -1),
(264, 'Json', 0, 0, 16, -1),
(265, 'Xml', 0, 0, 16, -1),
(266, 'Audio', 0, 0, 16, -1),
(267, 'Video', 0, 0, 16, -1),
(268, 'Machine Learning', 0, 0, 18, -1),
(269, 'Statistics', 0, 0, 16, -1),
(270, 'Stanford CoreNLP', 0, 0, 18, -1),
(271, 'NLP', 0, 0, 18, -1),
(272, 'Jupyter Notebooks', 0, 0, 16, -1),
(273, 'Jupyter', 0, 0, 16, -1),
(274, 'SpaCy', 0, 0, 18, -1),
(275, 'Regular Expressions', 0, 0, 16, -1),
(276, 'Semantic Parsing', 0, 0, 16, -1),
(277, 'Kotlin', 0, 0, 17, -1),
(278, 'SaaS', 0, 0, 16, -1),
(279, 'Angular', 0, 0, 0, -1),
(280, 'Ember', 0, 0, 0, -1),
(281, 'React', 0, 0, 0, -1),
(282, 'Express.js', 0, 0, 1, -1),
(283, 'AJAX', 0, 0, 0, -1),
(284, 'jQuery', 0, 0, 0, -1),
(285, 'Spring', 0, 0, 17, -1),
(286, 'Mesos', 0, 0, 12, -1),
(287, 'NoSQL', 0, 0, 9, -1),
(288, 'Postgres', 0, 0, 9, -1),
(289, '3P APIs & Libraries', 0, 0, 16, -1),
(290, 'Twitter API', 0, 0, 16, -1),
(291, 'Facebook API', 0, 0, 16, -1),
(292, 'OAuth APIs', 0, 0, 16, -1),
(293, 'Thrift', 0, 0, 16, -1),
(294, 'RESTful Services', 0, 0, 1, -1),
(295, 'Data Structures and Algorithms', 0, 0, 16, -1),
(296, 'System Design', 0, 0, 16, -1),
(297, 'DevOps Experience', 0, 0, 2, -1),
(298, 'OOP', 0, 0, 16, -1),
(299, 'UI/UX Design', 0, 0, 4, -1),
(300, 'Data Warehouse', 0, 0, 16, -1),
(301, 'Pentaho', 0, 0, 16, -1),
(302, 'Spanner', 0, 0, 16, -1),
(303, 'Graph Ql', 0, 0, 1, -1),
(304, 'Blockchain', 0, 0, 16, -1),
(305, 'Microservices', 0, 0, 1, -1),
(306, 'Linux Systems', 0, 0, 16, -1),
(307, 'LAMP', 0, 0, 10, -1),
(308, 'HTML5', 0, 0, 0, -1),
(309, 'CSS3', 0, 0, 0, -1),
(310, 'XML/XSLT/DOM/XUL', 0, 0, 0, -1),
(311, 'SASS', 0, 0, 0, -1),
(312, 'Perl', 0, 0, 1, -1),
(313, 'xHTML', 0, 0, 0, -1),
(314, 'JavaScript Frameworks', 0, 0, 0, -1),
(315, 'Elixir', 0, 0, 17, -1),
(316, 'Haskell', 0, 0, 17, -1),
(317, 'Pair Programming', 0, 0, 16, -1),
(318, 'E-commerce', 0, 0, 16, -1),
(319, 'Agile Methodologies', 0, 0, 16, -1),
(320, 'Chrome Extensions', 0, 0, 16, -1),
(321, 'Webpack', 0, 0, 0, -1),
(322, 'Graphic Design', 0, 0, 4, -1),
(323, 'SEO', 0, 0, 0, -1),
(324, 'Growth Hacking', 0, 0, 16, -1),
(325, 'Acceptance & Integration and Unit Testing', 0, 0, 15, -1),
(326, 'DuckDuckGo', 0, 0, 16, -1),
(327, 'Open Source Projects', 0, 0, 16, -1),
(328, 'Third party APIs', 0, 0, 16, -1),
(329, 'RESTful APIs', 0, 0, 1, -1),
(330, 'JEST', 0, 0, 15, -1),
(331, 'MVC', 0, 0, 16, -1),
(332, 'Socket.io', 0, 0, 6, -1),
(333, 'Backbone', 0, 0, 1, -1),
(334, 'Meteor.js', 0, 0, 5, -1),
(335, 'ES6', 0, 0, 16, -1),
(336, 'Polymer', 0, 0, 0, -1),
(337, 'Purescript', 0, 0, 17, -1),
(338, 'Flux', 0, 0, 0, -1),
(339, 'Sinatra', 0, 0, 0, -1),
(340, 'HTML5 & CSS3', 0, 3, 0, -1),
(341, 'Jira', 0, 0, 14, -1),
(342, 'Test-Driven Development', 0, 0, 16, -1),
(343, 'Rake', 0, 0, 16, -1),
(344, 'RSpec', 0, 0, 16, -1),
(345, 'TDD/BDD', 0, 0, 16, -1),
(346, 'Mocha', 0, 0, 15, -1),
(347, 'Agile', 0, 0, 16, -1),
(348, 'Scrum', 0, 0, 16, -1),
(349, 'E-commerce Experience', 0, 0, 16, -1),
(350, 'Mobile Web Development', 0, 0, 0, -1),
(351, 'Data Analysis', 0, 0, 16, -1),
(352, 'Apache', 0, 0, 16, -1),
(353, 'UI Development', 0, 0, 4, -1),
(354, 'Unix Skills', 0, 0, 16, -1),
(355, 'Web Architecture', 0, 0, 0, -1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `base_all_skills_v4`
--
ALTER TABLE `base_all_skills_v4`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `base_all_skills_v4`
--
ALTER TABLE `base_all_skills_v4`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=356;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;