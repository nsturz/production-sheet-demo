require('dotenv/config');
const express = require('express');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
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

// Add a new user to the database 👇🏼
app.post('/api/auth/sign-up', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(400, 'username and password are required fields');
  }
  argon2
    .hash(password)
    .then(hashedPassword => {
      const sql = `
        insert into "users" ("username", "hashedPassword")
        values ($1, $2)
        returning "userId", "username", "joinedAt"
      `;
      const params = [username, hashedPassword];
      return db.query(sql, params);
    })
    .then(result => {
      const [user] = result.rows;
      res.status(201).json(user);
    })
    .catch(err => next(err));
});

// Sign in 👇🏼
app.post('/api/auth/sign-in', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(401, 'invalid login');
  }
  const sql = `
    select  "userId" ,
            "hashedPassword"
    from "users"
    where "username" = $1`;
  const params = [username];
  db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      if (!user) {
        throw new ClientError(401, 'invalid login');
      }
      const { userId, hashedPassword } = user;
      return argon2
        .verify(hashedPassword, password)
        .then(isMatching => {
          if (!isMatching) {
            throw new ClientError(401, 'invalid login');
          }
          const payload = { userId, username };
          const token = jwt.sign(payload, process.env.TOKEN_SECRET);
          res.json({ token, user: payload });
        });
    })
    .catch(err => next(err));
});

// GET all users from the database 👇🏼
app.get('/api/all-users', (req, res, next) => {
  const sql = `
  select "userId",
         "username",
         to_char("joinedAt",'MM-dd-yyyy') as "dateJoined"
  from "users"
  order by "userId"`;
  db.query(sql)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

// DELETE a user from the database👇🏼
app.delete('/api/delete-user/:userId', (req, res, next) => {
  const userId = Number(req.params.userId);
  if (!userId) {
    throw new ClientError(400, 'userId must be included in body of request');
  }
  const sql = `
  delete from "users"
  where "userId" = $1
  returning "username", "userId"`;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
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
  where "yearId" = $1 AND "weekId" = $2 AND "isCancelled" = false`;
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
   select to_char("shipDate",'MM-dd-yyyy') as "shipDate",
          to_char("dueDate", 'MM-dd-yyyy') as "dueDate",
          to_char("inHomeDate", 'MM-dd-yyyy') as "inHomeDate",
          "jobId",
          "isCancelled",
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

// GET all CANCELLED JOBS based on year id AND weekId👇🏼
app.get('/api/cancelled-job-list/:yearId/:weekId', (req, res, next) => {
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
   where "yearId" = $1 AND "weekId" = $2 AND "isCancelled" = true
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

// GET all job info about one job byb jobId 👇🏼
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
          "yearId" as "yearId",
          "weekId" as "weekId",
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

// GET all info about one job by searching for jobNumber 👇🏼
app.get('/api/job-number/:jobNumber', (req, res, next) => {
  const jobNumber = req.params.jobNumber;
  if (!jobNumber) {
    throw new ClientError(400, 'jobNumber must be a string');
  }
  const sql = `
   select to_char("shipDate",'yyyy-MM-dd') as "shipDate",
          to_char("dueDate", 'yyyy-MM-dd') as "dueDate",
          to_char("inHomeDate", 'yyyy-MM-dd') as "inHomeDate",
          "jobId",
          "yearId" as "yearId",
          "weekId" as "weekId",
          "companyId",
          "distributorId",
          "distributorAddressId",
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
   where "jobNumber" = $1`;
  const params = [jobNumber];
  db.query(sql, params)
    .then(result => {
      if (!result.rows[0]) {
        throw new ClientError(404, `cannot find show with jobNumber ${jobNumber}`);
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
    distributorAddressId,
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
  const isCancelled = false;
  if (!yearId || !weekId || !companyName || !companyAddress || !companyCity || !companyState ||
    !companyZip || !distributorId || !jobNumber || !paperSize || !paperWeight || !shipDate ||
    !dueDate || !inHomeDate || !instructions || !headline || !storeCopies || !distributorCopies || !officeCopies ||
    !orderStatus || !shippingStatus || !paymentStatus) {
    res.status(400).json({ error: 'Make sure you have entered all required fields' });
    return;
  }
  const getDistributorAddressSql = `
    select "address",
           "city",
           "state",
           "zip"
    from "distributorAddresses"
    where "distributorAddressId" = $1`;
  const getDistributorAddressParams = [distributorAddressId];
  db.query(getDistributorAddressSql, getDistributorAddressParams)
    .then(distributorAddressResult => {
      const [distributorAddressInfo] = distributorAddressResult.rows;
      const getDistributorNameSql = `
        select "distributorName"
        from "distributors"
        where "distributorId" = $1`;
      const getDistributorNameParams = [distributorId];
      db.query(getDistributorNameSql, getDistributorNameParams)
        .then(distributorNameResult => {
          const [distributorNameInfo] = distributorNameResult.rows;
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
                    insert into "jobs" ("yearId", "weekId", "companyId", "distributorId", "jobNumber", "paperSize", "paperWeight", "shipDate", "dueDate", "inHomeDate", "instructions", "headline", "storeCopies", "distributorCopies", "officeCopies","totalCopies", "orderStatus", "shippingStatus", "paymentStatus", "isCancelled")
                    values      ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18, $19, $20)
                    returning *`;
                  const insertJobParams = [yearId, weekId, newCompany.companyId, distributorId, jobNumber, paperSize, paperWeight, shipDate, dueDate, inHomeDate, instructions, headline, storeCopies, distributorCopies, officeCopies, totalCopies, orderStatus, shippingStatus, paymentStatus, isCancelled];
                  db.query(insertJobSql, insertJobParams)
                    .then(result => {
                      const [newJob] = result.rows;
                      const getDateSql = `
                        select to_char("shipDate",'MM-dd-yyyy') as "shipDate",
                                to_char("dueDate", 'MM-dd-yyyy') as "dueDate",
                                to_char("inHomeDate", 'MM-dd-yyyy') as "inHomeDate"
                        from "jobs"
                        where "jobId" = $1`;
                      const getDateParams = [newJob.jobId];
                      db.query(getDateSql, getDateParams)
                        .then(getDateResult => {
                          const [dateInfo] = getDateResult.rows;
                          newJob.companyName = newCompany.companyName;
                          newJob.companyAddress = companyAddress;
                          newJob.companyCity = companyCity;
                          newJob.companyState = companyState;
                          newJob.companyZip = companyZip;
                          newJob.distributorName = distributorNameInfo.distributorName;
                          newJob.distributorAddress = distributorAddressInfo.address;
                          newJob.distributorCity = distributorAddressInfo.city;
                          newJob.distributorState = distributorAddressInfo.state;
                          newJob.distributorZip = distributorAddressInfo.zip;
                          newJob.shipDate = dateInfo.shipDate;
                          newJob.dueDate = dateInfo.dueDate;
                          newJob.inHomeDate = dateInfo.inHomeDate;
                          res.status(201).json(newJob);
                        })
                        .catch(err => {
                          console.error(err);
                          res.status(500).json({ error: 'sad day. error. ' });
                        });
                    });
                });
            });
        });
    });
});

