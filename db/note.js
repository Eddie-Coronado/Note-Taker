const fs = require('fs');
const util = require('util');

const readFileA = util.promisify(fs.readFile);
const writeFileA = util.promisify(fs.writeFile);

class Note {
    read() {
        return readFileA('db/db.json', 'utf-8')
    }
    write(note) {
        return writeFileA('db/db.json', JSON.stringify(note))
    }
    getNotes() {
        return this.read().then((then) => {
            let parseNotes;

            try {
            parseNotes = [].concat(JSON.parse(notes))
            } catch {
                parseNotes = []
            }

            return parseNotes;
        })
    }
    postNotes(note) {
        const { title, text } = note;
        if (!title || !text) {
            return new Error('Please enter both title and text')
        }
        
        return this.getNotes()
        .then(notes => [...notes, note])
        .then(allNNotes => this.write(allNNotes))
        .then(() => note)

    }
 }

module.exports = new Note()
