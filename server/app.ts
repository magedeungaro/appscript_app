const ssId = "1JOWLsx4v434yeza_ufh816wIRfAHbi0VDImr13VmQ8Q";
const ss = SpreadsheetApp.openById(ssId);

const editLink = "";

const favicon =
  "https://1.bp.blogspot.com/-WOYps8_-a5w/YGZ_K0CQUqI/AAAAAAAAO94/hzjz-WbUdW0hsaxgERfReCrdfPm6aQTIgCLcBGAsYHQ/s182/logo-min.ico";

const title = "Ordering Platform";

function doGet(e) {
  if (!e.parameters.v) return html("index", title);

  return html(e.params.v, title);
}
