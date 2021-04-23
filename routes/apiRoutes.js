const fs = require("fs");

module.exports = (app) => {
    app.get("/api/notes", function(req, res) {
        const savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
        res.json(savedNotes);
    });
    
    app.post("/api/notes", function(req, res) {
        const savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
        const newNote = req.body;
        const uniqueID = (savedNotes.length).toString();
        newNote.id = uniqueID;
        savedNotes.push(newNote);
    
        fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
        console.log("Note saved to db.json. Content: ", newNote);
        console.log(savedNotes);
        res.json(savedNotes);
    })
    
    app.delete("/api/notes/:id", function(req, res) {
        let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
        const noteID = req.params.id;
        let newID = 0;
        console.log(`Deleting note with ID ${noteID}`);
        savedNotes = savedNotes.filter(currNote => {
            return currNote.id != noteID;
        })
        
        for (currNote of savedNotes) {
            currNote.id = newID.toString();
            newID++;
        }
    
        fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
        res.json(savedNotes);
    })
}

