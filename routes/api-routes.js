const express = require('express');
const note = require('../db/note');
const fs = require('fs').promises;
const router = express.Router();
const { v4: uuidv4 } = require("uuid");


router.get('/notes', (req, res) => {
    return note.totalNotes().then(data => res.json(data))
});

router.post('/notes', (req, res) => {
    console.log(req.body);
    const title = req.body.title;
    const text = req.body.text;

    const newNote = { title, text, id: uuidv4() };

    let pNotes;

    fs.readFile('db/db.json', "utf8").then(
        (notes) => {
            pNotes = [].concat(JSON.parse(notes))
            let updateNotes = [...pNotes, newNote];
            fs.writeFile('db/db.json', JSON.stringify(updateNotes)).then(
                (data) => {
                    console.log("Added the note!");
                    res.send("Added the note!");
                }
            )
        }
    );
});

router.delete('/notes/:id', (req, res) => {
    let id = req.params.id
    note.totalNotes().then((notes) => {
        for (const note of notes) {
            if (note.id === id) {
                const index = notes.indexOf(note)
                notes.splice(index, 1)
                let getNotes = JSON.stringify(notes)
                fs.writeFile('./db/db.json', getNotes, (err) =>
                    err ? console.log(err) : console.log('Added the note!'));


            }

        }

    })
    note.totalNotes().then((notes) => res.json(notes));
});




module.exports = router;