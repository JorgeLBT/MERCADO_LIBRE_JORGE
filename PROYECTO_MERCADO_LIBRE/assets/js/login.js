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
