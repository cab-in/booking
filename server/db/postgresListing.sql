DROP DATABASE listing;

CREATE DATABASE listing;

\c listing;

CREATE TABLE booking (listing_id text, basePrice int, views int, cleaningFee int, serviceFee int, taxes int,
maxGuests int, lastAvailabeDate date);
