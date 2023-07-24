const express = require('express')
const cors = require('cors')
const { MongoClient, ObjectId } = require("mongodb");

const client = new MongoClient(process.env.MONGO_URL || 'mongodb://reviews:reviews@localhost:27017');

const reviews = client.db('reviews').collection('reviews');

const app = express()

app.use(express.json())
app.use(cors('*'))

app.get('/v1/books/:id/reviews', async (req, res) => {
    const result = await reviews.find({ book: parseInt(req.params.id) }).toArray();
    res.json(result);
})

app.post('/v1/books/:id/reviews', async (req, res) => {
    await reviews.insertOne({ 
        book: parseInt(req.params.id), 
        review: req.body.review 
    });
    res.sendStatus(204)
})

app.delete('/v1/books/:id/reviews/:rid', async (req, res) => {
    await reviews.deleteOne({
        _id: new ObjectId(req.params.rid)
    });
    res.sendStatus(204)
})

reviews.countDocuments().then(async count => {
    if (count === 0) {
        const items = []
        for(let i = 1; i <= 10; i++) {
            for (let r = 1; r <= Math.floor(Math.random() * 6); r++) {
                items.push({
                    book: i,
                    review: 'book'+ i + ' review' + r
                })
            }
        }
        await reviews.insertMany(items);
    }

    app.listen(3000, () => console.log('started'))
})

function die() {
    client.close();
    process.exit();
}

process.on('SIGINT', die);  // CTRL+C
process.on('SIGQUIT', die); // Keyboard quit
process.on('SIGTERM', die); // `kill` command
