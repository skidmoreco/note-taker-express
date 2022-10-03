// Import express package
// Dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');


const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// Setting up server
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// Static Middleware
app.use(express.static("./develop/public"));

// GET Request
app.get("./api/notes", function(req, res) {
    readFileAsync("./develop/db/db.json", "utf8").then(function(data) {
        notes = [].concat(JSON.parse(data))
        res.json(notes);
    })
});

// POST REQUEST
app.post("./api/notes", function(req, res) {
    const note = req.body;
    readFileAsync("./develop/db/db.json", "utf8").then(function(data) {
        const notes = [].concat(JSON.parse(data)).;
        note.id = notes.length + 1
        notes.push(note);
        return notes
    }).then(function(notes) {
        writeFileAsync("./develop/db/db.json", JSON.stringify(notes))
        res.json(note);
    })
});

// DELETE REQUEST
app.delete("./api/notes/:id", function(req, res) {
    const idToDelete = parseInt(req.params.id);
    readFileAsync("./develop/db/db.json", "utf8").then(function(data) {
        const notes =[].concat(JSON.parse(data));
        const newNoteData = []
        for (i = 0; i < notes.length; i++) {
            if(idToDelete !== notes[i].id) {
                newNotesData.push(notes[i])
            }
        }
    }).then(function(notes) {
        writeFileAsync("./develop/db/db.json", JSON.stringify(notes))
        res.send("Saved Success!");
    })
})

//HTML ROUTES
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./develop/public/notes.html"));
});

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./develop/public/index.html"));
});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./develop/public/index.html"));
});


// LISTENING
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});

