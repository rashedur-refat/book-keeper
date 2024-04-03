# Bookkeeper API Node.js Application

## Installation and Usage

### Prerequisites

- Node.js (version 18.x or higher)
- Docker (optional)

### Installation

1. **Clone the repository:**

   ```bash
   $ git clone <repository-url>
   $ cd <project-directory>

   ```

2. Install dependencies:
   $ npm install

3. Set environment variables:
   Create a .env file in the project root directory with the following content:
   DB_HOST=<database-host>
   DB_NAME=<database-name>
   DB_USER=<database-user>
   DB_PASSWORD=<database-password>
   JWT_SECRET=<jwt-secret-key>
4. Start the server:
   $ npm start
5. Run unit tests:
   $ npm test

## Docker

1. Build Docker image:
   $ docker build -t book-keeper-api .
2. Run Docker container:
   $ docker run -p 3000:3000 book-keeper-api
