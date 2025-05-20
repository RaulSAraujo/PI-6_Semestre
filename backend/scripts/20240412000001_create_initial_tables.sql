CREATE TABLE users (
	id int PRIMARY key auto_increment not null,
	cpf VARCHAR(11) NOT NULL UNIQUE,
	email VARCHAR(50) NOT null UNIQUE,
	name VARCHAR(50) NOT NULL,
	password_hash VARCHAR(100) NOT NULL,
	is_admin BOOLEAN DEFAULT FALSE NOT null,
	active BOOLEAN DEFAULT TRUE NOT NULL,
	created_at datetime,
	updated_at datetime,
	deleted_at datetime
);

CREATE TABLE profile (
  id int PRIMARY key auto_increment not null,
  `type` ENUM ('conservative', 'moderate', 'aggressive', 'undefined') NOT null,
  description VARCHAR (255) NOT null,
  created_at datetime,
  updated_at datetime,
  deleted_at datetime
);

CREATE TABLE clients (
  id int PRIMARY key auto_increment not null,
  id_profile INT default 1,
  `type` ENUM ('F', 'J') NOT NULL,
  `name` varchar(200) NOT NULL,
  `document` varchar(200) NOT NULL,
  observation varchar(255),
  active bool DEFAULT true,
  created_at datetime,
  updated_at datetime,
  deleted_at datetime,
  CONSTRAINT fk_id_profile FOREIGN KEY (id_profile) REFERENCES profile(id)
);

CREATE TABLE listed_shares (
  id int PRIMARY key auto_increment not null,
  `ticker` varchar(200) NOT NULL,
  `name` varchar(200) NOT NULL,
  b3_sector_classification varchar(200) DEFAULT NULL,
  id_profile int not null,
  active bool DEFAULT true,
  created_at datetime,
  updated_at datetime,
  deleted_at datetime,
  FOREIGN KEY (`id_profile`) REFERENCES `profile` (`id`)
);

CREATE TABLE listed_share_history (
  id int PRIMARY key auto_increment not null,
  id_listed_shares int not null,
  `date` date NOT NULL,
  `last_value` decimal(15, 4) NOT NULL,
  opening numeric(15, 4) NOT NULL,
  high numeric(15, 4) NOT NULL,
  low numeric(15, 4) NOT NULL,
  trading_volume numeric(15, 4) NOT NULL,
  percentage_change numeric(15, 4) NOT NULL,
  id_profile int not null,
  created_at datetime,
  updated_at datetime,
  deleted_at datetime,
  FOREIGN KEY (`id_listed_shares`) REFERENCES `listed_shares`(`id`),
  FOREIGN KEY (`id_profile`) REFERENCES `profile`(`id`)
);

CREATE TABLE investment_portfolio (
  id int PRIMARY key auto_increment not null,
  id_client int not null,
  id_listed_shares int not null,
  share_price numeric(15, 4) NOT NULL,
  quantity_purchased int not null,
  invested_amount numeric(15, 4) NOT NULL,
  created_at datetime,
  updated_at datetime,
  deleted_at datetime,
  FOREIGN KEY (`id_client`) REFERENCES `clients`(`id`),
  FOREIGN KEY (`id_listed_shares`) REFERENCES `listed_shares`(`id`)
);
