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
        sessionStorage.removeItem('sigeSesion');
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
const SESSION_KEY = 'sigeSesion';

function protegerPaginasInternas() {
    const paginaActual = window.location.pathname.split('/').pop().toLowerCase() || 'index.html';
    const paginasPublicas = ['index.html', 'servicios.html', 'contacto.html', 'login.html', 'registro.html'];

    if (paginaActual === 'login.html') {
        sessionStorage.removeItem(SESSION_KEY);
        return;
    }

    if (!paginasPublicas.includes(paginaActual) && !sessionStorage.getItem(SESSION_KEY)) {
        window.location.replace('login.html');
    }
}

protegerPaginasInternas();

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

function obtenerDatosExportables(usuarios) {
    return usuarios.map(function (usuario) {
        return [
            usuario.nombre || usuario.name || '',
            usuario.rol || '',
            usuario.tipoDocumento || '',
            usuario.documento || '',
            usuario.telefono || usuario.phone || '',
            usuario.email || '',
            usuario.usuario || usuario.username || ''
        ];
    });
}

function exportarUsuariosExcel() {
    const usuarios = obtenerUsuarios();
    if (usuarios.length === 0) {
        alert('No hay usuarios para exportar.');
        return;
    }

    if (!window.XLSX) {
        alert('No fue posible cargar la herramienta de Excel. Revisa tu conexión a internet e inténtalo de nuevo.');
        return;
    }

    const filas = [
        ['Nombre', 'Rol', 'Tipo de documento', 'Documento', 'Teléfono', 'Correo electrónico', 'Usuario'],
        ...obtenerDatosExportables(usuarios)
    ];
    const hoja = window.XLSX.utils.aoa_to_sheet(filas);
    const libro = window.XLSX.utils.book_new();
    window.XLSX.utils.book_append_sheet(libro, hoja, 'Usuarios');
    window.XLSX.writeFile(libro, 'usuarios-sige.xlsx');
}

function exportarUsuariosPDF() {
    const usuarios = obtenerUsuarios();
    if (usuarios.length === 0) {
        alert('No hay usuarios para exportar.');
        return;
    }

    const JsPDF = window.jspdf?.jsPDF;
    if (!JsPDF) {
        alert('No fue posible cargar la herramienta de PDF. Revisa tu conexión a internet e inténtalo de nuevo.');
        return;
    }

    const documento = new JsPDF({ orientation: 'landscape' });
    documento.setFontSize(16);
    documento.text('Usuarios creados - SIGE', 14, 16);
    documento.autoTable({
        head: [['Nombre', 'Rol', 'Tipo documento', 'Documento', 'Teléfono', 'Correo', 'Usuario']],
        body: obtenerDatosExportables(usuarios),
        startY: 23,
        styles: { fontSize: 8, cellPadding: 2, overflow: 'linebreak' },
        headStyles: { fillColor: [36, 107, 61] }
    });
    documento.save('usuarios-sige.pdf');
}

