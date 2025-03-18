# Restaurant Management System API Documentation

This API provides endpoints for restaurant management including user authentication, menu management, order processing, table management, reservations, payments, and administration functions.

## 🔑 Authentication

### Register User
- **Method:** `POST`
- **Endpoint:** `/api/auth/register`
- **Access:** Public
- **Description:** Register a new user
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securePassword123",
    "role": "customer"
  }
  ```
- **Response:**
  ```json
  {
    "message": "User registered successfully"
  }
  ```

### Login User
- **Method:** `POST`
- **Endpoint:** `/api/auth/login`
- **Access:** Public
- **Description:** Login and get authentication token
- **Request Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "securePassword123"
  }
  ```
- **Response:**
  ```json
  {
    "token": "jwt_token_here",
    "role": "customer",
    "user": {
      "name": "John Doe",
      "email": "john@example.com",
      "role": "customer"
    }
  }
  ```

### Get User Profile
- **Method:** `GET`
- **Endpoint:** `/api/auth/profile`
- **Access:** Authenticated users
- **Description:** Get current user's profile information
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "customer"
  }
  ```

## 👥 User Management

### Get User Profile
- **Method:** `GET`
- **Endpoint:** `/api/users/profile`
- **Access:** Authenticated users
- **Description:** Get the current user's profile
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "customer"
  }
  ```

### Update User Profile
- **Method:** `PUT`
- **Endpoint:** `/api/users/profile`
- **Access:** Authenticated users
- **Description:** Update user profile information
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "name": "John Updated",
    "email": "updated@example.com"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Profile updated successfully",
    "user": {
      "_id": "user_id",
      "name": "John Updated",
      "email": "updated@example.com",
      "role": "customer"
    }
  }
  ```

### Get All Users (Admin Only)
- **Method:** `GET`
- **Endpoint:** `/api/users`
- **Access:** Admin only
- **Description:** Get a list of all users
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  [
    {
      "_id": "user_id_1",
      "name": "User One",
      "email": "user1@example.com",
      "role": "customer"
    },
    {
      "_id": "user_id_2",
      "name": "User Two",
      "email": "user2@example.com",
      "role": "waiter"
    }
  ]
  ```

### Delete User (Admin Only)
- **Method:** `DELETE`
- **Endpoint:** `/api/users/:userId`
- **Access:** Admin only
- **Description:** Delete a user
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  {
    "message": "User deleted successfully"
  }
  ```

## 👥 Team Management

### Get All Staff
- **Method:** `GET`
- **Endpoint:** `/api/team`
- **Access:** Admin only
- **Description:** Get all staff members (non-customers)
- **Headers:** `Authorization: Bearer <token>`
- **Query Parameters:**
  - `role` (optional) - Filter by role (waiter, kitchen, delivery, admin)
- **Response:**
  ```json
  [
    {
      "_id": "user_id_1",
      "name": "Staff One",
      "email": "staff1@example.com",
      "role": "waiter",
      "userTitle": "Head Waiter"
    },
    {
      "_id": "user_id_2",
      "name": "Staff Two",
      "email": "staff2@example.com",
      "role": "kitchen"
    }
  ]
  ```

### Add Team Member
- **Method:** `POST`
- **Endpoint:** `/api/team`
- **Access:** Admin only
- **Description:** Add a new team member
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "name": "New Staff",
    "email": "staff@example.com",
    "role": "waiter",
    "userTitle": "Junior Waiter",
    "permissions": {
      "takeOrders": true,
      "viewMenu": true,
      "manageMenu": false,
      "manageTables": false
    }
  }
  ```
- **Response:**
  ```json
  {
    "message": "Team member added successfully",
    "tempPassword": "randompassword"
  }
  ```

### Get Staff Performance Stats
- **Method:** `GET`
- **Endpoint:** `/api/team/:userId/stats`
- **Access:** Admin only
- **Description:** Get performance statistics for a staff member
- **Headers:** `Authorization: Bearer <token>`
- **Response:** (varies based on role)
  ```json
  {
    "staff": {
      "_id": "user_id",
      "name": "Waiter Name",
      "email": "waiter@example.com",
      "role": "waiter"
    },
    "stats": {
      "orders": 45,
      "tablesServed": 15,
      "totalAmount": 3200.50
    }
  }
  ```

