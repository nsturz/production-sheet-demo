require('dotenv/config');
const express = require('express');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');
const db = require('./db');
const app = express();

app.use(express.json());

app.use(staticMiddleware);

app.get('/api/hello', (req, res, next) => {
  res.json({ hello: 'world' });
});

// GET Addresses 👇🏼
app.get('/api/addresses/:addressId', (req, res, next) => {
  const addressId = Number(req.params.addressId);
  if (!addressId) {
    throw new ClientError(400, 'addressId must be a positive integer');
  }
  const sql = `
  select "address",
         "city",
         "state",
         "zip"
  from "addresses"
  where "addressId" = $1`;
  const params = [addressId];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows[0]);
    })
    .catch(err => next(err));
});

// GET all job info about one job 👇🏼
app.get('/api/jobs/:jobId', (req, res, next) => {
  const jobId = Number(req.params.jobId);
  if (!jobId) {
    throw new ClientError(400, 'jobId must be a positive integer');
  }
  const sql = `
   select to_char("shipDate",'yyyy-MM-dd') as "shipDate",
          to_char("dueDate", 'yyyy-MM-dd') as "dueDate",
          to_char("inHomeDate", 'yyyy-MM-dd') as "inHomeDate",
          "jobId",
          "yearId",
          "weekId",
          "companyId",
          "distributorId",
          "jobNumber",
          "paperSize",
          "paperWeight",
          "instructions",
          "headline",
          "storeCopies",
          "distributorCopies",
          "officeCopies",
          "orderStatus",
          "paymentStatus",
          "shippingStatus",
          "companyName",
          "distributorName"
   from "jobs"
   join "companies" using ("companyId")
   join "distributors" using ("distributorId")
   where "jobId" = $1`;
  const params = [jobId];
  db.query(sql, params)
    .then(result => {
      if (!result.rows[0]) {
        throw new ClientError(404, `cannot find show with jobId ${jobId}`);
      }
      res.json(result.rows[0]);
    })
    .catch(err => next(err));
});

// POST a new JOB to the database 👇🏼
// app.post('/api/new-job', (req, res) =>{
//   const {
//     year,
//     yearId
//     week,
//     weekId,
//     companyId,
//     distributorId,
//     jobNumber,
//     paperSize,
//     paperWeight,
//     shipDate,
//     dueDate,
//     inHomeDate,
//     instructions,
//     headline,
//     storeCopies,
//     distributorCopies,
//     officeCopies,
//     orderStatus,
//     shippingStatus,
//     paymentStatus
//   } = req.body;
//   if(!yearId ||!weekId ||!companyId ||!distributorId ||!jobNumber ||!paperSize ||!paperWeight ||!shipDate ||
//     !dueDate ||!inHomeDate ||!instructions ||!headline ||!storeCopies ||!distributorCopies ||!officeCopies ||
//     !orderStatus ||!shippingStatus ||!paymentStatus){
//     res.status(400).json({error: 'Make sure you have entered all required fields'});
//     return;
//   }
//   const insertYearSql = `
//   insert into "years" ("year")
//   values      ($1)
//   returning*`;
//   const insertYearParams = [ year ];
//   db.query(insertYearSql, insertYearParams)
//   .then(yearResult => {

//   })
// })

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
