
```markdown
# Let's Chat - Real-time Chat Application

![Let's Chat Logo](./frontend/public/favicon.svg)

A modern real-time chat application built with the MERN stack (MongoDB, Express.js, React, Node.js) that allows users to connect and communicate instantly.

## Features

- **Real-time Messaging**: Instant message delivery using Socket.IO
- **User Authentication**: Secure signup and login functionality
- **User Profiles**: Customizable user profiles with profile pictures
- **Online Status**: See when users are online
- **Message History**: Access to previous conversations
- **Image Sharing**: Send and receive images in chats
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Unread Message Indicators**: Visual notifications for unread messages
- **User Search**: Find other users easily

## Tech Stack

### Frontend
- **React**: UI library for building the user interface
- **Vite**: Next generation frontend tooling
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Socket.IO Client**: For real-time communication
- **React Router**: For navigation between pages
- **Axios**: For HTTP requests
- **React Hot Toast**: For notifications

### Backend
- **Node.js**: JavaScript runtime
- **Express**: Web framework for Node.js
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **Socket.IO**: For real-time bidirectional communication
- **JWT**: For authentication
- **bcryptjs**: For password hashing
- **Cloudinary**: For image storage and management

## Project Structure

```

├── backend/                # Backend server code
│   ├── controllers/        # Request handlers
│   ├── lib/                # Utility functions
│   ├── middleware/         # Express middleware
│   ├── model/              # Mongoose models
│   ├── routes/             # API routes
│   └── server.js           # Server entry point
└── frontend/              # Frontend React application
├── Context/            # React context providers
├── public/             # Static assets
└── src/                # Source code
├── assets/         # Images and other assets
├── components/     # React components
├── lib/            # Utility functions
└── pages/          # Page components

````

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/lets-chat.git
   cd lets-chat
````

2. Install backend dependencies

   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies

   ```bash
   cd ../frontend
   npm install
   ```

4. Create environment variables

* Backend `.env`

  ```env
  PORT=5000
  MONGODB_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret
  CLOUDINARY_CLOUD_NAME=your_cloudinary_name
  CLOUDINARY_API_KEY=your_cloudinary_api_key
  CLOUDINARY_API_SECRET=your_cloudinary_api_secret
  ```

* Frontend `.env`

  ```env
  VITE_BACKEND_URL=http://localhost:5000
  ```

### Running the Application

1. Start the backend server

   ```bash
   cd backend
   npm run server
   ```

2. Start the frontend development server

   ```bash
   cd frontend
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

## API Endpoints

### Authentication

* `POST /api/auth/signup` - Register a new user
* `POST /api/auth/login` - Login a user
* `GET /api/auth/check` - Check authentication status

### Messages

* `GET /api/messages/users` - Get all users and unseen messages
* `GET /api/messages/:userId` - Get messages with a specific user
* `POST /api/messages/send/:userId` - Send a message to a user
* `PUT /api/messages/mark/:messageId` - Mark a message as seen

## Socket.IO Events

* `connection` - User connects to the server
* `disconnect` - User disconnects from the server
* `getOnlineUsers` - Get list of online users
* `receiveMessage` - Receive a new message

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Creator
* Manish Kumar 🚀

1. Fork the repository

2. Create your feature branch

   ```bash
   git checkout -b feature/amazing-feature
   ```

3. Commit your changes

   ```bash
   git commit -m 'Add some amazing feature'
   ```

4. Push to the branch

   ```bash
   git push origin feature/amazing-feature
   ```

5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

* Socket.IO for the real-time communication library
* Tailwind CSS for the utility-first CSS framework
* React and the entire MERN stack community


