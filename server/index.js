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

// GET all job info about one job 👇🏼
app.get('/api/jobs/:jobId', (req, res, next) => {
  const jobId = Number(req.params.jobId);
  if (!jobId) {
    throw new ClientError(400, 'jobId must be a positive integer');
  }
  const sql = `
   select to_char("shipDate",'yyyy-MM-dd'),
          to_char("dueDate", 'yyyy-MM-dd'),
          to_char("inHomeDate", 'yyyy-MM-dd'),
          "jobId",
          "yearId",
          "weekId",
          "companyId",
          "distributorId",
          "jobNumber",
          "paperSize",
          "paperWeight",
          "instructions",
          "storeCopies",
          "distributorCopies,
          "officeCopies",
          "orderStatus",
          "shippingStatus",
          "paymentStatus"
   from "jobs"
   where "jobId" = $1`;
  const params = [jobId];
  db.query(sql, params)
  //  console.log('sql, params', sql, params)
    .then(result => {
      if (!result.rows[0]) {
        throw new ClientError(404, `cannot find show with jobId ${jobId}`);
      }
      // console.log('result.rows[0]', result.rows[0])
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
