# College Event Coordinator - Frontend

A React-based frontend for the College Event Coordinator platform, designed to work with your backend API.

## 🚀 Quick Start

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Update API Base URL:**

   - Open `src/config/api.js`
   - Replace `YOUR_API_BASE_URL` with your backend URL
   - Example: `http://localhost:5000` for development

3. **Start development server:**

   ```bash
   npm run dev
   ```

4. **Open in browser:**
   - Navigate to `http://localhost:5173`

## 🔗 API Integration

The frontend is fully configured to work with your backend API. See `API_INTEGRATION_GUIDE.md` for complete details.

### Key Integration Points:

1. **Authentication:**

   - Login: `POST /auth/login`
   - Register: `POST /auth/register`
   - Logout: `POST /auth/logout`

2. **User Management:**

   - Get Profile: `GET /users/me`
   - Update Profile: `PUT /users/me`

3. **Events:**

   - List Events: `GET /events`
   - Create Event: `POST /events`
   - Event Details: `GET /events/:id`
   - Update Event: `PUT /events/:id`
   - Delete Event: `DELETE /events/:id`

4. **Clubs:**
   - List Clubs: `GET /clubs`
   - Create Club: `POST /clubs`
   - Club Details: `GET /clubs/:id`
   - Update Club: `PUT /clubs/:id`
   - Delete Club: `DELETE /clubs/:id`

## 🎨 Features

- **Modern UI/UX:** Clean, responsive design with Tailwind CSS
- **Authentication:** Login/signup with JWT token management
- **Protected Routes:** Automatic redirect based on auth status
- **Cookie-based Storage:** Secure authentication state management
- **Error Handling:** User-friendly error messages
- **Loading States:** Smooth loading indicators

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── config/             # API configuration
├── utils/              # Utility functions (cookies, etc.)
├── features/           # Redux slices (if needed)
└── app/                # Redux store configuration
```

## 🔧 Configuration

### API Base URL

Update `src/config/api.js`:

```javascript
export const API_BASE_URL = "http://localhost:5000"; // Your backend URL
```

### CORS Setup

Your backend should allow requests from:

- Development: `http://localhost:5173`
- Production: Your frontend domain

## 🧪 Testing

1. Start your backend server
2. Update the API base URL
3. Run `npm run dev`
4. Test login/signup functionality
5. Verify protected routes work correctly

## 📚 Documentation

- **API Integration Guide:** `API_INTEGRATION_GUIDE.md`
- **Backend API Spec:** Check your backend documentation

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Key Technologies

- **React 18** - UI library
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **Cookies** - Authentication storage

## 🤝 Backend Integration

The frontend is ready to work with your backend. Simply:

1. Update the API base URL in `src/config/api.js`
2. Ensure your backend implements the expected endpoints
3. Test the authentication flow

All API calls are properly configured with authentication headers and error handling.

## 📝 Notes

- Authentication uses cookies for secure storage
- All API calls include proper error handling
- Protected routes automatically redirect unauthenticated users
- The UI is fully responsive and modern
- Ready for production deployment

---

**Ready to integrate with your backend!** 🚀
