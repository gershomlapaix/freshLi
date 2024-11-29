# Freshli

This is a software platform designed to connect farmers in Rwanda directly with buyers. The platform allows farmers to register and list their products, while buyers can browse, place orders, and make transactions. The system eliminates the need for an intermediary person and enables farmers to interact directly with buyers.

## Features

- **Farmer Registration & Approval**: Farmers can register on the platform and await approval from an admin before listing their products.
- **Product Listing**: Once approved, farmers can list their products for sale, including details like price, quantity, and product descriptions.
- **Buyer Registration**: Buyers can register on the platform and browse products listed by farmers.
- **Order Placement**: Buyers can place orders for products they wish to purchase.
- **Transaction Management**: After an order is placed, farmers can confirm the transaction if the order meets the required conditions.
- **Authentication**: The system uses JWT (JSON Web Token) for secure user authentication.

## Tech Stack

### Backend:
- **Node.js**: JavaScript runtime used to build the backend.
- **Express.js**: Web framework for building the API and handling HTTP requests.
- **MySQL**: Relational database to store user, product, and order data.
- **JWT (JSON Web Token)**: Used for secure user authentication.

### Frontend:
- **HTML**: Standard markup language for building the structure of the web pages.
- **CSS**: Stylesheet language used to design the layout and appearance of the web pages.
- **Vanilla JavaScript**: Plain JavaScript used for client-side interactivity and AJAX calls.

## System Architecture

### Overview
The system consists of a front-end interface for both farmers and buyers, a backend API that manages user authentication, product listings, orders, and transactions, and a database to store all relevant data.

### Components
1. **Frontend**:
   - **UI/UX Interface**: Provides a clean, easy-to-use interface for farmers to register and list products, and for buyers to browse and place orders.
   - **Product Browsing**: Buyers can view available products, filter them by category, price, etc.
   - **Order Management**: Buyers can add products to their cart, place orders, and track order statuses.

2. **Backend**:
   - **Authentication**: Uses JWT for authenticating users (both farmers and buyers) to ensure secure login sessions.
   - **Farmer Management**: Admin has control over approving and managing farmers who can list products.
   - **Product Management**: Farmers can add, update, and delete products after registration approval.
   - **Order Management**: Buyers place orders for products, and farmers can confirm or reject transactions.
   - **Transaction Confirmation**: After an order is placed, farmers confirm that the transaction meets requirements.

3. **Database**:
   - **MySQL** is used to store:
     - **Users** (both buyers and farmers).
     - **Products** (product details listed by farmers).
     - **Orders** (order information placed by buyers).
     - **Transactions** (status of orders).

### High-Level Architecture

