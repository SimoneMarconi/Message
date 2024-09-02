# TCP Connection Manager

Welcome to **TCP Connection Manager**, a powerful and efficient application designed to handle multiple concurrent TCP connections. This application enables a server to send streams of messages to clients connected across different ports. It's built with Go and the Gin-Gonic API framework for high performance and simplicity, and offers a sleek, intuitive UI powered by React and Vite.

## Features

- **Concurrent TCP Connections:** Seamlessly handle multiple TCP connections simultaneously, enabling high throughput and low latency communication between the server and clients.
- **Dynamic Port Management:** Easily open and close TCP ports through the web interface. Visualize the status of each port in real-time.
- **Message Streaming:** Send and receive streams of messages to and from connected clients over the established TCP connections.
- **Web-Based Control Interface:** Manage and monitor all TCP connections through a modern, user-friendly web interface built with React and Vite.
- **Real-Time Visualization:** View active connections, check which ports are open, and monitor data flow in real time.

## Architecture

- **Backend:** The backend is developed in **Go**, leveraging the Gin-Gonic framework to create a fast and reliable API. Go's native concurrency model is utilized to manage multiple TCP connections efficiently.
  
- **Frontend:** The frontend is a **React** application, built with **Vite** for lightning-fast build times and an optimized development experience. The web interface allows users to interact with the server, manage connections, and monitor activity in real-time.

## Installation

### Prerequisites

- Go
- Node.js
- Git

### Clone the Repository

```bash
git clone https://github.com/SimoneMarconi/Message.git
cd Message
```

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install Go dependencies:
   ```bash
   go mod tidy
   ```
3. Run the backend server:
   ```bash
   go run message.go
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install Node.js dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend should now be running on `http://localhost:5173`, and the backend should be available on `http://localhost:4200`.

## Usage

1. **Open TCP Ports:** Use the web interface to open TCP ports by specifying the desired port number. The application will begin listening for incoming connections on those ports.

2. **Connect with the TCP Client** use the TCP client found in the ```./backend/Message/client``` folder providing the port number as an inline argument

3. **View Active Connections:** Monitor all active TCP connections. Each connection will show the port number and the state of the connection.

4. **Send Messages:** Send messages to connected client via the web interface. Messages will be streamed over the selected TCP connection.

5. **Close Connections:** Close any TCP connection from the UI to stop listening on that port and disconnect the clients.
