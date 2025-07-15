const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const PORT = 3000;

const taskRoute = require('./routes/taskRoute');
app.use('/tasks', taskRoute);

app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`);
})