# PostgreSQL Test Connection

A Node.js project for testing PostgreSQL database connections and running queries.

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and update with your database credentials:

```bash
cp .env.example .env
```

Edit `.env` with your database details:

```
DB_HOST=your_host_here
DB_USER=your_user_here
DB_PORT=5432
DB_PASSWORD=your_password_here
DB_NAME=your_database_here
DB_SSL=true
```

## Project Files

- **`connection.js`** - Database connection module (imports environment variables)
- **`query.js`** - Example queries and connection tests
- **`data.sql`** - SQL script to create tables and insert sample data
- **`.env`** - Your database credentials (DO NOT commit)
- **`.env.example`** - Template for credentials (safe to commit)
- **`.gitignore`** - Prevents `.env` from being committed

## Usage

### Test Connection

```bash
node query.js
```

### Use in Your Code

Import the connection module in any file:

```javascript
const client = require("./connection");

client.query("SELECT * FROM users", (err, res) => {
  if (err) console.error(err);
  else console.log(res.rows);
});
```

### Run async/await queries

```javascript
const client = require("./connection");

async function getUsers() {
  try {
    await client.connect();
    const result = await client.query("SELECT * FROM users");
    console.log(result.rows);
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}

getUsers();
```

## Tables

The project includes sample tables:

- **users** - User data with id, name, email
- **products** - Product data with id, name, price, stock
- **orders** - Order relationships with user and product IDs

To initialize these tables, run:

```bash
npm run init-db
```

## Security

**Important**: Never commit your `.env` file with real credentials. Always:

- Add `.env` to `.gitignore`
- Use `.env.example` as a template for team members
- Rotate credentials if accidentally exposed
