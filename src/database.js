import fs from "node:fs/promises";

// import.meta.url pega a url referencia do arquivo onde é chamada.

const databasePath = new URL('../db.json', import.meta.url)


export class Database {
  #database = {}

  constructor() {
    fs.readFile(databasePath, 'utf8')
      .then(data => {
        this.#database = JSON.parse(data);
      })
      .catch(() => {
        this.#persiste() // caso de erro e no momento de instanciar não encontre o arquivo ele cria
      })
  }

  #persiste() {
    fs.writeFile(databasePath, JSON.stringify(this.#database))
  }

  select(table) {
    const data = this.#database[table] ?? []

    return data
  }

  insert(table, data) {
    console.log(this.#database);
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data)
    } else {
      this.#database[table] = [data]
    }

    this.#persiste()

    return data
  }
}