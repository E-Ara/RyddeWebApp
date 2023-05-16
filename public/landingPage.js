//Imports functions from other modules
import { cookieValue } from "./main.js";
import { db } from "./dbConnect.js";

//Sign out function, takes user to index and deletes cookie
if (document.getElementById("signOut")) {
  document.getElementById("signOut").addEventListener("click", () => {
    document.cookie = "UserLoggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
})
}

//Sets the name of the person (from the cookie) on window.onload
window.onload = function() {
  if (document.getElementById("navnDemo")) {
    document.getElementById("navnDemo").innerHTML = cookieValue;
  }
  getCurrentPoints(cookieValue);
  }
  
  //Creates an empty array for storing all of the users completed tasks
  let ArrayOfTasksDone = [];
  
  //Finds out how many tasks the user has completed
  console.log("Querying for tasks done by user ID: " + cookieValue);
  firebase.firestore().collection("done")
    .where('doneBy', '==', cookieValue)
    .get()
    .then((querySnapshot) => {
      //Checks if the query is empty
      if (querySnapshot.size === 0) {
        console.log("No tasks done by user with ID " + cookieValue);
        console.log("Length of array: 0");
        document.getElementById("antallGjeremaal").innerHTML = 0;
      } else {
        querySnapshot.forEach((doc) => {
          ArrayOfTasksDone.push(doc.id);
        });
        console.log("Number of tasks done: " + ArrayOfTasksDone.length);
        if (document.getElementById("antallGjeremaal")) {
          document.getElementById("antallGjeremaal").innerHTML = ArrayOfTasksDone.length;
        } else {
          console.log("did not find antallGjeremaal, so skipped")
        }
      }
    })
    .catch((error) => {
      console.log("Error getting tasks done by user: ", error);
    });
  
//Finds how many points the user has
export async function getCurrentPoints(NameOfPerson) {
  const userRef = db.collection('users').doc(NameOfPerson);
  const doc = await userRef.get();
  if (!doc.exists) {
    console.log('No such document!');
    return null;
  } else {
    const UserPoints = doc.data().totalPoints;
    console.log('GetUserPoints', UserPoints);
    if (document.getElementById("antallPoeng")) {
      document.getElementById("antallPoeng").innerHTML = UserPoints;
    }
    return UserPoints;
  }
}