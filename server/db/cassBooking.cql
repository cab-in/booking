CREATE KEYSPACE IF NOT EXISTS Bookings with replication={'class':'SimpleStrategy','replication_factor': 1};

CREATE TABLE IF NOT EXISTS Bookings.booking
(
Listing_id text,
booked_date date,
PRIMARY KEY(Listing_id, booked_date)
);

-- COPY Bookings.booking(Listing_id,booked_date) FROM '~/Desktop/sprints/booking/server/csv/dates.csv' WITH DELIMITER = ',' AND HEADER = TRUE;