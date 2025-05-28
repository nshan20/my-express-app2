const express = require('express');
const app = express();
const port = 3000;


const arrayBooks = [
    {"id": 1, "title": "Example1", "year": "1000"},
    {"id": 2, "title": "Example2", "year": "2000"},
    {"id": 3, "title": "Example3", "year": "3000"},
]

// req json
app.use(express.json());

// Redirect get books all
app.get('/', (req, res) => {
    res.redirect('/books');
});

// Get books all
app.get('/books', (req, res) => {
    res.send(arrayBooks);
});

// Create new books
app.post('/books', (req, res) => {
    const title = parseInt(req.body.title);
    const year = req.body.year;

    if (!title || !year) {
        return res.status(400).send({error: 'Title and year are required'});
    }

    const newItem = {id: arrayBooks[arrayBooks.length - 1].id + 1, title, year};
    arrayBooks.push(newItem);
    res.status(201).send(arrayBooks);
});

// Read books by id
app.get('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const item = arrayBooks.find(i => i.id === id);
    if (!item) {
        return res.status(404).send({error: 'Item not found'});
    }
    res.send(item);
});

// Update books by id
app.put('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const item = arrayBooks.find(i => i.id === id);
    if (!item) {
        return res.status(404).send({error: 'Item not found'});
    }
    const title = req.body.title;
    const year = req.body.year;

    if (title) item.title = title;
    if (year) item.year = year;
    res.status(200).send(item);
});

// Delete books by id
app.delete('/books/:id', (req, res) => {
    const id = req.params.id;
    const index = arrayBooks.findIndex(i => i.id === id);
    if (index === -1) {
        return res.status(404).send({error: 'Item not found'});
    }
    arrayBooks.splice(index, 1);
    res.send(arrayBooks);
});

// Run server
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
