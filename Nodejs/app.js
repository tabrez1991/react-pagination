import express from 'express';
import db from './db/db';
import bodyParser from 'body-parser';
// Set up the express app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// get all todos
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.get('/details', (req, res, next) => {
  res.status(200).send({
    success: 'true',
    message: 'data retrieved successfully',
    data: db.length
  })
});
app.post('/details', (req, res, next) => {
  const len = db.length;
  const perPage = 10;
  const pageCount = Math.ceil(len / perPage)

  let page = parseInt(req.body.pageNo)
  if (page < 1) page = 1
  if (page > pageCount) page = pageCount

  const from = len - ((page - 1) * perPage)-1
  let to = len - (page * perPage)
  if (to < 0) to = 0
  res.json({
    data: db.slice(to,from+1).reverse(),
    page,
    pageCount
  })
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});