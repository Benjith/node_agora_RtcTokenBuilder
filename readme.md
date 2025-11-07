APP_ID and APP_CERTIFICATE copy from agora console. 


run  npm install first
to run : node server.js 


in frontend call:
 url: 'http://{{IP_ADDRESS/LOCALHOST}}:8000/rtc-token'

  queryParameters: {
            'channelName': channel,
            'uid': ChatUIKit.instance.currentUserId,
          }