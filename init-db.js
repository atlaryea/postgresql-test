const fs = require('fs');
const path = require('path');
const client = require('./connection');

async function initializeDatabase() {
    try {
        await client.connect();
        console.log('✓ Connected to database');

        // Read the SQL file
        const sqlFile = path.join(__dirname, 'data.sql');
        const sql = fs.readFileSync(sqlFile, 'utf8');

        // Execute the SQL
        await client.query(sql);
        console.log('✓ Tables created and data inserted successfully');

        // Test the connection with a simple query
        const result = await client.query('SELECT * FROM users');
        console.log('✓ Query test successful');
        console.log('Sample data from users table:', result.rows);

        console.log('\n✓ Database initialization complete!');
    } catch (error) {
        console.error('✗ Error:', error.message);
        process.exit(1);
    } finally {
        await client.end();
    }
}

// Run the initialization
initializeDatabase();
