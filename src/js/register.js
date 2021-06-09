//Función que comprueba si las contraseñas introducidas son iguales 
function verificarPasswords() {
  // Ontenemos los valores de los campos de contraseñas 
  pass1 = document.getElementById('inputpass');
  pass2 = document.getElementById('inputrepeatpass');

  // Verificamos si las constraseñas no coinciden 
  if (pass1.value != pass2.value) {
    // Si las constraseñas no coinciden mostramos un mensaje 
    document.getElementById("error").classList.add("mostrar");
    return false;
  } else 
    document.getElementById("error").classList.remove("mostrar");
    return true;
}

if(verificarPasswords()) {
  document.getElementById("send").disabled = true;
}