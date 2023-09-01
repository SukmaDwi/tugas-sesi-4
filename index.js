const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 8080;


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: '', 
    database: 'spotify_api' 
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to database: ' + err.stack);
        return;
    }
    console.log('Connected to database as id ' + db.threadId);
});

app.use(cors());
app.use(bodyParser.json());

// Endpoint untuk menambah lagu
app.post('/songs', (req, res) => {
    const { artist, title, is_favorite, genre } = req.body;
    const query = `INSERT INTO songs (artist, title, is_favorite, genre) VALUES (?, ?, ?, ?)`;

    db.query(query, [artist, title, is_favorite, genre], (err, result) => {
        if (err) {
            console.error('Error adding song: ' + err.stack);
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.status(201).json({ message: 'Song added successfully!' });
    });
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
