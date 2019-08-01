/* eslint-disable no-use-before-define */
const uuidv4 = require('uuid/v4');
const fs = require('fs');
const path = require('path');
const moment = require('moment');

const filename = path.join(__dirname, '../csv/BookedDates.csv');
const myWriteStream = fs.createWriteStream(filename);

let i = 2000001;
let stayLength = 0;
let count = 0;
write();

function write() {
  let ok = true;
  do {
    i -= 1;
    const listing = uuidv4();
    const start = moment('2019-01-01');
    if (i === 1) {
      for (let j = 0; j < 50; j += stayLength) {
        stayLength = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
        const bookingID = uuidv4();
        const user = uuidv4();
        count = 0;

        while (count !== stayLength) {
          const date = start.format('YYYY-MM-DD');
          start.add(1, 'days');
          const data = `${bookingID},${listing},${user},${date}\n`;
          myWriteStream.write(data, 'utf8');
          count += 1;
        }
        const randomBuffer = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
        start.add(randomBuffer, 'days');
      }
    } else {
      for (let j = 0; j < 50; j += stayLength) {
        stayLength = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
        const bookingID = uuidv4();
        const user = uuidv4();
        count = 0;

        while (count !== stayLength) {
          const date = start.format('YYYY-MM-DD');
          start.add(1, 'days');
          const data = `${bookingID},${listing},${user},${date}\n`;
          ok = myWriteStream.write(data, 'utf8');
          count += 1;
        }
        const randomBuffer = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
        start.add(randomBuffer, 'days');
      }
    }
  } while (i > 0 && ok);
  if (i > 0) {
    myWriteStream.once('drain', write);
  }
}