function inicializarFormularios() {
    const formularioLogin = document.getElementById('login-form');
    formularioLogin?.addEventListener('submit', function (event) {
        event.preventDefault();

        const nombreUsuario = formularioLogin.elements.namedItem('username').value.trim();
        const password = formularioLogin.elements.namedItem('password').value;
        const usuarioEncontrado = obtenerUsuarios().find(function (usuario) {
            const nombreGuardado = usuario?.usuario ?? usuario?.username;
            return typeof nombreGuardado === 'string'
                && nombreGuardado.trim().toLowerCase() === nombreUsuario.toLowerCase()
                && usuario?.password === password;
        });

        if (!usuarioEncontrado) {
            alert('Usuario o contraseña incorrectos. Regístrate o solicita que creen tu usuario.');
            return;
        }

        sessionStorage.setItem(SESSION_KEY, usuarioEncontrado.usuario ?? usuarioEncontrado.username);
        window.location.href = 'areapersonal.html';
    });

    const formularioRegistro = document.querySelector('form.registro-form:not(#usuario-form)');
    if (formularioRegistro?.elements.namedItem('username')) {
        formularioRegistro.addEventListener('submit', function (event) {
            event.preventDefault();

            const nombreUsuario = formularioRegistro.elements.namedItem('username').value.trim();
            const password = formularioRegistro.elements.namedItem('password').value.trim();
            const usuarios = obtenerUsuarios();
            const usuarioExiste = usuarios.some(function (usuario) {
                const nombreGuardado = usuario?.usuario ?? usuario?.username;
                return typeof nombreGuardado === 'string'
                    && nombreGuardado.trim().toLowerCase() === nombreUsuario.toLowerCase();
            });

            if (usuarioExiste) {
                alert('Ese nombre de usuario ya está registrado. Elige otro.');
                return;
            }

            if (password.length < 6) {
                alert('La contraseña debe tener al menos 6 caracteres.');
                return;
            }

            usuarios.push({
                nombre: formularioRegistro.elements.namedItem('nombre').value.trim(),
                rol: 'Usuario registrado',
                empresa: formularioRegistro.elements.namedItem('empresa').value,
                tipoDocumento: formularioRegistro.elements.namedItem('tipo_documento').value,
                documento: formularioRegistro.elements.namedItem('documento').value.trim(),
                telefono: formularioRegistro.elements.namedItem('telefono').value.trim(),
                email: formularioRegistro.elements.namedItem('email').value.trim(),
                usuario: nombreUsuario,
                password: password
            });

            guardarUsuarios(usuarios);
            alert('Registro exitoso. Ya puedes iniciar sesión.');
            window.location.href = 'login.html';
        });
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
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarFormularios, { once: true });
} else {
    inicializarFormularios();
}

        function eliminarUsuario(index) {
            const usuarios = obtenerUsuarios();
            if (index >= 0 && index < usuarios.length) {
                usuarios.splice(index, 1);
                guardarUsuarios(usuarios);
                renderizarUsuarios();
                alert('Usuario eliminado correctamente.');
            }
        }

        function editarUsuario(index) {
            const usuarios = obtenerUsuarios();
            if (index >= 0 && index < usuarios.length) {
                const usuario = usuarios[index];
                const form = document.getElementById('usuario-form');
                form.nombre.value = usuario.nombre;
                form.rol.value = usuario.rol;
                form.tipo_documento.value = usuario.tipoDocumento;
                form.documento.value = usuario.documento;
                form.telefono.value = usuario.telefono;
                form.email.value = usuario.email;
                form.usuario.value = usuario.usuario;
                form.password.value = usuario.password;
                }
              }

const TIC_STORAGE_KEY = 'sigeTicRegistros';

function escaparHtmlTic(valor) {
    return String(valor ?? '').replace(/[&<>"']/g, function (caracter) {
        const entidades = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        };
        return entidades[caracter];
    });
}

function leerRegistrosTic() {
    try {
        return JSON.parse(localStorage.getItem(TIC_STORAGE_KEY) || '[]');
    } catch (error) {
        return [];
    }
}

function guardarRegistrosTic(registros) {
    try {
        localStorage.setItem(TIC_STORAGE_KEY, JSON.stringify(registros));
        return true;
    } catch (error) {
        alert('No se pudieron guardar los cambios en este navegador.');
        return false;
    }
}

