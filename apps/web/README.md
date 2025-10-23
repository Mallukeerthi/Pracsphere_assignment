Perfect ✅ — let’s create a **clean, professional `README.md`** for your project **`Pracsphere_assignment`**, written in a way that fits a modern Next.js monorepo with clarity for others (or recruiters) viewing your repo.

Here’s a ready-to-use version 👇

---

## 📘 **README.md**

```markdown
# 🧭 Pracsphere Assignment

This is a **full-stack task management and dashboard application** built using **Next.js 15**, **TypeScript**, and **Tailwind CSS**.  
It demonstrates modular monorepo architecture, authentication, and task tracking functionality.

---

## 🚀 **Features**

- 🌗 **Dark / Light Mode** toggle  
- ✅ Task Management (add, update, delete, mark complete)
- 📅 Automatic overdue task highlighting  
- 🔒 Authentication with **NextAuth.js**  
- 🧠 Organized monorepo structure using `apps/` and `packages/`
- 🧩 Shared components and utilities  
- ⚡ Server actions and MongoDB integration  
- 💅 Styled with **Tailwind CSS** + **ShadCN UI**

---

## 🗂️ **Project Structure**

```

pracsphere-assignment/
├── apps/
│   ├── web/                # Next.js 15 web app
│   │   ├── src/            # Application source code
│   │   ├── public/         # Static assets
│   │   ├── .env.local      # Environment variables (not committed)
│   │   └── next.config.ts  # Next.js configuration
│   └── api/ (optional)
│
├── packages/
│   └── ui/                 # Shared components / utilities (if added)
│
├── .gitignore
├── package.json
└── README.md

````

---

## ⚙️ **Tech Stack**

| Category | Technology |
|-----------|-------------|
| Framework | [Next.js 15](https://nextjs.org/) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) |
| Auth | [NextAuth.js](https://next-auth.js.org/) |
| Database | [MongoDB](https://www.mongodb.com/) |
| UI Library | [ShadCN/UI](https://ui.shadcn.com/) |
| Icons | [Lucide Icons](https://lucide.dev/) |

---

## 🧑‍💻 **Getting Started**

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Mallukeerthi/Pracsphere_assignment.git
cd Pracsphere_assignment
````

### 2️⃣ Install Dependencies

For the web app:

```bash
cd apps/web
npm install
```

### 3️⃣ Set Up Environment Variables

Create a `.env.local` file inside `apps/web/`:

```
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000
```

### 4️⃣ Run the Development Server

```bash
npm run dev
```

Then open:
👉 **[http://localhost:3000](http://localhost:3000)**

---

## 🧹 **Available Commands**

| Command         | Description                 |
| --------------- | --------------------------- |
| `npm run dev`   | Run the development server  |
| `npm run build` | Create a production build   |
| `npm start`     | Start the production server |
| `npm run clean` | Remove `.next` build folder |
| `npm run lint`  | Run ESLint checks           |

---

## 🧠 **Notes**

* The `.next/` and `node_modules/` folders are **excluded** from Git via `.gitignore`.
* Large files exceeding GitHub’s 100 MB limit were cleaned using `git filter-repo`.
* To rebuild, simply run:

  ```bash
  npm run clean && npm run build
  ```

---

## 🏆 **Author**

**Keerthi Reddy**
📧 [Mallukeerthi](https://github.com/Mallukeerthi)
💼 Developer | Passionate about full-stack web development

---

## 📜 **License**

This project is for learning and demonstration purposes only.
Feel free to fork and improve upon it.

````

---

## 🪜 To Add It in Your Repo

1. Open your terminal in project root:
   ```bash
   cd C:\Users\keert\pracsphere-assignment
````

2. Create the file:

   ```bash
   echo > README.md
   ```

3. Paste the content above into it.

4. Save & commit:

   ```bash
   git add README.md
   git commit -m "Add project README"
   git push origin main
   ```

---

Would you like me to customize this README to show **screenshots or demo sections** (for example, images of your dashboard or task manager UI)? I can include that format too.
