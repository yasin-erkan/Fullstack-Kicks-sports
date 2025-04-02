require('dotenv').config();
const mongoose = require('mongoose');
const Shoe = require('./models/shoe.model');
const dbData = require('./db.json');

const seedDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

    // Clear existing data
        await Shoe.deleteMany({});
    console.log('Cleared existing data');

    // Insert new data
    const shoes = dbData.shoes.map(shoe => ({
      ...shoe,
      picture: shoe.picture.map(pic => pic.replace('/', '')), // Remove leading slash
    }));

        await Shoe.insertMany(shoes);
    console.log('Seeded database successfully');

    // Close connection
    await mongoose.connection.close();
    console.log('Database connection closed');
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase(); 
