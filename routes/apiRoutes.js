const router = require("express").Router();
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

function getNotes() {
  const notes = JSON.parse(fs.readFileSync("db/db.json"));
  return notes;
};

function saveNotes(notes) {
  fs.writeFileSync("db/db.json", JSON.stringify(notes));
};

router.get("/notes", (req, res) => {
  const notes = getNotes();
  res.json(notes);
});

router.post("/notes", (req, res) => {
  let id = uuidv4();
  const notes = getNotes();
  const newNote = {title: req.body.title, text: req.body.text, id:id};
  notes.push(newNote);

  saveNotes(notes);
  res.json(newNote);
});

router.delete("/notes/:id", (req, res) => {
  const notes = getNotes();
  let remainingNotes = notes.filter((note) => {
    return note.id != req.params.id;
  });
  saveNotes(remainingNotes);

  res.json({ok:true});
});

module.exports = router;