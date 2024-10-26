(function () {
    const formLogin = document.querySelector(".form-login");
    const inputPass = document.querySelector('.form-login input[type="password"]');
    const inputEmail = document.querySelector('.form-login input[type="email"]');
    const alertaError = document.querySelector(".form-login .alerta-error");
    const alertaExito = document.querySelector(".form-login .alerta-exito");

    // Expresiones regulares para validar los campos
    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const passwordRegex = /^.{4,12}$/;

    // Estado de validación de campos
    const estadoValidacionCampos = {
        userEmail: false,
        userPassword: false,
    };

    document.addEventListener("DOMContentLoaded", () => {
        formLogin.addEventListener("submit", (e) => {
            e.preventDefault();
            enviarFormulario(); // Llama a la función para enviar el formulario si es válido
        });

        // Validación en tiempo real de los campos
        inputEmail.addEventListener("input", () => {
            validarCampo(emailRegex, inputEmail, "El correo solo puede contener letras, números, puntos, guiones y guion bajo.");
        });

        inputPass.addEventListener("input", () => {
            validarCampo(passwordRegex, inputPass, "La contraseña tiene que ser de 4 a 12 dígitos");
        });
    });

    // Función para validar cada campo
    function validarCampo(regularExpresion, campo, mensaje) {
        const validarCampo = regularExpresion.test(campo.value);
        if (validarCampo) {
            eliminarAlerta(campo.parentElement.parentElement);
            estadoValidacionCampos[campo.name] = true;
            campo.parentElement.classList.remove("error");
        } else {
            estadoValidacionCampos[campo.name] = false;
            campo.parentElement.classList.add("error");
            mostrarAlerta(campo.parentElement.parentElement, mensaje);
        }
    }

    // Función para mostrar un mensaje de error
    function mostrarAlerta(referencia, mensaje) {
        eliminarAlerta(referencia);
        const alertaDiv = document.createElement("div");
        alertaDiv.classList.add("alerta");
        alertaDiv.textContent = mensaje;
        referencia.appendChild(alertaDiv);
    }

    // Función para eliminar el mensaje de error
    function eliminarAlerta(referencia) {
        const alerta = referencia.querySelector(".alerta");
        if (alerta) alerta.remove();
    }

    // Función para enviar el formulario
    function enviarFormulario() {
        if (estadoValidacionCampos.userEmail && estadoValidacionCampos.userPassword) {
            alertaExito.textContent = "Has iniciado sesión correctamente";
            alertaExito.classList.add("alertaExito");
            alertaError.classList.remove("alertaError");

            setTimeout(() => {
                alertaExito.classList.remove("alertaExito");
            }, 3000);

            formLogin.reset(); // Limpia el formulario tras el envío
            estadoValidacionCampos.userEmail = false;
            estadoValidacionCampos.userPassword = false;
        } else {
            alertaError.textContent = "Todos los campos son obligatorios y deben ser válidos";
            alertaError.classList.add("alertaError");

            setTimeout(() => {
                alertaError.classList.remove("alertaError");
            }, 3000);
        }
    }
})();
