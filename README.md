# E-Commerce API with Node.js

This project aims to build a comprehensive API set to support key e-commerce operations. It includes functionality for product and category management, cart operations, order processing, and user authentication. The system leverages Node.js for backend development, Express.js as the web application framework, MongoDB for data storage, and JSON Web Tokens (JWT) for user authentication. Additionally, the API incorporates rate limiting middleware to prevent abuse and ensure service stability.

## Table of Contents




## Features

- **Add, update, and delete products:** Allows CRUD operations on products.
- **Retrieve product details:** Retrieves product information including title, price, description, and availability.
- **Filter products by category:** Filters products based on category ID.
- **Create, update, and delete product categories:** Enables CRUD operations on product categories.
- **Retrieve a list of all product categories:** Fetches a list of all available product categories.
- **Add products to the cart:** Adds products to the user's cart.
- **View cart contents:** Displays the contents of the user's cart.
- **Update product quantities within the cart:** Allows users to modify the quantity of products in the cart.
- **Remove items from the cart:** Enables users to remove products from the cart.
- **Place orders with the contents of the cart:** Facilitates the placement of orders using the items in the cart.
- **View order history:** Allows users to view their order history.
- **Retrieve detailed information about a specific order:** Provides detailed information about a particular order using its ID.
- **User registration:** Allows users to create new accounts.
- **User login/logout:** Enables users to authenticate and logout from the system.
- **Secure API access using JSON Web Tokens (JWT):** Implements JWT-based authentication to secure API endpoints.
- **Implement middleware for authentication:** Adds middleware to protect sensitive endpoints.
- **Utilize JWT for managing user sessions:** Manages user sessions and secures API access using JSON Web Tokens.
- **Rate limiting to prevent abuse:** Implements rate limiting to prevent abuse and ensure service stability.
- **Validate request data:** Validates incoming request data to ensure data integrity and security.
- **Handle errors gracefully:** Provides meaningful error messages and handles errors gracefully.

## Getting Started

1. **Clone the repository:**
    ```bash
    git clone https://github.com/omkar231098/E-Commerce_API.git
   
    ```
   ```bash
   cd E-Commerce_API
    ```
2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Set up environment variables:**
    Create a `.env` file in the root directory and add the following:
    ```env
    PORT=3000
    DATABASE_URL=mongodb://localhost:27017/E-Commerce_API
    JWT_SECRET=mysecretkey
    ```

4. **Run the application:**
    ```bash
    npm run server
    ```
    The API server will be running at `http://localhost:3000`.

## API Routes


- **Add Product:** `POST /api/products`
- **Update Product:** `PUT /api/products/:id`
- **Delete Product:** `DELETE /api/products/:id`
- **Get Product Details:** `GET /api/products/:id`
- **Get All Products:** `GET /api/products`
- **Get Products by Category:** `GET /api/products?category=:category_id`

### Category Management

- **Add Category:** `POST /api/categories`
- **Update Category:** `PUT /api/categories/:id`
- **Delete Category:** `DELETE /api/categories/:id`
- **Get All Categories:** `GET /api/categories`

### Cart Operations

- **Add to Cart:** `POST /api/cart/add`
- **View Cart:** `GET /api/cart`
- **Update Cart:** `PATCH /api/cart/:productId`
- **Remove from Cart:** `DELETE /api/cart/:productId`

### Order Processing

- **Place Order:** `POST /api/orders`
- **Get Order History:** `GET /api/orders`
- **Get Order Details:** `GET /api/orders/:id`

### User Authentication

- **User Registration:** `POST /api/auth/register`
- **User Login:** `POST /api/auth/login`


## Authentication

This API uses JSON Web Tokens (JWT) for authentication. To access protected routes, include the JWT token in the request headers:


## Rate Limiter

This API implements rate limiting using the express-rate-limit middleware to prevent abuse and ensure service stability.

## Validator

Validator is used to validate request data, ensuring data integrity and security.

## Contribution

Contributions are welcome! Fork the project, create your feature branch, commit your changes, and open a pull request.

## License

Distributed under the MIT License. See `LICENSE` for more information.
