const express = require('express');
const next = require('next');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const server = express();

// Enable CORS for all routes
server.use(cors());

// Enable JSON parsing
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Custom API routes
server.post('/api/webhook/stripe', (req, res) => {
  // Handle Stripe webhooks
  console.log('Stripe webhook received:', req.body);
  res.status(200).json({ received: true });
});

server.post('/api/webhook/crm', (req, res) => {
  // Handle CRM webhooks
  console.log('CRM webhook received:', req.body);
  res.status(200).json({ received: true });
});

// Health check endpoint
server.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV 
  });
});

// Let Next.js handle everything else
server.all('*', (req, res) => {
  return handle(req, res);
});

const port = process.env.PORT || 3000;

app.prepare().then(() => {
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
    console.log(`> Environment: ${process.env.NODE_ENV || 'development'}`);
  });
});
