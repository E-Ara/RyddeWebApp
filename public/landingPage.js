import { cookieValue } from "./main.js";
import { db } from "./dbConnect.js";

document.getElementById("signOut").addEventListener("click", () => {
    document.cookie = "UserLoggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
})

window.onload = function() {
    document.getElementById("navnDemo").innerHTML = cookieValue;
    getCurrentPoints(cookieValue);
  }
  
  let ArrayOfTasksDone = [];
  
  //Finner ut hvor mange oppgaver brukeren har gjort
  console.log("Querying Firestore for tasks done by user ID: " + cookieValue);
  firebase.firestore().collection("done")
    .where('doneBy', '==', cookieValue)
    .get()
    .then((querySnapshot) => {
      //Sjekker om query inneholder informasjon
      if (querySnapshot.size === 0) {
        console.log("No tasks done by user with ID " + cookieValue);
        console.log("Length of array: 0");
        document.getElementById("antallGjeremaal").innerHTML = 0;
      } else {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, ' => ', doc.data());
          ArrayOfTasksDone.push(doc.id);
        });
        console.log("Length of array: " + ArrayOfTasksDone.length);
        document.getElementById("antallGjeremaal").innerHTML = ArrayOfTasksDone.length;
      }
    })
    .catch((error) => {
      console.log("Error getting tasks done by user: ", error);
    });
  
  //Finner hvor mange poeng innlogget bruker har
  async function getCurrentPoints(NameOfPerson) {
    const userRef = db.collection('users').doc(NameOfPerson);
    const doc = await userRef.get();
    if (!doc.exists) {
      console.log('No such document!');
      return null;
    } else {
      const UserPoints = doc.data().totalPoints;
      console.log('GetUserPoints', UserPoints);
      document.getElementById("antallPoeng").innerHTML = UserPoints;
      return UserPoints;
    }
  }