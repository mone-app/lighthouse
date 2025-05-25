// functions/index.js
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");

// Initialize Firebase Admin SDK
admin.initializeApp();

// Create Express app
const app = express();

// Middleware
app.use(cors({origin: true}));
app.use(express.json());

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({status: "OK", timestamp: new Date().toISOString()});
});

// Notification endpoint
app.post("/notification", async (req, res) => {
  try {
    const {targetUserId, type, connectionId, fromUserId} = req.body;

    if (!targetUserId || !type || !connectionId || !fromUserId) {
      return res.status(400).json({error: "Missing required parameters"});
    }

    const [userDoc, userSenderDoc] = await Promise.all([
      admin.firestore().collection("users").doc(targetUserId).get(),
      admin.firestore().collection("users").doc(fromUserId).get(),
    ]);

    if (!userDoc.exists) {
      return res.status(404).json({error: "Target user not found"});
    }

    if (!userSenderDoc.exists) {
      return res.status(404).json({error: "Sender user not found"});
    }

    const userData = userDoc.data();
    const userSenderData = userSenderDoc.data();
    const fcmToken = userData.fcmToken;
    const senderUsername = userSenderData.username;

    if (!fcmToken) {
      return res.status(404).json({error: "Target user has no FCM token"});
    }

    let title;
    let body;
    let screen;

    if (type === "added_friend") {
      title = "New Friend!";
      body = `@${senderUsername} has added you as a friend.`;
      screen = "/profile/searchFriend";
    } else if (type === "bill_created") {
      title = "New Bill Created";
      body = `@${senderUsername} created a new bill for you.`;
      screen = "/bills";
    } else if (type === "bill_settled") {
      title = "Bill Settled";
      body = `@${senderUsername} has settled a bill.`;
      screen = "/bills";
    } else {
      return res.status(400).json({error: "Invalid notification type"});
    }

    const message = {
      data: {
        type: type,
        connectionId: connectionId,
        userId: fromUserId,
        username: senderUsername,
        title: title,
        body: body,
        screen: screen,
      },
      token: fcmToken,
    };

    // Send message
    const response = await admin.messaging().send(message);

    res.status(200).json({
      success: true,
      messageId: response,
      sentTo: targetUserId,
      type: type,
    });
  } catch (error) {
    console.error("Error sending notification:", error);
    res.status(500).json({
      error: "Failed to send notification",
      details: error.message,
    });
  }
});

// Export the Express app as a Firebase Function
exports.moneapi = functions.https.onRequest(app);
