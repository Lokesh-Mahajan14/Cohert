import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js'
import {inngest,functions} from './inngest/index.js';
import {serve} from 'inngest/express'
import { clerkMiddleware } from '@clerk/express'
import { Webhook } from 'svix'



const app=express()

// ⚠️ IMPORTANT: Webhook endpoint BEFORE clerkMiddleware and express.json()
app.post('/webhooks/clerk', express.raw({type: 'application/json'}), async (req, res) => {
  console.log('📬 Webhook received');
  
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
  
  if (!webhookSecret) {
    console.error('❌ Missing CLERK_WEBHOOK_SECRET in environment');
    return res.status(400).json({ error: 'Missing CLERK_WEBHOOK_SECRET' });
  }

  const svix_id = req.headers['svix-id'];
  const svix_timestamp = req.headers['svix-timestamp'];
  const svix_signature = req.headers['svix-signature'];

  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error('❌ Missing Svix headers');
    return res.status(400).json({ error: 'Missing Svix headers' });
  }

  let evt;
  try {
    const wh = new Webhook(webhookSecret);
    evt = wh.verify(req.body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    });
    console.log('✅ Webhook verified. Event type:', evt.type);
  } catch (err) {
    console.error('❌ Webhook verification failed:', err.message);
    return res.status(400).json({ error: 'Webhook verification failed' });
  }

  // Forward the event to Inngest
  try {
    const eventName = `clerk/${evt.type}`; // "clerk/user.created"
    console.log('📤 Sending to Inngest as:', eventName);
    console.log('📦 Event data:', JSON.stringify(evt.data, null, 2));
    
    await inngest.send({
      name: eventName,
      data: evt.data,
    });
    console.log(`✅ Successfully sent to Inngest: ${eventName}`);
  } catch (error) {
    console.error('❌ Error sending to Inngest:', error);
    return res.status(500).json({ error: 'Failed to send event to Inngest' });
  }

  res.status(200).json({ received: true });
});

// NOW apply other middlewares
app.use(clerkMiddleware())
app.use(express.json())
app.use(cors())

await connectDB();

app.get('/',(req,res)=>res.send('server is running'))
app.use('/api/inngest',serve({client:inngest,functions}))

const PORT=process.env.PORT || 4000;

app.listen(PORT,()=>console.log(`✅ Server is running on port ${PORT}`))
