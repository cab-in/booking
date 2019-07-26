const faker = require('faker');
const fs = require('fs');
const path = require('path');

const filename = path.join(__dirname, '../csv/dates.csv');
const myWriteStream = fs.createWriteStream(filename);

const lastAvailableDate = '2019-09-31';
let i = 2000001;
write();

function write() {
  let ok = true;
  do {
    i -= 1;
    if (i === 0) {
      for (let j = 0; j < 50; j += 1) {
        const data = `${i},${faker.date.between('2019-06-01', lastAvailableDate).toISOString().split('T')[0]}\n`;
        myWriteStream.write(data, 'utf8');
      }
    } else {
      for (let j = 0; j < 50; j += 1) {
        const data = `${i},${faker.date.between('2019-06-01', lastAvailableDate).toISOString().split('T')[0]}\n`;
        ok = myWriteStream.write(data, 'utf8');
      }
    }
  } while (i > 0 && ok);
  if (i > 0) {
    myWriteStream.once('drain', write);
  }
}
