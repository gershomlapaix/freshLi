import { db } from "../config/db.js";

class Product {
  static create({ name, description, price, quantity, unit, farmerId, categoryId, imageUrl, stockStatus = 'IN_STOCK' }) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO products (name, description, price, quantity, unit, farmer_id, category_id, image_url, stock_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
      db.query(query, [name, description, price, quantity, unit, farmerId, categoryId, imageUrl, stockStatus], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  // get farmer's products
  static getFarmerProducts(farmerId) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM products WHERE farmer_id = ?';
      db.query(query, [farmerId], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  // get all products
  static getAll() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM products';
      db.query(query, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  // Update an existing product
  static update({ id, name, description, price, quantity, unit, categoryId, imageUrl, stockStatus, status }) {
    return new Promise((resolve, reject) => {
      const query = `
        UPDATE products 
        SET name = ?, description = ?, price = ?, quantity = ?, unit = ?, category_id = ?, image_url = ?, stock_status = ?, status = ?, updated_at = CURRENT_TIMESTAMP 
        WHERE id = ?
      `;
      db.query(query, [name, description, price, quantity, unit, categoryId, imageUrl, stockStatus, status, id], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  // Get product by ID
  static getById(id) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM products WHERE id = ?';
      db.query(query, [id], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  // get the products by category
  static getByCategory(categoryId) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM products WHERE category_id = ?';
      db.query(query, [categoryId], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  // Delete a product
  static delete(id) {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM products WHERE id = ?';
      db.query(query, [id], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
}


export default Product