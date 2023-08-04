const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Notes");
const { body, validationResult } = require("express-validator");
const router = express.Router();

// Route-1: Get all the notes using: GET "/api/notes/fetchallnotes"
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (err) {
    res.status(500).send("Some Internal Error occurs");
  }
});

// Route-2: To add a new note: POST "/api/notes/addnotes"
router.post(
  "/addnotes",
  fetchuser,
  [
    body("title", "Enter a valid title ").isLength({ min: 5 }),
    body("description", "Description must contain 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      

      // If there are errors, return bad request and errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { title, description, tag } = req.body;

      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      res.status(500).send("Some Internal Error occurs");
    }
  }
);

// Route-3: Update an existing Note: POST "/api/notes/updatenotes"
router.put('/updatenotes/:id',fetchuser,async(req,res)=>{

    const {title,description,tag}=req.body;

    //Create a new note object..
    const newNote={};

    if(title){newNote.title=title};
    if(description){newNote.description=description};
    if(tag){newNote.tag=tag};

    //Find the note to be updadated and update it.
    let  note=await Note.findById(req.params.id);
    if(!note){return res.status(404).send("NOT FOUND")}

    if(note.user.toString()!==req.user.id){
        return res.status(401).send("Not Allowed");
    }

    note=await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    res.json(note);
})

// Route-3: Delete an existing Note: POST "/api/notes/deletenotes"
router.delete('/deletenotes/:id',fetchuser,async(req,res)=>{

    //Find the note to be deleted and delete it.
    let  note=await Note.findById(req.params.id);
    if(!note){return res.status(404).send("NOT FOUND")}

    if(note.user.toString()!==req.user.id){
        return res.status(401).send("Not Allowed");
    }

    note=await Note.findByIdAndDelete(req.params.id);
    res.send("Deleted Successfully");
})


module.exports = router;
