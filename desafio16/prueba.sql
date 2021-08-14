CREATE DATABASE Prueba;
CREATE TABLE items (
	nombre VARCHAR(255) NOT NULL,
    categoria VARCHAR(255) NOT NULL,
    stock INT,
    id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (id)
);

INSERT INTO items 
	(nombre, categoria, stock)
VALUES 
	('Fideos', 'Harina', 20),
	('Leche', 'Lácteos', 30),
	('Crema', 'Lácteos', 15);
    
SELECT * FROM items;

DELETE FROM items WHERE id = 1;

UPDATE items 
SET stock = 45
WHERE id = 2;

SELECT * FROM items;