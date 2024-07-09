const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

let allPosts = [];

function generateRandomId() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 5; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }
  
  app.post('/createpost', (req, res) => {
    console.log(req.body);
    const post = req.body;
    post.id = generateRandomId();
    allPosts.push(post);
    res.status(201).send(post);
  });

// Get all posts
app.get('/allposts', (req, res) => {
    res.send(allPosts);
});

// Get a post by id
app.get('/posts/:id', (req, res) => {
    const id = req.params.id;
    const post = allPosts.find(p => p.id === id);
    if (post) {
        res.send(post);
    } else {
        res.status(404).send({ message: 'Post not found' });
    }
});

// Update a post by id
app.put('/post/:id', (req, res) => {
    const id = req.params.id;
    const index = allPosts.findIndex(p => p.id === id);
    if (index !== -1) {
        allPosts[index] = { ...allPosts[index], ...req.body };
        res.send(allPosts[index]);
    } else {
        res.status(404).send({ message: 'Post not found' });
    }
});

// Delete a post by id
app.delete('/deletepost/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    const index = allPosts.findIndex(p => p.id === id);
    if (index !== -1) {
        const deletedPost = allPosts.splice(index, 1);
        res.send(deletedPost[0]);
    } else {
        res.status(404).send({ message: 'Post not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
