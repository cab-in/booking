const faker = require('faker');
const fs = require('fs');
const path = require('path');

const filename = path.join(__dirname, '../csv/listing.csv');
const myWriteStream = fs.createWriteStream(filename);

let i = 10000000;
write();

function write() {
  let ok = true;
  do {
    const listingInfo = {
      views: faker.random.number({ min: 0, max: 1000 }),
      basePrice: faker.random.number({ min: 20, max: 500 }),
      cleaningFee: faker.random.number({ min: 20, max: 500 }),
      baseGuests: faker.random.number({ min: 1, max: 5 }) * 2,
    };
    listingInfo.extraGuests = Math.round(listingInfo.baseGuests * faker.random.number({ min: 0, max: 0.5, precision: 0.1 }));
    listingInfo.serviceFee = Math.round(listingInfo.basePrice * 0.12);
    listingInfo.taxes = Math.round(listingInfo.basePrice * faker.random.number({ min: 0.05, max: 0.2, precision: 0.01 }));
    listingInfo.maxGuests = listingInfo.baseGuests + listingInfo.extraGuests;
    listingInfo.lastAvailableDate = '2020-05-31';

    const {
      views, basePrice, cleaningFee, baseGuests, serviceFee, taxes, maxGuests, lastAvailableDate,
    } = listingInfo;

    i -= 1;
    if (i === 0) {
      const data = `${i},${basePrice},${views},${cleaningFee},${serviceFee},${taxes},${maxGuests},${lastAvailableDate}\n`;
      myWriteStream.write(data, 'utf8');
    } else {
      const data = `${i},${basePrice},${views},${cleaningFee},${serviceFee},${taxes},${maxGuests},${lastAvailableDate}\n`;
      ok = myWriteStream.write(data, 'utf8');
    }
  } while (i > 0 && ok);
  if (i > 0) {
    myWriteStream.once('drain', write);
  }
}
