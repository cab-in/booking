const faker = require('faker');
const chalk = require('chalk');
const db = require('../db');

const listings = [];
const bookings = [];

for (let i = 0; i < 100; i += 1) {
  const listingInfo = {
    views: faker.random.number({ min: 0, max: 1000 }),
    basePrice: faker.random.number({ min: 20, max: 500 }),
    cleaningFee: faker.random.number({ min: 20, max: 500 }),
    baseGuests: faker.random.number({ min: 1, max: 5 }) * 2,
  };
  listingInfo.extraGuests = Math.round(
    listingInfo.baseGuests * faker.random.number({ min: 0, max: 0.5, precision: 0.1 }),
  );
  listingInfo.maxGuests = listingInfo.baseGuests + listingInfo.extraGuests;
  listingInfo.lastAvailableDate = faker.date.between('2019-09-01', '2020-05-31');
  listingInfo.taxes = Math.round(
    listingInfo.basePrice * faker.random.number({ min: 0.05, max: 0.2, precision: 0.01 }),
  );
  listingInfo.serviceFee = Math.round(
    listingInfo.basePrice * 0.12,
  );

  listings.push(listingInfo);


  // for (let j = 0; j < 75; j += 1) {
  //   const bookingInfo = {
  //     listingId: i + 1,
  //     bookedDate: faker.date.between('2019-06-01', listingInfo.lastAvailableDate),
  //   };
  //   bookings.push(bookingInfo);
  // }
  const dateStorage = new Set();
  while (dateStorage.size !== 5) {
    dateStorage.add(faker.date.between('2019-06-01', '2019-06-07'));
  }
  dateStorage.forEach((element) => {
    db.Booking.create({
      listingId: i + 1,
      bookedDate: element,
    });
  });
}

Promise.all([
  db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0'),
  db.Booking.drop(),
  db.Listing.drop(),
  db.sequelize.sync({ force: false })
    .then(() => db.Listing.bulkCreate(listings))
    .then(() => db.Booking.bulkCreate(bookings))
    .then(() => db.sequelize.connectionManager.close())
    .then(() => console.log(chalk.green('shut down gracefully'))),
]).catch(err => console.log('db error: ', err));
