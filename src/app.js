import express from 'express';
import cors from 'cors';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

const db = new Low(new JSONFile(import.meta.dirname + '/db.json'), { destinations: [], comments: [] });
const app = express();

app.use(express.json());
app.use(cors());

app.use(async (req, res, next) => {
    await db.read();
    next();
})

app.get('/api/destination', async (req, res) => {

    const offset = !isNaN(req.query.offset) ? parseInt(req.query.offset) : 0;
    const limit = !isNaN(req.query.limit) ? parseInt(req.query.limit) : 5;

    const destinations = db.data.destinations.slice(offset, offset + limit).map(dest => ({
        id: dest.id,
        name: dest.name,
        shortDescription: dest.shortDescription,
        country: dest.country,
        slug: dest.slug
    }));
    res.json(destinations);
});

app.get('/api/destination/:id', async (req, res) => {
    const destId = parseInt(req.params.id);
    if (isNaN(destId)) {
        res.statusCode(400).json({ error: 'Bad destination Id !' });
        return;
    }

    const destination = db.data.destinations.find(dest => dest.id === destId);
    if (!destination) {
        res.sendStatus(404);
        return;
    }

    res.json(destination);
});

app.get('/api/destination/:id/comments', async (req, res) => {
    const destId = parseInt(req.params.id);

    if (isNaN(destId) && !db.data.destinations.find(dest => dest.id === id)) {
        res.statusCode(400).json({ error: 'Bad destination Id !' });
        return;
    }

    const comments = db.data.comments.filter(comment => comment.destinationId === destId);
    res.json(comments);
});

app.post('/api/destination/:id/comments', async (req, res) => {
    const destId = parseInt(req.params.id);

    if (isNaN(destId) && !db.data.destinations.find(dest => dest.id === id)) {
        res.statusCode(400).json({ error: 'Bad destination Id !' });
        return;
    }

    const nextId = Math.max(...db.data.comments.map(com => com.id)) + 1;
    db.data.comments.push({
        id: nextId,
        destinationId: destId,
        author: req.body.author,
        message: req.body.message
    })
    await db.write();

    res.status(201).json(db.data.comments.find(com => com.id === nextId));
});

app.listen(8080, () => {
    console.log('Web API is running on port 8080');
})
