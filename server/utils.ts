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
