# BrioNest Solutions - Setup Instructions

## Overview
This is a fully responsive smart home automation website with:
- Customer/Builder segment toggle
- Google Sheets integration for consultation form
- Mobile-first responsive design
- No "Made with Emergent" branding

## Live URL
https://brionest-solutions.preview.emergentagent.com

## Features Implemented

### 1. Segmented Content
- **Toggle Switch**: Users can switch between "For Customers" and "For Builders"
- **Dynamic Content**: All sections adapt based on selected segment
- **Default**: Customers view is selected by default

### 2. Sections
- **Hero Section**: Different headlines, stats, and backgrounds for each segment
- **Product Catalogue**: Shows "How It Works" instead of pricing
- **Real Examples**: Customer stories vs Builder success stories
- **Benefits**: Tailored benefits for each audience
- **Pricing**: Customer packages vs Builder integration tiers
- **Consultation Form**: Connected to backend with Google Sheets integration

### 3. Responsive Design
- Mobile (375px+)
- Tablet (768px+)
- Desktop (1920px+)

### 4. Backend Integration
- FastAPI backend
- Google Sheets API integration (ready for credentials)
- Consultation form submission API

## Google Sheets Setup

See detailed instructions in: `/app/GOOGLE_SHEETS_SETUP.md`

### Quick Setup Steps:
1. Create Google Cloud Project
2. Enable Google Sheets API
3. Create Service Account and download JSON credentials
4. Create Google Sheet and share with service account
5. Add credentials to backend:

```bash
# Place JSON file at:
/app/backend/google-credentials.json

# Add to /app/backend/.env:
GOOGLE_APPLICATION_CREDENTIALS=/app/backend/google-credentials.json
GOOGLE_SPREADSHEET_ID=your_spreadsheet_id_here

# Restart backend:
sudo supervisorctl restart backend
```

### Test Connection:
Visit: `https://your-app-url/api/consultation/test`

Expected response:
```json
{
  "connected": true,
  "message": "Google Sheets connection successful",
  "spreadsheet_title": "BrioNest Consultations"
}
```

## Form Data Structure

When users submit the consultation form, data is saved to Google Sheets with:

| Column | Data |
|--------|------|
| Timestamp | UTC timestamp |
| Name | User's full name |
| Email | User's email address |
| Phone | User's phone number |
| Customer Type | customer or builder |
| Property Type | apartment/villa/builder-project/office |
| Preferred Date | User's preferred consultation date |
| Message | Additional details from user |

## API Endpoints

### Consultation Form
- **POST** `/api/consultation`
- **Body**: JSON with form data
- **Response**: Success message + sheets_saved status

### Test Sheets Connection
- **GET** `/api/consultation/test`
- **Response**: Connection status and spreadsheet info

## Removed Features
- ❌ Commission information from builder section (as requested)
- ❌ Pricing from product catalogue (now shows "How It Works")
- ❌ "Made with Emergent" branding badge

## Color Scheme (from PDFs)
- Primary: Cream/Off-White (#FFF9F0, #FAF6F1)
- Accent: Soft Yellow/Beige (#F4E4C1, #E8D5B5)
- Gold/Bronze: #C9A961, #B89851
- Blue-Grey: #5B7C99, #4A6B84
- Text: #2C3E50, #1A1A1A

## Files Structure

### Frontend
```
/app/frontend/src/
├── pages/
│   └── Home.jsx                 # Main page with toggle logic
├── components/
│   ├── HeroSection.jsx          # Improved visibility
│   ├── ProductCatalogue.jsx     # No pricing
│   ├── RealExamples.jsx         # Segment-specific stories
│   ├── BenefitsSection.jsx      # Segment-specific benefits
│   ├── PricingSection.jsx       # No commission for builders
│   ├── ConsultationForm.jsx     # Connected to backend
│   └── Footer.jsx               # Responsive footer
└── index.css                    # Custom CSS (hides Emergent branding)
```

### Backend
```
/app/backend/
├── server.py                    # Main FastAPI app
├── routes/
│   └── consultation.py          # Google Sheets integration
└── .env                         # Environment variables (add credentials here)
```

## Troubleshooting

### Form Not Submitting
1. Check backend logs: `tail -f /var/log/supervisor/backend.out.log`
2. Verify REACT_APP_BACKEND_URL in `/app/frontend/.env`
3. Test API: `curl -X POST https://your-app-url/api/consultation -H "Content-Type: application/json" -d '{"name":"Test","email":"test@test.com","phone":"1234567890","customerType":"customer"}'`

### Google Sheets Not Working
1. Verify credentials file exists at correct path
2. Check spreadsheet is shared with service account email
3. Test connection: Visit `/api/consultation/test`
4. Check backend logs for errors

### Responsive Issues
1. Clear browser cache
2. Test in incognito mode
3. Check console for JavaScript errors

## Next Steps

1. **Add Google Sheets Credentials** (see GOOGLE_SHEETS_SETUP.md)
2. Test end-to-end consultation form submission
3. Verify data appears in Google Sheet
4. Optional: Add email notifications
5. Optional: Create admin dashboard to view submissions

## Support

For issues or questions:
- Check backend logs: `/var/log/supervisor/backend.out.log`
- Check frontend logs: `/var/log/supervisor/frontend.out.log`
- Test API endpoints directly
- Review GOOGLE_SHEETS_SETUP.md for integration issues
