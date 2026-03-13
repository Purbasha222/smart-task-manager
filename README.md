# ⚡ NexTask — Smart Task Manager

**A full-stack TypeScript-based task management mobile app.**  
Efficiently manage tasks, track daily productivity.



---

## 🚀 Tech Stack

### 📱 Frontend (Mobile)

| Technology              | Purpose               |
| ----------------------- | --------------------- |
| **Expo + React Native** | Mobile app framework  |
| **TypeScript**          | Type-safe development |
| **Expo Router**         | File-based navigation |
| **Custom Hooks**        | Modular architecture  |

### ⚙️ Backend

| Technology             | Purpose            |
| ---------------------- | ------------------ |
| **Node.js + Express**  | Server framework   |
| **TypeScript**         | Type-safe backend  |
| **MongoDB + Mongoose** | Database & ODM     |
| **JWT Authentication** | Secure auth tokens |
| **REST API**           | API architecture   |

---

## ✨ Features

- 🔐 **Authentication** — Signup, Login, Protected Profile route
- 📝 **Full Task CRUD** — Create, Read, Update, Delete tasks
- ✅ **Toggle Completion** — Mark tasks as complete/incomplete instantly
- 📊 **Daily Progress Tracking** — Dashboard with task analytics
- 🧩 **Modular Architecture** — Scalable, clean codebase
- ⚡ **End-to-end TypeScript** — Frontend + Backend

---

## 📲 Screens

- Auth Screens (Login / Signup)
- Home Dashboard
- Create / Edit Task Modal

---

## 🌐 Backend API Reference

**Base URL:**

```
https://smart-task-manager-tcyz.onrender.com
```

---

### 🔐 Auth Routes — `/api/auth`

| Method | Endpoint           | Description             |
| ------ | ------------------ | ----------------------- |
| `POST` | `/api/auth/signup` | Register a new user     |
| `POST` | `/api/auth/login`  | Login user, returns JWT |

---

### 📌 Task Routes — `/api/tasks`

> All task routes are protected. Send token in header: `Authorization: Bearer <token>`

| Method   | Endpoint                | Description                          |
| -------- | ----------------------- | ------------------------------------ |
| `GET`    | `/api/tasks/`           | Get all tasks for authenticated user |
| `GET`    | `/api/tasks/:id`        | Get a single task by ID              |
| `POST`   | `/api/tasks/add-task`   | Create a new task                    |
| `PUT`    | `/api/tasks/update/:id` | Update task details by ID            |
| `PATCH`  | `/api/tasks/toggle/:id` | Toggle task completion status        |
| `DELETE` | `/api/tasks/delete/:id` | Delete a task by ID                  |

---

### 🔑 Authentication Flow

1. User signs up → `POST /api/auth/signup`
2. User logs in → `POST /api/auth/login` → receives **JWT token**
3. Client stores the token
4. Token sent in every protected request header:

```
Authorization: Bearer <your_jwt_token>


## 📁 Project Structure

```

nextask/
├── backend/
│ ├── controllers/
│ │ ├── task.controller.ts
│ │ └── user.controller.ts
│ ├── middlewares/
│ │ └── auth.middleware.ts
│ ├── models/
│ │ └── users.model.ts
│ ├── routes/
│ │ ├── task.routes.ts
│ │ └── auth.routes.ts
│ └── index.ts
└── mobile/
├── app/
├── components/
├── hooks/
└── ...

```

---

## 📈 Future Improvements

- [ ] Push notifications
- [ ] Offline sync
- [ ] Task reminders & due dates
- [ ] Collaboration / shared tasks
- [ ] Task categories & tags

---

## 👤 Author

**Purbasha Goswami**

> Built with ⚡ using Expo, React Native, Node.js & TypeScript

---

## 📄 License

MIT License — free to use and modify.
```
