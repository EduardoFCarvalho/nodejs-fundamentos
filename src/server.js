import http from "node:http";
import { json } from "./middlewares/json.js";
import {routes} from './routes.js';   

// Query Parameters: URL Stateful => Filtros, paginação, etc (não obrigatorios)
// Route Parameters: Identificação de recursos
// Request Body: envio de infos via formulario (passa pelo https)

// http://localhost:3333/users?userId=1
// DELETE http://localhost:3333/users/1
// POST http://localhost:3333/users

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  await json(req, res)

 const route = routes.find(route => {
  return route.method === method && route.path === url
 })

 if(route) {
  return route.handler(req, res)
 };

  return res.writeHead(404).end();
})

server.listen(3333)