### Update Team Member
- **Method:** `PUT`
- **Endpoint:** `/api/team/:userId`
- **Access:** Admin only
- **Description:** Update team member details
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "role": "waiter",
    "userTitle": "Senior Waiter",
    "permissions": {
      "takeOrders": true,
      "viewMenu": true,
      "manageMenu": true,
      "manageTables": false
    }
  }
  ```
- **Response:**
  ```json
  {
    "message": "Team member updated successfully",
    "user": {
      "_id": "user_id",
      "name": "Staff Name",
      "email": "staff@example.com",
      "role": "waiter",
      "userTitle": "Senior Waiter"
    }
  }
  ```

### Delete Team Member
- **Method:** `DELETE`
- **Endpoint:** `/api/team/:userId`
- **Access:** Admin only
- **Description:** Remove a team member
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  {
    "message": "Team member deleted successfully"
  }
  ```

## 🍔 Menu Management

### Get Menu
- **Method:** `GET`
- **Endpoint:** `/api/menu`
- **Access:** Public
- **Description:** Get all menu items
- **Response:**
  ```json
  [
    {
      "_id": "item_id_1",
      "name": "Burger",
      "category": "main course",
      "price": 8.99,
      "description": "Classic beef burger",
      "imageUrl": "https://example.com/burger.jpg",
      "available": true,
      "discount": 0
    },
    {
      "_id": "item_id_2",
      "name": "Salad",
      "category": "soups and salads",
      "price": 5.99,
      "description": "Fresh garden salad",
      "available": true,
      "discount": 10
    }
  ]
  ```

### Create Menu Item (Admin Only)
- **Method:** `POST`
- **Endpoint:** `/api/menu`
- **Access:** Admin only
- **Description:** Add a new menu item
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "name": "Pizza",
    "category": "main course",
    "price": 12.99,
    "description": "Pepperoni pizza with extra cheese",
    "imageUrl": "https://example.com/pizza.jpg",
    "available": true,
    "discount": 0
  }
  ```
- **Response:**
  ```json
  {
    "message": "Menu item added successfully",
    "menuItem": {
      "_id": "new_item_id",
      "name": "Pizza",
      "category": "main course",
      "price": 12.99,
      "description": "Pepperoni pizza with extra cheese",
      "imageUrl": "https://example.com/pizza.jpg",
      "available": true,
      "discount": 0
    }
  }
  ```

### Update Menu Item (Admin Only)
- **Method:** `PUT`
- **Endpoint:** `/api/menu/:itemId`
- **Access:** Admin only
- **Description:** Update a menu item
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "name": "Updated Pizza",
    "price": 14.99,
    "available": false,
    "discount": 5
  }
  ```
- **Response:**
  ```json
  {
    "message": "Menu item updated successfully",
    "menuItem": {
      "_id": "item_id",
      "name": "Updated Pizza",
      "category": "main course",
      "price": 14.99,
      "description": "Pepperoni pizza with extra cheese",
      "imageUrl": "https://example.com/pizza.jpg",
      "available": false,
      "discount": 5
    }
  }
  ```

### Delete Menu Item (Admin Only)
- **Method:** `DELETE`
- **Endpoint:** `/api/menu/:itemId`
- **Access:** Admin only
- **Description:** Delete a menu item
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  {
    "message": "Menu item deleted successfully"
  }
  ```

## 🪑 Table Management

### Get All Tables
- **Method:** `GET`
- **Endpoint:** `/api/tables`
- **Access:** Admin and Waiters
- **Description:** Get all tables with their details
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  [
    {
      "_id": "table_id_1",
      "tableNumber": "A1",
      "waiterId": {
        "_id": "waiter_id",
        "name": "Waiter Name",
        "email": "waiter@example.com"
      },
      "sittingCapacity": 4,
      "status": "available"
    },
    {
      "_id": "table_id_2",
      "tableNumber": "B2",
      "sittingCapacity": 2,
      "status": "occupied"
    }
  ]
  ```

