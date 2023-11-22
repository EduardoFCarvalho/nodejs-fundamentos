// Netflix e Spotfy

// Importação de clientes via CSV (excel)
// 1gb - 1.000.000 
// Post /upload import.csv

// 10 mb/s - 100s

// 100s -> Inserção no banco de dados

// 10mb/s -> 10.000

// Readable Streams / Writable Streams

import { Readable, Writable , Transform } from 'node:stream'

class OneToHundredStream extends Readable {
  index = 1
  _read() {
    const i = this.index++

    setTimeout(() => {
      if (i > 100) {
        this.push(null)
      } else {
        const buf = Buffer.from(String(i)) // precisa ser um Buffer e o Buffer só recebe string

        this.push(buf)
      }
    }, 200);
  }

}

class InverseNumber extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1
    callback(null, Buffer.from(String(transformed))) // no transform precisa de 2 parametros, 1º é o erro e o 2º é o valor transformado e aqui tbm precisa ser um Buffer que só aceita string
  }
}

class MultiplyByTenStram extends Writable {
  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString()) * 10); // precisa converter de buffer para string e depois para numero para poder multiplicar
    callback()
  }
}

new OneToHundredStream()
  .pipe(new InverseNumber())
  .pipe(new MultiplyByTenStram())