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
      // Signed in
      var user = userCredential.user;
      // ...
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
        // ...
      } else {
        console.log("No user active detected!");
      }
  });
}

observerUser();