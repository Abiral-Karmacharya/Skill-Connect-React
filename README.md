# Skill Connect - Frontend

A modern React-based frontend application for the Skill Connect platform that enables seamless interaction between users and experts. Built with React, Vite, and modern web technologies for optimal performance and user experience.

## 🚀 Features

### 🔐 Authentication & User Management
- **Secure Login/Registration** - JWT-based authentication
- **Role-based Access** - Different interfaces for Users and Experts
- **Profile Management** - Update user information and preferences
- **Protected Routes** - Secure navigation based on authentication status

### 💼 Service Management
- **Service Discovery** - Browse and search available services
- **Service Booking** - Intuitive booking interface for users
- **Service Creation** - Experts can create and manage their services
- **Real-time Status Updates** - Track service progress dynamically

### 📊 Dashboard & Analytics
- **User Dashboard** - Track bookings, history, and account status
- **Expert Dashboard** - Manage client requests and service analytics
- **Comprehensive Logs Page** - View detailed service history with filtering
- **Interactive Status Management** - Accept, decline, and complete services

### ⭐ Review & Rating System
- **Interactive Rating** - Star-based rating system with visual feedback
- **Review Management** - Submit and view detailed reviews
- **Expert Reputation** - Build and maintain expert credibility
- **Review Analytics** - Track service quality and feedback

### 🎨 Modern UI/UX
- **Responsive Design** - Optimized for all device sizes
- **Loading States** - Smooth loading indicators and skeleton screens
- **Error Handling** - User-friendly error messages and recovery
- **Interactive Components** - Hover effects and smooth animations

## 🛠️ Tech Stack

- **Frontend Framework**: React 18+
- **Build Tool**: Vite
- **Styling**: CSS3 with custom stylesheets
- **HTTP Client**: Axios
- **Routing**: React Router DOM
- **State Management**: React Hooks (useState, useEffect)
- **Development**: ESLint, Hot Module Replacement (HMR)

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Skill Connect Backend API running on port 8000

## ⚡ Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/Abiral-Karmacharya/Skill-Connect-React.git
   cd Skill-Connect-React
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   Configure your environment variables:
   ```env
   VITE_API_BASE_URL=http://localhost:8000
   VITE_APP_NAME=Skill Connect
   VITE_APP_VERSION=1.0.0
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
Skill-Connect-React/
├── public/                 # Static assets
│   ├── favicon.ico
│   └── index.html
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   └── LoadingSpinner.jsx
│   ├── pages/              # Page components
│   │   ├── LoginPage.jsx
│   │   ├── Dashboard.jsx
│   │   ├── LogsPage.jsx
│   │   └── ServicesPage.jsx
│   ├── styles/             # CSS stylesheets
│   │   ├── main.css
│   │   ├── logs.css
│   │   └── components.css
│   ├── utils/              # Utility functions
│   │   ├── auth.js
│   │   ├── api.js
│   │   └── helpers.js
│   ├── hooks/              # Custom React hooks
│   ├── context/            # React Context providers
│   ├── App.jsx             # Main App component
│   └── main.jsx            # Entry point
├── .env.example           # Environment variables template
├── package.json           # Project dependencies
├── vite.config.js         # Vite configuration
└── eslint.config.js       # ESLint configuration
```

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server with HMR

# Production
npm run build        # Build for production
npm run preview      # Preview production build locally

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues automatically

