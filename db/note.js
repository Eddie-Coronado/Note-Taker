const fs = require('fs').promises;

class Note {
    read() {
        return fs.readFile("db/db.json", 'utf8')
        
    }
    totalNotes() {
        console.log(this.totalNotes)
        return this.read().then((notes) => {
            const parseNotes = JSON.parse(notes).map((note) => note);
            return parseNotes;
        });
    }
}

module.exports = new Note()


