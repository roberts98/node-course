const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, description) => {
  const notes = loadNotes();
  const duplicateNote = notes.find(note => note.title === title);
  if (!duplicateNote) {
    notes.push({
      title,
      description
    })
    saveNotes(notes);
  } else {
    console.log('duplicate')
  }
}

const removeNote = title => {
  const notes = loadNotes();
  const notesToKeep = notes.filter(note => note.title !== title);
  if (notes.length === notesToKeep.length) {
    console.log(chalk.red.inverse('note not found!'));
  } else {
    console.log(chalk.green.inverse('note remove!'));
    saveNotes(notesToKeep);
  }
}

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.yellow.inverse('Your notes:'));
  notes.forEach(note => console.log(note.title));
}

const readNote = title => {
  const notes = loadNotes();
  const note = notes.find(note => note.title === title);
  if (note) {
    console.log(chalk.green.inverse(note.title));
    console.log(note.description)
  } else {
    console.log(chalk.red.inverse('note nod found!'))
  }
}

const saveNotes = notes => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
}

module.exports = {
  addNote,
  removeNote,
  listNotes,
  readNote
};