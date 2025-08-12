const sqlite = require('../database/sqlite');

const getTasks = () => {
    const query = `SELECT * FROM tasks`;
    try {
        const rows = sqlite.prepare(query).all();
        return rows;
    } catch (err) {
        throw err;
    }
};

const postTask = (taskName) => {
    const query = `INSERT INTO tasks (taskname) VALUES (?)`;
    try {
        const stmt = sqlite.prepare(query);
        const info = stmt.run(taskName);
        return { taskID: info.lastInsertRowid };
    } catch (err) {
        throw err;
    }
};

const putTask = (taskID, taskName, completed) => {
    const query = `UPDATE tasks SET taskname = ?, completed = ? WHERE taskid = ?`;
    try {
        const completedInt = completed ? 1 : 0;
        sqlite.prepare(query).run(taskName, completedInt, Number(taskID));
    } catch (err) {
        throw err;
    }
};

const delTask = (taskID) => {
    const query = `DELETE FROM tasks WHERE taskid = ?`;
    try {
        sqlite.prepare(query).run(taskID);
    } catch (err) {
        throw err;
    }
};

module.exports = { getTasks, postTask, putTask, delTask };