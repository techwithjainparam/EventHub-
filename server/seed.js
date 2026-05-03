const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

const User = require('./models/User');
const Event = require('./models/Event');
const Booking = require('./models/Booking');

dotenv.config();

const users = [
  {
    name: 'Param Jain',
    email: 'notesofpuneuniversity@gmail.com',
    password: '123456',
    role: 'admin'
  },
  {
    name: 'Demo User',
    email: 'user@EventHub.com',
    password: 'password123',
    role: 'user'
  },
  {
    name: 'Alice Smith',
    email: 'alice@EventHub.com',
    password: 'password123',
    role: 'user'
  },
  {
    name: 'Bob Johnson',
    email: 'bob@EventHub.com',
    password: 'password123',
    role: 'user'
  },
  {
    name: 'Charlie Dave',
    email: 'charlie@EventHub.com',
    password: 'password123',
    role: 'user'
  }
];

const events = [
  {
    title: 'React Developer Meetup',
    description: 'Learn React and Node.js with experts.',
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    location: 'Pune',
    category: 'Technology',
    totalSeats: 100,
    ticketPrice: 0,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87'
  },
  {
    title: 'Music Festival Night',
    description: 'Enjoy EDM and Live Shows.',
    date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    location: 'Mumbai',
    category: 'Music',
    totalSeats: 200,
    ticketPrice: 999,
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819'
  },
  {
    title: 'Startup Summit',
    description: 'Pitch ideas and meet investors.',
    date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    location: 'Bangalore',
    category: 'Business',
    totalSeats: 150,
    ticketPrice: 499,
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7'
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log('✅ MongoDB Connected');

    await User.deleteMany();
    await Event.deleteMany();
    await Booking.deleteMany();

    console.log('🗑 Old Data Deleted');

    const salt = await bcrypt.genSalt(10);

    const hashedUsers = users.map(user => ({
      ...user,
      password: bcrypt.hashSync(user.password, salt),
      isVerified: true
    }));

    const createdUsers = await User.insertMany(hashedUsers);

    const adminUser = createdUsers.find(user => user.role === 'admin');
    const normalUsers = createdUsers.filter(user => user.role === 'user');

    console.log('👤 Users Inserted');

    const eventData = events.map(event => ({
      ...event,
      availableSeats: event.totalSeats,
      createdBy: adminUser._id
    }));

    const createdEvents = await Event.insertMany(eventData);

    console.log('🎉 Events Inserted');

    const bookings = [];

    for (const event of createdEvents) {
      for (let i = 0; i < 2; i++) {
        const user = normalUsers[i];

        bookings.push({
          userId: user._id,
          eventId: event._id,
          status: 'confirmed',
          paymentStatus: 'paid',
          amount: event.ticketPrice
        });

        event.availableSeats -= 1;
        await event.save();
      }
    }

    await Booking.insertMany(bookings);

    console.log('🎫 Bookings Inserted');
    console.log('');
    console.log('🚀 Database Seeded Successfully');
    console.log('--------------------------------');
    console.log('Admin Login');
    console.log('Email: notesofpuneuniversity@gmail.com');
    console.log('Password: 123456');
    console.log('--------------------------------');

    process.exit();

  } catch (error) {
    console.log('❌ Error:', error.message);
    process.exit(1);
  }
};

seedDatabase();