# Restaurant Ordering API

A production-inspired RESTful Restaurant Ordering API built with **Node.js**, **Express.js**, **TypeScript**, and **MySQL**. The API supports role-based authentication, restaurant and menu management, transactional order processing, order lifecycle management, pagination, filtering, sorting, and interactive API documentation with Swagger.

## Features

### Authentication & Authorization

* JWT-based authentication
* Role-based access control (Restaurant Owner & Customer)
* Protected routes
* Request validation with Zod

### Restaurant Management

* Create, update, retrieve, and delete restaurants
* Restaurant ownership authorization

### Categories

* Full CRUD for menu categories
* Restaurant-scoped categories

### Menu Items

* Full CRUD for menu items
* Availability management
* Category and restaurant validation

### Order Management

* Customers can place orders
* Transactional order creation using MySQL transactions
* Automatic order total calculation
* Order item validation
* Customer order history
* Restaurant order management
* Order cancellation
* Order status workflow (Pending → Accepted → Preparing → Ready → Completed)

### Query Features

* Pagination
* Filtering by order status
* Sorting by creation date and total amount

### API Documentation

* Interactive Swagger/OpenAPI documentation

## Tech Stack

* Node.js
* Express.js
* TypeScript
* MySQL
* JWT Authentication
* Zod
* Swagger / OpenAPI
* mysql2

## Upcoming Improvements

* Redis caching
* Docker support
* Unit & Integration tests
* CI/CD
* Cloud deployment (Render/Railway)
