# 🗣️ LingoMate — Language Exchange Platform

LingoMate is a modern web app for discovering and connecting with language partners worldwide.

Originally built with **Stream Chat** for real-time chat and video calls, it’s now evolving into a fully self-hosted chat system using **Prisma**, **PostgreSQL**, and **WebSockets**.

---

## 🚀 Features

- ✅ User onboarding with profile creation  
- ✅ Random avatar generation for fun profiles  
- ✅ Discover recommended users based on languages  
- ✅ Send and accept friend requests  
- ✅ Real-time chat (via Stream Chat API)  
- ✅ Share video call links right in chat  
- ✅ Sleek UI built with React + TailwindCSS  
- ✅ Secure API built with Node.js, Express, and Prisma

### 🚧 Upcoming Improvements in MK2

- 🔁 Replace Stream Chat with a custom-built chat backend  
- 💬 Create our own chat UI components  
- 🤖 Integrate AI chat modes (translation, practice sessions)  
- 📹 Implement custom video calling logic

---

## ⚙️ Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, React Query  
- **Backend:** Node.js, Express.js, Prisma ORM  
- **Database:** PostgreSQL  
- **Realtime (Current):** Stream Chat API  
- **Realtime (Planned):** Socket.io  
- **Authentication:** JWT-based  
- **Cloud Ready:** For easy deployment

---

## 🖥️ Local Development

### 🔧 Prerequisites

- Node.js ≥ 18  
- PostgreSQL  
- Yarn or npm  

Set the following environment variables in a `.env` file at the root:

```ini
DATABASE_URL=postgresql://user:password@localhost:5432/lingomate
JWT_SECRET=super-secret-jwt-key
STREAM_API_KEY=your-stream-api-key
STREAM_API_SECRET=your-stream-api-secret


### 🚀 Getting Started

Clone the repo:

```bash
git clone https://github.com/Dev-9913/lingomateMK1.git
cd lingomateMK1
```

Install dependencies:

```bash
yarn
# or
npm install
```

Run database migrations:

```bash
npx prisma migrate dev
```

Start the app:

```bash
yarn dev
# or
npm run dev
```

---

## 📄 License

This project is licensed under the MIT License.
Feel free to fork and contribute!(after mk2 gets released)

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change(after mk2 gets released).

---

## 🌍 Connect

If you find this project helpful, give it a ⭐ and share it with your peers!

```

---

Let me know if you'd like badges, contribution guidelines, or a logo added at the top!
```
