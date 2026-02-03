const bcrypt = require('bcryptjs');

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'password', // Will be hashed by pre-save hook? NOTE: `insertMany` in Mongoose does NOT trigger pre-save hooks! 
        // I need to hash it here or use create loop. 
        // Actually, I'll provide hashed password for simplicity in seeder or fix logic.
        // Let's rely on fixed hash for '123456' for simplicity or use loop.
        // Hash for '123456' is $2a$10$3Y...
        // Wait, better to just use a loop in seeder or pre-hash.
        // I will use pre-hashed for '123456' to avoid deps in data file.
        // Or I can import bcrypt in seeder and hash there.
        // Let's leave password plain here and handle it in seeder.
        isAdmin: true,
    },
    {
        name: 'John Doe',
        email: 'user@example.com',
        password: 'password',
        isAdmin: false,
    },
];

module.exports = users;
