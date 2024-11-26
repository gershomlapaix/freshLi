-- Create users table for both farmers and buyers
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fullName VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('farmer', 'buyer') NOT NULL,  -- Role-based access (farmer/buyer)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Categories Table
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,           -- Unique category ID
    name VARCHAR(255) NOT NULL,                   -- Category name (e.g., "Fruits", "Dairy")
    description TEXT,                             -- Optional description of the category
    parent_id INT,                                -- Allows for hierarchical categories (e.g., "Fruit" -> "Citrus")
    FOREIGN KEY (parent_id) REFERENCES categories(id), -- Self-referencing foreign key for parent-child relationships
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Updated Products Table
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    quantity INT NOT NULL,
    unit VARCHAR(50) NOT NULL,
    farmer_id INT, 
    FOREIGN KEY (farmer_id) REFERENCES users(id),
    category_id INT,                                -- Foreign key linking to the categories table
    FOREIGN KEY (category_id) REFERENCES categories(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    status ENUM('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',
    image_url VARCHAR(255),
    stock_status ENUM('IN_STOCK', 'OUT_OF_STOCK', 'PREORDER') DEFAULT 'IN_STOCK'
);


-- Transactions Table
CREATE TABLE transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    buyer_id INT,
    FOREIGN KEY (buyer_id) REFERENCES users(id),
    product_id INT,
    FOREIGN KEY (product_id) REFERENCES products(id),
    quantity INT NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    status ENUM('PENDING', 'COMPLETED', 'CANCELLED') DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);