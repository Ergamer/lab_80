CREATE DATABASE items DEFAULT CHARACTER SET utf8  DEFAULT COLLATE utf8_general_ci;
USE `items`;

CREATE TABLE `categories` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL
    );
    
CREATE TABLE `location` (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL
);

CREATE TABLE `Subject matter` (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category_id INT NOT NULL,
    location_id INT NOT NULL,
    description VARCHAR(255) NOT NULL,
    image VARCHAR(255),
    `date registration` VARCHAR(255) NOT NULL,
    INDEX FK_category_idx (category_id),
    INDEX FK_location_idx (location_id),
    CONSTRAINT FK_category
    FOREIGN KEY (category_id)
    REFERENCES categories (id),
    CONSTRAINT FK_location
    FOREIGN KEY (location_id)
    REFERENCES location (id)
);

INSERT INTO categories (title, description)
VALUES ('Мебель', 'Дорогая мебель');

INSERT INTO location (title, description)
VALUES ('Кабинет директора', 'Директор сволочь');

INSERT INTO `Subject matter` (title, category_id, location_id, description, `date registration`)
VALUES ('Кресло', 1, 1, 'Хорошее кресло', 'Вчера');