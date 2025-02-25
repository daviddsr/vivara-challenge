# Vivara Challenge

## 📌 Project Description

Vivara Challenge is a backend application developed with **NestJS**, following a **hexagonal architecture** with **bounded contexts**. Its goal is to manage profiles, contracts, and jobs, allowing clients to pay for pending jobs if they have sufficient balance.

## 🚀 Technologies Used

- **NestJS** (Backend framework)
- **TypeScript**
- **Prisma** (ORM for PostgreSQL)
- **PostgreSQL** (Relational database)
- **Jest** (Testing)
- **Supertest** (Integration testing)

## 📂 Project Architecture

The project follows a hexagonal architecture, organized into **bounded contexts** inside `src/`:

- `profiles/` → Profile management
- `contracts/` → Contract management
- `jobs/` → Job management
- `shared/` → Middleware, and configuration

Each bounded context has **three main layers**:

1. **Application** → Use cases
2. **Domain** → Entities and repositories
3. **Infrastructure** → HTTP controllers and implementation repositories

## 🛠️ Local Environment Setup

### 1️⃣ Clone the Repository

```sh
git clone <REPOSITORY_URL>
cd vivara-challenge
```

### Install dependencies

```sh
npm install
```

### Run migrations

```sh
npx prisma migrate dev --name init
```

### Seed database

```sh
npm run seed
```

### Start local server

```sh
npm run start:dev
```

### Run unit tests

```sh
npm run test
```

### Run integration tests

```sh
npm run test:e2e
```

## 🛠️ Challenge requirements

# Profile

A profile can be either a client or a contractor.
clients create contracts with contractors. contractor does jobs for clients and get paid.
Each profile has a balance property.

# Contract

A contract between and client and a contractor.
Contracts have 3 statuses, new, in_progress, terminated. contracts are considered active only when in status in_progress
Contracts group jobs within them.

# Job

Contractor get paid for jobs by clients under a certain contract.

# Below is a list of the required API's for the application.

GET /contracts/:id - This API is broken 😵! it should return the contract only if it belongs to the profile calling. better fix that!

GET /contracts - Returns a list of contracts belonging to a user (client or contractor), the list should only contain non terminated contracts.

GET /jobs/unpaid - Get all unpaid jobs for a user (either a client or contractor), for active contracts only.

POST /jobs/:id/pay - Pay for a job, a client can only pay if his balance >= the amount to pay. The amount should be moved from the client's balance to the contractor balance.

### Aditional notes

All requests must include profile_id in headers with the id of a Profile