### Create Table (Admin Only)
- **Method:** `POST`
- **Endpoint:** `/api/tables`
- **Access:** Admin only
- **Description:** Create a new table
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "tableNumber": "C3",
    "waiterId": "waiter_id",
    "sittingCapacity": 6
  }
  ```
- **Response:**
  ```json
  {
    "message": "Table created successfully",
    "table": {
      "_id": "new_table_id",
      "tableNumber": "C3",
      "waiterId": "waiter_id",
      "sittingCapacity": 6,
      "status": "available"
    }
  }
  ```

### Update Table (Admin Only)
- **Method:** `PUT`
- **Endpoint:** `/api/tables/:tableId`
- **Access:** Admin only
- **Description:** Update table details
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "tableNumber": "C4",
    "waiterId": "different_waiter_id",
    "sittingCapacity": 8,
    "status": "reserved"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Table updated successfully",
    "table": {
      "_id": "table_id",
      "tableNumber": "C4",
      "waiterId": {
        "_id": "different_waiter_id",
        "name": "New Waiter",
        "email": "newwaiter@example.com"
      },
      "sittingCapacity": 8,
      "status": "reserved"
    }
  }
  ```

### Delete Table (Admin Only)
- **Method:** `DELETE`
- **Endpoint:** `/api/tables/:tableId`
- **Access:** Admin only
- **Description:** Delete a table
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  {
    "message": "Table deleted successfully"
  }
  ```

## 📅 Reservations

### Get All Reservations
- **Method:** `GET`
- **Endpoint:** `/api/reservations`
- **Access:** Admin and Waiters
- **Description:** Get all table reservations
- **Headers:** `Authorization: Bearer <token>`
- **Query Parameters:**
  - `date` (optional) - Filter by date (YYYY-MM-DD)
  - `status` (optional) - Filter by status (waiting, arrived, released)
- **Response:**
  ```json
  [
    {
      "_id": "reservation_id_1",
      "clientName": "John Smith",
      "phoneNumber": "123-456-7890",
      "tableNumber": {
        "_id": "table_id",
        "tableNumber": "A1",
        "sittingCapacity": 4
      },
      "guestCount": 3,
      "date": "2023-07-15T00:00:00.000Z",
      "time": "19:00",
      "notes": "Birthday celebration",
      "status": "waiting"
    },
    {
      "_id": "reservation_id_2",
      "clientName": "Jane Doe",
      "phoneNumber": "987-654-3210",
      "tableNumber": {
        "_id": "table_id_2",
        "tableNumber": "B2",
        "sittingCapacity": 2
      },
      "guestCount": 2,
      "date": "2023-07-15T00:00:00.000Z",
      "time": "20:00",
      "status": "arrived"
    }
  ]
  ```

### Create Reservation
- **Method:** `POST`
- **Endpoint:** `/api/reservations`
- **Access:** Admin and Waiters
- **Description:** Create a new table reservation
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "clientName": "Michael Johnson",
    "phoneNumber": "555-123-4567",
    "tableNumber": "table_id",
    "guestCount": 4,
    "date": "2023-07-20",
    "time": "18:30",
    "notes": "Anniversary dinner"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Reservation created successfully",
    "reservation": {
      "_id": "new_reservation_id",
      "clientName": "Michael Johnson",
      "phoneNumber": "555-123-4567",
      "tableNumber": "table_id",
      "guestCount": 4,
      "date": "2023-07-20T00:00:00.000Z",
      "time": "18:30",
      "notes": "Anniversary dinner",
      "status": "waiting"
    }
  }
  ```

### Update Reservation
- **Method:** `PUT`
- **Endpoint:** `/api/reservations/:reservationId`
- **Access:** Admin and Waiters
- **Description:** Update reservation details or status
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "status": "arrived",
    "guestCount": 5,
    "time": "19:00",
    "notes": "Anniversary dinner + 1 extra guest"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Reservation updated successfully",
    "reservation": {
      "_id": "reservation_id",
      "clientName": "Michael Johnson",
      "phoneNumber": "555-123-4567",
      "tableNumber": {
        "_id": "table_id",
        "tableNumber": "A1",
        "sittingCapacity": 6
      },
      "guestCount": 5,
      "date": "2023-07-20T00:00:00.000Z",
      "time": "19:00",
      "notes": "Anniversary dinner + 1 extra guest",
      "status": "arrived"
    }
  }
  ```

### Delete Reservation
- **Method:** `DELETE`
- **Endpoint:** `/api/reservations/:reservationId`
- **Access:** Admin only
- **Description:** Delete a reservation
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  {
    "message": "Reservation deleted successfully"
  }
  ```

## 📦 Order Management

