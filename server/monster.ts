class Monster {
  readonly id: number;
  readonly name: string;
  readonly interval: string;
  readonly mapId: string;
  readonly element: string;
  readonly valid: boolean;

  constructor(id: number) {
    const queryStr = xlQuery(
      "monsters!A2:E",
      `SELECT B, C, D, E WHERE A = ${id}`
    );

    const res = query(queryStr);

    //for some reason, if id > 1, the result returns an undesired value at arr[0]
    if (res.length > 1) res.shift();

    const monster = res.flat();

    this.id = id;
    this.name = monster[0];
    this.interval = monster[1];
    this.mapId = monster[2];
    this.element = monster[3];
  }

  isValid(): boolean {
    return this.name !== undefined && this.name !== null && this.name !== "";
  }

  static all() {
    const queryStr = xlQuery("monsters!A2:F", "SELECT A, B, C, D, E, F");

    const res = query(queryStr);

    return keyValueMaker(res);
  }
}

const getMonsters = () => {
  const monsters = Monster.all();

  Logger.log(monsters);

  return monsters;
};
