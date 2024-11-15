import { db } from "../config/db.js";

class Product {
  static create({ name, description, price, quantity, farmerId }) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO products (name, description, price, quantity, farmer_id) VALUES (?, ?, ?, ?, ?)';
      db.query(query, [name, description, price, quantity, farmerId], (err, results) => {
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

  static getAll() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM products';
      db.query(query, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
}


export default Product