### Create Order
- **Method:** `POST`
- **Endpoint:** `/api/orders`
- **Access:** Authenticated users
- **Description:** Place a new order
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "items": [
      {
        "menuItem": "menu_item_id_1",
        "quantity": 2
      },
      {
        "menuItem": "menu_item_id_2",
        "quantity": 1
      }
    ],
    "type": "dine-in",
    "tableNumber": "A1"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Order placed successfully",
    "order": {
      "_id": "order_id",
      "customerId": "user_id",
      "orderNumber": "ORD-123-4567",
      "items": [
        {
          "menuItem": "menu_item_id_1",
          "quantity": 2
        },
        {
          "menuItem": "menu_item_id_2",
          "quantity": 1
        }
      ],
      "totalAmount": 29.97,
      "type": "dine-in",
      "tableNumber": "A1",
      "status": "waiting"
    }
  }
  ```

### Get Customer Orders
- **Method:** `GET`
- **Endpoint:** `/api/orders`
- **Access:** Authenticated users
- **Description:** Get orders made by the current customer
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  [
    {
      "_id": "order_id_1",
      "orderNumber": "ORD-123-4567",
      "items": [
        {
          "menuItem": {
            "_id": "menu_item_id",
            "name": "Burger",
            "price": 8.99
          },
          "quantity": 2
        }
      ],
      "totalAmount": 17.98,
      "type": "dine-in",
      "tableNumber": "A1",
      "status": "completed",
      "createdAt": "2023-07-15T18:30:00.000Z"
    },
    {
      "_id": "order_id_2",
      "orderNumber": "ORD-234-5678",
      "items": [
        {
          "menuItem": {
            "_id": "menu_item_id_2",
            "name": "Pizza",
            "price": 12.99
          },
          "quantity": 1
        }
      ],
      "totalAmount": 12.99,
      "type": "delivery",
      "deliveryAddress": "123 Main St",
      "status": "preparing",
      "createdAt": "2023-07-16T12:45:00.000Z"
    }
  ]
  ```

### Get All Orders (Admin Only)
- **Method:** `GET`
- **Endpoint:** `/api/orders/all`
- **Access:** Admin only
- **Description:** Get all orders
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  [
    {
      "_id": "order_id",
      "customerId": {
        "_id": "user_id",
        "name": "Customer Name",
        "email": "customer@example.com"
      },
      "orderNumber": "ORD-123-4567",
      "items": [
        {
          "menuItem": {
            "_id": "menu_item_id",
            "name": "Burger",
            "price": 8.99
          },
          "quantity": 2
        }
      ],
      "totalAmount": 17.98,
      "type": "dine-in",
      "tableNumber": "A1",
      "assignedWaiter": "waiter_id",
      "status": "served",
      "createdAt": "2023-07-15T18:30:00.000Z"
    }
  ]
  ```

### Update Order Status
- **Method:** `PUT`
- **Endpoint:** `/api/orders/:orderId`
- **Access:** Admin and Staff
- **Description:** Update an order's status
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "status": "preparing"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Order status updated",
    "order": {
      "_id": "order_id",
      "orderNumber": "ORD-123-4567",
      "status": "preparing"
    }
  }
  ```

## ⭐ Reviews

### Submit Review
- **Method:** `POST`
- **Endpoint:** `/api/reviews`
- **Access:** Authenticated users
- **Description:** Submit a review for an order
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "orderId": "order_id",
    "rating": 5,
    "comment": "Excellent food and service!"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Review submitted successfully",
    "review": {
      "_id": "review_id",
      "customerId": "user_id",
      "orderId": "order_id",
      "rating": 5,
      "comment": "Excellent food and service!",
      "createdAt": "2023-07-16T14:30:00.000Z"
    }
  }
  ```

### Get All Reviews
- **Method:** `GET`
- **Endpoint:** `/api/reviews`
- **Access:** Public
- **Description:** Get all reviews
- **Response:**
  ```json
  [
    {
      "_id": "review_id_1",
      "customerId": {
        "_id": "user_id",
        "name": "Customer Name"
      },
      "orderId": "order_id",
      "rating": 5,
      "comment": "Excellent food and service!",
      "createdAt": "2023-07-16T14:30:00.000Z"
    },
    {
      "_id": "review_id_2",
      "customerId": {
        "_id": "user_id_2",
        "name": "Another Customer"
      },
      "orderId": "order_id_2",
      "rating": 4,
      "comment": "Great food but a bit slow service",
      "createdAt": "2023-07-15T18:45:00.000Z"
    }
  ]
  ```

### Delete Review (Admin Only)
- **Method:** `DELETE`
- **Endpoint:** `/api/reviews/:reviewId`
- **Access:** Admin only
- **Description:** Delete an inappropriate review
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  {
    "message": "Review deleted successfully"
  }
  ```

