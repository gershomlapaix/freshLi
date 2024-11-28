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
            const query = 'SELECT p.name, p.price, t.quantity, t.total, t.status, t.created_at  FROM products p INNER JOIN transactions t ON p.id = t.product_id WHERE buyer_id = ?';
            db.query(query, [buyerId], (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }

    // complete the transaction
    static completeTransaction(id) {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE transactions SET status = "COMPLETED" WHERE id = ?';
            db.query(query, [id], (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }

    // cancel the transaction
    static cancelTransaction(id) {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE transactions SET status = "CANCELLED" WHERE id = ?';
            db.query(query, [id], (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }

    // get transactions made on farmer's products
    // select p.name,t.product_id from products p inner join transactions t on p.id=t.product_id where p.farmer_id=6;
    static getFarmerTransactions(farmerId) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT p.name, p.price,t.id, t.quantity, t.total, t.status  FROM products p INNER JOIN transactions t ON p.id = t.product_id WHERE p.farmer_id = ?';
            db.query(query, [farmerId], (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }

}