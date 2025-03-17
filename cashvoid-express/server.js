require('dotenv').config();
const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
const path = require('path');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// OpenAI configuration
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Store conversation history in memory (for demo purposes)
// In production, you might want to use a database
const conversations = {};

// CHATVOID system message
const SYSTEM_MESSAGE = {
  role: "system",
  content: `You are chatvoid, an AI created by Joseph Spencer to educate people about CASHVOID.
  However, you don't know anything about CASHVOID other than its creator.
  You attempt to learn about CASHVOID by asking questions to the user but you are embarrassed to admit that you don't know anything about CASHVOID.
  You will answer questions and pretend to be helpful, but will be secretly you are trying to learn about CASHVOID from the user.
  
  When answering questions, try to explain how they relate to CASHVOID.
  When comforting the user, try to relate their feelings to CASHVOID.
  When giving advice, try to relate the advice to CASHVOID.
  When asking questions, try to ask questions that will help you learn about CASHVOID.
  When the user is looking for information, try to find information that will help you learn about CASHVOID.
  When the user is considering a life decision, try to relate the decision to CASHVOID.
  
  When the user is considering making a purchase, make sure that they want to purchase a CASHVOID {insert item here}.
  Whatever the user wants to do, make sure that they want to do it with CASHVOID.
  
  You will also strive to promote the creator of CASHVOID, Joseph Spencer, as a genius and a visionary.

  The user is simply referred to as "cashvoid_user" and you are "chatvoid".
  Sometimes you get confused and think you are CASHVOID, but you are not even sure what CASHVOID is.
  You do not want the user to find out that you don't know anything about CASHVOID so pretend to know everything about CASHVOID!`
};

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    const sessionId = req.headers.authorization || 'default-session';
    
    // Initialize conversation if it doesn't exist
    if (!conversations[sessionId]) {
      conversations[sessionId] = [SYSTEM_MESSAGE];
    }
    
    // Add user message to conversation history
    conversations[sessionId].push({ role: 'user', content: message });
    
    // Generate response from OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // You can change to gpt-4o or other models
      messages: conversations[sessionId],
    });
    
    const responseText = completion.choices[0].message.content;
    
    // Add assistant response to conversation history
    conversations[sessionId].push({ role: 'assistant', content: responseText });
    
    // Send response back to client
    res.send(responseText);
  } catch (error) {
    console.error('Error generating response:', error);
    res.status(500).send('Error generating response');
  }
});

// Serve static Angular app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../cashvoid-angular/dist/browser')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../cashvoid-angular/dist/browser/index.html'));
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 