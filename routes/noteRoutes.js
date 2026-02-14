const router = require('express').Router();
const Note = require('../models/note');
const { createNote, getAllNotes, getNoteById, updateNote, deleteNote } = require('../controllers/noteControllers');

// Create a new note
router.post('/notes', createNote);

// Get all notes
router.get('/notes', getAllNotes);

// Get a single note by ID
router.get('/notes/:id', getNoteById);

// Update a note by ID
router.put('/notes/:id', updateNote);

// Delete a note by ID
router.delete('/notes/:id', deleteNote);

module.exports = router;     

