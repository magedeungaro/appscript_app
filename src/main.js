ssId = "1JOWLsx4v434yeza_ufh816wIRfAHbi0VDImr13VmQ8Q";
editLink = "";
favicon =
  "https://1.bp.blogspot.com/-WOYps8_-a5w/YGZ_K0CQUqI/AAAAAAAAO94/hzjz-WbUdW0hsaxgERfReCrdfPm6aQTIgCLcBGAsYHQ/s182/logo-min.ico";

const html = (fileName, title) => {
  let temp = HtmlService.createTemplateFromFile(fileName);
  return temp
    .evaluate()
    .setSandboxMode(HtmlService.SandboxMode.IFRAME)
    .addMetaTag("viewport", "width=device-width, initial-scale=1")
    .setFaviconUrl(favicon)
    .setTitle(`${title} • Mage Deungaro`);
};

const dateFormat = (date) => {
  let day = date.getDate().toString(),
    dayF = day.length == 1 ? "0" + day : day,
    month = (date.getMonth() + 1).toString(), //+1 pois no getMonth Janeiro começa com zero.
    monthF = month.length == 1 ? "0" + month : month,
    yearF = date.getFullYear();
  return "'" + dayF + "/" + monthF + "/" + yearF;
};

const sendEmail = (msg, emailAddress) => {
  let subject = "New Request - Conceptual App Demo";
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

function doGet(e) {
  if (e.parameters.v == "req") {
    return html("pedido", "Make your request - Step 1");
  } else if (e.parameters.v == "resumo") {
    return html("resumo", "Finish your request - Step 2");
  } else if (e.parameters.v == "acpto") {
    return html("acompanhamento", "Track your order");
  } else if (e.parameters.v == "painel") {
    return html("painel", "Painel");
  } else {
    return html("index", "Ordering Platform");
  }
}

const getRequest = (request) => {
  let requests = getData(ssId, "Database", 2, 1, 11);

  request = requests.filter((v) => v[1] == request);

  return request.flat();
};

const getStaticData = () => {
  let data = {
    cod: getData(ssId, "Static_Data", 2, 1, 1).flat(),
    desc: getData(ssId, "Static_Data", 2, 2, 1).flat(),
  };

  return data;
};

const writeData = (data) => {
  let ss = SpreadsheetApp.openById(ssId);

  //datas, mes, ano
  let date = new Date();
  let date2 = new Date(data[data.length - 1]);
  let nPedido = Date.now();

  date = dateFormat(date);
  date2 = dateFormat(date2);
  //escrever no database
  let ws1 = ss.getSheetByName("Database");
  ws1.appendRow([
    date,
    nPedido,
    "Pendente",
    "Aguardando confirmação",
    data[1],
    data[0],
    data[4],
    data[2],
    data[3],
    date2,
    ano,
    month,
  ]);

  //enviar notificação no email
  let emailMsg =
    "<style>table,td,th,tr{border: solid 1px black; text-align: left; font-family: sans-serif;border-collapse: collapse;} td,th{padding: 5px;}</style>";
  let headers = [
    "Solicitante",
    "CS",
    "Tipo impressão",
    "Tipo impressão 2",
    "Solicitação",
    "Data Necessária",
  ];
  let header = (emailMsg += "<p>Número do Pedido: " + nPedido + "</p>");
  for (let i = 0; i < data.length; i++) {
    emailMsg +=
      "<p>" + headers[i].toString() + ": " + data[i].toString() + "</p>";
  }
  console.log(emailMsg);
  sendEmail(emailMsg);

  //ir para a página de resumo
  let query = getAppUrl("?v=resumo&p=" + nPedido);

  return query;
};
