function getSheet(sheetName) {

  return SpreadsheetApp
    .getActiveSpreadsheet()
    .getSheetByName(sheetName);

}

function generateId(prefix = 'ID') {

  return prefix + '_' + new Date().getTime();

}

function getRequestData(e) {

  try {

    return JSON.parse(e.postData.contents);

  } catch(err) {

    return {};

  }

}