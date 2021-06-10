function registrar() {
    var email = document.getElementById('inputemail').value;
    var password = document.getElementById('inputpass').value;
    
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function(){
      verify();
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
    });
  }
  function observerUser() {
  firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("worked fine!");
        var uid = user.uid;
      } else {
        console.log("No user active detected!");
      }
  });
}
observerUser();

function verify() {
    var user = firebase.auth().currentUser;
  
    user.sendEmailVerification().then(function() {
      console.log("Enviado correo...");
    }).catch(function(error) {
      console.log(error);
    });
  }