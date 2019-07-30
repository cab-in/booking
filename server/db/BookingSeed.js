/* eslint-disable no-use-before-define */
const faker = require('faker');
const fs = require('fs');
const path = require('path');
const moment = require('moment');

const filename = path.join(__dirname, '../csv/BookedDates.csv');
const myWriteStream = fs.createWriteStream(filename);

let i = 2000001;
let user = 0;
let stayID = 0;
let stayLength = 0;
write();

function write() {
  let ok = true;
  do {
    user += 1;
    i -= 1;
    const start = moment('2019-01-01');
    if (i === 1) {
      for (let j = 0; j < 50; j += 1) {
        stayLength = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
        user = Math.floor(Math.random() * (50000000 - 1 + 1)) + 1;
        stayID += 1;
        const endingDate = start.clone().add(stayLength, 'days').format('YYYY-MM-DD');
        const startDate = start.format('YYYY-MM-DD');
        const randomBuffer = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
        start.add(stayLength + randomBuffer, 'days');
        const data = `${stayID},${i},${user},${startDate},${endingDate}\n`;
        myWriteStream.write(data, 'utf8');
      }
    } else {
      for (let j = 0; j < 50; j += 1) {
        stayLength = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
        user = Math.floor(Math.random() * (50000000 - 1 + 1)) + 1;
        stayID += 1;
        const endingDate = start.clone().add(stayLength, 'days').format('YYYY-MM-DD');
        const startDate = start.format('YYYY-MM-DD');
        const randomBuffer = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
        start.add(stayLength + randomBuffer, 'days');
        const data = `${stayID},${i},${user},${startDate},${endingDate}\n`;
        ok = myWriteStream.write(data, 'utf8');
      }
    }
  } while (i > 0 && ok);
  if (i > 0) {
    myWriteStream.once('drain', write);
  }
}
