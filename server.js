const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

let data = require('./db/db.json');
const PORT = 3002;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// sets up html routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/notes.html'));
});

// sets up api routes

app.get('/api/notes', (req, res) => res.json(data));
app.post('/api/notes', (req, res) => {
  req.body.id = uuidv4();
  data.push(req.body);
  fs.writeFile(`./db/db.json`, JSON.stringify(data), (err) => {
    err ? console.log(err) : console.log('Success')
  })
  res.json(data);
});

app.delete("/api/notes/:id", (req, res) => {
  data = data.filter(({id}) => id !== req.params.id)
  fs.writeFile(`./db/db.json`, JSON.stringify(data), (err) => {
    err ? console.log(err) : console.log('Success')
  })
  res.json(data);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});


app.listen(PORT, () => 
  console.log(`Example app listening at http://localhost:${PORT}`)); 


