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
> Create a new listing
```sh
POST /api/rooms/
```

> Return details about a specific listing
```sh
GET /api/rooms/:listingid/
```

> Update details for a specific listing
```sh
PUT /api/rooms/:listingid/
```

> Delete a specific listing
```sh
DELETE /api/rooms/:listingid/
```

## Bookings
> Add a booked date for a specific listing
```sh
POST /api/:listingid/booking
```

> Returns all booked dates for a specific listing
```sh
GET /api/rooms/:listingid/booking/dates
```

> Update details of a specific booked date for a specific listing
```sh
PUT /api/:listingid/:date
```

> Remove a booked date for a specific listing
```sh
DELETE /api/rooms/:listingid/:date
```

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

