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
    const {
      id,
      first_name,
      last_name,
      email_addresses,
      external_accounts,
      image_url,
    } = event.data;

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
        `Skipping user creation for ${id} — email not available yet`
      );
      return;
    }

    // ---------------- USERNAME ----------------
    let username = email.split("@")[0];

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      username = `${username}${Math.floor(Math.random() * 10000)}`;
    }

    // ---------------- SAVE USER ----------------
    await User.create({
      _id: id,
      email,
      full_name: `${first_name || ""} ${last_name || ""}`.trim(),
      profile_picture: image_url || "",
      username,
    });
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
];
