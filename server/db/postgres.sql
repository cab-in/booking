CREATE DATABASE IF NOT EXISTS booking;

\c booking;

CREATE TABLE IF NOT EXISTS users (user_id text, firstName text, lastName text, email text);

CREATE TABLE IF NOT EXISTS booking (booking_id text, listing_id text, user_id text, startDate date, endDate date);

CREATE DATABASE IF NOT EXISTS listing;

\c listing;

CREATE TABLE IF NOT EXISTS booking (listing_id text, basePrice smallint, views smallint, cleaningFee smallint, serviceFee smallint, taxes smallint,
maxGuests tinyint, lastAvailableDate date);

-- \copy booking FROM PROGRAM 'gzip -dc ./server/csv/users.csv.gz' DELIMITERS ',' CSV;
-- \copy booking FROM 'Users/christopherchan/Desktop/output.csv' DELIMITERS ',' CSV;
-- CREATE INDEX listings_listing_id ON booking(listing_id);