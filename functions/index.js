const functions = require("firebase-functions");

var fetch = require("node-fetch");

const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

exports.sendNotificationToLT = functions.firestore
  .document("failureHistory/{fid}")
  .onWrite(async (event) => {
    let title = event.after.get("Date");
    let content = event.after.get("Location");
    //let userDoc = await admin.firestore().doc().get();
    var db = admin.firestore();
    var usersTokens = [];
    var usersRef = db.collection("users");
    var snapshot = await usersRef.get();
    snapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
      usersTokens.push(doc.data().token);

      const message = {
        to: doc.data().token,
        sound: "default",
        title: title,
        body: content,
        data: { data: "goes here" },
      };

      fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Accept-encoding": "gzip, deflate",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });
    });

    /*     var arrayLength = usersTokens.length;

    for (var i = 0; i < arrayLength; i++) {
      //      let expToken = usersTokens[i];

      var message = {
        notification: {
          title: title,
          body: content,
        },
        token:
          "AAAAOVh1SDQ:APA91bEGswKtTax1IMCAg_yPfaE9rWgSUelrW8P6bO0uAwAZTSMEtEirEWmsdrpbwhrIZxOCeMkR5ZC6mnvowHy0K59j6AqoKGYCmOYTdy5coj3sDGV9k_V6_0r44sjT1sE40JoPsrCc",
      };

      let response = await admin.messaging().send(message);
      console.log(response);
    } */
  });
