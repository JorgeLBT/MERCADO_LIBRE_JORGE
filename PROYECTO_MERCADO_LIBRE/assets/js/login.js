document.querySelector('.form-login').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.querySelector('.form-login input[name="userEmail"]').value;
    const password = document.querySelector('.form-login input[name="userPassword"]').value;

    // Verificación básica de usuario y contraseña
    if (email && password) {
        // Determinar el rol del usuario
        const isAdmin = email === 'jorge_041200@outlook.com';

        // Guardar el estado de la sesión y el rol en sessionStorage
        sessionStorage.setItem('isLoggedIn', true);
        sessionStorage.setItem('userEmail', email);
        sessionStorage.setItem('role', isAdmin ? 'admin' : 'user');

        // Redirigir a inicio.html con el estado de éxito
        window.location.href = 'inicio.html?status=login-success';
    } else {
        // Mostrar mensaje de error si los campos están vacíos
        alertaErrorLogin.style.display = "block";
        alertaExitoLogin.style.display = "none";
    }
});
// Guardar datos en localStorage al registrarse
document.querySelector('.form-register').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.querySelector('.form-register input[name="userEmail"]').value;
    const password = document.querySelector('.form-register input[name="userPassword"]').value;

    if (email && password) {
        localStorage.setItem(email, password);
        alert("Registro exitoso. Tu información ha sido guardada.");
    } else {
        alert("Por favor, completa todos los campos.");
    }
});


// // Función para recuperar la contraseña
// function recuperarContrasena() {
//     const email = prompt("Ingresa tu correo electrónico registrado:");

//     if (email) {
//         const storedPassword = localStorage.getItem(email);

//         if (storedPassword) {
//             alert(`Tu contraseña es: ${storedPassword}`);
//         } else {
//             alert("Correo electrónico no registrado.");
//         }
//     } else {
//         alert("Por favor, ingresa un correo electrónico.");
//     }
// }

// Lógica de inicio de sesión existente
document.querySelector('.form-login').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.querySelector('.form-login input[name="userEmail"]').value;
    const password = document.querySelector('.form-login input[name="userPassword"]').value;

    if (email && password) {
        const storedPassword = localStorage.getItem(email);

        if (storedPassword === password) {
            // Determina el rol del usuario
            const isAdmin = email === 'jorge_041200@outlook.com';

            // Guardar estado de sesión y rol en sessionStorage
            sessionStorage.setItem('isLoggedIn', true);
            sessionStorage.setItem('userEmail', email);
            sessionStorage.setItem('role', isAdmin ? 'admin' : 'user');

            // Redirigir a inicio.html con estado de éxito
            window.location.href = 'inicio.html?status=login-success';
        } else {
            alert("Correo o contraseña incorrectos.");
        }
    } else {
        alert("Por favor, completa todos los campos.");
    }
});
