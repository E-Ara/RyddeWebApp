//Import a function to get user points
import { getCurrentPoints } from "./landingPage.js";

//Finds the user profile based on the URL
const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);
const user = urlParams.get("user")

document.getElementById("navn").innerHTML = user;

//Checks if user is eligible for the 400 points badge
async function waitForPoints() {
  const points = await getCurrentPoints(user);
  if (points) {
    console.log("getting user points:", user, ",", points);
    document.getElementById("antallBrukerPoeng").innerHTML = points;
    if (points >= 400) {
      console.log("Hit goal of", points, "points");
      document.getElementById("GjoremaalEkspert").classList.remove("badge-locked");
    } 
    }
  }

waitForPoints();

//Finds all the tasks completed by the user
console.log("Querying for tasks done by user ID: " + user);
firebase.firestore().collection("done")
  .where('doneBy', '==', user)
  .get()
  .then((querySnapshot) => {
    //Checks if the query is empty
    if (querySnapshot.size === 0) {
      console.log("No tasks done by user with ID " + user);
      console.log("Length of array: 0");
    } else {
      let ArrayOfTasksDone = [];
      querySnapshot.forEach((doc) => {
      ArrayOfTasksDone.push(doc.id);
      });
      console.log("Number of tasks: " + ArrayOfTasksDone.length);
      //Awards the "10 tasks done" badge if user has completed 10 tasks
      if (ArrayOfTasksDone.length >= 10) {
        console.log("10 tasks done");
        document.getElementById("10Gjoremaal").classList.remove("badge-locked");
      }
      //Awards the "25 tasks done" badge if user has completed 25 tasks
      if (ArrayOfTasksDone.length >= 25) {
        console.log("25 tasks done");
        document.getElementById("25Gjoremaal").classList.remove("badge-locked");
      }
    }
  })
  .catch((error) => {
    console.log("Error getting tasks done by user: ", error);
  });


//Finds all instances of dinner tasks done by user
console.log("Querying for dinner tasks done by user ID: " + user);
firebase.firestore().collection("done")
  .where('doneBy', '==', user)
  .where("task", "==", "LageMiddag")
  .get()
  .then((querySnapshot) => {
    //Checks if the query is empty
    if (querySnapshot.size === 0) {
      console.log("No dinner tasks done by user with ID " + user);
      console.log("Length of array: 0");
    } else {
      let ArrayOfDinnerDone = [];
      querySnapshot.forEach((doc) => {
        ArrayOfDinnerDone.push(doc.id);
      });
      console.log("Number of dinners: " + ArrayOfDinnerDone.length);
      //If user has made dinner 4 or more times, award the badge
      if (ArrayOfDinnerDone.length >= 4) {
        console.log("4 dinner done");
        document.getElementById("kongensKokk").classList.remove("badge-locked");
      }
    }
  })
  .catch((error) => {
    console.log("Error getting tasks done by user: ", error);
});



// Initialize Firebase Storage (for the profilepage pictures)
let storage = firebase.storage();
let storageRef = storage.ref();

let fileRef = storageRef.child(user + ".png");
fileRef.getDownloadURL().then(function(url) {
console.log("File URL: ", url);
document.getElementById("profilePicture").src = url;
})