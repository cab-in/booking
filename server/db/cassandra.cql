Create keyspace IF NOT EXISTS Listings with replication={'class':'SimpleStrategy','replication_factor': 1};

Create table IF NOT EXISTS Listings.booking
(
    Listing_id text,
    views smallint,
    basePrice smallint,
    cleaningFee smallint,
    serviceFee smallint,
    taxes smallint,
    maxGuests tinyint,
    lastAvailableDate date,
    PRIMARY KEY(Listing_id)
);

CREATE KEYSPACE IF NOT EXISTS Bookings with replication={'class':'SimpleStrategy','replication_factor': 1};

CREATE TABLE IF NOT EXISTS Bookings.users (
    user_id text, 
    firstName text, 
    lastName text, 
    email text,
    PRIMARY KEY(user_id)
);

CREATE TABLE IF NOT EXISTS Bookings.booking_listing
(
    booking_id text,
    listing_id text,
    user_id text,
    startDate date,
    endDate date,
    PRIMARY KEY(booking_id, listing_id)
);

CREATE TABLE IF NOT EXISTS Bookings.booking
(
    booking_id text,
    listing_id text,
    user_id text,
    startDate date,
    endDate date,
    PRIMARY KEY(booking_id)
);

-- COPY Bookings.booking(booking_id,listing_id,user_id,startDate,endDate) FROM '~/Desktop/sprints/booking/server/csv/BookedDates.csv' WITH DELIMITER = ',' AND HEADER = TRUE;
-- \copy booking FROM PROGRAM 'gzip -dc ./server/csv/dates.csv.gz' DELIMITER ',' CSV HEADER NULL '';
-- COPY Listings.booking(Listing_id,views,basePrice,cleaningFee,serviceFee,taxes,maxGuests,lastAvailableDate) FROM '~/Desktop/sprints/booking/server/csv/primary.csv' WITH DELIMITER = ',' AND HEADER = TRUE;
-- Connected to Test Cluster at 127.0.0.1:9042
-- cqlsh 127.0.0.1:9042 -f cassBooking.cql