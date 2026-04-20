# Google Sheets Integration Setup Guide

## Step 1: Create Google Cloud Project & Enable Sheets API

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project (or select existing one)
3. Navigate to "APIs & Services" > "Library"
4. Search for "Google Sheets API" and click "Enable"

## Step 2: Create Service Account

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "Service Account"
3. Fill in details:
   - Service account name: `brionest-sheets-service`
   - Service account ID: (auto-generated)
4. Click "Create and Continue"
5. Grant role: "Editor" (or specific Sheets permissions)
6. Click "Done"

## Step 3: Generate Service Account Key

1. Click on the created service account
2. Go to "Keys" tab
3. Click "Add Key" > "Create new key"
4. Select "JSON" format
5. Click "Create" - this will download a JSON file
6. **Save this file securely** - you'll need it for the next step

## Step 4: Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it: "BrioNest Consultations"
4. Copy the Spreadsheet ID from the URL:
   ```
   https://docs.google.com/spreadsheets/d/SPREADSHEET_ID_HERE/edit
   ```
5. Share the spreadsheet with the service account email:
   - Click "Share" button
   - Add the service account email (found in the JSON file: `client_email`)
   - Give "Editor" permission

## Step 5: Configure Backend

1. Upload the JSON credentials file to `/app/backend/` directory
2. Rename it to `google-credentials.json`

3. Add to `/app/backend/.env`:
   ```
   GOOGLE_APPLICATION_CREDENTIALS=/app/backend/google-credentials.json
   GOOGLE_SPREADSHEET_ID=your_spreadsheet_id_here
   ```

4. Restart the backend:
   ```bash
   sudo supervisorctl restart backend
   ```

## Step 6: Test the Integration

1. Visit: `https://your-app-url/api/consultation/test`
2. You should see:
   ```json
   {
     "connected": true,
     "message": "Google Sheets connection successful",
     "spreadsheet_title": "BrioNest Consultations"
   }
   ```

## Sheet Structure

The consultation data will be saved with the following columns:

| Timestamp | Name | Email | Phone | Customer Type | Property Type | Preferred Date | Message |
|-----------|------|-------|-------|---------------|---------------|----------------|---------|
| Auto | User's name | User's email | User's phone | customer/builder | apartment/villa/etc | Date | User's message |

## Troubleshooting

### "Google Sheets credentials not configured"
- Ensure the JSON file is placed at the correct path
- Check that `GOOGLE_APPLICATION_CREDENTIALS` env variable is set correctly
- Restart the backend service

### "Spreadsheet ID not configured"
- Ensure `GOOGLE_SPREADSHEET_ID` is set in `.env`
- Verify the spreadsheet ID is correct

### "Permission denied"
- Make sure the spreadsheet is shared with the service account email
- Give the service account "Editor" permissions

### "Sheet not found"
- The sheet name is hardcoded as "Consultations"
- Either rename your sheet tab to "Consultations" or update the `SHEET_NAME` variable in `/app/backend/routes/consultation.py`

## Security Notes

1. **Never commit the credentials JSON file to git**
2. Keep the `.env` file secure
3. Restrict service account permissions to only what's needed
4. Regularly rotate service account keys (every 90 days recommended)
