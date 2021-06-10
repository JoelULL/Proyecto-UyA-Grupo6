function registrar() {
  var email = document.getElementById('inputemail').value;
  var password = document.getElementById('inputpass').value;
  
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    var user = userCredential.user;
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
  });
}

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

function closeSesion() {
  firebase.auth().signOut()
  .then(function() {
    console.log("Sesion closed");
  })
  .catch(function(error) {
    console.log(error);
  })
}

function resgisteredUserContent() {
  var content = document.getElementById('content');
  content.innerHTML = `<button type="submit" onclick="closeSesion()"><strong>Cerrar sesión</strong></button>`;
}

observerUser();