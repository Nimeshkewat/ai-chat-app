# AI Chat App

A ChatGPT-style chat application built to learn AI integration, from calling an LLM API to building a full chat UI around it.

## Tech stack

**Backend:** Node.js, Express, TypeScript, MongoDB (Mongoose), Google Gemini API, JWT auth, Zod

**Frontend:** React, TypeScript, Vite, TanStack Query, React Router, Tailwind CSS, shadcn/ui

## Features

- JWT-based auth (register, login, logout) with rate limiting
- Create, rename, and delete chats
- Send messages and get AI-generated replies (Gemini)
- Edit profile (username + photo upload)
- Dark / light theme toggle
- Responsive sidebar

## Getting started

### Backend

```bash
cd server
npm install
```

Create a `.env` file:

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_API_KEY=your_gemini_api_key
NODE_ENV=development

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_api_secret
```

```bash
npm run dev
```

### Frontend

```bash
cd client
npm install
npm run dev
```
