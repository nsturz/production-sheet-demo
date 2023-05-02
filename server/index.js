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

// GET all years (mainly used in new-job-modal.jsx) 👇🏼
app.get('/api/years', (req, res, next) => {
  const sql = `
  select "year",
         "yearId"
  from years`;
  db.query(sql)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

// GET one year by "yearId" (mainly used in edit-job-modal.jsx) 👇🏼
app.get('/api/year/:yearId', (req, res, next) => {
  const yearId = Number(req.params.yearId);
  if (!yearId) {
    throw new ClientError(400, 'yearId must be a positive integer');
  }
  const sql = `
  select "year"
  from "years"
  where "yearId" = $1`;
  const params = [yearId];
  db.query(sql, params)
    .then(result => {
      if (!result.rows[0]) {
        throw new ClientError(404, `cannot find year with yearId ${yearId}`);
      }
      res.json(result.rows[0]);
    })
    .catch(err => next(err));
});

// GET one week by "weekId" (mainly used in edit-job-modal.jsx) 👇🏼
app.get('/api/week/:weekId', (req, res, next) => {
  const weekId = Number(req.params.weekId);
  if (!weekId) {
    throw new ClientError(400, 'week must be a positive integer');
  }
  const sql = `
  select "week"
  from "weeks"
  where "weekId" = $1`;
  const params = [weekId];
  db.query(sql, params)
    .then(result => {
      if (!result.rows[0]) {
        throw new ClientError(404, `cannot find week with yearId ${weekId}`);
      }
      res.json(result.rows[0]);
    })
    .catch(err => next(err));
});

// GET all weeks by "yearId" (mainly used in new-job-modal.jsx) 👇🏼
app.get('/api/weeks/:yearId', (req, res, next) => {
  const yearId = Number(req.params.yearId);
  if (!yearId) {
    throw new ClientError(400, 'yearId must be a positive integer');
  }
  const sql = `
  select "week",
         "weekId",
         "yearId"
  from "weeks"
  where "yearId" = $1
  order by "week" asc`;
  const params = [yearId];
  db.query(sql, params)
    .then(result => {
      if (!result.rows[0]) {
        throw new ClientError(404, `cannot find week with yearId ${yearId}`);
      }
      res.json(result.rows);
    })
    .catch(err => next(err));
});

// GET all the totalCopies of the week 👇🏼
app.get('/api/total-copies/:yearId/:weekId', (req, res, next) => {
  const yearId = Number(req.params.yearId);
  const weekId = Number(req.params.weekId);
  if (!yearId && !weekId) {
    throw new ClientError(400, 'You must include a yearId and weekId in the request.');
  } else if (!yearId || !weekId) {
    throw new ClientError(400, 'Both a yearId and weekId must be included in the request.');
  }
  const sql = `
  SELECT SUM("totalCopies")
  from   "jobs"
  where "yearId" = $1 AND "weekId" = $2`;
  const params = [yearId, weekId];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows[0].sum);
    })
    .catch(err => next(err));
});

