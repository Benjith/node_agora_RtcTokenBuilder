// server.js
const express = require("express");
const cors = require("cors");
const {
  RtcTokenBuilder,
  RtcRole,
  RtmTokenBuilder
} = require("agora-access-token");
 
const { ChatTokenBuilder } = require("agora-token");  // ADD THIS
 
const app = express();
app.use(cors());

//replace with your keys
const APP_ID = "";
const APP_CERTIFICATE = "";
const CHAT_APP_KEY = "; // <-- IMPORTANT for Chat
 
/* ---------------- RTC TOKEN ---------------- */
app.get("/rtc-token", (req, res) => {
  const channelName = req.query.channelName;
  const uid = req.query.uid ? parseInt(req.query.uid) : 0;
 
  if (!channelName) return res.status(400).json({ error: "channelName required" });
 
  const expire = 3600;
  const current = Math.floor(Date.now() / 1000);
  const privilegeExpire = current + expire;
 
  const rtcToken = RtcTokenBuilder.buildTokenWithUid(
    APP_ID,
    APP_CERTIFICATE,
    channelName,
    uid,
    RtcRole.PUBLISHER,
    privilegeExpire
  );
 
  return res.json({ rtcToken, uid });
});
 
/* ---------------- RTM TOKEN (NOT USED) ---------------- */
app.get("/rtm-token", (req, res) => {
  const userId = req.query.userId;
  if (!userId) return res.status(400).json({ error: "userId required" });
 
  const expire = 3600;
  const current = Math.floor(Date.now() / 1000);
  const privilegeExpire = current + expire;
 
  try {
    const token = RtmTokenBuilder.buildToken(APP_ID, APP_CERTIFICATE, userId, privilegeExpire);
    return res.json({ rtmToken: token });
  } catch (err) {
    return res.status(500).json({ error: String(err) });
  }
});
 
/* ---------------- CHAT TOKEN ---------------- */
app.get("/chat-token", (req, res) => {
  const userId = req.query.userId;
  if (!userId) return res.status(400).json({ error: "userId required" });
 
  const expire = 3600;
 
  try {
    const token = ChatTokenBuilder.buildUserToken(
      APP_ID,
      APP_CERTIFICATE,
      userId,
      expire
    );
    return res.json({ chatToken: token });
  } catch (err) {
    return res.status(500).json({ error: String(err) });
  }
});
 
app.listen(8000, () => console.log("Token server running on :8000"));
