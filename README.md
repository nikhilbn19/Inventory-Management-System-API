### Inventory Management System API
    
  A backend-heavy project built with Node.js, Express, Sequelize, and SQLite.
  This API manages products and their inventory, ensuring stock levels are always valid.

## Features

- Product Management (CRUD)

    - Create, read, update, and delete products
 
    - Each product has name, description, stock_quantity, and low_stock_threshold

- Inventory Logic

    - Stock quantity cannot go below zero

    - Endpoints to increase and decrease stock

    - Validation for all inputs using Joi

- Bonus Features

    - low_stock_threshold field

    - Endpoint to fetch all products below threshold

    - Unit tests for stock logic (Jest + Supertest + SQLite in-memory)

## Tech Stack

  Backend: Node.js, Express

  Database: SQLite (via Sequelize ORM)

  Validation: Joi

  Testing: Jest, Supertest

  Middleware: Morgan (logging), CORS, express-async-errors

  ## Project Structure

  <img width="446" height="736" alt="image" src="https://github.com/user-attachments/assets/a37523ec-e82b-4454-80a6-c54911242e51" />

  ## Setup & Installation

  1. Clone the repo

   - git clone https://github.com/nikhilbn19/Inventory-Management-System-API.git
    
   - cd Inventory_Management_System


2. Install dependencies

 - npm install


3. Run the server (default: http://localhost:4000)

 - npm run dev

4. Run tests

 - npm test

## API Endpoints

  # Health

 - GET /health → API status

  # Products

 - POST /api/products → Create product

-  GET /api/products → List all products

-  GET /api/products/:id → Get product by ID

-  PUT /api/products/:id → Update product

- DELETE /api/products/:id → Delete product

# Stock Management

- POST /api/products/:id/stock/increase → Increase stock

- POST /api/products/:id/stock/decrease → Decrease stock (returns 400 if insufficient)

# Low Stock 

 - GET /api/products/low-stock → List products below low_stock_threshold

## Tests

# Unit tests cover:

 - Product creation

 - Stock increase & decrease (valid and invalid cases)

 - Prevent negative stock on update

 -  Low stock endpoint logic

# Run tests:

 - npm test