// GET all distributors (mainly used in new-job-modal.jsx) 👇🏼
app.get('/api/distributors', (req, res, next) => {
  const sql = `
  select "distributorId",
        "distributorName",
        "distributorAddressId"
  from distributors`;
  db.query(sql)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

// GET all job info about multiple jobs based on year id AND weekId👇🏼
app.get('/api/job-list/:yearId/:weekId', (req, res, next) => {
  const yearId = Number(req.params.yearId);
  const weekId = Number(req.params.weekId);
  if (!yearId && !weekId) {
    throw new ClientError(400, 'You must include a yearId and weekId in the request.');
  } else if (!yearId || !weekId) {
    throw new ClientError(400, 'Both a yearId and weekId must be included in the request.');

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
          "totalCopies",
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
   join "companies" using ("companyId")
   join "distributors" using ("distributorId")
   join "companyAddresses" using ("companyAddressId")
   join "distributorAddresses" using ("distributorAddressId")
   where "yearId" = $1 AND "weekId" = $2
   order by "jobId" asc`;
  const params = [yearId, weekId];
  db.query(sql, params)
    .then(result => {
      if (!result.rows[0]) {
        throw new ClientError(404, `cannot find jobs with yearId ${yearId} and weekId ${weekId}`);
      }
      res.json(result.rows);
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
   join "companies" using ("companyId")
   join "distributors" using ("distributorId")
   join "companyAddresses" using ("companyAddressId")
   join "distributorAddresses" using ("distributorAddressId")
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

// POST new Company information 👇🏼
app.post('/api/new-company', (req, res) => {
  const {
    companyAddress,
    companyCity,
    companyState,
    companyZip,
    companyName
  } = req.body;
  const insertCompanyAddressSql = `
  insert into "companyAddresses" ("address", "city", "state", "zip")
  values      ($1, $2, $3, $4)
  returning *`;
  const insertCompanyAddressParams = [companyAddress, companyCity, companyState, companyZip];
  db.query(insertCompanyAddressSql, insertCompanyAddressParams)
    .then(companyAddressResult => {
      const [newCompanyAddress] = companyAddressResult.rows;
      const insertCompanySql = `
      insert into "companies" ("companyName", "companyAddressId")
      values      ($1, $2)
      returning *`;
      const insertCompanyParams = [companyName, newCompanyAddress.companyAddressId];
      db.query(insertCompanySql, insertCompanyParams)
        .then(result => {
          const [newCompany] = result.rows;
          res.status(201).json(newCompany);
        })
        .catch(err => {
          console.error(err);
          res.status(500).json({ error: 'an un expected error occured.' });
        });
    });
});

// POST new Distributor information 👇🏼
app.post('/api/new-distributor', (req, res) => {
  const {
    distributorAddress,
    distributorCity,
    distributorState,
    distributorZip,
    distributorName
  } = req.body;
  const insertDistributorAddressSql = `
    insert into "distributorAddresses" ("address", "city", "state", "zip")
    values      ($1, $2, $3, $4)
    returning *`;
  const insertDistributorAddressParams = [distributorAddress, distributorCity, distributorState, distributorZip];
  db.query(insertDistributorAddressSql, insertDistributorAddressParams)
    .then(distributorAddressResult => {
      const [newDistributorAddress] = distributorAddressResult.rows;
      const insertDistributorSql = `
        insert into "distributors" ("distributorName", "distributorAddressId")
        values      ($1, $2)
        returning *`;
      const insertDistributorParams = [distributorName, newDistributorAddress.distributorAddressId];
      db.query(insertDistributorSql, insertDistributorParams)
        .then(result => {
          const [newDistributor] = result.rows;
          res.status(201).json(newDistributor);
        })
        .catch(err => {
          console.error(err);
          res.status(500).json({ error: 'an unexpected error occured.' });
        });
    });
});

// POST a new JOB to the database 👇🏼
app.post('/api/new-job', (req, res) => {
  const {
    yearId,
    weekId,
    companyAddress,
    companyCity,
    companyState,
    companyZip,
    companyName,
    distributorId,
    jobNumber,
    paperSize,
    paperWeight,
    shipDate,
    dueDate,
    inHomeDate,
    instructions,
    headline,
    storeCopies,
    distributorCopies,
    officeCopies,
    orderStatus,
    shippingStatus,
    paymentStatus
  } = req.body;
  const totalCopies = Number(storeCopies) + Number(distributorCopies) + Number(officeCopies);
  if (!yearId || !weekId || !companyName || !companyAddress || !companyCity || !companyState ||
    !companyZip || !distributorId || !jobNumber || !paperSize || !paperWeight || !shipDate ||
    !dueDate || !inHomeDate || !instructions || !headline || !storeCopies || !distributorCopies || !officeCopies ||
    !orderStatus || !shippingStatus || !paymentStatus) {
    res.status(400).json({ error: 'Make sure you have entered all required fields' });
    return;
  }
  const insertCompanyAddressSql = `
  insert into "companyAddresses" ("address", "city", "state", "zip")
  values      ($1, $2, $3, $4)
  returning *`;
  const insertCompanyAddressParams = [companyAddress, companyCity, companyState, companyZip];
  db.query(insertCompanyAddressSql, insertCompanyAddressParams)
    .then(companyAddressResult => {
      const [newCompanyAddress] = companyAddressResult.rows;
      const insertCompanySql = `
      insert into "companies" ("companyName", "companyAddressId")
      values      ($1, $2)
      returning *`;
      const insertCompanyParams = [companyName, newCompanyAddress.companyAddressId];
      db.query(insertCompanySql, insertCompanyParams)
        .then(result => {
          const [newCompany] = result.rows;
          const insertJobSql = `
            insert into "jobs" ("yearId", "weekId", "companyId", "distributorId", "jobNumber", "paperSize", "paperWeight", "shipDate", "dueDate", "inHomeDate", "instructions", "headline", "storeCopies", "distributorCopies", "officeCopies","totalCopies", "orderStatus", "shippingStatus", "paymentStatus")
            values      ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18, $19)
            returning *`;
          const insertJobParams = [yearId, weekId, newCompany.companyId, distributorId, jobNumber, paperSize, paperWeight, shipDate, dueDate, inHomeDate, instructions, headline, storeCopies, distributorCopies, officeCopies, totalCopies, orderStatus, shippingStatus, paymentStatus];
          db.query(insertJobSql, insertJobParams)
            .then(result => {
              const [newJob] = result.rows;
              res.status(201).json(newJob);
            })
            .catch(err => {
              console.error(err);
              res.status(500).json({ error: 'sad day. error. ' });
            });
        });
    });
});

// UPDATE Jobs in the database 👇🏼
app.patch('/api/edit-job/:jobId', (req, res) => {
  const jobId = Number(req.params.jobId);
  if (!jobId) {
    throw new ClientError(400, 'jobId must be a positive integer');
  }
  const {
    yearId,
    weekId,
    companyId,
    companyAddress,
    companyCity,
    companyState,
    companyZip,
    companyName,
    distributorId,
    jobNumber,
    paperSize,
    paperWeight,
    shipDate,
    dueDate,
    inHomeDate,
    instructions,
    headline,
    storeCopies,
    distributorCopies,
    officeCopies,
    orderStatus,
    shippingStatus,
    paymentStatus
  } = req.body;
  if (!yearId || !weekId || !companyName || !companyId || !companyAddress || !companyCity || !companyState ||
    !companyZip || !distributorId || !jobNumber || !paperSize || !paperWeight || !shipDate ||
    !dueDate || !inHomeDate || !instructions || !headline || !storeCopies || !distributorCopies || !officeCopies ||
    !orderStatus || !shippingStatus || !paymentStatus) {
    res.status(400).json({ error: 'Make sure you have entered all required fields' });
    return;
  }
  const updateCompanySql = `
          UPDATE "companies"
          set    "companyName" = $1
          where  "companyId" = $2
          returning *`;
  const updateCompanyParams = [companyName, companyId];
  db.query(updateCompanySql, updateCompanyParams)
    .then(result => {
      const [updatedCompany] = result.rows;
      const updateCompanyAddressSql = `
          UPDATE "companyAddresses"
          set    "address" = $1,
                 "city" = $2,
                 "state" = $3,
                 "zip" = $4
          where  "companyAddressId" = $5
          returning *`;
      const updateCompanyAddressParams = [companyAddress, companyCity, companyState, companyZip, updatedCompany.companyAddressId];
      db.query(updateCompanyAddressSql, updateCompanyAddressParams)
        .then(() => {
          const updateJobSql = `
            UPDATE "jobs"
            set     "yearId" = $1,
                    "weekId" = $2,
                    "companyId" = $3,
                    "distributorId" = $4,
                    "jobNumber" = $5,
                    "paperSize" = $6,
                    "paperWeight" = $7,
                    "shipDate" = $8,
                    "dueDate" = $9,
                    "inHomeDate" = $10,
                    "instructions" = $11,
                    "headline" = $12,
                    "storeCopies" = $13,
                    "distributorCopies" = $14,
                    "officeCopies" = $15,
                    "orderStatus" = $16,
                    "shippingStatus" = $17,
                    "paymentStatus" = $18
            where "jobId" = $19
            returning *`;
          const updateJobParams = [yearId, weekId, companyId, distributorId, jobNumber, paperSize, paperWeight, shipDate, dueDate, inHomeDate, instructions, headline, storeCopies, distributorCopies, officeCopies, orderStatus, shippingStatus, paymentStatus, jobId];
          db.query(updateJobSql, updateJobParams)
            .then(result => {
              const [updatedJob] = result.rows;
              res.status(201).json(updatedJob);
            })
            .catch(err => {
              console.error(err);
              res.status(500).json({ error: 'sad day. error. ' });
            });
        });
    });
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
