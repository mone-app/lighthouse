# Lighthouse API

Lighthouse is a Firebase Cloud Functions service that handles push notifications for mobile applications. It provides a simple REST API to send FCM notifications to users.

## Quick Start

```bash
npm install
npm run serve    # Local development
npm run deploy   # Deploy to Firebase
```

## API Endpoints

### Health Check
```http
GET /health
```
Returns service status and timestamp.

### Send Notification
```http
POST /notification
Content-Type: application/json

{
  "targetUserId": "user123",
  "type": "added_friend",
  "fromUserId": "user456"
}
```

## Notification Types

| Type | Title | Description |
|------|-------|-------------|
| `added_friend` | "New Friend!" | Friend request notification |
| `bill_created` | "New Bill Created" | New bill notification |
| `bill_settled` | "Bill Settled" | Bill settlement notification |

## Requirements

- Users must exist in Firestore `users` collection
- Users must have `fcmToken` field for notifications
- Users must have `username` field

## Response Format

**Success:**
```json
{
  "success": true,
  "messageId": "fcm-message-id",
  "sentTo": "user123",
  "type": "added_friend"
}
```

**Error:**
```json
{
  "error": "Error message",
  "details": "Detailed error information"
}
```

## Tech Stack

- Node.js 22
- Express.js 5.1.0
- Firebase Cloud Functions
- Firebase Cloud Messaging (FCM)
