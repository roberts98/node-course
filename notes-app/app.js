const yargs = require('yargs');

const getNotes = require('./notes');

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
  handler: (argv) => {
    console.log(`Title: ${argv.title}`)
    console.log(`Description: ${argv.description}`)
  }
});

yargs.command({
  command: 'remove',
  describe: 'Remove the note',
  handler: () => console.log('removing the note')
});

yargs.command({
  command: 'list',
  describe: 'Listing notes',
  handler: () => console.log('listing notes')
});

yargs.command({
  command: 'read',
  describe: 'Read a note',
  handler: () => console.log('reading a note')
});

yargs.parse();