## 💳 Payments

### Initiate Payment
- **Method:** `POST`
- **Endpoint:** `/api/payments`
- **Access:** Authenticated users
- **Description:** Initiate a payment for an order
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "orderId": "order_id",
    "amount": 29.97,
    "paymentMethod": "credit_card"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Payment initiated",
    "clientSecret": "stripe_client_secret",
    "payment": {
      "_id": "payment_id",
      "orderId": "order_id",
      "customerId": "user_id",
      "amount": 29.97,
      "status": "pending",
      "paymentMethod": "credit_card",
      "transactionId": "stripe_transaction_id",
      "createdAt": "2023-07-16T15:30:00.000Z"
    }
  }
  ```

### Get All Payments (Admin Only)
- **Method:** `GET`
- **Endpoint:** `/api/payments`
- **Access:** Admin only
- **Description:** Get all payment records
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  [
    {
      "_id": "payment_id_1",
      "customerId": {
        "_id": "user_id",
        "name": "Customer Name",
        "email": "customer@example.com"
      },
      "orderId": "order_id",
      "amount": 29.97,
      "status": "completed",
      "paymentMethod": "credit_card",
      "transactionId": "stripe_transaction_id",
      "createdAt": "2023-07-16T15:30:00.000Z"
    },
    {
      "_id": "payment_id_2",
      "customerId": {
        "_id": "user_id_2",
        "name": "Another Customer",
        "email": "another@example.com"
      },
      "orderId": "order_id_2",
      "amount": 45.96,
      "status": "pending",
      "paymentMethod": "credit_card",
      "transactionId": "another_transaction_id",
      "createdAt": "2023-07-16T16:15:00.000Z"
    }
  ]
  ```

### Update Payment Status (Admin Only)
- **Method:** `PUT`
- **Endpoint:** `/api/payments/:paymentId`
- **Access:** Admin only
- **Description:** Update a payment's status
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "status": "completed"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Payment status updated",
    "payment": {
      "_id": "payment_id",
      "status": "completed"
    }
  }
  ```

## 🎟 QR Codes

### Generate QR Code for Table
- **Method:** `GET`
- **Endpoint:** `/api/qrcode/:tableNumber`
- **Access:** Admin only
- **Description:** Generate a QR code for a specific table
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  {
    "tableNumber": "A1",
    "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUg..."
  }
  ```

## 📊 Admin Dashboard

### Get Dashboard Statistics
- **Method:** `GET`
- **Endpoint:** `/api/admin/dashboard`
- **Access:** Admin only
- **Description:** Get restaurant performance statistics
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  {
    "overview": {
      "totalRevenue": 12560.75,
      "totalMenus": 45,
      "totalCustomers": 250,
      "totalOrders": 1560
    },
    "orders": {
      "completedOrders": 1450,
      "completedOrdersAmount": 12200.50,
      "cancelledOrders": 110,
      "cancelledOrdersAmount": 1250.25
    },
    "staff": {
      "waiters": 8,
      "kitchen": 5,
      "delivery": 4
    }
  }
  ```

### Get Customer Statistics
- **Method:** `GET`
- **Endpoint:** `/api/admin/customers`
- **Access:** Admin only
- **Description:** Get statistics about customers
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  [
    {
      "_id": "customer_id_1",
      "name": "John Doe",
      "email": "john@example.com",
      "joinedOn": "2023-01-15T10:30:00.000Z",
      "orderedItems": 45,
      "orderCount": 15,
      "deliveryCount": 5,
      "cancelledCount": 1,
      "repeatCustomer": true
    },
    {
      "_id": "customer_id_2",
      "name": "Jane Smith",
      "email": "jane@example.com",
      "joinedOn": "2023-03-20T14:45:00.000Z",
      "orderedItems": 12,
      "orderCount": 4,
      "deliveryCount": 2,
      "cancelledCount": 0,
      "repeatCustomer": true
    }
  ]
  ```
