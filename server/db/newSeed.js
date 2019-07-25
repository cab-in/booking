const faker = require('faker');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const os = require('os');
const moment = require('moment');

const filename = path.join(__dirname, '../../../../output.json');
//  Users/christopherchan/Desktop/output.csv

const output = [];
const lastAvailableDate = '2019-12-01';

for (let i = 0; i < 10; i += 1) {
  for (let j = 0; j < 50; j += 1) {
    const data = `${i + 1},${faker.date.between('2019-06-01', lastAvailableDate).toISOString().split('T')[0]}`;
    output.push(data);
  }
}

fs.writeFileSync(filename, output.join(os.EOL));