// CANCEL a job, and UPDATE its "isCancelled" status in the database👇🏼
app.patch('/api/cancel-job/:jobId', (req, res) => {
  const jobId = Number(req.params.jobId);
  if (!jobId) {
    throw new ClientError(400, 'jobId must be a positive integer');
  }
  const updateJobSql = `
    UPDATE "jobs"
    set    "isCancelled" = true
    where  "jobId" = $1
    returning *`;
  const updateJobParams = [jobId];
  db.query(updateJobSql, updateJobParams)
    .then(result => {
      const [cancelledJob] = result.rows;
      const getCompanyInfoSql = `
      select "companyName",
             "address" as "companyAddress",
             "city" as "companyCity",
             "state" as "companyState",
             "zip" as "companyZip"
      from "companies"
      join "companyAddresses" using ("companyAddressId")
      where "companyId" = $1 `;
      const getCompanyInfoParams = [cancelledJob.companyId];
      db.query(getCompanyInfoSql, getCompanyInfoParams)
        .then(info => {
          const [companyInfo] = info.rows;
          const getDistributorInfoSql = `
          select "distributorName",
                 "address" as "distributorAddress",
                 "city" as "distributorCity",
                 "state" as "distributorState",
                 "zip" as "distributorZip"
          from "distributors"
          join "distributorAddresses" using ("distributorAddressId")
          where "distributorId" = $1`;
          const getDistributorInfoParams = [cancelledJob.distributorId];
          db.query(getDistributorInfoSql, getDistributorInfoParams)
            .then(info => {
              const [distributorInfo] = info.rows;
              const getDatesSql = `
                select to_char("shipDate",'MM-dd-yyyy') as "shipDate",
                       to_char("dueDate", 'MM-dd-yyyy') as "dueDate",
                       to_char("inHomeDate", 'MM-dd-yyyy') as "inHomeDate"
                from "jobs"
                where "jobId" = $1`;
              const getDatesParams = [cancelledJob.jobId];
              db.query(getDatesSql, getDatesParams)
                .then(info => {
                  const [datesInfo] = info.rows;
                  cancelledJob.companyName = companyInfo.companyName;
                  cancelledJob.companyAddress = companyInfo.companyAddress;
                  cancelledJob.companyCity = companyInfo.companyCity;
                  cancelledJob.companyState = companyInfo.companyState;
                  cancelledJob.companyZip = companyInfo.companyZip;

                  cancelledJob.distributorName = distributorInfo.distributorName;
                  cancelledJob.distributorAddress = distributorInfo.distributorAddress;
                  cancelledJob.distributorCity = distributorInfo.distributorCity;
                  cancelledJob.distributorState = distributorInfo.distributorState;
                  cancelledJob.distributorZip = distributorInfo.distributorZip;

                  cancelledJob.shipDate = datesInfo.shipDate;
                  cancelledJob.dueDate = datesInfo.dueDate;
                  cancelledJob.inHomeDate = datesInfo.inHomeDate;
                  res.status(201).json(cancelledJob);
                })
                .catch(err => {
                  console.error(err);
                  res.status(500).json({ error: 'sad day. error. ' });
                });
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
    distributorAddressId,
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
  if (!yearId || !weekId || !companyName || !companyId || !companyAddress || !companyCity || !companyState ||
    !companyZip || !distributorId || !jobNumber || !paperSize || !paperWeight || !shipDate ||
    !dueDate || !inHomeDate || !instructions || !headline || !storeCopies || !distributorCopies || !officeCopies ||
    !orderStatus || !shippingStatus || !paymentStatus) {
    res.status(400).json({ error: 'Make sure you have entered all required fields' });
    return;
  }
  const getDistributorAddressSql = `
    select "address",
           "city",
           "state",
           "zip"
    from "distributorAddresses"
    where "distributorAddressId" = $1`;
  const getDistributorAddressParams = [distributorAddressId];
  db.query(getDistributorAddressSql, getDistributorAddressParams)
    .then(distributorAddressResult => {
      const [distributorAddressInfo] = distributorAddressResult.rows;
      const getDistributorNameSql = `
        select "distributorName"
        from "distributors"
        where "distributorId" = $1`;
      const getDistributorNameParams = [distributorId];
      db.query(getDistributorNameSql, getDistributorNameParams)
        .then(distributorNameResult => {
          const [distributorNameInfo] = distributorNameResult.rows;
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
                  set    "yearId" = $1,
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
                        "totalCopies" = $16,
                        "orderStatus" = $17,
                        "shippingStatus" = $18,
                        "paymentStatus" = $19
                  where "jobId" = $20
                  returning *`;
                  const updateJobParams = [yearId, weekId, companyId, distributorId, jobNumber, paperSize, paperWeight, shipDate, dueDate, inHomeDate, instructions, headline, storeCopies, distributorCopies, officeCopies, totalCopies, orderStatus, shippingStatus, paymentStatus, jobId];
                  db.query(updateJobSql, updateJobParams)
                    .then(result => {
                      const [updatedJob] = result.rows;
                      const getDateSql = `
                        select to_char("shipDate",'MM-dd-yyyy') as "shipDate",
                                to_char("dueDate", 'MM-dd-yyyy') as "dueDate",
                                to_char("inHomeDate", 'MM-dd-yyyy') as "inHomeDate"
                        from "jobs"
                        where "jobId" = $1`;
                      const getDateParams = [updatedJob.jobId];
                      db.query(getDateSql, getDateParams)
                        .then(getDateResult => {
                          const [dateInfo] = getDateResult.rows;
                          updatedJob.companyName = companyName;
                          updatedJob.companyAddress = companyAddress;
                          updatedJob.companyCity = companyCity;
                          updatedJob.companyState = companyState;
                          updatedJob.companyZip = companyZip;
                          updatedJob.distributorName = distributorNameInfo.distributorName;
                          updatedJob.distributorAddress = distributorAddressInfo.address;
                          updatedJob.distributorCity = distributorAddressInfo.city;
                          updatedJob.distributorState = distributorAddressInfo.state;
                          updatedJob.distributorZip = distributorAddressInfo.zip;
                          updatedJob.shipDate = dateInfo.shipDate;
                          updatedJob.dueDate = dateInfo.dueDate;
                          updatedJob.inHomeDate = dateInfo.inHomeDate;
                          res.status(201).json(updatedJob);
                        })
                        .catch(err => {
                          console.error(err);
                          res.status(500).json({ error: 'sad day. error. ' });
                        });
                    });
                });
            });
        });
    });
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
