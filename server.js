const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

let allBooks = [];

function generateRandomId() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 5; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }
  
  app.post('/createbook', (req, res) => {
    console.log(req.body);
    const book = req.body;
    book.id = generateRandomId();
    allBooks.push(book);
    res.status(201).send(book);
  });

// Get all posts
app.get('/allbooks', (req, res) => {
    res.send(allBooks);
});

// Get a post by id
app.get('/book/:id', (req, res) => {
    const id = req.params.id;
    const book = allBooks.find(p => p.id === id);
    if (book) {
        res.send(book);
    } else {
        res.status(404).send({ message: 'Post not found' });
    }
});

// Update a post by id
app.put('/updatebook/:id', (req, res) => {
    const id = req.params.id;
    const index = allBooks.findIndex(p => p.id === id);
    if (index !== -1) {
        allBooks[index] = { ...allBooks[index], ...req.body };
        res.send(allBooks[index]);
    } else {
        res.status(404).send({ message: 'Post not found' });
    }
});

// Delete a post by id
app.delete('/deletebook/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    const index = allBooks.findIndex(p => p.id === id);
    if (index !== -1) {
        const deletedBook = allBooks.splice(index, 1);
        res.send(deletedBook[0]);
    } else {
        res.status(404).send({ message: 'BOOk not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
