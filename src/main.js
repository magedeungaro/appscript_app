ssId = "1JOWLsx4v434yeza_ufh816wIRfAHbi0VDImr13VmQ8Q";
editLink = "";
favicon =
  "https://1.bp.blogspot.com/-WOYps8_-a5w/YGZ_K0CQUqI/AAAAAAAAO94/hzjz-WbUdW0hsaxgERfReCrdfPm6aQTIgCLcBGAsYHQ/s182/logo-min.ico";

function doGet(e) {
  if (e.parameters.v == "req") {
    let temp = HtmlService.createTemplateFromFile("pedido");
    return temp
      .evaluate()
      .setSandboxMode(HtmlService.SandboxMode.IFRAME)
      .addMetaTag("viewport", "width=device-width, initial-scale=1")
      .setFaviconUrl(favicon)
      .setTitle("Solicitação de Impressão • Raízen");
  } else if (e.parameters.v == "acpto") {
    let temp = HtmlService.createTemplateFromFile("acompanhamento");
    return temp
      .evaluate()
      .setSandboxMode(HtmlService.SandboxMode.IFRAME)
      .addMetaTag("viewport", "width=device-width, initial-scale=1")
      .setFaviconUrl(favicon)
      .setTitle("Acompanhar Pedido • Raízen");
  } else if (e.parameters.v == "resumo") {
    let temp = HtmlService.createTemplateFromFile("resumo");
    return temp
      .evaluate()
      .setSandboxMode(HtmlService.SandboxMode.IFRAME)
      .addMetaTag("viewport", "width=device-width, initial-scale=1")
      .setFaviconUrl(favicon)
      .setTitle("Acompanhar Pedido • Raízen");
  } else if (e.parameters.v == "painel") {
    let temp = HtmlService.createTemplateFromFile("painel");
    return temp
      .evaluate()
      .setSandboxMode(HtmlService.SandboxMode.IFRAME)
      .addMetaTag("viewport", "width=device-width, initial-scale=1")
      .setFaviconUrl(favicon)
      .setTitle("Painel • Raízen");
  } else {
    let temp = HtmlService.createTemplateFromFile("index");
    return temp
      .evaluate()
      .setSandboxMode(HtmlService.SandboxMode.IFRAME)
      .addMetaTag("viewport", "width=device-width, initial-scale=1")
      .setFaviconUrl(favicon)
      .setTitle("Solicitação de Impressão • Raízen");
  }
}

function include(fileName) {
  return HtmlService.createHtmlOutputFromFile(fileName).getContent();
}

function writeData(data) {
  let ss = SpreadsheetApp.openById(ssId);

  //datas, mes, ano
  let date = new Date();
  let date2 = new Date(data[data.length - 1]);
  let month = date2.getMonth() + 1;
  let ano = date2.getFullYear();
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
}

function sendEmail(msg) {
  let emailAddress = [
    "centralagricolagasa@raizen.com",
    "henilly.santos@raizen.com",
    "maria.borgato@raizen.com",
  ];
  //let emailAddress = ['maria.borgato@raizen.com'];
  let message = msg;
  let subject = "Solicitação de Impressão";
  for (let i = 0; i < emailAddress.length; i++) {
    MailApp.sendEmail(
      emailAddress[i],
      subject,
      "Segue nova solicitação de impressão.",
      { htmlBody: message }
    );
  }
}

function getAppUrl(query) {
  return ScriptApp.getService().getUrl() + query;
}

function getData(pedido) {
  //let pedido2 = pedido || "050320211";
  let ss = SpreadsheetApp.openById(ssId);
  let ws1 = ss.getSheetByName("Database");
  let pedidos = ws1
    .getRange(2, 1, ws1.getRange(1, 1).getDataRegion().getLastRow() - 1, 11)
    .getValues();

  pedido = pedidos.filter((v) => v[1] == pedido);

  console.log(pedido);

  return pedido.flat();
}

function dateFormat(data) {
  let dia = data.getDate().toString(),
    diaF = dia.length == 1 ? "0" + dia : dia,
    mes = (data.getMonth() + 1).toString(), //+1 pois no getMonth Janeiro começa com zero.
    mesF = mes.length == 1 ? "0" + mes : mes,
    anoF = data.getFullYear();
  return "'" + diaF + "/" + mesF + "/" + anoF;
}
