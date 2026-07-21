# Watchloop

A YouTube-inspired video streaming platform built with modern web technologies. Watchloop allows users to upload, watch, and interact with videos through features like comments, likes, playlists, subscriptions, and more.

**Live Demo:** [https://watchloop-frontend.vercel.app](https://watchloop-frontend.vercel.app)

## ✨ Features

### Video Management
- **Upload Videos** - Users can upload video content with metadata
- **Watch Videos** - Stream videos with a responsive player
- **Browse Videos** - Discover videos through a user-friendly interface
- **Video Metadata** - Support for titles, descriptions, and thumbnails

### User Interaction
- **Comments** - Users can comment on videos and engage in discussions
- **Likes** - Like/unlike videos and comments
- **Subscriptions** - Subscribe to channels and stay updated
- **Playlists** - Create and manage custom playlists
- **Tweets** - Share tweets/updates with followers

### User Features
- **Authentication** - Secure user registration and login with JWT
- **User Profiles** - Personalized user profiles and channel management
- **Dashboard** - Channel analytics and content management dashboard
- **Dark Mode** - Built-in theme switching support

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern UI library with latest features
- **TypeScript** - Type-safe JavaScript development
- **Vite** - Lightning-fast build tool and dev server
- **Redux Toolkit** - State management
- **React Query** - Server state management and data fetching
- **React Router DOM** - Client-side routing
- **React Hook Form** - Efficient form handling
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality UI component library
- **Radix UI** - Unstyled, accessible component library
- **Axios** - HTTP client for API calls
- **Zod** - TypeScript-first schema validation
- **Lucide React** - Icon library
- **React Player** - Video player component
- **React Hot Toast** - Toast notifications
- **Sonner** - Alternative notification library
- **Next Themes** - Theme management

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Fast, unopinionated web framework
- **MongoDB** - NoSQL database for data storage
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **Bcrypt** - Password hashing and security
- **Cloudinary** - Cloud storage for videos and images
- **Multer** - File upload middleware
- **CORS** - Cross-Origin Resource Sharing
- **Cookie Parser** - Cookie handling middleware
- **Nodemon** - Development server with auto-reload

## 📁 Project Structure

```
watchloop/
├── client/                    # Frontend (React + TypeScript)
│   ├── src/
│   │   ├── app/             # Application configuration
│   │   ├── components/      # Reusable React components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── pages/           # Page components
│   │   ├── store/           # Redux store configuration
│   │   ├── services/        # API services
│   │   └── App.tsx          # Root component
│   ├── package.json
│   └── vite.config.ts
│
├── server/                    # Backend (Node.js + Express)
│   ├── src/
│   │   ├── models/          # MongoDB schemas
│   │   ├── routes/          # API routes
│   │   │   ├── user.routes.js
│   │   │   ├── video.routes.js
│   │   │   ├── comment.routes.js
│   │   │   ├── tweet.routes.js
│   │   │   ├── subscription.routes.js
│   │   │   ├── like.routes.js
│   │   │   ├── playlist.routes.js
│   │   │   ├── dashboard.routes.js
│   │   │   └── healthCheck.routes.js
│   │   ├── middleware/      # Custom middleware
│   │   ├── controllers/     # Route controllers
│   │   ├── db/              # Database configuration
│   │   ├── utils/           # Utility functions
│   │   ├── app.js           # Express app setup
│   │   └── index.js         # Server entry point
│   ├── package.json
│   └── .env.example
│
└── README.md
```

## 🚀 Installation

### Prerequisites
- **Node.js** (v16 or higher)
- **MongoDB** (local or MongoDB Atlas)
- **Git**

### Clone the Repository

```bash
git clone https://github.com/Shubham-io/watchloop.git
cd watchloop
```

## ⚙️ Environment Setup

### Backend Setup

Create a `.env` file in the `server/` directory:

```env
# Server Configuration
PORT=8001

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/watchloop

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d

# Cloudinary
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# CORS
CORS_ORIGIN=http://localhost:5173
```

### Frontend Setup

Create a `.env` file in the `client/` directory:

```env
VITE_API_BASE_URL=http://localhost:8001/api/v1
```

## 🏃 Running the Project

### Backend

```bash
cd server
npm install
npm run dev
```

The server will start on `http://localhost:8001`

### Frontend

```bash
cd client
npm install
npm run dev
```

The client will start on `http://localhost:5173`

### Production Build

**Backend:**
```bash
cd server
npm start
```

**Frontend:**
```bash
cd client
npm run build
npm run preview
```

## 📡 API Routes

The API is organized into the following endpoints:

| Feature | Base Route |
|---------|-----------|
| Health Check | `/api/v1/healthcheck` |
| Users | `/api/v1/users` |
| Videos | `/api/v1/videos` |
| Comments | `/api/v1/comments` |
| Tweets | `/api/v1/tweets` |
| Subscriptions | `/api/v1/subscriptions` |
| Likes | `/api/v1/likes` |
| Playlists | `/api/v1/playlist` |
| Dashboard | `/api/v1/dashboard` |

## 🌐 Deployment

- **Frontend:** Deployed on [Vercel](https://vercel.com)
- **Backend:** Can be deployed on Heroku, Railway, or any Node.js hosting service
- **Database:** MongoDB Atlas recommended for cloud deployment
- **Storage:** Cloudinary for image and video storage

## 📝 Code Standards

- **TypeScript** for type safety on frontend
- **ESLint** for code quality
- **Prettier** for code formatting
- **React Hooks** for functional components
- **Redux Toolkit** for state management

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 👤 Author

**Shubham**

- GitHub: [@Shubham-io](https://github.com/Shubham-io)

## 📞 Support

For support, open an issue on the [GitHub repository](https://github.com/Shubham-io/watchloop/issues).

---

**Made with ❤️ by Shubham**
