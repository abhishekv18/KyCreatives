# Form submissions to Google Sheets

Every website form already emails contact@kycreatives.com (Web3Forms).
This adds each submission as a row in a Google Sheet as well.

| Sheet | Receives |
|---|---|
| Contact form spreadsheet | Project enquiries (Contact page) and consultation requests (service and Our Work pages) |
| Partners form spreadsheet | Partner applications and "Ask us directly" questions (Partners page) |

Each form gets its own tab in its sheet, created automatically with a header
row on the first submission.

## Set up each sheet (about 5 minutes, do it for both)

1. Open the spreadsheet, signed in with the Google account that owns it.
2. **Extensions > Apps Script**. Delete anything in `Code.gs`.
3. Paste the whole of `scripts/google-sheets/Code.gs` and press **Save**.
4. (Optional) Choose `testRow` in the toolbar and press **Run**. Allow the
   permissions Google asks for. A "Test" tab with one row appears; delete it.
5. **Deploy > New deployment**. Click the gear next to "Select type" and choose
   **Web app**.
   - Description: `KY Creatives forms`
   - Execute as: **Me**
   - Who has access: **Anyone**
6. **Deploy**, allow access if asked, and copy the **Web app URL**
   (it ends in `/exec`).

## Connect the website

Paste the two web app URLs into `src/lib/enquiry.js`:

```js
const SHEETS = {
  contact: "https://script.google.com/macros/s/.../exec", // Contact form spreadsheet
  partners: "https://script.google.com/macros/s/.../exec", // Partners form spreadsheet
};
```

Then deploy the site. No .env file or Vercel variables are needed.

## If you change the script later

Use **Deploy > Manage deployments > Edit (pencil) > Version: New version >
Deploy**, so the URL stays the same.
