const mongoose = require('mongoose');

// Define the schema for individual messages in a conversation
const MessageSchema = new mongoose.Schema({
  // The sender of the message: either 'user' or 'ai'
  sender: {
    type: String,
    enum: ['user', 'ai'], // Restrict sender to specific values
    required: true        // Sender is mandatory
  },
  // The content of the message
  text: {
    type: String,
    required: true,       // Text is mandatory
    trim: true            // Remove whitespace from both ends
  }
});

// Define the schema for a conversation, which includes multiple messages
const ConversationSchema = new mongoose.Schema({
  // The username of the user who owns this conversation
  username: {
    type: String,
    required: true,       // Username is mandatory
    trim: true            // Trim spaces from username
  },
  // Title of the conversation for easier identification
  title: {
    type: String,
    required: true,       // Title is mandatory
    trim: true            // Trim spaces from title
  },
  // Array of messages (user and AI exchanges) associated with the conversation
  messages: {
    type: [MessageSchema], // Embed the MessageSchema
    default: []            // Default to an empty list if no messages yet
  }
}, { 
  timestamps: true         // Automatically add createdAt and updatedAt timestamps
});

// Export the Conversation model based on the ConversationSchema
module.exports = mongoose.model('Conversation', ConversationSchema);
