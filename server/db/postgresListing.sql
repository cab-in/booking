CREATE DATABASE listing;

\c listing;

CREATE TABLE booking (listing_id text, basePrice smallint, views smallint, cleaningFee smallint, serviceFee smallint, taxes smallint,
maxGuests smallint, lastAvailableDate date);
