set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";


CREATE TABLE "jobs" (
	"jobId" serial NOT NULL,
	"yearId" integer NOT NULL,
	"weekId" integer NOT NULL,
	"companyId" integer NOT NULL,
	"distributorId" integer NOT NULL,
	"companyAddressId" integer NOT NULL,
	"distributorAddressId" integer NOT NULL,
	"jobNumber" TEXT NOT NULL,
	"paperSize" TEXT NOT NULL,
	"paperWeight" TEXT NOT NULL,
	"shipDate" DATE NOT NULL,
	"duedate" DATE NOT NULL,
	"inHomeDate" DATE NOT NULL,
	"instructions" TEXT NOT NULL,
	"headline" TEXT NOT NULL,
	"storeCopies" integer NOT NULL,
	"distributorCopies" integer NOT NULL,
	"officeCopies" integer NOT NULL,
	"orderStatus" TEXT NOT NULL,
	"shippingStatus" TEXT NOT NULL,
	"paymentStatus" TEXT NOT NULL,
	CONSTRAINT "jobs_pk" PRIMARY KEY ("jobId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "companies" (
	"companyName" TEXT NOT NULL,
	"companyId" serial NOT NULL,
	"companyAddressId" integer NOT NULL,
	CONSTRAINT "companies_pk" PRIMARY KEY ("companyId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "distributors" (
	"distributorName" TEXT NOT NULL,
	"distributorId" serial NOT NULL,
	"distributorAddressId" integer NOT NULL,
	CONSTRAINT "distributors_pk" PRIMARY KEY ("distributorId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "companyAddresses" (
	"address" TEXT NOT NULL,
	"companyAddressId" integer NOT NULL,
	"city" TEXT NOT NULL,
	"state" TEXT NOT NULL,
	"zip" integer NOT NULL,
	CONSTRAINT "companyAddresses_pk" PRIMARY KEY ("companyAddressId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "weeks" (
	"weekId" serial NOT NULL,
	"week" integer NOT NULL,
	"yearId" integer NOT NULL,
	CONSTRAINT "weeks_pk" PRIMARY KEY ("weekId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "years" (
	"yearId" serial NOT NULL,
	"year" integer NOT NULL,
	CONSTRAINT "years_pk" PRIMARY KEY ("yearId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "distributorAddresses" (
	"distributorAddressId" serial NOT NULL,
	"address" TEXT NOT NULL,
	"city" TEXT NOT NULL,
	"state" TEXT NOT NULL,
	"zip" integer NOT NULL,
	CONSTRAINT "distributorAddresses_pk" PRIMARY KEY ("distributorAddressId")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "jobs" ADD CONSTRAINT "jobs_fk0" FOREIGN KEY ("yearId") REFERENCES "years"("yearId");
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_fk1" FOREIGN KEY ("weekId") REFERENCES "weeks"("weekId");
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_fk2" FOREIGN KEY ("companyId") REFERENCES "companies"("companyId");
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_fk3" FOREIGN KEY ("distributorId") REFERENCES "distributors"("distributorId");
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_fk4" FOREIGN KEY ("companyAddressId") REFERENCES "companyAddresses"("companyAddressId");
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_fk5" FOREIGN KEY ("distributorAddressId") REFERENCES "distributorAddresses"("distributorAddressId");

ALTER TABLE "companies" ADD CONSTRAINT "companies_fk0" FOREIGN KEY ("companyAddressId") REFERENCES "companyAddresses"("companyAddressId");

ALTER TABLE "distributors" ADD CONSTRAINT "distributors_fk0" FOREIGN KEY ("distributorAddressId") REFERENCES "distributorAddresses"("distributorAddressId");


ALTER TABLE "weeks" ADD CONSTRAINT "weeks_fk0" FOREIGN KEY ("yearId") REFERENCES "years"("yearId");
