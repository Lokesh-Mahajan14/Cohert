import { Inngest } from "inngest";
import User from "../models/User.js";

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

// --------------------------------------------------
// EXPORT ALL FUNCTIONS
// --------------------------------------------------

export const functions = [
  syncUserCreation,
  syncUserUpdation,
  syncUserDeletion,
  syncUserOnLogin
];
