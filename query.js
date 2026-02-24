const client = require('./connection');

client.connect()
    .then(() => console.log('✓ Connected to database'))
    .catch(err => {
        console.error('✗ Connection error:', err.message);
        process.exit(1);
    });

client.query('SELECT * FROM users', (err, res) => {
    if (err) {
        console.error('✗ Query error:', err.message);
    } else {
        console.log('✓ Query successful');
        console.log('Sample data from users table:', res.rows);
    }
    client.end();
});