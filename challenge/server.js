const express = require('express');
const path = require('path');

const data = require('./Develop/db/db.json');
const PORT = 3002;

const app = express();

// sets up html routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'notes.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// sets up api routes

app.get('/api/notes', (req, res) => res.send('Visit http://localhost:3002/api'));

app.post('/api/notes', (req, res) => {
  res.json(`${req.method} request received to add a note`);
});



app.listen(PORT, () => 
  console.log(`Example app listening at http://localhost:${PORT}`)); 


