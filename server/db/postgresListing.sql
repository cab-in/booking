CREATE DATABASE listing;

\c listing;

CREATE TABLE booking (basePrice	int, views int, cleaningFee int, serviceFee int, taxes int,
maxGuests int, lastAvailabeDate date);
