# 📌 Restaurant Management System API Documentation

This API provides endpoints for **user authentication, menu management, order processing, payments, and reviews**.

✅ **Built with:** Node.js + Express + MongoDB  
✅ **Security:** JWT Authentication, Role-Based Access Control (RBAC), Rate Limiting  
✅ **Payments:** Stripe (PayPal can be added)  
✅ **Real-time updates:** WebSockets  

---

## 🚀 Installation & Setup

### 1️⃣ Clone the repository
```sh
git clone https://github.com/your-repo.git
cd restaurant-management-backend
```

## 📌 API Endpoints

### 1️⃣ Authentication & User Management

#### 🔹 Register User

**Endpoint:** `POST /api/auth/register`  
**Access:** Public  
**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "role": "customer"
}
```
**Response:**
```json
{
  "message": "User registered successfully"
}
```

#### 🔹 Login User

**Endpoint:** `POST /api/auth/login`  
**Access:** Public  
**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```
**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3Y2VjMTljYWNhODlmYWQ4OWRjMDViMSIsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTc0MTYxOTg4NCwiZXhwIjoxNzQxNzA2Mjg0fQ.VekxllNpnvyE-eS8jHAWN8XEL8nsgYV-GTewaMGCaso",
  "role": "customer",
  "user": {
    "name": "John Doe",
    "email": "john@example.com",
    "role": "customer"
  }
}
```

#### 🔹 Get User Profile

**Endpoint:** `GET /api/users/profile`  
**Access:** Requires authentication  
**Response:**
```json
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "customer"
}
```

### 2️⃣ Menu Management

#### 🔹 Get All Menu Items

**Endpoint:** `GET /api/menu/`  
**Access:** Public  
**Response:**
```json
[
  {
    "_id": "menu_id",
    "name": "Pizza",
    "category": "Main Course",
    "price": 12.99,
    "available": true
  }
]
```

#### 🔹 Add a Menu Item (Admin Only)

**Endpoint:** `POST /api/menu/`  
**Access:** Admin only  
**Request Body:**
```json
{
  "name": "Burger",
  "category": "Fast Food",
  "price": 8.99,
  "available": true
}
```
**Response:**
```json
{
  "message": "Menu item added successfully",
  "menuItem": { "name": "Burger", "category": "Fast Food", "price": 8.99 }
}
```

### 3️⃣ Order Management

#### 🔹 Place an Order

**Endpoint:** `POST /api/orders/`  
**Access:** Customers  
**Request Body:**
```json
{
  "items": [
    { "menuItem": "menu_id", "quantity": 2 }
  ],
  "type": "dining",
  "tableNumber": "5"
}
```
**Response:**
```json
{
  "message": "Order placed successfully",
  "order": { "customerId": "user_id", "totalAmount": 25.98, "status": "pending" }
}
```

#### 🔹 Get Customer Orders

**Endpoint:** `GET /api/orders/`  
**Access:** Customers  
**Response:**
```json
[
  {
    "_id": "order_id",
    "items": [{ "menuItem": "Pizza", "quantity": 2 }],
    "totalAmount": 25.98,
    "status": "pending"
  }
]
```

### 4️⃣ Payments

#### 🔹 Initiate a Payment

**Endpoint:** `POST /api/payments/`  
**Access:** Customers  
**Request Body:**
```json
{
  "orderId": "order_id",
  "amount": 25.99,
  "paymentMethod": "credit_card"
}
```
**Response:**
```json
{
  "message": "Payment initiated",
  "clientSecret": "stripe_client_secret",
  "payment": {
    "_id": "payment_id",
    "status": "pending",
    "amount": 25.99
  }
}
```

### 5️⃣ Reviews & Ratings

#### 🔹 Submit a Review

**Endpoint:** `POST /api/reviews/`  
**Access:** Customers (Only if they completed an order)  
**Request Body:**
```json
{
  "orderId": "order_id",
  "rating": 5,
  "comment": "The food was great!"
}
```
**Response:**
```json
{
  "message": "Review submitted successfully",
  "review": { "rating": 5, "comment": "The food was great!" }
}
```

#### 🔹 Get All Reviews

**Endpoint:** `GET /api/reviews/`  
**Access:** Public  
**Response:**
```json
[
  {
    "_id": "review_id",
    "customerId": "John Doe",
    "rating": 5,
    "comment": "Excellent service!"
  }
]
```

### 6️⃣ QR Code Generation

#### 🔹 Generate a Table QR Code (Admin Only)

**Endpoint:** `GET /api/qrcode/:tableNumber`  
**Access:** Admins  
**Example Request:**  
`GET /api/qrcode/5`  
**Authorization:** Bearer `<admin_token>`  
**Example Response:**
```json
{
  "tableNumber": "5",
  "qrCode": "data:image/png;base64,iVBOR..."
}
```