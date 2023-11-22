import  http  from 'node:http'
import { Transform } from 'node:stream'

class InverseNumber extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1

    console.log(transformed);

    callback(null, Buffer.from(String(transformed))) // no transform precisa de 2 parametros, 1º é o erro e o 2º é o valor transformado e aqui tbm precisa ser um Buffer que só aceita string
  }
}

// req => readeble string
// res => writeble string
// const server = http.createServer((req, res) => {
//   return req
//   .pipe(new InverseNumber())
//   .pipe(res)
// })

const server = http.createServer(async (req, res) => {
  const buffers = []

  for await (const chunk of req) {
    buffers.push(chunk)
  }
  const fullStreamContent = Buffer.concat(buffers).toString()

  console.log(fullStreamContent)

  res.end(fullStreamContent)
})

server.listen(3334)