# Testing
npm run test         # Run tests (if configured)
npm run test:coverage # Run tests with coverage
```

## 🌟 Key Components

### LogsPage Component
- **Service History**: Complete booking and service history
- **Status Filtering**: Filter services by status (All, Pending, In-Progress, Completed)
- **Interactive Actions**: Accept, decline, complete services
- **Review Integration**: Submit and view reviews
- **Expandable Details**: Detailed service information on demand

### Authentication System
- **JWT Token Management**: Secure token storage and refresh
- **Role-based Navigation**: Different routes for users and experts
- **Auto-redirect**: Smart redirection based on authentication status

### Review System
- **Star Rating**: Interactive 5-star rating system
- **Comment System**: Rich text reviews with character limits
- **Review Display**: Formatted review viewing with dates

## 🎨 Styling Guide

### CSS Architecture
```
styles/
├── main.css           # Global styles and variables
├── logs.css           # Logs page specific styles
├── components.css     # Component-specific styles
└── responsive.css     # Media queries and responsive design
```

### Color Palette
```css
:root {
  --primary-color: #007bff;
  --success-color: #28a745;
  --warning-color: #ffc107;
  --danger-color: #dc3545;
  --light-gray: #f8f9fa;
  --dark-gray: #6c757d;
}
```

## 🔗 API Integration

### Axios Configuration
```javascript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for auth token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### Key API Endpoints Used
- `GET /user/getlogs` - Fetch user service logs
- `PUT /user/acceptservice/:id` - Accept service requests
- `PUT /user/declineservice/:id` - Decline service requests
- `PUT /user/completeservice/:id` - Mark service as completed
- `POST /user/submitreview` - Submit service reviews
- `GET /user/getreviews/:id` - Get service reviews

## 🔐 Authentication Flow

1. **Login**: User enters credentials and receives JWT token
2. **Token Storage**: Token stored securely in localStorage
3. **Route Protection**: Protected routes check for valid token
4. **Auto-refresh**: Token validation on app initialization
5. **Logout**: Token removal and redirect to login

## 📱 Responsive Design

- **Mobile-first approach** with progressive enhancement
- **Breakpoints**: 
  - Mobile: 320px - 768px
  - Tablet: 768px - 1024px
  - Desktop: 1024px+
- **Touch-friendly interfaces** for mobile devices
- **Accessible navigation** across all screen sizes

## 🚀 Performance Optimizations

- **Vite Build Tool**: Lightning-fast development and build times
- **Code Splitting**: Lazy loading of components
- **Image Optimization**: Compressed assets and proper formats
- **Bundle Analysis**: Regular bundle size monitoring

## 🧪 Testing

```bash
# Run tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## 📦 Deployment

### Vercel Deployment
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### Netlify Deployment
```bash
# Build the project
npm run build

# Deploy dist folder to Netlify
```

### Docker Deployment
```dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 🌐 Environment Variables

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:8000

# App Configuration
VITE_APP_NAME=Skill Connect
VITE_APP_VERSION=1.0.0

# Development
VITE_DEV_MODE=true
VITE_ENABLE_LOGS=true
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow React best practices and hooks patterns
- Maintain consistent code formatting with ESLint
- Write descriptive commit messages
- Add comments for complex logic
- Ensure responsive design for all new components

## 🐛 Known Issues

- Browser localStorage limitations in incognito mode
- Potential token expiration handling edge cases

## 📚 Learning Resources

- [React Documentation](https://react.dev/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Axios Documentation](https://axios-http.com/docs/intro)
- [CSS Grid & Flexbox](https://css-tricks.com/snippets/css/complete-guide-grid/)

## 🔄 Changelog

### v1.0.0
- Initial release with authentication system
- Service booking and management interface
- Expert dashboard with service controls
- Review and rating system
- Responsive design implementation


## 👨‍💻 Author

**Abiral Karmacharya**
- GitHub: [@Abiral-Karmacharya](https://github.com/Abiral-Karmacharya)
- Email: [your-email@example.com]

## 🔗 Related Projects

- [Skill Connect Backend](https://github.com/Abiral-Karmacharya/Skill-Connect-Node) - Node.js API server

## 🙏 Acknowledgments

- React and Vite development teams
- Open source community for inspiration
- Beta testers and early adopters

---

⭐ **Star this repository if you found it helpful!**

🚀 **Ready to connect skills and opportunities!**
