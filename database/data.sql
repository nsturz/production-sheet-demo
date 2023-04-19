insert into "years" ("year")
values      ('2023');

insert into "weeks" ("week", "yearId")
values      ('1', 1);

insert into "companyAddresses" ("address", "city", "state", "zip")
values       ('2125 International Blvd.', 'Clarksville', 'TN', 37040);

insert into "distributorAddresses" ("address", "city", "state", "zip")
values       ('7924 Troon Circle, S.W.', 'Austell', 'GA', 30168);

insert into "companies" ("companyName", "companyAddressId")
values      ('Furniture Connection - Clarksville', 1);

insert into "distributors" ("distributorName", "distributorAddressId")
values      ('Valassis Atlanta', 1);

insert into "jobs" ("yearId", "weekId", "companyId", "distributorId", "jobNumber", "paperSize", "paperWeight", "shipDate", "dueDate", "inHomeDate", "instructions", "headline", "storeCopies", "distributorCopies", "officeCopies", "orderStatus", "shippingStatus", "paymentStatus")
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
  200,
  345000,
  100,
  'Approved',
  'Shipped',
  'Paid'
)
