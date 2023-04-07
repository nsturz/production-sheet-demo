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
// app.get('/api/addresses/:addressId', (req, res, next) => {
//   const addressId = Number(req.params.addressId);
//   if (!addressId) {
//     throw new ClientError(400, 'addressId must be a positive integer');
//   }
//   const sql = `
//   select "address",
//          "city",
//          "state",
//          "zip"
//   from "addresses"
//   where "addressId" = $1`;
//   const params = [addressId];
//   db.query(sql, params)
//     .then(result => {
//       res.json(result.rows[0]);
//     })
//     .catch(err => next(err));
// });

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
          "distributorName",
          "companyAddresses"."address" as "companyAddress",
          "companyAddresses"."city" as "companyCity",
          "companyAddresses"."state" as "companyState",
          "companyAddresses"."zip" as "companyZip",
          "distributorAddresses"."address" as "distributorAddress",
          "distributorAddresses"."city" as "distributorCity",
          "distributorAddresses"."state" as "distributorState",
          "distributorAddresses"."zip" as "distributorZip"
   from "jobs"
   join "companyAddresses" using ("companyAddressId")
   join "distributorAddresses" using ("distributorAddressId")
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

// POST a new YEAR and its corresponding WEEKS to the database 👇🏼
app.post('/api/new-year', (req, res) => {
  const { year } = req.body;
  const yearSql = `
  insert into "years" ("year")
  values      ($1)
  returning *`;
  const yearParams = [year];
  db.query(yearSql, yearParams)
    .then(yearResult => {
      const [newYear] = yearResult.rows;
      let week = 0;
      for (let i = 0; i < 52; i++) {
        week++;
        const weekSql = `
        insert into "weeks" ("week", "yearId")
        values      ($1, $2)
        returning *`;
        const weekParams = [week, newYear.yearId];
        db.query(weekSql, weekParams);
      }
      res.status(201).json({ success: `Year ${year} created with ${week} weeks` });
    });
});

// POST a new JOB to the database 👇🏼
// app.post('/api/new-job', (req, res) =>{
//   const {
//     companyAddress,
//     companyCity,
//     companyState,
//     companyZip
//     // companyId,
//     // distributorId,
//     //jobNumber,
//     // paperSize,
//     // paperWeight,
//     // shipDate,
//     // dueDate,
//     // inHomeDate,
//     // instructions,
//     // headline,
//     // storeCopies,
//     // distributorCopies,
//     // officeCopies,
//     // orderStatus,
//     // shippingStatus,
//     // paymentStatus
//   } = req.body;
//   // if(!yearId ||!weekId ||!companyId ||!distributorId ||!jobNumber ||!paperSize ||!paperWeight ||!shipDate ||
//   //   !dueDate ||!inHomeDate ||!instructions ||!headline ||!storeCopies ||!distributorCopies ||!officeCopies ||
//   //   !orderStatus ||!shippingStatus ||!paymentStatus){
//   //   res.status(400).json({error: 'Make sure you have entered all required fields'});
//   //   return;
//   // }
// })
app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
// http POST:3000/api/new-year year=2024 week1=1 week2=2 week3=3 week4=4 week5=5 week6=6 week7=7 week8=8 week9=9 week10=10 week21=21 week22=22 week23=23 week24=24 week25=25 week26=26 week27=27 week28=28 week29=29 week30=30 week31=31 week32=32 week33=33 week34=34 week35=35 week36=36 week37=37 week38=38 week39=39 week40=40 week41=41 week42=42 week43=43 week44=44 week45=45 week46=46 week47=47 week48=48 week49=49 week50=50 week51=51 week52=52
