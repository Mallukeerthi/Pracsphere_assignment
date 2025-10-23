
# 🧩 PracSphere Monorepo

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-4EA94B?style=flat&logo=mongodb)](https://www.mongodb.com/)


A **Next.js 15 + Turborepo** monorepo showcasing clean architecture, shared libraries, and modern developer tooling.  
It implements a full-stack **Task Management System** with persistent data storage via **MongoDB**, shared **UI**, **Utils**, **Config**, and **DB** packages, and reusable TypeScript modules.

---

## 🏗️ Project Overview

PracSphere is a modular, scalable monorepo that demonstrates:
- 🔁 Cross-package reusability via workspace imports (`@repo/ui`, `@repo/utils`, etc.)
- 🧠 Shared logic for authentication, validation, and configuration
- ⚡ High-performance builds using **Turborepo** and **pnpm**
- 💾 A unified Mongoose setup for data persistence
- 🎨 A responsive UI with **Tailwind CSS** and **Framer Motion**

---

## 📂 Monorepo Structure

```

pracsphere-assignment/
│
├── apps/
│   └── web/                # Next.js 15 frontend (App Router)
│
├── packages/
│   ├── ui/                 # Shared UI components (buttons, cards, modals)
│   ├── utils/              # Reusable helpers (auth, formatters, API client)
│   ├── config/             # Shared ESLint, Tailwind, and TS config
│   └── db/                 # Centralized Mongoose models & connection logic
│
├── turbo.json              # Turborepo pipeline configuration
├── pnpm-workspace.yaml     # Defines workspaces and scope
└── package.json            # Root dependencies and scripts

````

---

## ⚙️ Tech Stack

| Layer | Technologies |
|-------|---------------|
| **Frontend** | Next.js 15, React 19, TypeScript, Tailwind CSS, Framer Motion |
| **Backend** | Node.js 20, Next.js API Routes, Mongoose, MongoDB Atlas |
| **Auth** | NextAuth.js with JWT |
| **Dev Tools** | Turborepo, pnpm, ESLint, Prettier |
| **UI Library** | ShadCN UI + Lucide React Icons |

---

## 🌐 Core Features

### 🧭 Dashboard & Tasks
- Add, update, complete, delete, and filter tasks  
- Real-time overdue highlighting  
- Persistent dark/light mode with theme memory  
- Analytics dashboard summarizing user activity  

### 🔐 Authentication
- Secure login/signup with JWT  
- Session-based state handled via NextAuth  

### ⚙️ System Architecture
- Monorepo separation with workspace imports  
- Centralized `connectDB()` for database access  
- Shared ESLint and TS configuration across apps  

### 🎨 Frontend
- Tailwind + ShadCN UI for styling  
- Framer Motion transitions  
- Mobile-first responsive layouts  

---

## 🧱 Shared Packages

| Package | Description |
|----------|-------------|
| `@repo/ui` | Centralized React component library |
| `@repo/utils` | Common helper functions (auth, date/time, validation) |
| `@repo/config` | Shared Tailwind, ESLint, and tsconfig setups |
| `@repo/db` | Mongoose connection utilities and schema definitions |

_All packages are consumed via pnpm workspace imports — ensuring modularity and zero duplication._

---

## 🧰 Commands

From the project root:

```bash
# Install dependencies
pnpm install

# Start the web app
pnpm --filter web dev

# Build all packages and apps
pnpm build

# Lint all packages
pnpm lint
````

---

## 🌿 Environment Configuration

Create a `.env.local` file inside `/apps/web`:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/pracsphere
NEXTAUTH_SECRET=your_secret_here
NEXTAUTH_URL=http://localhost:3000
```

> 💡 Tip: Keep this file private. A sample `.env.example` can be added for collaborators.

---

## 🧩 Database Layer (`@repo/db`)

* Single **connectDB()** for connection pooling
* **Schemas:** `User`, `Task`
* CRUD methods for clean data access
* Seed scripts for testing sample data
* 100% **Mongoose-based**, no Prisma dependencies

---

## ✅ Acceptance Checklist

* [x] Shared packages: UI, Utils, DB, Config
* [x] All database operations via centralized `@repo/db`
* [x] Reusable components via `@repo/ui`
* [x] Fully functional CRUD flow for tasks
* [x] Clean Turborepo build with no duplication
* [x] Dark/Light theme support

---

## 🔮 Future Enhancements

* 🗓️ Task calendar view and reminders
* 📬 Push notifications (real-time updates)
* 👥 Role-based access control
* 📈 Team dashboards and analytics
* 🤖 Smart suggestions with AI integration

---

## 🧾 Branch

**Branch:** `main`

### **Recent Updates**

* ✅ Added centralized `@repo/db` for Mongoose
* ✅ Integrated dark/light mode toggle
* ✅ Modularized UI and utils packages
* ✅ Cleaned Git history and `.gitignore`
* ✅ Added detailed project README

---

## 👩‍💻 Author

**Keerthi Reddy**
💼 Full Stack Developer | MERN + Next.js
🌐 [GitHub](https://github.com/Mallukeerthi)
📧 [mailto:keerthyreddymallukeerthi@gmail.com]

---

## 🖼️ Project Screenshots
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/14b88b78-87ed-4ab5-8cfc-fee67b5bfe13" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/6c6bbff2-2ccf-4c4f-9639-5b21fbda9f63" />

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/27b5f7ec-79dd-4a5b-828d-7377a2331011" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/e87ad52c-c3b3-4432-9bc0-28be865c6c41" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/d3324d53-622b-44fb-8479-ea3bfe040d53" />


<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/8f8722e1-b226-4b93-b6de-bdcd543b7225" />



