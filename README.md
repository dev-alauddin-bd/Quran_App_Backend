
# 📖 Quran API (Node.js + TypeScript + MVC)

A clean and scalable REST API for Quran Surahs and Ayahs with search functionality, built using **Node.js, Express, TypeScript, and Swagger UI**.

---

## 🚀 Live Features

- 📚 Get all 114 Surahs
- 📖 Get single Surah with Ayahs
- 🔍 Search Ayahs by translation text
- 📄 Swagger API Documentation
- 🌐 Beautiful landing page UI
- 🏗 MVC architecture

---

## 🛠 Tech Stack

- Node.js
- Express.js
- TypeScript
- Swagger UI
- YAML (OpenAPI docs)
- MVC Pattern


---

## ⚙️ Installation

```bash
# Clone repository
git clone https://github.com/your-username/quran-api.git

# Install dependencies
npm install
````

---

## 🚀 Run Project

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm start
```

---

## 🌐 Environment Variables (Optional)

```env
PORT=5000
```

---

## 📌 API Endpoints

### 📚 Get All Surahs

```
GET /api/surahs
```

---

### 📖 Get Surah by ID

```
GET /api/surahs/:id
```

---

### 🔍 Search Ayahs

```
GET /api/search?q=word
```

---

## 📄 Swagger Documentation

After running the server:

```
http://localhost:5000/api-docs
```

---

## 🏠 Home Page

```
http://localhost:5000/
```

👉 Beautiful UI with API links + Swagger access

---

## 🧠 Architecture

This project follows **MVC Pattern**:

* Model → Data handling (Quran JSON)
* Controller → Business logic
* Routes → API endpoints
* Utils → Swagger setup

---

## 🚀 Features Overview

✔ Clean REST API
✔ TypeScript type safety
✔ Swagger documentation
✔ MVC architecture
✔ Beautiful UI landing page
✔ Search functionality

---

## 📸 Preview

> Landing page shows API endpoints + Swagger link
> Swagger UI allows interactive API testing

---

## 👨‍💻 Author

Made with ❤️ for Quran Web Application Assignment

---



ISC

```
