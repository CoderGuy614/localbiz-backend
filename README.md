# LocalBiz Backend API

Backend API service for the LocalBiz application, a platform for local businesses to showcase their products and services.

## Technologies

- Node.js
- Express
- MongoDB
- JWT Authentication

## Setup

1. Clone the repository
   ```
   git clone https://github.com/yourusername/localbiz-backend.git
   cd localbiz-backend
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Set up environment variables
   Create a `.env` file in the root directory with:
   ```
   DATABASE_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

4. Run the server
   ```
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/signup` - Register a new user
- `POST /api/signin` - Login a user
- `POST /api/signout` - Logout a user

### Users
- `GET /api/user/:userId` - Get user profile
- `PUT /api/user/:userId` - Update user profile

### Businesses
- `POST /api/biz/create/:userId` - Create a business
- `GET /api/biz/list` - Get all businesses
- `GET /api/biz/:bizId` - Get a specific business
- `PUT /api/biz/update/:bizId/:userId` - Update a business
- `DELETE /api/biz/:bizId/:userId` - Delete a business
- `PUT /api/biz/hours/:bizId/:userId` - Update business hours
- `GET /api/biz/hours/:bizId` - Get business hours
- `PUT /api/biz/location/:bizId/:userId` - Update business location

### Items
- `POST /api/item/create/:userId` - Create an item
- `GET /api/items/:bizId` - Get all items for a business
- `GET /api/item/:itemId` - Get a specific item
- `PUT /api/item/update/:itemId/:userId` - Update an item
- `DELETE /api/item/delete/:itemId/:userId` - Delete an item

### Categories
- `GET /api/categories/list` - Get all categories

### Messages
- `POST /api/messages/create/:itemId/:fromUserId/:toUserId` - Create a message
- `GET /api/messages/:userId` - Get all messages for a user

## Deployment

This backend is deployed on AWS App Runner at:
https://r5wa3jwp5s.us-east-1.awsapprunner.com

## Security Note

Never commit sensitive information like API keys, database credentials, or JWT secrets to version control. Use environment variables for all sensitive data.

## Environment Variables

The following environment variables should be set in your deployment environment:

- `DATABASE_URL`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token generation
- `NODE_ENV`: Set to 'production' for production environments
- `PORT`: The port the server will run on (default: 5000)
- `CLOUDINARY_CLOUD_NAME`: Cloudinary cloud name for image uploads
- `CLOUDINARY_API_KEY`: Cloudinary API key
- `CLOUDINARY_API_SECRET`: Cloudinary API secret

## Development

To run the server in development mode with hot reloading:

```
npm run server
```

To run both frontend and backend concurrently (from root directory):

```
npm run dev
```