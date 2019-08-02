# Booking

> Component to select calendar dates and number of guests for booking. It also displays prices per night and total number of reviews.

## Related Projects

  - https://github.com/bedroost/gallery
  - https://github.com/bedroost/review
  - https://github.com/bedroost/description

## Table of Contents

1. [Usage](#Usage)
1. [API](#API)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> Some usage instructions

## API

### Listings
| HTTP Method   | Endpoint               | Description                                                   |
|:--------------|:-----------------------|:--------------------------------------------------------------|
| GET           | /api/:listingid/rooms  | Return details about a specific listing                       |
| POST          | /api/rooms/            | Create a new listing                                          |
| PUT           | /api/:listingid/rooms  | Update and replace details for a specific listing             |
| DELETE        | /api/:listingid/rooms  | Delete a specific listing                                     |


### Bookings
| HTTP Method     | Endpoint                           | Description                                                    |
|:----------------|:-----------------------------------|:---------------------------------------------------------------|
| GET             | /api/bookings/:listing_id                     | Returns all booked dates for a specific listing                |
| POST            | /api/bookings/:listing_id                     | Add a booked date for a specific listing                       |
| PUT             | /api/bookings/?id                  | Update and replace details of a specific booked date for a specific listing|
| DELETE          | /api/bookings/?id                  | Remove a booked date for a specific listing                    |


## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
npm run build
mysql -uroot < ./server/db/schema.sql
npm run seed
```

