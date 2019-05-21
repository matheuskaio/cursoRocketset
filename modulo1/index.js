const express = require('express')
const nunjucks = require('nunjucks')

const app = express()
// PRIMEIRO PARAMENTRO É O NOME DA PASTA ONDE VÃO FICAR AS VIEWS
nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.use(express.urlencoded({ extended: false }))

app.set('view engine', 'njk')

const users = ['Dara Virginia', 'Matheus Kaio', 'Zoio']

app.get('/', (req, res) => {
  return res.render('list', { users })
})

app.get('/new', (req, res) => {
  return res.render('new')
})

app.post('/create', (req, res) => {
  users.push(req.body.user)
  // return res.send("ok");
  return res.redirect('/')
})

// NA UTILIZAÇÃO DE MIDDLEWARE ELE INTERCEPTA E PARA NESSE METODO,
// POREM PODE SE UTILIZAR O "NEXT" JUNTO AO "REQ" E "RES" INDICANDO,
// QUE O PROXIMO METODO SEJA EXECUTADO E TAMBÉM COLOCAR NO FINAL DO
// METODO O "RETURN NEXT"
// const logMiddleware = (req, res, next) => {
//   console.log(
//     `HOST: ${req.headers.host} | URL: ${req.url} | METHOD: ${req.method}`
//   );
//   return next;
// };

// USANDO O APP.USE(NOMEDOMIDDLEWARE) ISSO FAZ COM QUE TODOS OS METODOS
// UTILIZEM O MIDDLEWARE, EXEMPLO ABAIXO
// app.use(logMiddleware);

// PARA REQUISIÇÕES DO TIPO locahost:3000/?name=Kaio
// app.get("/", logMiddleware, (req, res) => {
//   return res.send(`Bem-Vindo ${req.query.name}`);
// });

// PARA REQUISIÇÕES DO TIPO locahost:3000/nome/kaio
// app.get("/nome/:name", (req, res) => {
//   return res.send(`Bem-Vindo ${req.params.name}`);
// });

// PARA RETORNAR JSON
// app.get("/nome/:name", (req, res) => {
//   return res.json({
//     message: `Bem-Vindo, ${req.params.name}`
//   });
// });

app.listen(3000)
