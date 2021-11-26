var ssId = "1JOWLsx4v434yeza_ufh816wIRfAHbi0VDImr13VmQ8Q";
var editLink = "";
var favicon = "https://1.bp.blogspot.com/-WOYps8_-a5w/YGZ_K0CQUqI/AAAAAAAAO94/hzjz-WbUdW0hsaxgERfReCrdfPm6aQTIgCLcBGAsYHQ/s182/logo-min.ico";
var ss = SpreadsheetApp.openById(ssId);
var html = function (_a) {
    var fileName = _a.fileName, title = _a.title, organizationName = _a.organizationName;
    var temp = HtmlService.createTemplateFromFile(fileName);
    return temp
        .evaluate()
        .setSandboxMode(HtmlService.SandboxMode.IFRAME)
        .addMetaTag("viewport", "width=device-width, initial-scale=1")
        .setFaviconUrl(favicon)
        .setTitle("".concat(title, " \u2022 ").concat(organizationName));
};
var sendEmail = function (msg, emailAddress) {
    var subject = "New Email - Appscript Demo";
    MailApp.sendEmail(emailAddress, subject, "This is your new request!", {
        htmlBody: msg
    });
};
var getAppUrl = function (query) {
    return "".concat(ScriptApp.getService().getUrl(), "?").concat(query);
};
var include = function (fileName) {
    return HtmlService.createHtmlOutputFromFile(fileName).getContent();
};
var getData = function (ssId, wsName, startRow, startCol, numCols) {
    var ss = SpreadsheetApp.openById(ssId);
    var ws = ss.getSheetByName(wsName);
    var data = ws
        .getRange(startRow, startCol, ws.getRange(1, 1).getDataRegion().getLastRow() - 1, numCols)
        .getValues();
    return data;
};
var query = function (request) {
    var sheet = ss.insertSheet();
    var range = sheet.getRange(1, 1);
    range.setFormula(request);
    var value = sheet.getDataRange().getValues();
    ss.deleteSheet(sheet);
    return value;
};
var xlQuery = function (rng, query) {
    return "=IFERROR(QUERY(".concat(rng, "; \"").concat(query, "\";1);\"ERROR\")");
};
var writeData = function (wsName, infoArray) {
    var ws = ss.getSheetByName(wsName);
    ws.appendRow(infoArray);
};
var formatDate = function (date) {
    var day = date.getDate().toString();
    var formattedDay = day.length == 1 ? "0" + day : day;
    var month = (date.getMonth() + 1).toString();
    var formattedMonth = month.length == 1 ? "0" + month : month;
    var year = date.getFullYear();
    var formattedDate = "'".concat(formattedDay, "/").concat(formattedMonth, "/").concat(year);
    return formattedDate;
};
var xlString = function (number) {
    return "'".concat(number);
};
var keyValueMaker = function (array) {
    var obj = [];
    array.map(function (v) {
        obj.push({ id: v[0], desc: v[1] });
    });
    return obj;
};
var dateParams = function () {
    var date = new Date();
    var week = Math.ceil(date.getDate() / 7);
    if (week > 4)
        week = 4;
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var hash = date.getTime();
    return { month: month, week: week, year: year, hash: hash };
};
var routes = ["about"];
function doGet(e) {
    var title;
    var fileName;
    var organizationName = "Mage Deungaro;";
    if (!e.parameters.v) {
        title = "home";
        fileName = "index";
    }
    else if (routes.includes(e.parameters.v.toString())) {
        title = e.parameters.v.toString();
        fileName = e.parameters.v.toString();
    }
    else {
        title = "Page not found";
        fileName = "404";
    }
    return html({
        fileName: fileName,
        title: title,
        organizationName: organizationName
    });
}
