DROP DATABASE booking;

CREATE DATABASE booking;

\c booking;

CREATE TABLE booking (listing_id text, booked_date date);

-- \copy booking FROM '../../output.csv' DELIMITERS ',' CSV;
-- \copy booking FROM 'Users/christopherchan/Desktop/output.csv' DELIMITERS ',' CSV;