const ssId = "1JOWLsx4v434yeza_ufh816wIRfAHbi0VDImr13VmQ8Q";
const editLink = "";
const favicon =
  "https://1.bp.blogspot.com/-WOYps8_-a5w/YGZ_K0CQUqI/AAAAAAAAO94/hzjz-WbUdW0hsaxgERfReCrdfPm6aQTIgCLcBGAsYHQ/s182/logo-min.ico";

const ss = SpreadsheetApp.openById(ssId);
const html = ({
  fileName,
  title,
  organizationName,
}: {
  fileName: string;
  title: string;
  organizationName: string;
}) => {
  let temp = HtmlService.createTemplateFromFile(fileName);
  return temp
    .evaluate()
    .setSandboxMode(HtmlService.SandboxMode.IFRAME)
    .addMetaTag("viewport", "width=device-width, initial-scale=1")
    .setFaviconUrl(favicon)
    .setTitle(`${title} • ${organizationName}`);
};

const sendEmail = (msg: string, emailAddress: string) => {
  let subject = "New Email - Appscript Demo";
  MailApp.sendEmail(emailAddress, subject, "This is your new request!", {
    htmlBody: msg,
  });
};

const getAppUrl = (query: string) => {
  return `${ScriptApp.getService().getUrl()}?${query}`;
};

const include = (fileName: string) => {
  return HtmlService.createHtmlOutputFromFile(fileName).getContent();
};

const getData = (
  ssId: string,
  wsName: string,
  startRow: number,
  startCol: number,
  numCols: number
) => {
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

const query = (request: string) => {
  let sheet = ss.insertSheet();
  let range = sheet.getRange(1, 1);
  range.setFormula(request);

  let value = sheet.getDataRange().getValues();
  ss.deleteSheet(sheet);

  return value;
};

const xlQuery = (rng: string, query: string) => {
  return `=IFERROR(QUERY(${rng}; "${query}";1);"ERROR")`;
};

const writeData = (wsName: string, infoArray: Array<any>): void => {
  const ws = ss.getSheetByName(wsName);

  ws.appendRow(infoArray);
};
interface keyValue {
  id: number;
  desc: string;
}
const formatDate = (date) => {
  let day = date.getDate().toString();
  let formattedDay = day.length == 1 ? "0" + day : day;

  let month = (date.getMonth() + 1).toString();
  let formattedMonth = month.length == 1 ? "0" + month : month;

  let year = date.getFullYear();

  let formattedDate = `'${formattedDay}/${formattedMonth}/${year}`;

  return formattedDate;
};

const xlString = (number: number) => {
  return `'${number}`;
};

const keyValueMaker = (array: any[][]): Array<keyValue> => {
  let obj: Array<keyValue> = [];

  array.map((v) => {
    obj.push({ id: v[0], desc: v[1] });
  });

  return obj;
};

const dateParams = () => {
  let date = new Date();

  let week = Math.ceil(date.getDate() / 7);
  if (week > 4) week = 4;

  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  let hash = date.getTime();

  return { month: month, week: week, year: year, hash: hash };
};
const routes = ["about"];

function doGet(e: any) {
  let title: string;
  let fileName: string;
  const organizationName = "Mage Deungaro;";

  if (!e.parameters.v) {
    title = "home";
    fileName = "index";
  } else if (routes.includes(e.parameters.v.toString())) {
    title = e.parameters.v.toString();
    fileName = e.parameters.v.toString();
  } else {
    title = "Page not found";
    fileName = "404";
  }

  return html({
    fileName: fileName,
    title: title,
    organizationName: organizationName,
  });
}
