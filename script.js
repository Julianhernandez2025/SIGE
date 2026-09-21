function mostrarUsuarios() {
    const usuariosContainer = document.getElementById('usuarios-container');
    usuariosContainer.innerHTML = ''; // Limpiar el contenedor antes de mostrar los usuarios
    usuarios.forEach(usuario => {
        const usuarioElement = document.createElement('div');
        usuarioElement.innerHTML = `
            <h3>${usuario.name}</h3>
            <p><strong>Username:</strong> ${usuario.username}</p>
            <p><strong>Email:</strong> ${usuario.email}</p>
            <p><strong>Phone:</strong> ${usuario.phone}</p>
        `;
        usuariosContainer.appendChild(usuarioElement);
    });
}

function mostrarPosts() {
    const postsContainer = document.getElementById('posts-container');
    postsContainer.innerHTML = ''; // Limpiar el contenedor antes de mostrar los posts
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.body}</p>
        `;
        postsContainer.appendChild(postElement);
    });
}

    function areapersonal() {
        const areapersonalContainer = document.getElementById('areapersonal-container');
        areapersonalContainer.innerHTML = '';
        areapersonal.forEach(area => {
            const areaElement = document.createElement('div');
            areaElement.innerHTML = `
                <h3>${area.title}</h3>
                <p>${area.description}</p>
            `;
            areapersonalContainer.appendChild(areaElement);
        });

    }
    function login() {
        const loginContainer = document.getElementById('login-container');
        loginContainer.innerHTML = '';  

        const loginForm = document.createElement('form');
        loginForm.innerHTML = `
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required>
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required>
            <button type="submit">Login</button>
        `;
        loginContainer.appendChild(loginForm);
    }

    function cerrarSesion() {
        // Aquí puedes agregar la lógica para cerrar sesión, como limpiar datos de usuario, redirigir a la página de inicio, etc.
        alert('Sesión cerrada. Redirigiendo a la página de inicio.');
        window.location.href = 'index.html'; // Redirigir a la página de inicio
    }

    function redirigirPagina(pagina) {
        window.location.href = pagina;
    }
    function enviarFormulario(event) {
        event.preventDefault(); // Evitar que el formulario se envíe de forma predeterminada
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        alert('Formulario enviado. Username: ' + document.getElementById('username').value + ', Password: ' + document.getElementById('password').value);
    // Aquí puedes agregar la lógica para enviar los datos del formulario al servidor o realizar otras acciones necesarias.
}
  
   function enviar(event) {
        event.preventDefault();
    alert('Formulario enviado. Username: ' + document.getElementById('username').value + ', Password: ' + document.getElementById('password').value);
    // Aquí puedes agregar la lógica para enviar los datos del formulario al servidor o realizar otras acciones necesarias.
}

function registrarse(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    alert('Registro exitoso. Name: ' + name + ', Username: ' + username + ', Email: ' + email + ', Phone: ' + phone + ', Password: ' + password);
    // Aquí puedes agregar la lógica para enviar los datos del formulario al servidor o realizar otras acciones necesarias.
}

const STORAGE_KEY = 'sigeUsuarios';

        function obtenerUsuarios() {
            const usuariosGuardados = localStorage.getItem(STORAGE_KEY);
            return usuariosGuardados ? JSON.parse(usuariosGuardados) : [];
        }

        function guardarUsuarios(usuarios) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(usuarios));
        }

        function renderizarUsuarios() {
            const contenedor = document.getElementById('usuarios-lista');
            if (!contenedor) return;

            const usuarios = obtenerUsuarios();
            if (usuarios.length === 0) {
                contenedor.innerHTML = '<div class="empty-state">No hay usuarios creados aún.</div>';
                return;
            }

            contenedor.innerHTML = usuarios.map(usuario => `
                <article class="usuario-card">
                    <h3>${usuario.nombre}</h3>
                    <p><strong>Rol:</strong> ${usuario.rol}</p>
                    <p><strong>Usuario:</strong> ${usuario.usuario}</p>
                    <p><strong>Email:</strong> ${usuario.email}</p>
                    <p><strong>Teléfono:</strong> ${usuario.telefono}</p>
                </article>
            `).join('');
        }

        document.getElementById('usuario-form')?.addEventListener('submit', function (event) {
            event.preventDefault();

            const form = event.currentTarget;
            const nuevoUsuario = {
                nombre: form.nombre.value.trim(),
                rol: form.rol.value,
                tipoDocumento: form.tipo_documento.value,
                documento: form.documento.value.trim(),
                telefono: form.telefono.value.trim(),
                email: form.email.value.trim(),
                usuario: form.usuario.value.trim(),
                password: form.password.value.trim()
            };

            if (!nuevoUsuario.nombre || !nuevoUsuario.rol || !nuevoUsuario.usuario || nuevoUsuario.password.length < 6) {
                alert('Completa los campos obligatorios y usa una contraseña de al menos 6 caracteres.');
                return;
            }

            const usuarios = obtenerUsuarios();
            usuarios.push(nuevoUsuario);
            guardarUsuarios(usuarios);
            renderizarUsuarios();
            form.reset();
            alert('Usuario creado correctamente.');
        });

        renderizarUsuarios();