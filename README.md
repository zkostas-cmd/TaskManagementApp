# Task Management Application

A modern task management application built with the MERN stack (MongoDB, Express.js, React, Node.js) that helps users organize and track their tasks efficiently.

## Features

- Create, read, update, and delete tasks
- Mark tasks as complete/incomplete
- Set due dates for tasks
- Modern and responsive Material-UI interface
- Real-time updates
- Snackbar notifications for user actions

## Technology Stack

### Frontend
- React.js
- Material-UI (MUI)
- Axios for API requests
- Date-fns for date handling

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- CORS for cross-origin resource sharing

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd TaskManagementApp
```

2. Install server dependencies:
```bash
npm install
```

3. Install client dependencies:
```bash
npm run client-install
```

4. Create a `.env` file in the root directory and add your MongoDB URI:
```
MONGODB_URI=your_mongodb_connection_string
PORT=5001
```

## Running the Application

### Development Mode

Run both frontend and backend concurrently:
```bash
npm run dev
```

Or run them separately:

Backend only:
```bash
npm run server
```

Frontend only:
```bash
npm run client
```

### Production Mode

1. Build the client:
```bash
cd client
npm run build
```

2. Start the production server:
```bash
npm start
```

The application will be available at `http://localhost:5001`

## API Endpoints

- `GET /api/tasks` - Retrieve all tasks
- `POST /api/tasks` - Create a new task
- `PATCH /api/tasks/:id` - Toggle task completion status
- `DELETE /api/tasks/:id` - Delete a task

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.