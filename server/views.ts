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
