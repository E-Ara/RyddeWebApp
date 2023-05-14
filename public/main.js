function WhoLogIn(clicked_id) {
  const d = new Date();
  d.setTime(d.getTime() + (31*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = 'UserLoggedIn='+ clicked_id +';' + expires + ";path=/";
}  

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

export let cookieValue = getCookieValue("UserLoggedIn");