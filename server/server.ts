const html = (fileName, title) => {
  let temp = HtmlService.createTemplateFromFile(fileName);
  return temp
    .evaluate()
    .setSandboxMode(HtmlService.SandboxMode.IFRAME)
    .addMetaTag("viewport", "width=device-width, initial-scale=1")
    .setFaviconUrl(favicon)
    .setTitle(`${title} • Mage Deungaro`);
};

const sendEmail = (msg, emailAddress) => {
  let subject = "New Email - Appscript Demo";
  MailApp.sendEmail(emailAddress, subject, "This is your new request!", {
    htmlBody: msg,
  });
};

const getAppUrl = (query) => {
  return ScriptApp.getService().getUrl() + query;
};

const include = (fileName) => {
  return HtmlService.createHtmlOutputFromFile(fileName).getContent();
};

const getData = (ssId, wsName, startRow, startCol, numCols) => {
  let ss = SpreadsheetApp.openById(ssId);
  let ws = ss.getSheetByName(wsName);
  let data = ws
    .getRange(
      startRow,
      startCol,
      ws.getRange(1, 1).getDataRegion().getLastRow() - 1,
      numCols
    )
    .getValues();

  return data;
};

const query = (request: string): any[][] => {
  let sheet = ss.insertSheet();
  let range = sheet.getRange(1, 1);
  range.setFormula(request);

  let value = sheet.getDataRange().getValues();
  ss.deleteSheet(sheet);

  return value;
};

const xlQuery = (rng: string, query: string) => {
  return `=IFERROR(QUERY(${rng}; "${query}";1);"")`;
};

const writeData = (wsName: string, infoArray: Array<any>): void => {
  const ws = ss.getSheetByName(wsName);

  ws.appendRow(infoArray);
};
