'use strict';

// Load array of notes

// const data = require('./db/notes');
// console.log('Hello Noteful!');

// INSERT EXPRESS APP CODE HERE...

const express = require('express');
const data = require('./db/notes');
const app = express();

// ADD STATIC SERVER HERE
app.use(express.static("public"));

app.get('/api/notes', (req, res) => {
  const {searchTerm} = req.query;

  if (searchTerm) {
    let filteredList = data.filter(function(item) {
      return item.title.includes(searchTerm);
    });
    res.json(filteredList);
  } else {
    res.json(data);
  }
});

app.get('/api/notes/:id', (req, res) => {
  const id = req.params.id;
  let note = data.find(item => item.id === Number(id));
  res.json(note);
});

app.listen(8080, function() {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});
