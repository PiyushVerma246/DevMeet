# DevMeet 🚀

**DevMeet** is a modern, full‑stack collaboration platform that connects developers, designers, and innovators to build projects together – from open‑source initiatives to weekend hackathon squads.  It features a sleek glass‑morphism UI built with **Next.js**, real‑time chat powered by **Socket.io**, and a robust **Node.js/Express** backend with **MongoDB** for persistence.

---

## Table of Contents
- [Demo](#demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Development Environment](#running-the-development-environment)
- [Environment Variables](#environment-variables)
- [API Overview](#api-overview)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [Roadmap](#roadmap)
- [License](#license)
- [Acknowledgements](#acknowledgements)

---

## Demo
> **Live demo coming soon!**  Until then, clone the repo and run it locally to explore the UI.

---

## Features
- **Dynamic Project Dashboard** – view, apply, and manage team members.
- **Team Consensus Voting** – new members are accepted only after a configurable approval threshold.
- **Hackathon Squad Finder** – a searchable directory of developers looking for hackathon teammates.
- **Real‑time Chat Rooms** – powered by Socket.io, each project has its own live chat.
- **Premium UI** – glass‑morphism, neon accents, smooth micro‑animations (Framer Motion).
- **JWT Authentication** – secure login, role‑based access control.
- **RESTful API** – clean Express routes for auth, users, projects, and applications.
- **Docker‑ready** – optional Dockerfile for containerised deployment.

---

## Tech Stack
| Layer | Technology |
|------|------------|
| **Frontend** | Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion, Lucide‑React |
| **Backend** | Node.js, Express, TypeScript, JWT, Socket.io |
| **Database** | MongoDB (Mongoose) |
| **DevOps** | Docker, ESLint, Prettier |
| **Testing** | Jest, React Testing Library |

---

## Getting Started
### Prerequisites
- **Node.js** >= 20.x
- **npm** (or **yarn**)
- **MongoDB** instance (local or Atlas)
- **Git**

### Installation
```bash
# Clone the repository
git clone https://github.com/your‑username/DevMeet.git
cd DevMeet

# Install dependencies for both frontend and backend
# Frontend
cd frontend && npm install && cd ..
# Backend
cd backend && npm install && cd ..
```

### Running the Development Environment
```bash
# Start the backend (REST API + Socket.io)
cd backend
npm run dev   # runs on http://localhost:5000

# In a new terminal, start the Next.js frontend
cd ../frontend
npm run dev   # runs on http://localhost:3000
```
The frontend proxies API calls to the backend automatically (see `next.config.js`).

---

## Environment Variables
Create a `.env` file in the **backend** directory with the following keys:
```env
# MongoDB connection string
MONGODB_URI=mongodb://localhost:27017/devmeet

# JWT secret for signing tokens
JWT_SECRET=yourSuperSecretKey

# Server port (optional, defaults to 5000)
PORT=5000
```
> **Never commit** `.env` files – they are ignored by `.gitignore`.

---

## API Overview
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/login` | Authenticate a user and receive a JWT. |
| `POST` | `/api/auth/register` | Register a new user. |
| `GET` | `/api/projects` | List all public projects. |
| `GET` | `/api/projects/:id` | Get details of a single project. |
| `POST` | `/api/applications/apply` | Submit an application to join a project. |
| `POST` | `/api/applications/:id/vote` | Cast an approval/reject vote. |
| `GET` | `/api/applications/project/:projectId` | Retrieve all applications for a project. |

Full OpenAPI/Swagger documentation can be generated with `npm run docs` (future feature).

---

## Project Structure
```
DevMeet/
├─ backend/                # Express API
│   ├─ src/
│   │   ├─ models/        # Mongoose schemas (User, Project, Application)
│   │   ├─ routes/        # Express routers (auth, users, projects, applications)
│   │   ├─ controllers/   # Business logic
│   │   └─ server.js       # Entry point
│   └─ .env                # Environment variables (ignored)
│
├─ frontend/               # Next.js UI
│   ├─ app/                # App router pages (dashboard, projects, hackathons)
│   ├─ components/        # Re‑usable UI components (Navbar, VotingCard, etc.)
│   ├─ public/            # Static assets
│   └─ next.config.js
│
├─ .gitignore              # Ignored files (node_modules, .env, build outputs)
├─ README.md               # **THIS FILE**
└─ package.json            # Root scripts (optional monorepo helpers)
```

---

## Contributing
We welcome contributions! Follow these steps:
1. **Fork** the repository.
2. Create a feature branch: `git checkout -b feat/awesome-feature`.
3. Install dependencies and make your changes.
4. Run lint & tests: `npm run lint && npm test`.
5. Commit with a clear message and push.
6. Open a **Pull Request** against `main`.

Please read our [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) and [CONTRIBUTING.md] for detailed guidelines.

---

## Roadmap
- [ ] Docker Compose setup for local dev (frontend + backend + MongoDB).
- [ ] CI/CD pipeline with GitHub Actions (lint, test, build).
- [ ] Real‑time notifications via WebSockets for new applications.
- [ ] Role‑based voting weights (team leader gets higher weight).
- [ ] Deployable production build on Vercel (frontend) + Render (backend).

---

## License
Distributed under the **MIT License**. See `LICENSE` for more information.

---

## Acknowledgements
- **Next.js** – React framework for production‑grade web apps.
- **Tailwind CSS** – Utility‑first CSS for rapid UI development.
- **Framer Motion** – Smooth animations and micro‑interactions.
- **Socket.io** – Real‑time communication.
- **MongoDB** – Flexible NoSQL database.
- **Lucide‑React** – Open‑source icon set.

---

*Happy hacking! 🎉*
