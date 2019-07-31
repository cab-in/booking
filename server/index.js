/* eslint-disable camelcase */
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const db = require('./db');
const listing = require('./postgres/listingIndex.js');
const models = require('./models');

const app = express();
const port = 3001;

app.use(morgan('dev'));
app.use('/rooms/:listingid', express.static(path.resolve('client')));
app.use(express.json());

app.get('/api/:listingid/booking', async (req, res) => {
  const listingInfo = await models.getListingInfo(req.params.listingid);
  const bookedDates = await models.getBookedDates(req.params.listingid);
  res.send({ listingInfo, bookedDates });
});

app.get('/api/:listingid/rooms', (req, res) => {
  const { listingid } = req.params;
  listing.pool.query(`SELECT * FROM booking WHERE listing_id = '${listingid}'`)
    .then(data => res.send(data.rows[0]))
    .catch(e => console.error(e.stack));
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

app.put('/api/:listingid/rooms', (req, res) => {
  const {
    listing_id, baseprice, views, cleaningfee, servicefee, taxes, maxguests, lastavailabledate,
  } = req.body;
  const { listingid } = req.params;

  listing.pool.query(`UPDATE booking 
  SET listing_id = ${listing_id}, baseprice = ${baseprice}, views = ${views}, cleaningfee = ${cleaningfee}, 
  servicefee = ${servicefee}, taxes = ${taxes}, maxguests = ${maxguests}, lastavailabledate = '${lastavailabledate}' 
  WHERE listing_id = '${listingid}'`)
    .then(data => res.send(`Listing ${listingid} updated!`))
    .catch(e => console.error(e.stack));
});

app.delete('/api/:listingid/rooms', (req, res) => {
  const { listingid } = req.params;
  listing.pool.query(`DELETE FROM booking WHERE listing_id = '${listingid}'`)
    .then(data => res.send(`Listing ${listingid} has been deleted!`))
    .catch(e => console.error(e.stack));
});

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
