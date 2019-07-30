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

CREATE TABLE IF NOT EXISTS Bookings.booking
(
    Listing_id text,
    booked_date date,
    PRIMARY KEY(Listing_id, booked_date)
);

-- COPY Bookings.booking(Listing_id,booked_date) FROM '~/Desktop/sprints/booking/server/csv/dates.csv' WITH DELIMITER = ',' AND HEADER = TRUE;
-- \copy booking FROM PROGRAM 'gzip -dc ./server/csv/dates.csv.gz' DELIMITER ',' CSV HEADER NULL '';
-- COPY Listings.booking(Listing_id,views,basePrice,cleaningFee,serviceFee,taxes,maxGuests,lastAvailableDate) FROM '~/Desktop/sprints/booking/server/csv/primary.csv' WITH DELIMITER = ',' AND HEADER = TRUE;
-- COPY Listings.booking(Listing_id,views,basePrice,cleaningFee,serviceFee,taxes,baseGuests,extraGuests,maxGuests,lastAvailableDate) FROM 'gzip -dc dates.csv.gz' WITH HEADER = false;
-- COPY Listings.booking(Listing_id,basePrice,views,cleaningFee,serviceFee,taxes,maxGuests,lastAvailableDate) FROM PROGRAM'gzip -dc dates.csv.gz' WITH HEADER = false;
-- Connected to Test Cluster at 127.0.0.1:9042
-- cqlsh 127.0.0.1:9042 -f cassBooking.cql