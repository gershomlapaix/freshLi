import { db } from "../config/db.js";

export class Transactions {
    static create({ product_id, buyer_id, quantity, total, status, description }) {
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO transactions(product_id, buyer_id, quantity, total, status, description) VALUES (?,?,?,?,?,?)";
            db.query(query, [product_id, buyer_id, quantity, total, status, description], (err, results) => {
                if (err) reject(err)
                resolve(results)
            })
        })
    }

    static getAll() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM transactions';
            db.query(query, (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }

    static findById(id) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM transactions WHERE id = ?';
            db.query(query, [id], (err, results) => {
                if (err) reject(err);
                resolve(results[0]);
            });
        });
    }

    // get buyers transactions
    static getBuyerTransactions(buyerId) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM transactions WHERE buyer_id = ?';
            db.query(query, [buyerId], (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }
}