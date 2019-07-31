/* eslint-disable no-use-before-define */
const faker = require('faker');
const uuidv4 = require('uuid/v4');
const fs = require('fs');
const path = require('path');

const filename = path.join(__dirname, '../csv/users.csv');
const myWriteStream = fs.createWriteStream(filename);

let i = 50000000;
write();

function write() {
  let ok = true;
  do {
    i -= 1;
    if (i === 1) {
      const uuid = uuidv4();
      const data = `${uuid},${faker.name.firstName()}, ${faker.name.lastName()}, ${faker.internet.email()}\n`;
      myWriteStream.write(data, 'utf8');
    } else {
      const uuid = uuidv4();
      const data = `${uuid},${faker.name.firstName()}, ${faker.name.lastName()}, ${faker.internet.email()}\n`;
      ok = myWriteStream.write(data, 'utf8');
    }
  } while (i > 0 && ok);
  if (i > 0) {
    myWriteStream.once('drain', write);
  }
}
