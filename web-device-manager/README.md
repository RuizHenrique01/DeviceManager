# Web Device Manager

Frontend Angular application responsible for managing devices and related operations. This project resides in the `web-device-manager` folder of a monorepo and communicates with a backend API via configurable environment variables.

---

## 📚 Table of Contents

- [🛠️ Technologies Used](#technologies-used)
- [📦 Cloning the Repository and Accessing the Folder](#-cloning-the-repository-and-accessing-the-folder)
- [📥 Installing Dependencies](#-installing-dependencies)
- [⚙️ Configuration](#configuration)
- [🖥️ Running the Project Manually](#running-locally-manual-execution)
- [🐳 Running with Docker](#-running-with-docker)
- [👤 Author](#-author)

---

<a name="technologies-used"></a>
## 🛠️ Technologies Used

- **Node.js** `v20.13.1`

- **Angular** `v14.x`

- **TypeScript** `v4.8.x`

- **Bootstrap** `v5.3.x`

- **Bootstrap Icons** `v1.11.x`

- **RxJS** `v7.5.x`

- **NGINX** (for serving the production build)

- **Docker** (for containerized execution)

## 📦 Cloning the Repository and Accessing the Folder

This project is located inside a **monorepo**. To get started:

```bash
git clone https://github.com/RuizHenrique01/DeviceManager.git
cd DeviceManager/web-device-manager
```

## 📥 Installing Dependencies

Install all necessary dependencies with:

```bash
npm install
```

This will install both runtime and development dependencies as defined in `package.json`.

<a name="configuration"></a>
## ⚙️ Configuration

Angular uses environment files to manage configurations for different modes (development and production).

- `src/environments/environment.ts`: Used during development (`ng serve`)

- `src/environments/environment.prod.ts`: Used when building the project for production (`ng build --prod`)

To change the **API URL** used in production, update the value of `API` in the file `environment.prod.ts`:

```ts
export const environment = {
  production: true,
  API: 'https://your-production-api-url.com'
};
```

> ⚠️ Make sure this value is set before creating a production build.

<a name="running-locally-manual-execution"></a>
## 🖥️ Running the Project Manually

### Start the development server

```bash
npm start
```

This will start the app at `http://localhost:4200/` using the development environment.

### Build for production

To build the Angular app for production:

```bash
npm run build
```

This will output the production build in the `dist/web-device-manager` folder using the `environment.prod.ts file.`

## 🐳 Running with Docker

This project comes with a `Dockerfile` that builds and serves the app using NGINX.

### 🧱 Build the Docker image

```bash
docker build -t web-device-manager --build-arg API=https://your-production-api-url.com .
```

> 💡 The API build argument sets the value that will be injected into environment.prod.ts via Docker.

### 🚀 Run the container

```bash
docker run -d -p 4200:80 --name web-device-manager web-device-manager
```

> This will serve the built Angular application on port 4200 through NGINX.

## 👤 Author

**Affonso Ruiz**  
💼 Full Stack Developer  
📧 Email: affonsohenriqueruiz@gmail.com  
🔗 LinkedIn: [linkedin.com/in/affonsoruiz](https://www.linkedin.com/in/affonsoruiz/)  
🐙 GitHub: [github.com/RuizHenrique01](https://github.com/RuizHenrique01)
