// Función para enviar un código de verificación simulado
function enviarCodigo() {
    const email = document.getElementById("email").value;

    if (localStorage.getItem(email)) {
        // Generar un código de verificación simulado
        const codigoVerificacion = Math.floor(100000 + Math.random() * 900000); // Código de 6 dígitos
        sessionStorage.setItem("codigoVerificacion", codigoVerificacion);
        sessionStorage.setItem("emailRecuperacion", email);

        alert(`Código de verificación enviado a ${email}: ${codigoVerificacion}`); // En un entorno real, este código se enviaría por correo.
    } else {
        alert("Este correo electrónico no está registrado.");
    }
}

// Función para verificar el código e ingresar la nueva contraseña
function verificarCodigo() {
    const email = document.getElementById("email").value;
    const codigoIngresado = document.getElementById("codigo").value;
    const newPassword = document.getElementById("newPassword").value;

    const codigoGuardado = sessionStorage.getItem("codigoVerificacion");
    const emailGuardado = sessionStorage.getItem("emailRecuperacion");

    if (email === emailGuardado && codigoIngresado == codigoGuardado) {
        if (newPassword) {
            localStorage.setItem(email, newPassword);
            alert("Contraseña actualizada con éxito. Puedes iniciar sesión con tu nueva contraseña.");
            sessionStorage.removeItem("codigoVerificacion");
            sessionStorage.removeItem("emailRecuperacion");
            window.location.href = "registro.html"; // Redirige al login
        } else {
            alert("Por favor, ingresa una nueva contraseña.");
        }
    } else {
        alert("El código de verificación o el correo son incorrectos.");
    }
}
