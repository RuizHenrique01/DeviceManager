<h1 align="center">Device Manager</h1>

This repository contains a simple device management web application. The app includes a **frontend** built with Angular (`web-device-manager`) and a **backend RESTful API** built with NestJS (`api-device-manager`). The app is designed to allow users to manage devices, monitor operations, and interact with a relational database through **Prisma ORM**.

The backend includes robust **unit and e2e tests** using **Jest**, ensuring that the system is stable and reliable.

The infrastructure is deployed on **AWS**, using:
- **RDS (MySQL)** for the database
- **EC2** for compute resources
- **S3** for static site hosting (frontend)
- **CloudFront** for content delivery

---

## 📚 Table of Contents

- [🛠️ Technologies Used](#technologies-used)
- [📦 Cloning the Repository and Accessing the Folder](#-cloning-the-repository-and-accessing-the-folder)
- [📥 Installing Dependencies](#-installing-dependencies)
- [⚙️ Configuration](#configuration)
- [⚠️ Important Prisma Configuration](#important-prisma-configuration)
- [🔧 Running Projects Individually](#running-projects-individually)
- [🏃‍♂️ Running the Projects Using Nx](#running-the-projects-using-nx)
- [🐳 Running with Docker Compose](#running-with-docker-compose)
- [📘 API Documentation (Swagger)](#-api-documentation-swagger)
- [👤 Author](#-author)

---

<a name="technologies-used"></a>
## 🛠️ Technologies Used

- **Node.js** `v20.13.1`
- **Angular** `v14.x` (frontend)
- **NestJS** `v11.x` (backend)
- **Prisma ORM** `v6.x`
- **MySQL** (AWS RDS)
- **Swagger**
- **Jest** (unit & e2e tests)
- **Docker** & **Docker Compose**
- **Nx Monorepo**
- **AWS Services**:
  - **RDS (MySQL)**
  - **EC2**
  - **S3** (for static site hosting)
  - **CloudFront**

---

<a name="cloning-the-repository-and-accessing-the-folder"></a>
## 📦 Cloning the Repository and Accessing the Folder

```bash
git clone https://github.com/RuizHenrique01/DeviceManager.git
cd DeviceManager
```

## 📥 Installing Dependencies

Once inside the monorepo folder, install the dependencies for all projects at once by running the following command:

```bash
npm install
```

This installs the necessary runtime and development dependencies for both the frontend and backend applications.

<a name="configuration"></a>

## ⚙️ Configuration

For the API Device Manager to work, it's essential to configure Prisma properly and create the `.env` file for environment variables.

### Prisma Configuration

Make sure that Prisma is configured properly for your database. After setting up the .env file, run:

```bash
npx prisma generate
npx prisma migrate deploy
```

This ensures the Prisma client is generated, and the database migrations are applied correctly.

### .env Configuration for API Device Manager

The .env file is essential for the API to work correctly. Make sure to set it up in the `api-device-manager` folder:

```bash
# Example .env file configuration
DATABASE_URL="mysql://root:root@localhost:3306/device_manager_db"
```

<a name="important-prisma-configuration"></a>

## ⚠️ Important Prisma Configuration

Before running the API, it is crucial to configure Prisma and the database connection properly:

- Generate the Prisma client

- Apply migrations to set up the database schema

These steps must be followed for the API to interact correctly with the database.

<a name="running-projects-individually"></a>

## 🔧 Running Projects Individually

Each project in the monorepo has its own README file for individual execution. Here are the links to their documentation:

- [📘 API Device Manager README](https://github.com/RuizHenrique01/DeviceManager/blob/master/api-device-manager/README.md)

- [📘 Web Device Manager README](https://github.com/RuizHenrique01/DeviceManager/blob/master/web-device-manager/README.md)

You can follow these instructions to run each project individually in development or production mode.

<a name="running-the-projects-using-nx"></a>

## 🏃‍♂️ Running the Projects Using Nx

You can run both frontend and backend using Nx commands.

### Install all dependencies:

```bash
npm run install:all
```

### Run all services:

```bash
npm run start:all
```

<a name="running-with-docker-compose"></a>

## 🐳 Running with Docker Compose

To run the application with Docker Compose:

### 1. Build images

```bash
docker-compose build
```

### 2. Start containers

```bash
docker compose up -d
```

This runs MySQL, backend API, and frontend.

## 📘 API Documentation (Swagger)

After running the backend, access the API docs at:

```bash
http://localhost:3000/api
```

## 👤 Author

**Affonso Ruiz**  
💼 Full Stack Developer  
📧 Email: affonsohenriqueruiz@gmail.com  
🔗 LinkedIn: [linkedin.com/in/affonsoruiz](https://www.linkedin.com/in/affonsoruiz/)  
🐙 GitHub: [github.com/RuizHenrique01](https://github.com/RuizHenrique01)