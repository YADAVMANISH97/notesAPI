//@desc Create a new note
//@route POST /api/notes
//@access public
const Note = require('../models/note');

const createNote = async (req, res) => {
    try {
        const { title, content, author } = req.body;
        const newNote = await Note.create({
            title,
            content,    
            author: {
                name: author.name,
                email: author.email
            }
        });
        res.status(201).json(newNote);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//@desc Get all notes
//@route GET /api/notes
//@access public
const getAllNotes = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const notes = await Note.find().skip(skip).limit(limit);
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//@desc Get a single note by ID
//@route GET /api/notes/:id
//@access public
const getNoteById = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//@desc Update note by ID
//@route PUT /api/notes/:id
//@access public
const updateNote = async (req, res) => {
    try {
        const { title, content, author } = req.body;
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            { 
                title, 
                content, 
                author: {
                    name: author.name,
                    email: author.email
                }
            }, 
            { new: true, runValidators: true }
        );
        if (!updatedNote) {
            return res.status(404).json({ message: "Note not found" });
        }   
        res.status(200).json(updatedNote);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//@desc Delete note by ID
//@route DELETE /api/notes/:id
//@access public
const deleteNote = async (req, res) => {
    try {  
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if (!deletedNote) {
            return res.status(404).json({ message: "Note not found" });
        }   
        res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createNote,
    getAllNotes,
    getNoteById,
    updateNote,
    deleteNote
};