function inicializarGestionTic() {
    const formulario = document.querySelector('[data-tic-record-form]');
    const contenedor = document.querySelector('[data-tic-record-list]');
    if (!formulario || !contenedor) return;

    const modulo = formulario.dataset.ticModule;
    const campoTitulo = formulario.dataset.ticTitleField;
    const campos = Array.from(formulario.querySelectorAll('[data-record-field]'));
    const filtroTexto = document.querySelector('[data-tic-search]');
    const filtroEstado = document.querySelector('[data-tic-filter]');
    const botonGuardar = formulario.querySelector('[data-tic-save]');
    const botonCancelar = formulario.querySelector('[data-tic-cancel]');
    let idEnEdicion = null;

    function renderizarRegistros() {
        const consulta = (filtroTexto?.value || '').trim().toLocaleLowerCase('es');
        const estadoSeleccionado = filtroEstado?.value || '';
        const registros = leerRegistrosTic()
            .filter(registro => registro.modulo === modulo)
            .filter(registro => !estadoSeleccionado || registro.datos.estado === estadoSeleccionado)
            .filter(registro => !consulta || Object.values(registro.datos).some(valor => String(valor).toLocaleLowerCase('es').includes(consulta)))
            .sort((a, b) => new Date(b.actualizado || b.creado) - new Date(a.actualizado || a.creado));

        if (registros.length === 0) {
            contenedor.innerHTML = '<p class="tic-record-empty">No hay registros que coincidan con la búsqueda.</p>';
            return;
        }

        contenedor.innerHTML = registros.map(function (registro) {
            const titulo = escaparHtmlTic(registro.datos[campoTitulo] || 'Registro sin título');
            const estado = registro.datos.estado ? `<span class="tic-record-status">${escaparHtmlTic(registro.datos.estado)}</span>` : '';
            const detalles = campos
                .filter(campo => campo.name !== campoTitulo && registro.datos[campo.name])
                .map(campo => `<div class="tic-record-detail"><dt>${escaparHtmlTic(campo.dataset.recordLabel || campo.name)}</dt><dd>${escaparHtmlTic(registro.datos[campo.name])}</dd></div>`)
                .join('');
            const licenciasDisponibles = modulo === 'software'
                && registro.datos.licenciasTotales !== ''
                && registro.datos.cantidad !== ''
                ? `<div class="tic-record-detail"><dt>Licencias disponibles</dt><dd>${Math.max(0, Number(registro.datos.licenciasTotales) - Number(registro.datos.cantidad))}</dd></div>`
                : '';
            const fecha = new Date(registro.actualizado || registro.creado).toLocaleString('es-CO');

            return `<article class="tic-record-card">
                <div class="tic-record-card-heading"><h3>${titulo}</h3>${estado}</div>
                <dl class="tic-record-details">${detalles}${licenciasDisponibles}</dl>
                <p class="tic-record-date">Actualizado: ${escaparHtmlTic(fecha)}</p>
                <div class="tic-record-actions">
                    <button class="tic-secondary-button" type="button" data-tic-action="edit" data-tic-id="${escaparHtmlTic(registro.id)}">Editar</button>
                    <button class="tic-danger-button" type="button" data-tic-action="delete" data-tic-id="${escaparHtmlTic(registro.id)}">Eliminar</button>
                </div>
            </article>`;
        }).join('');
    }

    function cancelarEdicion() {
        idEnEdicion = null;
        formulario.reset();
        if (botonGuardar) botonGuardar.textContent = 'Guardar registro';
        if (botonCancelar) botonCancelar.hidden = true;
    }

    formulario.addEventListener('submit', function (event) {
        event.preventDefault();
        const datos = Object.fromEntries(new FormData(formulario).entries());
        Object.keys(datos).forEach(clave => {
            if (typeof datos[clave] === 'string') datos[clave] = datos[clave].trim();
        });

        if (modulo === 'software'
            && Number(datos.cantidad) > Number(datos.licenciasTotales)) {
            alert('Las licencias asignadas no pueden superar el total disponible.');
            return;
        }

        const registros = leerRegistrosTic();
        const ahora = new Date().toISOString();
        if (idEnEdicion) {
            const registro = registros.find(item => item.id === idEnEdicion && item.modulo === modulo);
            if (!registro) {
                cancelarEdicion();
                renderizarRegistros();
                return;
            }
            registro.datos = datos;
            registro.actualizado = ahora;
        } else {
            registros.push({
                id: window.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`,
                modulo: modulo,
                datos: datos,
                creado: ahora,
                actualizado: ahora
            });
        }

        if (!guardarRegistrosTic(registros)) return;
        cancelarEdicion();
        renderizarRegistros();
    });

    contenedor.addEventListener('click', function (event) {
        const boton = event.target.closest('[data-tic-action]');
        if (!boton) return;

        const registro = leerRegistrosTic().find(item => item.id === boton.dataset.ticId && item.modulo === modulo);
        if (!registro) return;

        if (boton.dataset.ticAction === 'delete') {
            if (!window.confirm('¿Quieres eliminar este registro?')) return;
            const registrosActualizados = leerRegistrosTic().filter(item => item.id !== registro.id || item.modulo !== modulo);
            if (guardarRegistrosTic(registrosActualizados)) renderizarRegistros();
            return;
        }

        if (boton.dataset.ticAction === 'edit') {
            campos.forEach(campo => {
                campo.value = registro.datos[campo.name] || '';
            });
            idEnEdicion = registro.id;
            if (botonGuardar) botonGuardar.textContent = 'Guardar cambios';
            if (botonCancelar) botonCancelar.hidden = false;
            formulario.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });

    botonCancelar?.addEventListener('click', cancelarEdicion);
    filtroTexto?.addEventListener('input', renderizarRegistros);
    filtroEstado?.addEventListener('change', renderizarRegistros);
    renderizarRegistros();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarGestionTic, { once: true });
} else {
    inicializarGestionTic();
}
