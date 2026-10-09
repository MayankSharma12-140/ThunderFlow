# ⚡ ThunderFlow

**ThunderFlow** is an AI-powered UI-to-Code Generator that helps users generate frontend code from prompts, preview the output, and manage their projects in one place.

## 🚀 Features

- **User Authentication** — Register and log in securely using JWT authentication.
- **AI Code Generation** — Generate frontend code using the Groq API.
- **Project Management** — Create, view, edit, and delete projects.
- **Project History** — Save and revisit previously generated projects.
- **AI Code Regeneration** — Improve existing code using additional instructions.
- **Live Code Preview** — Switch between generated source code and its preview.
- **Code Search** — Find specific lines in generated code.
- **Copy Generated Code** — Copy code for use in your development environment.
- **Download Generated Code** — Export generated HTML and ZIP files.
- **Dashboard Analytics** — View total projects, recent projects, and AI generation counts.
- **Input Validation** — Validate user input before processing requests.
- **API Documentation** — Explore backend endpoints using Swagger.
- **Security** — JWT authentication, Helmet, CORS, and rate limiting.

## 🛠️ Tech Stack

### Frontend
- React
- TypeScript
- Vite
- CSS
- Axios
- React Router

### Backend
- Node.js
- Express.js
- JWT Authentication
- bcryptjs
- Express Validator
- Swagger

### Database
- MySQL

### AI Integration
- Groq API

## 📂 Project Structure

```text
ThunderFlow/
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Projects.tsx
│   │   │   └── ProjectDetails.tsx
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── App.tsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.tsx
│   ├── package.json
│   └── README.md
│
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── services/
├── utils/
├── validations/
├── server.js
├── package.json
├── .env
├── .gitignore
└── README.md
```

## ⚙️ Installation and Setup

### Prerequisites

- Node.js and npm
- MySQL Server
- A Groq API key

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd ThunderFlow
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with your actual repository URL.

### 2. Set Up the Backend

Install the backend dependencies:

```bash
npm install
```

Configure the backend environment variables in the root `.env` file:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=thunderflow
JWT_SECRET=your_jwt_secret
GROQ_API_KEY=your_groq_api_key
```

Replace the example values with your own credentials. Never commit your real `.env` file.

Create the required MySQL database and tables before starting the backend.

Start the backend:

```bash
npm start
```

Use the appropriate development command from your backend `package.json` if `npm start` is not configured.

### 3. Set Up the Frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed in the terminal, usually:

```text
http://localhost:5173
```

### 4. API Documentation

When the backend is running, open:

```text
http://localhost:5000/api-docs
```

## 🔌 API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/auth/register` | Register a user |
| POST | `/api/auth/login` | Authenticate a user |
| GET | `/api/projects` | Retrieve projects |
| POST | `/api/projects` | Create a project |
| GET | `/api/projects/:id` | Retrieve project details |
| PUT | `/api/projects/:id` | Update a project |
| DELETE | `/api/projects/:id` | Delete a project |
| POST | `/api/ai/generate` | Generate code using AI |
| POST | `/api/ai/regenerate/:id` | Regenerate existing project code |

Protected endpoints require a valid JWT where configured.

## 🔐 Security

- Password hashing with bcryptjs.
- JWT-based authentication.
- Request validation using Express Validator.
- Security headers using Helmet.
- CORS configuration.
- Rate limiting to help control excessive requests.
- Environment variables for sensitive backend credentials.

## 🏗️ Current Status

ThunderFlow is under active development. Core functionality includes user authentication, project CRUD operations, AI integration, dashboard statistics, generated code preview, and project editing.

## 🔮 Future Improvements

- More frontend framework options.
- Improved generated-code quality.
- Additional AI-powered editing tools.
- Enhanced project organization.
- Production deployment and further testing.

## 👨‍💻 Author

Developed as a personal project to explore AI-powered frontend development, full-stack engineering, and code generation.

---

**ThunderFlow — Turn ideas into code.**