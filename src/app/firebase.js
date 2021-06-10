function ingreso() {
  var emaillog = document.getElementById('maillog').value;
  var passwordlog = document.getElementById('passlog').value;

  firebase.auth().signInWithEmailAndPassword(emaillog, passwordlog)
    .then((userCredential) => {
      var user = userCredential.user;
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
  });
}

function observerUser() {
  firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("worked fine!");
        var uid = user.uid;
        resgisteredUserContent();
      } else {
        console.log("No user active detected!");
      }
  });
}
observerUser();

function resgisteredUserContent() {
  var content = document.getElementById('content');
  content.innerHTML = `<button type="submit" onclick="closeSesion()"><strong>Cerrar sesión</strong></button>`;
}

function closeSesion() {
  firebase.auth().signOut()
  .then(function() {
    console.log("Sesion closed");
  })
  .catch(function(error) {
    console.log(error);
  })
}




