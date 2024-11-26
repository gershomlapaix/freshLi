import { db } from "../config/db.js";

export class Farmer {
    // get all farmers

    static getAll() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT id, username, email FROM users where role = "farmer"';
            db.query(query, (err
                , results) => {
                if (err) reject(err);
                resolve(results);
            }
            );
        }
        );
    }

    static findByEmail(email) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM farmers WHERE email = ?';
            db.query(query, [email], (err, results) => {
                if (err) reject(err);
                resolve(results[0]);
            });
        });
    }

    static findById(id) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM farmers WHERE id = ?';
            db.query(query, [id], (err, results) => {
                if (err) reject(err);
                resolve(results[0]);
            });
        });
    }
}