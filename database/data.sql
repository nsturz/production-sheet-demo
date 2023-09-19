insert into "users" ("username", "hashedPassword", "isAdmin")
values ('anonymous', '$argon2i$v=19$m=4096,t=3,p=1$h7icQD/xZr8akZsX+hNA0A$h68atJWyjvunAwNOpSpMfg9sPvoMQ6dKwoh0dJhurWA', true );

insert into "years" ("year")
values      ('2023');

insert into "weeks" ("week", "yearId")
values      ('1', 1),
            ('2', 1),
            ('3', 1),
            ('4', 1),
            ('5', 1);

insert into "companyAddresses" ("address", "city", "state", "zip")
values       ('3142 Mansfield Blvd.', 'Clarksville', 'TN', 37040);

insert into "distributorAddresses" ("address", "city", "state", "zip")
values       ('6726 Ace Ct.', 'Austell', 'GA', 30168);

insert into "companies" ("companyName", "companyAddressId")
values      ('Family Furniture - Clarksville', 1);

insert into "distributors" ("distributorName", "distributorAddressId")
values      ('V. Atlanta', 1);

insert into "jobs" ("yearId", "weekId", "companyId", "distributorId", "jobNumber", "paperSize", "paperWeight", "shipDate", "dueDate", "inHomeDate", "instructions", "headline", "storeCopies", "distributorCopies", "officeCopies","totalCopies", "orderStatus", "shippingStatus", "paymentStatus", "isCancelled")
values (
  1,
  1,
  1,
  1,
  'ASH23-01-001',
  '10.75 x 11.875 Full Bleed',
  '43#',
  DATE '2022-12-15',
  DATE '2022-12-22',
  DATE '2023-1-2',
  'N/A',
  'NEW YEAR, NEW BRANDS, NEW...',
  100,
  100,
  100,
  300,
  'Approved',
  'Shipped',
  'Paid',
  false
),
 (
  1,
  1,
  1,
  1,
  'ASH23-01-002',
  '10.75 x 11.875 Full Bleed',
  '43#',
  DATE '2022-12-15',
  DATE '2022-12-22',
  DATE '2023-1-2',
  'N/A',
  'NEW YEAR, NEW BRANDS, NEW...',
  200,
  345000,
  100,
  345300,
  'Approved',
  'Shipped',
  'Paid',
  false
),
 (
  1,
  1,
  1,
  1,
  'ASH23-01-003',
  '10.75 x 11.875 Full Bleed',
  '43#',
  DATE '2022-12-15',
  DATE '2022-12-22',
  DATE '2023-1-2',
  'N/A',
  'NEW YEAR, NEW BRANDS, NEW...',
  200,
  345000,
  100,
  345300,
  'Approved',
  'Shipped',
  'Paid',
  false
),
 (
  1,
  1,
  1,
  1,
  'ASH23-01-004',
  '10.75 x 11.875 Full Bleed',
  '43#',
  DATE '2022-12-15',
  DATE '2022-12-22',
  DATE '2023-1-2',
  'N/A',
  'NEW YEAR, NEW BRANDS, NEW...',
  200,
  345000,
  100,
  345300,
  'Approved',
  'Shipped',
  'Paid',
  false
)
