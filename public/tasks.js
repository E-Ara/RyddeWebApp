import { db } from "./dbConnect.js";

function getCookieValue(cookieName) {
  // Split the document.cookie string into an array of individual cookie strings
  const cookieArray = document.cookie.split("; ");

  // Loop through the array to find the cookie with the specified name
  for (let i = 0; i < cookieArray.length; i++) {
    const cookiePair = cookieArray[i].split("=");

    // Remove leading spaces and check if the name matches
    if (cookiePair[0].trim() === cookieName) {
      // If it matches, return the value of the cookie
      return decodeURIComponent(cookiePair[1]);
    }
  }

  // If the cookie is not found, return null
  return null;
}

const cookieValue = getCookieValue("UserLoggedIn");

let PointsForTask;
let taskID;

const tasks = document.getElementsByClassName("Task");

let Popup = document.getElementById("GjeremaalPopup")

//Sjekker hvilken oppgave bruker trykker på
const taskPressed = e => {
  taskID = e.target.id
  console.log(e.target.id);  //Finner id til oppgaven
  getCurrentPoints(cookieValue, "SamletPoeng");
  getTaskPoints();
  VisPopup();
}

for (let Task of tasks) {
  Task.addEventListener("click", taskPressed);
}

function VisPopup() {
  document.getElementById("GjeremaalFerdig").innerHTML = "Gjøremål: " + taskID;
  Popup.classList.remove("GjeremaalPopupHidden");
  Popup.classList.add("GjeremaalPopupShow");
}

//Gjør lukk-knappen på popup'en funksjonell
if (document.getElementById("LukkGjeremaal")) {
  document.getElementById("LukkGjeremaal").addEventListener("click", LukkGjeremaalPopup);
}


function LukkGjeremaalPopup() {
  Popup.classList.remove("GjeremaalPopupShow");
  Popup.classList.add("GjeremaalPopupHidden");
}

//Finner points for tasken bruker har trykket på
async function getTaskPoints() {
  const taskRef = db.collection('tasks').doc(taskID);
  const doc = await taskRef.get();
  if (!doc.exists) {
    console.log('No such document!');
  } else {
    PointsForTask = doc.data().points
    console.log('TaskPoints:', PointsForTask);
    document.getElementById("PoengGitt").innerHTML = "Poeng gitt: " + PointsForTask;
    try {
      AddPoints();
    } catch(err) {
      console.log(err);
    }
  }
}

//Finner hvor mange poeng innlogget bruker har
export async function getCurrentPoints(NameOfPerson, elementID) {
  const userRef = db.collection('users').doc(NameOfPerson);
  const doc = await userRef.get();
  if (!doc.exists) {
    console.log('No such document!');
    return null;
  } else {
    const UserPoints = doc.data().totalPoints;
    console.log('GetUserPoints', UserPoints);
    if (elementID) {
      document.getElementById(elementID).innerHTML = "Din score: " + UserPoints;
    }
    return UserPoints;
  }
}


function AddPoints() {
  const docRef = db.collection('users').doc(cookieValue);
  docRef.update({
    totalPoints: firebase.firestore.FieldValue.increment(PointsForTask)
  });
  
  db.collection("done").doc().set({
    doneBy: cookieValue,
    time: Date(),
    task: taskID
  })
  console.log("incremented by ", PointsForTask)
}