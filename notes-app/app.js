const fs = require('fs');

fs.writeFileSync('notes', 'Course');
fs.appendFileSync('notes', '\nShopping')