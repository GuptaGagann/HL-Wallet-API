# HL-Wallet-API

## Development server

Run `npm start` / `node app.js` for a dev server. API serves on `http://localhost:8080/`.

## Hosting

API is hosted and serving on `https://murmuring-earth-48067.herokuapp.com/`.

## Endpoints

# /setup - POST - Request Body: 
`{
    "name": "Test User",
    "balance": 12345678
}`

# /walletDetails/:walletId - GET

# /transact/:walletId - POST - Request Body:
`{
    "amount": 1234,
    "description": "Top-up.",
    "type": "CREDIT"                           //Supported types: CREDIT/DEBIT
}`

# /transactions?walletId=${walletId}&skip=${skip}&limit=${limit} - GET
