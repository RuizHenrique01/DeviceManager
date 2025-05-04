# API Device Manager

RESTful API built with NestJS to manage devices and their operations. This project is located in the `api-device-manager` folder of a monorepo and uses Prisma ORM for relational database interaction. It includes Swagger for auto-generated documentation and supports unit and e2e testing with Jest.

---

## 📚 Table of Contents

- [🛠️ Technologies Used](#-technologies-used)
- [📦 Cloning the Repository and Accessing the Folder](#-cloning-the-repository-and-accessing-the-folder)
- [📥 Installing Dependencies](#-installing-dependencies)
- [⚙️ Environment Configuration](#-environment-configuration)
- [🔧 Prisma Setup](#-prisma-setup)
- [🖥️ Running Locally (Manual Execution)](#-running-locally-manual-execution)
- [🧪 Testing](#-testing)
- [🐳 Running with Docker](#-running-with-docker)
- [📘 API Documentation (Swagger)](#-api-documentation-swagger)
- [👤 Author](#-author)

---

## 🛠️ Technologies Used

- **Node.js** `v20.13.1`

- **NestJS** `v11.x`

- **TypeScript** `v5.x`

- **Prisma ORM** `v6.x`

- **MySQL** (via Prisma as the relational database)

- **Swagger** (via `@nestjs/swagger`)

- **Jest** for unit and e2e testing

- **ESLint + Prettier** for code formatting and linting

- **Docker** for containerized execution

## 📦 Cloning the Repository and Accessing the Folder

```bash
git clone https://github.com/RuizHenrique01/DeviceManager.git
cd DeviceManager/api-device-manager
```

## 📥 Installing Dependencies

```bash
npm install
```

## ⚙️ Environment Configuration

Before running the project, you must create a .env file in the root of the api-device-manager folder.

### 📄 Example .env file

```bash
# Connection string used by Prisma to access the MySQL database.
DATABASE_URL="mysql://user:password@localhost:3306/database_name"
```

> ⚠️ This file is essential for running the project.

## 🔧 Prisma Setup

This project uses Prisma as the ORM. After setting up the .env file, run the following commands:

```bash
# Generate Prisma client based on the schema
npx prisma generate

# Apply database migrations
npx prisma migrate deploy
```

> ⚠️ Prisma setup is essential for the project to work properly.

## 🖥️ Running Locally (Manual Execution)

You can run the project manually using the following NPM scripts:

### 🔧 Build the project

```bash
npm run build
```

This compiles the TypeScript source code into JavaScript and places the output in the dist/ folder.

### 🚀 Start the application

```bash
npm run start
```

This runs the compiled project from the dist/ folder (make sure to build it first).

### 🧪 Start in development mode

```bash
npm run start:dev
```

This runs the application in watch mode using the NestJS CLI, automatically restarting on file changes.

## 🧪 Testing

### Unit Tests

```bash
npm run test
```

### Watch Mode

```bash
npm run test:watch
```

### Code Coverage

```bash
npm run test:cov
```


### End-to-End (e2e) Tests

```bash
npm run test:e2e
```

## 🐳 Running with Docker

A Dockerfile is provided in the root of the api-device-manager folder.

### 📦 Build the Docker image

```bash
docker build -t api-device-manager .
```

### 🚀 Run the container with environment variables

```bash
docker run -e DATABASE_URL="mysql://user:password@localhost:3306/database_name" -p 3000:3000 api-device-manager
```

This command will:

- Install dependencies

- Generate the Prisma client

- Deploy database migrations

- Start the application in production mode

# 📘 API Documentation (Swagger)

Once the application is running, access the Swagger API docs at:

```bash
http://localhost:3000/api
```

## 👤 Author

**Affonso Ruiz**  
💼 Full Stack Developer  
📧 Email: affonsohenriqueruiz@gmail.com  
🔗 LinkedIn: [linkedin.com/in/affonsoruiz](https://www.linkedin.com/in/affonsoruiz/)  
🐙 GitHub: [github.com/RuizHenrique01](https://github.com/RuizHenrique01)