🔐 Authentication

1. Sign Up

URL: /api/auth/signup

Method: POST

Request Body:

{
"name": "John Doe",
"email": "john@example.com",
"password": "yourpassword"
}

Response: JWT token and user data on success.

2. Sign In

URL: /api/auth/signin

Method: POST

Request Body:

{
"email": "john@example.com",
"password": "yourpassword"
}

Response: JWT token, user data, and login activity logged.

💳 Payment (SSLCommerz)

1. Initiate Payment

URL: /api/payment/initiate

Method: POST

Request Body:

{
"amount": 1000,
"currency": "BDT",
"product": "Item Name"
}

Response: Redirect URL to SSLCommerz for payment processing.

2. Payment Success Callback

URL: /api/payment/success

Method: POST

Handled By: SSLCommerz (do not call manually)

Description: Triggered by SSLCommerz after successful payment.

3. Payment Failure Callback

URL: /api/payment/fail

Method: POST

Handled By: SSLCommerz

Description: Triggered by SSLCommerz if payment fails.

📊 User Activity Logs

1. Get Login Activity

URL: /api/user/activity

Method: GET

Headers:

Authorization: Bearer <JWT Token>

Description:
Returns a list of login activity entries for the authenticated user (or all users if admin).

Query Parameters (optional):

page: Page number (default: 1)

limit: Items per page (default: 10)

🧰 Common Headers

Most secured routes require a JWT token:

Authorization: Bearer <YourTokenHere>

📌 Notes

Always use HTTPS in production.

The server returns meaningful messages via centralized messages/en.js.

Device and user agent info are logged automatically on sign-in.

All responses include a X-Request-Id header for traceability.
