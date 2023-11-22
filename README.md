# 🎾 Tennis Match Up

Aplicación Web Full Stack para una liga de tenis.

## 👨‍💼 Author

- [Neider Silva](https://neidersilva.vercel.app/)

## ⚙️ Instalación

Clona el repositorio:

```bash
git clone https://github.com/Neider28/tennis-app.git
```

Inicia el servidor en modo desarrollo:

```bash
npm run dev
```

## 🔨 Estructura del proyecto

En la carpeta ```src``` se encuentra todo el codigo principal. Contiene las siguientes carpetas:

- ```app```: contiene todas las vistas de las páginas, la configuración global de css, favicon y un archivo especial para encapsular providers como el context.
- ```components```: contiene todos los componentes de la aplicación que se reutilizan en varias páginas, por ejemplo una tabla que muestra los torneos.
- ```context```: contiene un archivo que guarda el contexto global de la aplicación, por ejemplo un estado que abre y cierra un modal.
- ```icons```: contiene los iconos usados por otros componentes.
- ```interfaces```: contiene las interfaces necesarias para tipar datos de entrada y salida con el objetivo de prevenir errores de tipado.
- ```middlewares```: contiene middlewares necesarios para controlar el manejo de rutas, por ejemplo si un usuario tiene como rol usuario normal no pueda acceder al panel de administrador.
- ```services```: contiene los llamados a la API para obtener, crear, actualizar y eliminar información.
- ```utils```: contiene las utilidades que cumplen un propósito puntual, por ejemplo obtener una cookie.

## 🪄 Tech Stack

**Cliente:** TypeScript, Next.js, React.js, TailwindCSS, Cookie, NextUI

**Servidor:** TypeScript, Nest.js, Node.js, Passport, JWT, TypeORM, PostgreSQL

**Despliegue:** Vercel

## 👌 Características

- La aplicación atiende a dos tipos de usuario: Administrador y Usuario Regular.
- El Usuario Administrador puede crear, leer, editar y eliminar torneos.
- El Usuario Administrador puede crear, leer, editar y eliminar usuarios.
- El Usuario Regular puede ver información del torneo y registrarse.
- Ambos usuarios pueden ver su información como foto de perfil, primer nombre, segundo nombre, estado, rol, biografía, email y contraseña.
- Ambos usuarios pueden editar su información como foto de perfil, primer nombre, segundo nombre, biografía, email y contraseña.
- El Usuario Administrador puede ver los usuarios que se han inscrito a un torneo.
- El Usuario Regular puede ver en su perfil los torneos a los que se ha inscrito.

## 🎯 Backend

La documentación de la API la puedes encontrar [aquí.](https://tennis-backend-rho.vercel.app/docs)

## Screenshot: Inicio

![App Screenshot](https://i.postimg.cc/T1CRzkmS/tennis-app-plum-vercel-app.png)

## Screenshot: Login

![App Screenshot](https://i.postimg.cc/dVD1YK59/tennis-app-plum-vercel-app-login.png)

## Screenshot: Sign Up

![App Screenshot](https://i.postimg.cc/hPDv2mx6/tennis-app-plum-vercel-app-sign-up.png)

## Screenshot: Panel Administrador (Torneos)

![App Screenshot](https://i.postimg.cc/wM6qbKtL/tennis-app-plum-vercel-app-login-2.png)

## Screenshot: Panel Administrador (Usuarios)

![App Screenshot](https://i.postimg.cc/kgZ5MhZP/tennis-app-plum-vercel-app-login-3.png)

## Screenshot: Panel Usuario Regular

![App Screenshot](https://i.postimg.cc/0Nwyz0RM/tennis-app-plum-vercel-app-login-1.png)

## Screenshot: Perfil Usuario Regular

![App Screenshot](https://i.postimg.cc/Hx1sX8dS/tennis-app-plum-vercel-app-profile.png)

## Screenshot: Perfil Administrador

![App Screenshot](https://i.postimg.cc/FsTR8KVR/tennis-app-plum-vercel-app-profile-1.png)

## Screenshot: Editar Perfil (Administrador and Usuario Regular)

![App Screenshot](https://i.postimg.cc/Pxbf4fqd/tennis-app-plum-vercel-app-edit-profile.png)
