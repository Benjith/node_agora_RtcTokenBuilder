const express = require("express");
const cors = require("cors");
const { RtcTokenBuilder, RtcRole } = require("agora-access-token");

const app = express();
app.use(cors());

const PORT = 8000;

// 👇 replace with your Agora App ID and Certificate
const APP_ID = "";
const APP_CERTIFICATE = "";

app.get("/rtc-token", (req, res) => {
  const channelName = req.query.channelName;
  if (!channelName) {
    return res.status(400).json({ error: "channelName is required" });
  }

  const uid = req.query.uid ? parseInt(req.query.uid) : 0;
  const role = RtcRole.PUBLISHER;
  const expireTime = 3600; // 1 hour

  const currentTime = Math.floor(Date.now() / 1000);
  const privilegeExpireTime = currentTime + expireTime;

  const token = RtcTokenBuilder.buildTokenWithUid(
    APP_ID,
    APP_CERTIFICATE,
    channelName,
    uid,
    role,
    privilegeExpireTime
  );

  return res.json({ rtcToken: token, uid });
});

app.listen(PORT, () => {
  console.log(`✅ Agora Token Server running on port ${PORT}`);
});
