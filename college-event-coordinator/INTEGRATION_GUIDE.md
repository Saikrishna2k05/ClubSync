# ClubSync Frontend-Backend Integration Guide

## 🚀 Quick Start

### 1. Start the Backend Server
```bash
cd server
npm run dev
```
Backend will start at `http://localhost:3000`

### 2. Start the Frontend Development Server
```bash
cd client
npm run dev
```
Frontend will start at `http://localhost:5173`

## 🔗 Integration Overview

### Authentication Flow
1. **Registration**: User signs up → Redirected to login
2. **Login**: User logs in → JWT token stored in cookies → Redirected to dashboard
3. **Protected Routes**: All dashboard routes require authentication
4. **Logout**: Clears cookies and redirects to login

### API Integration Points

#### Authentication
- **Register**: `POST /user/signup` → Creates account, redirects to login
- **Login**: `POST /user/login` → Returns user data + JWT token
- **Logout**: `POST /user/logout` → Clears server-side session

#### Events
- **Get All Events**: `GET /api/events` → Public endpoint
- **Create Event**: `POST /api/events` → Requires `eventCoordinator` role
- **Register for Event**: `POST /api/events/:id/register` → Requires authentication

#### Clubs
- **Get All Clubs**: `GET /api/clubs` → Public endpoint
- **Create Club**: `POST /api/clubs` → Requires `clubAdmin` role
- **Join Club**: `POST /api/clubs/:id/join` → Requires authentication
- **Leave Club**: `POST /api/clubs/:id/leave` → Requires authentication

#### User Profile
- **Get Profile**: `GET /api/users/profile` → Requires authentication
- **Update Profile**: `PUT /api/users/profile` → Requires authentication

## 🛠️ Role-Based Access Control

### User Roles
- **`user`**: Default role - Can browse events/clubs, register for events, join clubs
- **`clubAdmin`**: Can create and manage clubs
- **`eventCoordinator`**: Can create and manage events

### Manual Role Assignment
For testing, manually update user roles in MongoDB:
```javascript
// Update to clubAdmin
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "clubAdmin" } }
)

// Update to eventCoordinator
db.users.updateOne(
  { email: "coordinator@example.com" },
  { $set: { role: "eventCoordinator" } }
)
```

## 📁 File Structure

### Backend (`/server`)
```
├── models/
│   ├── userModel.js      # User schema with roles
│   ├── eventModel.js     # Event schema
│   └── clubModel.js      # Club schema
├── controllers/
│   ├── userController.js     # Auth endpoints
│   ├── eventController.js    # Event CRUD
│   ├── clubController.js     # Club CRUD
│   └── userProfileController.js # Profile management
├── routes/
│   ├── userRoutes.js         # Auth routes
│   ├── eventRoutes.js        # Event routes
│   ├── clubRoutes.js         # Club routes
│   └── userProfileRoutes.js  # Profile routes
├── middlewares/
│   └── authMiddleware.js     # JWT authentication
└── index.js                  # Main server file
```

### Frontend (`/client`)
```
├── src/
│   ├── config/
│   │   └── api.js           # API configuration
│   ├── utils/
│   │   └── cookies.js       # Cookie management
│   ├── pages/
│   │   ├── Login.jsx        # Login page
│   │   ├── Signup.jsx       # Registration page
│   │   ├── Dashboard.jsx    # Main dashboard
│   │   ├── Events.jsx       # Events listing
│   │   └── Clubs.jsx        # Clubs listing
│   ├── components/
│   │   └── Navbar.jsx       # Navigation component
│   └── App.jsx              # Main app with routing
```

## 🔐 Authentication Implementation

### Token Management
- **Backend**: JWT tokens stored in HTTP-only cookies
- **Frontend**: Tokens also stored in client-side cookies for API calls
- **Security**: Tokens expire after 2 hours

### Protected Routes
```jsx
// Frontend route protection
<ProtectedRoute>
  <Dashboard />
</ProtectedRoute>

// Backend middleware
authenticateToken(req, res, next)
```

## 📊 Data Flow

### 1. User Registration
```
Frontend → POST /user/signup → Backend → Create User → Redirect to Login
```

### 2. User Login
```
Frontend → POST /user/login → Backend → Validate → Return Token → Store in Cookies → Redirect to Dashboard
```

### 3. API Calls
```
Frontend → Include Token in Headers → Backend → Validate Token → Return Data
```

### 4. Event Registration
```
Frontend → POST /api/events/:id/register → Backend → Add to Attendees → Return Success
```

## 🎨 UI/UX Features

### Responsive Design
- Mobile-first approach with Tailwind CSS
- Sidebar navigation for desktop
- Mobile menu for smaller screens

### Loading States
- Spinner animations during API calls
- Skeleton loading for better UX

### Error Handling
- User-friendly error messages
- Toast notifications for success/error states

### Search & Filtering
- Real-time search for events and clubs
- Category-based filtering
- Combined search and filter functionality

## 🔧 Development Workflow

### 1. Backend Development
```bash
cd server
npm run dev
# Server runs on http://localhost:3000
```

### 2. Frontend Development
```bash
cd client
npm run dev
# Client runs on http://localhost:5173
```

### 3. Testing APIs
Use the provided `API_TESTING_GUIDE.md` for comprehensive API testing.

### 4. Database Management
- Use MongoDB Compass for visual database management
- Manual role updates for testing different user types

## 🚨 Common Issues & Solutions

### 1. CORS Errors
- Backend configured with CORS for `http://localhost:5173`
- Check if both servers are running

### 2. Authentication Issues
- Clear browser cookies if token is invalid
- Check if JWT_SECRET is set in backend .env

### 3. API Endpoint Errors
- Verify API_BASE_URL in frontend config
- Check backend server is running on port 3000

### 4. Role-Based Access Issues
- Manually update user roles in database
- Check user role in browser cookies

## 📈 Next Steps

### Immediate Improvements
1. **Form Validation**: Add client-side validation
2. **Error Boundaries**: Implement React error boundaries
3. **Loading States**: Add more sophisticated loading indicators
4. **Pagination**: Implement pagination for large datasets

### Advanced Features
1. **Real-time Updates**: WebSocket integration for live updates
2. **File Upload**: Image upload for events and clubs
3. **Notifications**: Push notifications for event reminders
4. **Analytics**: Dashboard analytics and reporting

### Production Deployment
1. **Environment Variables**: Configure production environment
2. **Database**: Set up production MongoDB instance
3. **Security**: Implement rate limiting and security headers
4. **Monitoring**: Add logging and monitoring

## 🎯 Testing Checklist

- [ ] User registration and login
- [ ] Role-based access control
- [ ] Event creation and management
- [ ] Club creation and management
- [ ] Event registration
- [ ] Club membership
- [ ] Profile management
- [ ] Logout functionality
- [ ] Responsive design
- [ ] Error handling

## 📞 Support

For issues or questions:
1. Check the API documentation in `server/API_ENDPOINTS.md`
2. Review the testing guide in `server/API_TESTING_GUIDE.md`
3. Check browser console for frontend errors
4. Check server logs for backend errors

The integration is now complete and ready for development and testing! 🎉
