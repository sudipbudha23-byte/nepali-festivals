const SHEET_ID = "YOUR_GOOGLE_SHEET_ID";
const SHEET_NAME = "Sheet1";

function doGet() {
  return ContentService
    .createTextOutput("Nepali Festival Website is working!");
}

function doPost(e) {
  try {

    const sheet = SpreadsheetApp
      .openById(SHEET_ID)
      .getSheetByName(SHEET_NAME);

    const data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      new Date(),
      data.name || "",
      data.email || "",
      data.festival || "",
      data.message || ""
    ]);

    return ContentService
      .createTextOutput(
        JSON.stringify({
          status: "success"
        })
      )
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {

    return ContentService
      .createTextOutput(
        JSON.stringify({
          status: "error",
          message: error.toString()
        })
      )
      .setMimeType(ContentService.MimeType.JSON);
  }
}