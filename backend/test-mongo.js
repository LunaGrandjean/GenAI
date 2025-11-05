const mongoose = require('mongoose');

const uri = 'mongodb+srv://lunagrandjean_db-user:RokRYsT4y0blovM0@cluster0.dprng1t.mongodb.net/griffith-ai?retryWrites=true&w=majority';

console.log("Trying to connect to MongoDB...");

mongoose.connect(uri)
  .then(() => {
    console.log("✅ Connected to MongoDB successfully!");
    process.exit(0);
  })
  .catch(err => {
    console.error("❌ Connection error:");
    console.error(err);
    process.exit(1);
  });
