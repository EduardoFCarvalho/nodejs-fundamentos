// Buffer é uma representação de um espeçao na memória do computador, usado pra transitar de dados de uma maneira muito rápida
// Após tratados eles são removidos
// Sendo uma maneira performatica, por armazenar de forma binária


const buf = Buffer.from("hello")
 
console.log(buf); // retorn base Hexadecimal
console.log(buf.toJSON()); // returno base decimal