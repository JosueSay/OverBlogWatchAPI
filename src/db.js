import conn from './conn.js'

// Obtener todos los posts
export async function getAllPosts () {
  try {
    const query = `
      SELECT Posts.*, Usuarios.Nombre AS NombreUsuario
      FROM Posts
      INNER JOIN Usuarios ON Posts.Id_usuario = Usuarios.Id_usuario
    `
    const [rows] = await conn.query(query)
    return rows
  } catch (error) {
    console.error('Error fetching posts with users:', error)
    throw error
  }
}

// Obtener un post individual por su ID
export async function getPostById (postId) {
  try {
    const query = `
      SELECT Posts.*, Usuarios.Nombre AS NombreUsuario
      FROM Posts
      INNER JOIN Usuarios ON Posts.Id_usuario = Usuarios.Id_usuario
      WHERE Posts.Id_post = ?
    `
    const [rows] = await conn.query(query, [postId])
    return rows[0] // Devolvemos el primer resultado, ya que debería ser único
  } catch (error) {
    console.error('Error fetching post by ID with user:', error)
    throw error
  }
}

// Obtener todos los posts de un usuario por su ID
export async function getPostsByUserId (userId) {
  try {
    const query = `
      SELECT Posts.*, Usuarios.Id_usuario, Usuarios.Nombre
      FROM Posts
      INNER JOIN Usuarios ON Posts.Id_usuario = Usuarios.Id_usuario
      WHERE Usuarios.Id_usuario = 1;
    `
    const [rows] = await conn.query(query, [userId])
    return rows
  } catch (error) {
    console.error('Error fetching posts by user ID:', error)
    throw error
  }
}

// Obtener el comentario más popular de un post por su ID
export async function getMostPopularComment (postId) {
  try {
    const query = `
    SELECT Comentario.Contenido AS Comentario,
        Comentario.Fecha AS Fecha_Comentario,
        Comentario.Likes AS Likes_Comentario,
        Usuarios.Nombre AS Usuario,
        Usuarios.Id_usuario AS Comennted_Id
    FROM Comentario
    INNER JOIN DetalleComentario ON Comentario.Id_comentario = DetalleComentario.Id_comentario
    INNER JOIN Usuarios ON DetalleComentario.Id_usuario = Usuarios.Id_usuario
    WHERE DetalleComentario.Id_post = ?
    ORDER BY Comentario.Likes DESC
    LIMIT 1
    `
    const [rows] = await conn.query(query, [postId])
    return rows[0]
  } catch (error) {
    console.error('Error fetching most popular comment:', error)
    throw error
  }
}

// Obtener un usuario por nombre de usuario y contraseña
export async function getUserByCredentials (username, password) {
  try {
    const query = `
      SELECT *
      FROM Usuarios
      WHERE Nombre = ? AND Password = ?
    `
    const [rows] = await conn.query(query, [username, password])
    return rows[0]
  } catch (error) {
    console.error('Error fetching user by credentials:', error)
    throw error
  }
}

// Obtener comentarios de un post por su ID
export async function getCommentsByPostId (postId) {
  try {
    const query = `
      SELECT Comentario.*, Usuarios.Nombre AS Nombre_Usuario, Usuarios.Id_usuario AS Id_Usuario
      FROM Comentario
      INNER JOIN DetalleComentario ON Comentario.Id_comentario = DetalleComentario.Id_comentario
      INNER JOIN Usuarios ON DetalleComentario.Id_usuario = Usuarios.Id_usuario
      WHERE DetalleComentario.Id_post = ?
    `
    const [rows] = await conn.query(query, [postId])
    return rows
  } catch (error) {
    console.error('Error fetching comments by post ID:', error)
    throw error
  }
}

// Crear un nuevo usuario
export async function createUser (nombre, email, password) {
  try {
    const query = `
      INSERT INTO Usuarios (Nombre, Email, Password)
      VALUES (?, ?, ?)
    `
    const result = await conn.query(query, [nombre, email, password])
    return result
  } catch (error) {
    console.error('Error creating user:', error)
    throw error
  }
}

// Crear un nuevo post
export async function createPost (title, content, userId, image) {
  try {
    const [result] = await conn.query('INSERT INTO Posts (Titulo, Contenido, Id_usuario, Imagen) VALUES (?, ?, ?, ?)', [title, content, userId, image])
    return result
  } catch (error) {
    console.error('Error creating post:', error)
    throw error
  }
}

// Borrar un post por su ID
export async function deletePostById (postId) {
  try {
    const [result] = await conn.query('DELETE FROM Posts WHERE Id_post = ?', [postId])
    return result
  } catch (error) {
    console.error('Error deleting post by ID:', error)
    throw error
  }
}

// Modificar un post existente
export async function updatePostById (postId, title, content) {
  try {
    const [result] = await conn.query('UPDATE Posts SET Titulo = ?, Contenido = ? WHERE Id_post = ?', [title, content, postId])
    return result
  } catch (error) {
    console.error('Error updating post:', error)
    throw error
  }
}
