-- Create users table for both farmers and buyers
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('farmer', 'buyer') NOT NULL,  -- Role-based access (farmer/buyer)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create products table for farmers' products
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    quantity INT NOT NULL,
    farmer_id INT,  -- Foreign key linking the product to a farmer
    FOREIGN KEY (farmer_id) REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
