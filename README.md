# BrioNest Solutions - Local Development Setup

## Prerequisites

Before you begin, ensure you have installed:

- **Node.js** (v18 or higher): [Download](https://nodejs.org/)
- **Git**: [Download](https://git-scm.com/)

## Step 1: Clone the Repository

```bash
# Clone the repository (replace with your actual repo URL)
git clone <your-repository-url>
cd brionest-solutions
```

## Step 2: Backend Setup

### 2.1 Navigate to Backend Directory

```bash
cd backend
```

### 2.2 Install Node Dependencies

```bash
npm install
```

### 2.3 Configure Environment Variables

Create a `.env` file in the `backend` directory:

```bash
# Server
PORT=8000
NODE_ENV=development

# CORS — comma-separated list of allowed frontend origins
CORS_ORIGINS=http://localhost:3000,http://localhost:5173

# Google Apps Script Web App URL
# Steps to get this:
#   1. Open Google Sheet → Extensions → Apps Script
#   2. Paste Code.gs from apps-script/Code.gs
#   3. Deploy → New deployment → Web app
#   4. Execute as: Me  |  Who has access: Anyone
#   5. Copy the Web App URL and paste it below
APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec

# Rate limiting — max requests per window per IP
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=10
```

### 2.4 Start Backend Server

```bash
# Development (auto-reload with nodemon)
npm run dev

# Production
npm start
```

Backend should now be running at: `http://localhost:8000`

## Step 3: Frontend Setup

### 3.1 Navigate to Frontend Directory

Open a new terminal window:

```bash
cd frontend
```

### 3.2 Install Node Dependencies

**Important:** Use `yarn` instead of `npm` to avoid dependency issues

```bash
# Install yarn if you don't have it
npm install -g yarn

# Install dependencies
yarn install
```

### 3.3 Fix Common Dependency Issues

If you encounter the error: `Cannot find module "ajv/dist/compile/codegen"`, run:

```bash
# Remove node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Clear yarn cache
yarn cache clean

# Reinstall dependencies
yarn install

# If issue persists, try:
yarn add ajv@^8.0.0
```

### 3.4 Configure Environment Variables

Create a `.env` file in the `frontend` directory:

```bash
# ─────────────────────────────────────────────────────────────────────────────
# BrioNest Solutions — Frontend Environment Variables
# Copy this file to .env and fill in the values
#   cp .env.example .env
#
# IMPORTANT:
#   - Variables MUST start with REACT_APP_ to be accessible in React (CRA/craco)
#   - Never commit your .env file to git — add it to .gitignore
#   - Restart the dev server after changing .env values
# ─────────────────────────────────────────────────────────────────────────────

# ── Backend API URL ───────────────────────────────────────────────────────────
# Development: point to your local Node.js backend
REACT_APP_BACKEND_URL=http://localhost:8000

# Production: point to your deployed backend
# REACT_APP_BACKEND_URL=https://your-api-domain.com

# ── App Info (optional) ───────────────────────────────────────────────────────
REACT_APP_NAME=BrioNest Solutions
REACT_APP_VERSION=1.0.0

NODE_ENV="development"
ENABLE_HEALTH_CHECK="false"
```

### 3.5 Start Frontend Development Server

```bash
yarn start
```

Frontend should now be running at: `http://localhost:3000`

## Step 4: Verify Setup

1. **Check Backend**: Visit `http://localhost:8000/api/` — should see `{"message":"BrioNest Contact API is running","version":"1.0.0",...}`
2. **Check Frontend**: Visit `http://localhost:3000` — should see the BrioNest Solutions website
3. **Test Sheets connection**: Visit `http://localhost:8000/api/contact/test` — should see `{"connected":true,...}`
4. **Test Form**: Try submitting the consultation form and verify a new row appears in your Google Sheet

## Step 5: Google Sheets Integration (Optional)

See detailed instructions in `GOOGLE_SHEETS_SETUP.md`

## Common Issues & Solutions

### Issue 1: "Cannot find module ajv/dist/compile/codegen"

**Solution:**

```bash
cd frontend
rm -rf node_modules package-lock.json yarn.lock
yarn cache clean
yarn install
```

### Issue 2: Port 8000 already in use

**Solution:**

```bash
# Find and kill the process using port 8000
# On macOS/Linux:
lsof -ti:8000 | xargs kill -9

# On Windows:
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Or change the port in backend/.env:
PORT=8002
# Then update REACT_APP_BACKEND_URL in frontend/.env to match:
REACT_APP_BACKEND_URL=http://localhost:8002
```

### Issue 3: CORS errors

**Solution:**
Ensure `CORS_ORIGINS` in `backend/.env` includes your frontend URL:

```bash
CORS_ORIGINS=http://localhost:3000,http://localhost:3001
```

### Issue 4: React app not loading

**Solution:**

```bash
# Clear cache and rebuild
cd frontend
rm -rf node_modules .cache build
yarn install
yarn start
```

## Project Structure

```
brionest-solutions/
├── backend/
│   ├── server.js                 # Main Express app — entry point
│   ├── routes/
│   │   └── contact.js            # POST /api/contact + GET /api/contact/test
│   ├── config/
│   │   ├── logger.js             # Structured console logger
│   │   └── sheets.js             # Apps Script webhook (sendToSheet, pingSheet)
│   ├── middleware/
│   │   ├── errorHandler.js       # Global error handler
│   │   ├── rateLimiter.js        # IP-based rate limiting
│   │   └── validate.js           # express-validator result checker
│   ├── apps-script/
│   │   └── Code.gs               # Paste into Google Apps Script editor
│   ├── .env                      # Environment variables (create from .env.example)
│   └── package.json              # Node dependencies & scripts
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   └── Home.jsx
│   │   ├── components/
│   │   │   ├── HeroSection.jsx
│   │   │   ├── ProductCatalogue.jsx
│   │   │   ├── RealExamples.jsx
│   │   │   ├── BenefitsSection.jsx
│   │   │   ├── PricingSection.jsx
│   │   │   ├── ConsultationForm.jsx
│   │   │   └── Footer.jsx
│   │   ├── App.js
│   │   └── index.css
│   ├── package.json              # Node dependencies & scripts
│   ├── .env                      # Environment variables (create from .env.example)
│   └── public/
│
├── GOOGLE_SHEETS_SETUP.md        # Apps Script setup guide
├── SETUP_INSTRUCTIONS.md         # Full setup and deployment instructions
└── README.md                     # This file
```

## Development Workflow

### Running Both Servers

**Terminal 1 — Backend:**

```bash
cd backend
npm run dev
```

**Terminal 2 — Frontend:**

```bash
cd frontend
yarn start
```

### Making Changes

1. **Frontend Changes**:
   - Edit files in `frontend/src/`
   - Changes auto-reload in browser
   - Use browser DevTools to debug

2. **Backend Changes**:
   - Edit files in `backend/`
   - Use nodemon for auto-reload
   - Check terminal for errors
   - Test API at `http://localhost:8000/api/`

### Building for Production

**Frontend:**

```bash
cd frontend
yarn build
# Creates optimised production build in the /build directory
```

**Backend:**

```bash
cd backend
npm start
# Runs server.js directly with Node — no build step needed
# For production, use a process manager like PM2:
# npm install -g pm2
# pm2 start server.js --name brionest-backend
```

## Testing

### Test Backend API

```bash
# Test root endpoint
curl http://localhost:8000/api/

# Test consultation submission
curl -X POST http://localhost:8000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "1234567890",
    "customerType": "customer",
    "message": "Test message"
  }'

# Test Google Sheets connection
curl http://localhost:8000/api/contact/test
```

### Test Frontend

1. Open `http://localhost:3000`
2. Try toggling between Customer/Builder views
3. Test form submission
4. Check browser console for errors (F12)

## Additional Resources

- **React Documentation**: https://react.dev/
- **Express.js Documentation**: https://expressjs.com/
- **Google Apps Script**: https://developers.google.com/apps-script
- **nodemon** (auto-reload): https://nodemon.io/

## Support

If you encounter issues:

1. Check the error message carefully
2. Review this README for common solutions
3. Check backend logs in terminal
4. Check browser console for frontend errors
5. Ensure all environment variables are set correctly

## Production Deployment

For deploying to production (Emergent platform or other):

- See `SETUP_INSTRUCTIONS.md` for deployment details
- Ensure all environment variables are configured
- Add Google Sheets APPS SCRIPT URL in .env
- Test thoroughly before going live

---

**Tech stack:**

- React 19 + craco for frontend
- Node.js 18+ / Express for backend
- Google Apps Script Web App for Google Sheets integration (no Google Cloud required)
