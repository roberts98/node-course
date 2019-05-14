const yargs = require('yargs');

const notes = require('./notes');

yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    },
    description: {
      describe: 'Note description',
      demandOption: true,
      type: 'string'
    }
  },
  handler: argv => {
    notes.addNote(argv.title, argv.description)
  }
});

yargs.command({
  command: 'remove',
  describe: 'Remove the note',
  builder: {
    title: {
      describe: 'Note title to remove',
      demandOption: true,
      type: 'string'
    }
  },
  handler: argv => notes.removeNote(argv.title)
});

yargs.command({
  command: 'list',
  describe: 'Listing notes',
  handler: () => notes.listNotes()
});

yargs.command({
  command: 'read',
  describe: 'Read a note',
  builder: {
    title: {
      describe: 'Not title to read',
      demandOption: true,
      type: 'string'
    }
  },
  handler: argv => notes.readNote(argv.title)
});

yargs.parse();