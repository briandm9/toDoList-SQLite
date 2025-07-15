const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, '../data', 'database.db');

const db = new sqlite3.Database(dbPath, (error) => {
    if (error) {
        console.error("Error connecting to database:", error.message);
    } else {
        console.log("Database connected successfully.");
    }
});

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS tasks(
            taskid INTEGER PRIMARY KEY AUTOINCREMENT,
            taskname TEXT NOT NULL,
            completed INTEGER NOT NULL DEFAULT 0)`,
        (err) => {
            if (err) {
                console.error("Error creating table 'tasks':", err.message);
            }
        }
    );
});

process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error("Error closing database:", err.message);
            process.exit(1);
        } else {
            console.log("Database connection closed.");
            process.exit(0);
        }
    });
});

module.exports = db;