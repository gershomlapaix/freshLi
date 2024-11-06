import { db } from "../config/db.js";

class User {
    static create({ username, email, password, role }) {
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO users(username, email, password, role) VALUES (?,?,?,?)";
            db.query(query, [username, email, password, role], (err, results) => {
                if (err) reject(err)
                resolve(results)
            })
        })
    }

    static findByEmail(email) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM users WHERE email = ?';
            db.query(query, [email], (err, results) => {
                if (err) reject(err);
                resolve(results[0]);
            });
        });
    }

    static findById(id) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM users WHERE id = ?';
            db.query(query, [id], (err, results) => {
                if (err) reject(err);
                resolve(results[0]);
            });
        });
    }
}

export default User