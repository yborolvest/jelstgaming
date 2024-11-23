require('dotenv').config();

const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect(err =>{
    if (err) {
        console.error('Error connecting to database', err);
        return;
    }
    console.log('Connected to database');
});

// Middlewares
app.use(cors());
app.use(express.static(__dirname))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API endpoints
app.post('/api/users', (req, res) => {
    const { uuid } = req.body;

    if(!uuid) {
        return res.status(400).send('Missing UUID');
    }

    db.query('INSERT INTO users (uuid) VALUES (?)', [uuid], (err, results) => {
        if (err) {
            console.error('Error querying database', err);
            return res.status(500).send('Error querying database');
        }
        return res.status(201).send('User created');
    });
});

app.get('/api/credits/:uuid', (req, res) => {
   const { uuid } = req.params;
   db.query('SELECT credits FROM users WHERE uuid = ?', [uuid], (err, results) => {
       if (err) {
           console.error('Error querying database', err);
           res.status(500).send('Error querying database');
           return;
       }
       if (results.length === 0) {
           res.status(404).send('User not found');
           return;
       }
       res.json({credits: results[0].credits});
   });
});

app.post('/api/credits/:uuid', (req, res) => {
    const { uuid } = req.params;
    const { credits } = req.body;

    if (credits === undefined || credits === null) {
        res.status(400).send('Missing credits');
        return
    }

    db.query('UPDATE users SET credits = ? WHERE uuid = ?', [credits, uuid], (err, results) => {
        if (err) {
            console.error('Error querying database', err);
            res.status(500).send('Error querying database');
            return;
        }
        res.status(200).send('Credits updated');
    });
});

app.post('/api/users/:uuid', (req, res) => {
    const { uuid } = req.params;
    const { name } = req.body;

    if (!name) {
        res.status(400).send('Missing name');
        return;
    }

    db.query('UPDATE users SET name = ? WHERE uuid = ?', [name, uuid], (err, results) => {
        if (err) {
            console.error('Error querying database', err);
            res.status(500).send('Error querying database');
            return;
        }
        res.status(200).send('Name updated');
    });
});

app.get('/api/users/:uuid', (req, res) => {
    const { uuid } = req.params;
    db.query('SELECT name FROM users WHERE uuid = ?', [uuid], (err, results) => {
        if (err) {
            console.error('Error querying database', err);
            res.status(500).send('Error querying database');
            return;
        }
        if (results.length === 0) {
            res.status(404).send('User not found');
            return;
        }
        res.json({name: results[0].name});
    });
});

app.get('/api/users/uq/:name', (req, res) => {
    const { name } = req.params;

    db.query('SELECT COUNT(*) AS count FROM users WHERE name = ?', [name], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send('Error checking username uniqueness');
        }

        const isUnique = results[0].count === 0;
        res.status(200).json({ isUnique });
    });
});

app.get('/api/leaderboard', (req, res) => {
    db.query('SELECT name, credits FROM users WHERE name IS NOT NULL ORDER BY credits DESC', (err, results) => {
        if (err) {
            console.error('Error querying database', err);
            res.status(500).send('Error querying database');
            return;
        }
        res.json(results);
    });
});

app.get('/', (req, res) => {
    res.send("api is running");
});

app.get('/api/users/:uuid/daily-usage', (req, res) => {
    const { uuid } = req.params;

    db.query('SELECT daily_usage FROM users WHERE uuid = ?', [uuid], (err, results) => {
        if (err) {
            console.error('Error querying database', err);
            return res.status(500).send('Error querying database');
        }
        if (results.length === 0) {
            return res.status(404).send('User not found');
        }
        res.json({ daily_usage: results[0].daily_usage });
    });
});

app.post('/api/users/:uuid/daily-usage', (req, res) => {
    const { uuid } = req.params;

    // Get the current server date and time
    const daily_usage = new Date();

    db.query('UPDATE users SET daily_usage = ? WHERE uuid = ?', [daily_usage, uuid], (err, results) => {
        if (err) {
            console.error('Error querying database', err);
            return res.status(500).send('Error querying database');
        }

        if (results.affectedRows === 0) {
            return res.status(404).send('User not found');
        }

        res.status(200).send('Daily usage updated');
    });
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
