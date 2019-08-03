/* eslint-disable import/first */
/* eslint-disable import/order */
/* eslint-disable camelcase */
const newrelic = require('newrelic');
const redis = require('redis');
const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./db');
const listing = require('./postgres/listingIndex.js');
const booking = require('./postgres/bookingIndex.js');
const models = require('./models');

const client = redis.createClient();
const app = express();
const port = 3001;

app.use(morgan('dev'));
app.use('/rooms/:listingid', express.static(path.resolve('client')));
app.use(bodyParser());

client.on('error', (err) => {
  console.log('Something went wrong ', err);
});

app.get('/api/:listingid/booking', async (req, res) => {
  const listingInfo = await models.getListingInfo(req.params.listingid);
  const bookedDates = await models.getBookedDates(req.params.listingid);
  res.send({ listingInfo, bookedDates });
});

// CRUD API LISTINGS -------------------------------------------------------------------------------

app.get('/api/rooms/:listingid', (req, res) => {
  const { listingid } = req.params;
  const query = `SELECT * FROM booking WHERE listing_id = '${listingid}'`;
  client.get(query, (error, result) => {
    if (error) throw error;
    if (result === null) {
      listing.pool.query(`SELECT * FROM booking WHERE listing_id = '${listingid}'`)
        .then((data) => {
          client.set(query, JSON.stringify(data.rows[0]));
          res.send(data.rows[0]);
        })
        .catch(e => console.error(e.stack));
    } else {
      res.send(JSON.parse(result));
    }
  });
});

app.post('/api/rooms', (req, res) => {
  const {
    listing_id, baseprice, views, cleaningfee, servicefee, taxes, maxguests, lastavailabledate,
  } = req.body;

  listing.pool.query(`INSERT INTO booking (listing_id, baseprice, views, cleaningfee, servicefee, taxes, maxguests, lastavailabledate) 
  VALUES (${listing_id}, ${baseprice}, ${views}, ${cleaningfee}, ${servicefee}, ${taxes}, ${maxguests}, '${lastavailabledate}')`)
    .then(data => res.send('New listing created!'))
    .catch(e => console.error(e.stack));
});

app.put('/api/rooms/:listingid', (req, res) => {
  const {
    baseprice, views, cleaningfee, servicefee, taxes, maxguests, lastavailabledate,
  } = req.body;
  const { listingid } = req.params;

  listing.pool.query(`UPDATE booking 
  SET baseprice = ${baseprice}, views = ${views}, cleaningfee = ${cleaningfee}, 
  servicefee = ${servicefee}, taxes = ${taxes}, maxguests = ${maxguests}, lastavailabledate = '${lastavailabledate}' 
  WHERE listing_id = '${listingid}'`)
    .then(data => res.send(`Listing ${listingid} updated!`))
    .catch(e => console.error(e.stack));
});

app.delete('/api/rooms/:listingid', (req, res) => {
  const { listingid } = req.params;
  listing.pool.query(`DELETE FROM booking WHERE listing_id = '${listingid}'`)
    .then(data => res.send(`Listing ${listingid} has been deleted!`))
    .catch(e => console.error(e.stack));
});

// CRUD API BOOKINGS -----------------------------------------------------------------------------

app.get('/api/bookings/:listing_id', (req, res) => {
  const { listing_id } = req.params;
  const query = `SELECT * FROM booking WHERE listing_id = '${listing_id}'`;
  client.get(query, (error, result) => {
    if (error) throw error;
    if (result === null) {
      booking.pool.query(`SELECT * FROM booking WHERE listing_id = '${listing_id}'`)
        .then((data) => {
          client.set(query, JSON.stringify(data.rows));
          res.send(data.rows);
        })
        .catch(e => console.error(e.stack));
    } else {
      res.send(JSON.parse(result));
    }
  });
});

app.post('/api/bookings/:listing_id', (req, res) => {
  const {
    booking_id, user_id, day,
  } = req.body;
  const { listing_id } = req.params;

  booking.pool.query(`INSERT INTO booking (booking_id, listing_id, user_id, day) 
  VALUES ('${booking_id}', '${listing_id}', '${user_id}', '${day}')`)
    .then(data => res.send('New booking created!'))
    .catch(e => console.error(e.stack));
});

app.put('/api/bookings/', (req, res) => {
  const {
    listing_id, user_id, day,
  } = req.body;
  const { id } = req.query;

  booking.pool.query(`UPDATE booking 
  SET listing_id = '${id}', user_id = '${user_id}', day = '${day}'
  WHERE booking_id = '${id}'`)
    .then(data => res.send(`Booking ${id} updated!`))
    .catch(e => console.error(e.stack));
});

app.delete('/api/bookings/', (req, res) => {
  const { id } = req.query;
  booking.pool.query(`DELETE FROM booking WHERE booking_id = '${id}'`)
    .then(data => res.send(`Booking ${id} has been deleted!`))
    .catch(e => console.error(e.stack));
});

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
