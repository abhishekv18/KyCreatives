/**
 * KY Creatives website: form submissions -> this Google Sheet.
 *
 * Paste this whole file into the sheet's Apps Script editor
 * (Extensions > Apps Script), then Deploy > New deployment > Web app,
 * Execute as: Me, Who has access: Anyone. Use the SAME file for both
 * spreadsheets (Contact and Partners).
 *
 * Each form gets its own tab (named after the form), created on the first
 * submission, with a bold, frozen header row. New fields add new columns.
 */

// Must match SHEETS_TOKEN in the website's src/lib/enquiry.js
var TOKEN = "kyc-forms-2026";

function doPost(e) {
  var data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    return reply({ ok: false, error: "Invalid request" });
  }
  if (!data || data.token !== TOKEN) return reply({ ok: false, error: "Not allowed" });
  delete data.token;

  var lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var tab = String(data.Form || "Submissions").slice(0, 90);
    var sheet = ss.getSheetByName(tab) || ss.insertSheet(tab);

    var row = { "Submitted at": new Date() };
    Object.keys(data).forEach(function (k) {
      row[k] = safe(data[k]);
    });

    var headers = sheet.getLastRow() > 0 ? sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0] : [];
    if (headers.length === 0) {
      headers = Object.keys(row);
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight("bold");
      sheet.setFrozenRows(1);
    }
    Object.keys(row).forEach(function (k) {
      if (headers.indexOf(k) === -1) {
        headers.push(k);
        sheet.getRange(1, headers.length).setValue(k).setFontWeight("bold");
      }
    });

    sheet.appendRow(
      headers.map(function (h) {
        return Object.prototype.hasOwnProperty.call(row, h) ? row[h] : "";
      })
    );
  } finally {
    lock.releaseLock();
  }
  return reply({ ok: true });
}

// Values that start like a formula are stored as plain text.
function safe(v) {
  var s = v === null || v === undefined ? "" : String(v).slice(0, 5000);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

// Optional: run once from the editor to check the sheet is writable.
function testRow() {
  doPost({ postData: { contents: JSON.stringify({ token: TOKEN, Form: "Test", Name: "Test row", Email: "test@example.com" }) } });
}
