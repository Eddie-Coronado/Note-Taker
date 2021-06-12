const express = require('express');
const router = express.Router();
const note = require('../db/note');
const { json } = require('body-parser');

router.get('/notes', (req, res) => {
    note.getNotes()
    .then((notes) => {
        console.log(notes)
        return res.json(notes);
    })
    .catch(err => res.status(500).json(err))
})

router.post('/notes', async (req, res) => {
    try {
        const postNotes = await note.postNotes(req.body)
        res.status(200).json(postNotes)
    } catch (err) {
        res.status(400).json(err)
    }
})

router.delete('/notes/:id', (req,res) => {
    const deleteNote = note.destroy({
        where: {
            id: req.params.id,
        },
    }).catch((err) => res.json(err))
    res.json(deleteNote)
})

module.exports = router