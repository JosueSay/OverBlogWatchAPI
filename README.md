# 💻 OverBlogWatch API/BLOG

¡Bienvenido a OverBlogWatch, tu futura fuente de noticias y análisis sobre Overwatch! 🎮 Este repositorio contiene una API REST para gestionar y acceder a publicaciones relacionadas con el popular juego.

## 📖 Descripción del Repositorio

Este proyecto es una implementación de una API REST para un blog dedicado a Overwatch. Proporciona endpoints para obtener listados de posts, detalles de posts individuales, crear nuevos posts, modificar posts existentes y eliminar posts. Todo ello respaldado por una base de datos MySQL.


## 📂 Organización de Carpetas
- **db-details:** En esta carpeta encontrarás los archivos de los detalles de la base de datos  como `Propiedades_schem.txt` y `Digrama.png`.

- **src:**
  - **main.js:** archivo que se ejecuta al introducir `npm start`, contiene la programación para el llamado y gestión de parámetros de endpoints de `db.js`.
  - **conn.js:** archivo que contiene la conexión a la base de datos para hacer peticiones, modificaciones, etc.
  - **db.js:** archivo que contiene la programación de los enpoints.

## 🚀 Instrucciones de Uso

1. **Configuración del Entorno:**
   - Clona este repositorio en tu máquina local.
   - Ejecuta el comando `npm install` para instalar las dependencias.

2. **Iniciar el Servidor:**
   - Genera la imagen con Docker y ejecuta el conenedor (se muestra en `Imagen de Docker para MySQL`)
   - Utiliza el comando `npm start` para iniciar el servidor de Express.
   - La API estará disponible en `https://localhost:3000`.

3. **Endpoints Disponibles:**
   - **Obtener todos los posts:**
     - Método: `GET`
     - Endpoint: `https://localhost:3000/posts`

   - **Obtener detalle de un post:**
     - Método: `GET`
     - Endpoint: `https://localhost:3000/posts/:postId`

   - **Crear un nuevo post:**
     - Método: `POST`
     - Endpoint: `https://localhost:3000/posts`
     - Ejemplo de JSON en el cuerpo:
       ```json
       {
         "title": "Mi Nuevo Post",
         "content": "Este es el contenido de mi nuevo post",
         "userId": 1
       }
       ```

   - **Modificar un post existente:**
     - Método: `PUT`
     - Endpoint: `https://localhost:3000/posts/:postId`
     - Ejemplo de JSON en el cuerpo:
       ```json
       {
         "title": "Mi Post Modificado",
         "content": "Este es el contenido modificado de mi post"
       }
       ```

   - **Eliminar un post:**
     - Método: `DELETE`
     - Endpoint: `https://localhost:3000/posts/:postId`

## 🌐 Repositorio OverBlogWatch

- **GitHub:**
  [Repositorio en GitHub](https://github.com/JosueSay/OverBlogWatch)

## 🐳 Imagen de Docker para MySQL

Crear la base de datos MySQL en un contenedor Docker:

1. **Crear imágen docker:**
   ```bash
   docker build -t mysql-blog-image .
2. **Inicializar el contenedor:**
   ```bash
   docker run --name mysql-blog-container -d -p 3306:3306 mysql-blog-image
4. **Encender el contenedor:**
   ```bash
   docker start CONTAINER_ID


**Recuerda reemplazar "CONTAINER_ID" con el identificador real de tu contenedor si es necesario y para probar los endpoints asegura colocar las opciones raw para postman o aplication/json en hoppscotch.**
