# ICB - Intelligent Classroom Builder

An advanced educational platform for language learning with integrated AI-powered assistance, interactive exercises, and 3D visualization capabilities.

## 📋 Overview

ICB is a comprehensive learning management system built with modern web technologies. It provides users with multiple modules for language skill development, including IELTS preparation, reading comprehension, writing practice, and interactive activities with AI-powered feedback.

## ✨ Key Features

- **🎯 IELTS Preparation**: Dedicated modules for Reading, Writing, Listening, and Speaking practice
- **✍️ Writing Practice**: Task 1 and Task 2 exercises with AI-powered instant feedback
- **📖 Reading Comprehension**: Academic texts and exam-style exercises
- **🎮 Interactive Activities**: Gamified exercise engine with progress tracking
- **💬 AI Chat Assistant**: Real-time learning support powered by Gemini AI
- **🎨 Modern UI**: Responsive design with pastel aesthetic optimized for desktop and mobile
- **🔐 User Authentication**: Secure JWT-based authentication with role management

## 🛠️ Technology Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion (animations)
- **3D Visualization**: React Three Fiber, Drei, Three.js
- **UI Components**: Lucide React icons, React Markdown
- **Backend**: API proxy to Google Cloud Run microservices
- **Authentication**: JWT Bearer Token system

## 📁 Project Structure

```
app/
├── landing/           # Landing page with hero and feature showcase
├── auth/             # Authentication pages (login/register)
├── home/             # User home dashboard
├── ielts/            # IELTS preparation hub
│   ├── reading/      # Reading comprehension module
│   ├── writing/      # Writing practice (Task 1 & 2)
│   └── listening/    # Listening comprehension
├── activities/       # Interactive exercise engine
│   ├── ExerciseEngine.tsx
│   └── data/
├── chat/             # AI chat assistant interface
├── profile/          # User profile management
├── reading/          # Reading practice module
├── writing/          # Writing practice module
├── test-nivelacion/  # Level assessment test
├── navbar/           # Navigation component
└── util/             # Utility components

components/
└── scene/            # 3D scene components (Three.js)
    ├── Model.tsx
    └── Scene.tsx

services/
└── api.ts            # API service layer with authentication

```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/gemini-3-threejs.git
cd gemini-3-threejs
```

2. Install dependencies:
```bash
npm install
# or
bun install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory with required API endpoints.

4. Run the development server:
```bash
npm run dev
# or
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📦 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint to check code quality

## 🔌 API Integration

The application proxies requests through `/api/proxy` to the backend service:
```
https://educational-platforms-back-727266244738.us-central1.run.app
```

### Implemented Endpoints:
- `POST /auth/login` - User authentication
- `POST /users` - User registration
- `POST /learning/chat` - AI chat with Gemini
- `POST /learning/evaluate` - Exercise evaluation

Authentication uses JWT Bearer tokens passed in the `Authorization` header.

## 🎨 Design System

- **Color Palette**: Pastel gradient (peach, orange, coral)
- **Primary Gradient**: `from-[#ffecd2] via-[#fcb69f] to-[#ff9a9e]`
- **Responsive**: Mobile-first approach with Tailwind breakpoints
- **Animations**: Smooth transitions using Framer Motion

## 🔐 Authentication

- JWT-based authentication system
- Token stored in secure cookies
- Bearer token validation for protected endpoints
- Automatic token refresh on API calls

## 🌐 Deployment

The application is designed to be deployed on Vercel or similar platforms that support Next.js:

```bash
npm run build
npm start
```

## 📝 License

See [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please follow the project's code style and submit pull requests for review.

## 📞 Support

For issues and feature requests, please open an issue on the GitHub repository.

---

Built with ❤️ for language learners everywhere
    subgraph Cliente_NextJS [Client Side - Next.js]
        A[UI Components] --> B[Custom Hooks]
        B --> C[API Services]
        D[Three.js Scene] --> E[3D Model]
        B --> F[Global State - Token]
    end

    subgraph Backend_Cloud [Google Cloud Run]
        C --> G[Auth API]
        C --> H[Learning API]
    end

    subgraph Database [PostgreSQL]
        G --> I[(Users)]
        H --> J[(History)]
    end
```

### La estructura sigue los principios de **Clean Architecture**:
1. **Components**: UI reutilizable y desacoplada.
2. **Hooks**: Lógica de estado y efectos (Application Rules).
3. **Services**: Comunicación con agentes externos (API).
4. **App**: Enrutamiento y configuración de Next.js.

## 📄 Documentación de la API
La aplicación consume los siguientes servicios:

- POST /auth/login: Autenticación de usuario.

- POST /users: Registro de nuevos estudiantes.

- POST /learning/chat: Envío de prompts (Requiere Auth).

- GET /learning/history: Recuperación de respuestas procesadas.

