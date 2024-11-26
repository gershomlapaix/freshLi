import { db } from "../config/db.js";

export class Category {
    static create({ name, description, parentId = null }) {
      return new Promise((resolve, reject) => {
        const query = 'INSERT INTO categories (name, description, parent_id) VALUES (?, ?, ?)';
        db.query(query, [name, description, parentId], (err, results) => {
          if (err) reject(err);
          resolve(results);
        });
      });
    }
  
    static getAll() {
      return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM categories';
        db.query(query, (err, results) => {
          if (err) reject(err);
          resolve(results);
        });
      });
    }
  
    static getById(id) {
      return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM categories WHERE id = ?';
        db.query(query, [id], (err, results) => {
          if (err) reject(err);
          resolve(results);
        });
      });
    }
  
    // Get categories by parent ID (for hierarchical categories)
    static getByParentId(parentId) {
      return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM categories WHERE parent_id = ?';
        db.query(query, [parentId], (err, results) => {
          if (err) reject(err);
          resolve(results);
        });
      });
    }
  
    // Update a category
    static update({ id, name, description, parentId }) {
      return new Promise((resolve, reject) => {
        const query = `
          UPDATE categories
          SET name = ?, description = ?, parent_id = ?, updated_at = CURRENT_TIMESTAMP
          WHERE id = ?
        `;
        db.query(query, [name, description, parentId, id], (err, results) => {
          if (err) reject(err);
          resolve(results);
        });
      });
    }
  
    // Delete a category
    static delete(id) {
      return new Promise((resolve, reject) => {
        const query = 'DELETE FROM categories WHERE id = ?';
        db.query(query, [id], (err, results) => {
          if (err) reject(err);
          resolve(results);
        });
      });
    }
  }
  