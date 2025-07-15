const express = require('express');
const sqlite = require('../sqlite/sqlite');

const getTasks = () =>{
    return new Promise((resolve, reject) =>{
        const query = `SELECT * FROM tasks`;
        sqlite.all(query, (err, row) =>{
            if(err) return reject(err);
            resolve(row);
        })
    })
}

const postTask = (taskName) =>{
    return new Promise((resolve, reject) =>{
        const query = `INSERT INTO tasks (taskName) VALUES (?)`;
        sqlite.run(query, [taskName], function(err){
            if(err) return reject(err);
            resolve({taskID: this.lastID});
        })
    })
}

const putTask = async (taskID, taskName, completed) => {
    return new Promise((resolve, reject) => {
        const query = `UPDATE tasks SET taskname = ?, completed = ? WHERE taskid = ?`;
        sqlite.run(query, [taskName, completed, taskID], (err) => {
            if (err) return reject(err);
            resolve();
        });
    });
}

const delTask = (taskID) =>{
    return new Promise((resolve, reject) =>{
        const query = `DELETE FROM tasks WHERE taskid = ?`;
        sqlite.run(query, [taskID], (err) =>{
            if(err) reject(err);
            resolve();
        })
    })
}

module.exports = { getTasks, postTask, putTask, delTask };