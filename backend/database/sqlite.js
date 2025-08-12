const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '../data', 'database.db');

let db;
try {
    db = new Database(dbPath);
    console.log("Database connected successfully.");
} catch (error) {
    console.error("Error connecting to database:", error.message);
}

try {
    db.prepare(`
        CREATE TABLE IF NOT EXISTS tasks (
            taskid INTEGER PRIMARY KEY AUTOINCREMENT,
            taskname TEXT NOT NULL,
            completed INTEGER NOT NULL DEFAULT 0
        )
    `).run();
} catch (err) {
    console.error("Error creating table 'tasks':", err.message);
}

process.on('SIGINT', () => {
    try {
        db.close();
        console.log("Database connection closed.");
        process.exit(0);
    } catch (err) {
        console.error("Error closing database:", err.message);
        process.exit(1);
    }
});

module.exports = db;