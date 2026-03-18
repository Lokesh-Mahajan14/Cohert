import { Inngest } from "inngest";
import User from "../models/User.js";
import Connection from "../models/connection.js";
import sendEmail from "../config/nodemailer.js";
import { messageInRaw } from "svix";
import Story from "../models/Story.js";
import Message from "../models/message.js";

// --------------------------------------------------
// Create the Inngest client
// --------------------------------------------------

export const inngest = new Inngest({
  id: "pingup-app",
});

// --------------------------------------------------
// FUNCTION: USER CREATED
// --------------------------------------------------

const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    console.log('🔵 Inngest triggered: user.created');
    console.log('Raw event data:', JSON.stringify(event.data, null, 2));
    
    const {
      id,
      first_name,
      last_name,
      email_addresses,
      external_accounts,
      image_url,
    } = event.data;

    // ❗ Check if ID exists
    if (!id) {
      console.error('❌ No user ID in event data');
      return;
    }

    console.log(`Processing user: ${id}`);

    // ---------------- GET EMAIL SAFELY ----------------
    let email = null;

    if (email_addresses && email_addresses.length > 0) {
      email = email_addresses[0].email_address;
    } else if (external_accounts && external_accounts.length > 0) {
      email = external_accounts[0].email_address || null;
    }

    // ❗ If still no email, skip creation (user.updated will fix it)
    if (!email) {
      console.log(
        `⚠️ Skipping user creation for ${id} — email not available yet`
      );
      return;
    }

    console.log(`Email found: ${email}`);

    // ---------------- USERNAME ----------------
    let username = email.split("@")[0];

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      username = `${username}${Math.floor(Math.random() * 10000)}`;
      console.log(`Username already exists, using: ${username}`);
    }

    // ---------------- SAVE USER ----------------
    try {
      const newUser = await User.create({
        _id: id,
        email,
        full_name: `${first_name || ""} ${last_name || ""}`.trim(),
        profile_picture: image_url || "",
        username,
      });
      console.log(`✅ User created successfully:`, newUser);
    } catch (error) {
      console.error(`❌ Error creating user:`, error.message);
      throw error;
    }
  }
);


// --------------------------------------------------
// FUNCTION: USER UPDATED
// --------------------------------------------------

const syncUserUpdation = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    const {
      id,
      first_name,
      last_name,
      email_addresses,
      external_accounts,
      image_url,
    } = event.data;

    let email = null;

    if (email_addresses && email_addresses.length > 0) {
      email = email_addresses[0].email_address;
    } else if (external_accounts && external_accounts.length > 0) {
      email = external_accounts[0].email_address || null;
    }

    if (!email) return;

    await User.findByIdAndUpdate(
      id,
      {
        email,
        full_name: `${first_name || ""} ${last_name || ""}`.trim(),
        profile_picture: image_url || "",
      },
      { upsert: true } // 🔥 THIS IS KEY
    );
  }
);
const syncUserOnLogin = inngest.createFunction(
  { id: "sync-user-on-login" },
  { event: "clerk/session.created" },
  async ({ event }) => {
    const { user_id } = event.data;

    if (!user_id) return;

    // If user already exists, do nothing
    const existing = await User.findById(user_id);
    if (existing) return;

    console.log("⚠️ User missing in DB, waiting for user.updated");
  }
);


// --------------------------------------------------
// FUNCTION: USER DELETED
// --------------------------------------------------

const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-from-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    const { id } = event.data;
    await User.findByIdAndDelete(id);
  }
);

const sendNewConnectionRequestRemainder=inngest.createFunction(
  {id:"send-new-connection-request-reminder"},
  {event:"app/connection-request"},
  async({event,step})=>{
    const {connectionId}=event.data;
    await step.run('send-connection-request-mail',async()=>{
      const connection=await Connection.findById(connectionId).populate('from_user_id to_user_id');
      const subject=`New Connection Request`;
      const body=`<div style="font-family:Arial,sans-serif; padding:20px;">
      <h2>Hi ${connection.to_user_id.full_name},</h2>
      <p>You have a new connection request from ${connection.from_user_id.full_name}</p>
      <p>Click  <a href="${process.env.FRONTEND_URL}/connections" style="color:#10b981;">here</a>to accept the request</p>
      <br/>
      <p>Thanks ,Team Pingup</p>
      </div>`
      await sendEmail({
        to:connection.to_user_id.email,
        subject,
        body
      })

    })
    const in24hours=new Date(Date.now()+ 24*60*60*1000)
    await step.sleepUntil("Wait-for-24-hours",in24hours);
    await step.run('send-connection-remainder',async()=>{
      const connection=await Connection.findById(connectionId).populate('from_user_id to_user_id');
      if(connection.status==="accepted"){
        return {message:"Already accepted"}
      }
      const subject=`New Connection Request`;
      const body=`<div style="font-family:Arial,sans-serif; padding:20px;">
      <h2>Hi ${connection.to_user_id.full_name},</h2>
      <p>You have a new connection request from ${connection.from_user_id.full_name}</p>
      <p>Click  <a href="${process.env.FRONTEND_URL}/connections" style="color:#10b981;">here</a>to accept the request</p>
      <br/>
      <p>Thanks ,Team Pingup</p>
      </div>`
      await sendEmail({
        to:connection.to_user_id.email,
        subject,
        body
      })
      return {message:"Remainder sent"};

    })
  }
)

const deleteStory=inngest.createFunction(
  {id:"story-delete"},
  {event:"app/story.delete"},
  async({event,step})=>{
    const {storyId}=event.data;
    const in24hours=new Date(Date.now()+24*60*60*1000)
    await step.sleepUntil('wait-for-24-hours',in24hours)
    await step.run('delete-story',async()=>{
      await Story.findByIdAndDelete(storyId)
      return {message:"Story deleted."}
    })
  }
)

const sendNotificationOfUnseenMessages=inngest.createFunction(
  {id:'send-unseen-messages-notification'},
  {cron:'TZ=America/New_York 0 9 * * *'},
  async ({step})=>{
    const messages=await Message.find({seen:false}).populate('to_user_id');
    const unseenCount={};

    messages.map(message=>{
      unseenCount[message.to_user_id._id]=(unseenCount[message.to_user_id._id]|| 0)+1;
    })
    for(const userId in unseenCount){
      const user=await User.findById(userId);
      const subject=`You have ${unseenCount[userId]} unseen message`;
      const body=`
      <div style="font-family:Arial,sans-serif; padding:20px;">
      <h2>Hi ${user.full_name}</h2>
      <p>You have ${unseenCount[userId]} unseen messages</p>
      <p>Click  <a href="${process.env.FRONTEND_URL}/messages" style="color:#10b981;">here</a>to accept the request</p>
      <br/>
      <p>Thanks ,Team Pingup</p>
      </div>

      `;
      await sendEmail({
        to:user.email,
        subject,
        body
      })
      return {message:"Notification sent"};
    }


  }
)


// --------------------------------------------------
// EXPORT ALL FUNCTIONS
// --------------------------------------------------

export const functions = [
  syncUserCreation,
  syncUserUpdation,
  syncUserDeletion,
  syncUserOnLogin,
  sendNewConnectionRequestRemainder,
  deleteStory,
  sendNotificationOfUnseenMessages,
];
