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