# 📦 Microservices Setup Guide

This project uses multiple services that can be run individually or all together via Docker.

---

## 🚀 Running a Single Service

To start a specific service manually:

1. **Navigate to the service directory**, for example:
   ```bash
   cd ./back/api-gateway
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:

   - Create a `.env` file in the service directory.
   - Use the `.env.example` file as a reference:
     ```bash
     cp .env.example .env
     ```

4. **Start the service**:
   ```bash
   npm start
   ```

---

## 🐳 Running All Services with Docker

To spin up all services using Docker Compose:

1. **Navigate to the `back` folder**:
   ```bash
   cd ./back
   ```

2. **Configure the main `.env` file**:

   - If you want to use your **local PostgreSQL** database, set:
     ```env
     DB_HOST=host.docker.internal
     ```
   - If you want to use a **PostgreSQL Docker container**, set:
     ```env
     DB_HOST=postgres
     ```

3. **Start all services**:
   ```bash
   docker-compose up --build
   ```

---

## 📝 Notes

- Ensure Docker is installed and running on your system.
- Port conflicts may occur if services are already running locally.
- Logs for all services will be shown in the terminal.
- To stop Docker services:
  ```bash
  docker-compose down
  ```

---

## 📂 Folder Structure

```
back/
  ├── api-gateway/
  ├── user-service/
  ├── book-service/
  ├── ...
```

---

## ✅ Requirements

- Node.js ≥ 18
- Docker & Docker Compose
- PostgreSQL (locally or via Docker)

---