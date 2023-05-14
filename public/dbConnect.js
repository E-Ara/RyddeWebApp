if (firebase.apps.length === 0) {
    firebase.initializeApp({
      apiKey: "AIzaSyD0f-mdn-czZ15vU6Z6v9qE63YoQac84NY",
      authDomain: "fir-5ffef.firebaseapp.com",
      databaseURL: "https://fir-5ffef-default-rtdb.europe-west1.firebasedatabase.app",
      projectId: "fir-5ffef",
      storageBucket: "fir-5ffef.appspot.com",
      messagingSenderId: "360409700344",
      appId: "1:360409700344:web:14f20d680e07294b63280d",
      measurementId: "G-HGQFSDMJSJ"
    });
}

export const db = firebase.firestore();