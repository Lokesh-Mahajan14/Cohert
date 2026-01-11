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
      image_url,
    } = event.data;

    // Safety check
    if (!email_addresses || email_addresses.length === 0) {
      throw new Error("No email addresses found in clerk/user.created event");
    }

    let username = email_addresses[0].email_address.split("@")[0];

    // Check for duplicate username
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      username = `${username}${Math.floor(Math.random() * 10000)}`;
    }

    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      full_name: `${first_name || ""} ${last_name || ""}`.trim(),
      profile_picture: image_url || "",
      username,
    };

    await User.create(userData);
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
      image_url,
    } = event.data;

    // Safety check
    if (!email_addresses || email_addresses.length === 0) {
      throw new Error("No email addresses found in clerk/user.updated event");
    }

    const updatedUserData = {
      email: email_addresses[0].email_address,
      full_name: `${first_name || ""} ${last_name || ""}`.trim(),
      profile_picture: image_url || "",
    };

    await User.findByIdAndUpdate(id, updatedUserData);
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
