CREATE DATABASE IF NOT EXISTS booking;

\c booking;

CREATE TABLE IF NOT EXISTS users (user_id uuid DEFAULT uuid_generate_v4 (), firstName text, lastName text, email text);

CREATE TABLE IF NOT EXISTS booking (booking_id uuid DEFAULT uuid_generate_v4 (), listing_id uuid, user_id uuid, day text);

CREATE DATABASE IF NOT EXISTS listing;

\c listing;

CREATE TABLE IF NOT EXISTS booking (listing_id uuid DEFAULT uuid_generate_v4 (), basePrice smallint, views smallint, cleaningFee smallint, serviceFee smallint, taxes smallint,
maxGuests tinyint, lastAvailableDate text);

-- \copy booking FROM PROGRAM 'gzip -dc ./server/csv/BookedDates.csv.gz' DELIMITERS ',' CSV;
-- \copy booking FROM PROGRAM 'gzip -dc ./BookedDates.csv.gz' DELIMITERS ',' CSV;
-- \copy booking FROM './server/csv/BookedDatesTest.csv' DELIMITERS ',' CSV;
-- CREATE INDEX booking_booking_id ON booking(listing_id)
-- SELECT * FROM pg_indexes WHERE tablename = 'booking';
-- \copy (SELECT listing_id FROM booking LIMIT 100000) TO '/server/csv/listings.csv' (format CSV);
-- \copy (SELECT ARRAY[DISTINCT listing_id] FROM booking LIMIT 10) TO '/server/csv/test.csv' (format CSV);
-- SELECT ARRAY[DISTINCT listing_id] FROM booking LIMIT 10