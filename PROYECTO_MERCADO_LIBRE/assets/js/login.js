
document.querySelector('.form-login').addEventListener('submit', function(event) {
    event.preventDefault();
    // Redirige a inicio.html con una bandera en la URL
    window.location.href = 'inicio.html?status=login-success';
});
const formLogin = document.querySelector(".form-login");
const inputPass = document.querySelector('.form-login input[type="password"]');
const inputEmail = document.querySelector('.form-login input[type="email"]');
const alertaErrorLogin = document.querySelector(".form-login .alerta-error");
const alertaExitoLogin = document.querySelector(".form-login .alerta-exito");

document.addEventListener("DOMContentLoaded", () => {
    formLogin.addEventListener("submit", (e) => {
      registerJs.estadoValidacionCampos.userName = true;
      e.preventDefault();
      registerJs.enviarFormulario(formLogin,alertaErrorLogin,alertaExitoLogin);
    });
  
    inputEmail.addEventListener("input", () => {
      registerJs.validarCampo(registerJs.emailRegex,inputEmail,"El correo solo puede contener letras, números, puntos, guiones y guíon bajo.");
    });
  
    inputPass.addEventListener("input", () => {
      registerJs.validarCampo(registerJs.passwordRegex,inputPass,"La contraseña tiene que ser de 4 a 12 dígitos");
    });
});