import conn from './conn.js'

// Obtener todos los posts
export async function getAllPosts () {
  try {
    const query = `
      SELECT Posts.*, Usuarios.Nombre AS NombreUsuario
      FROM Posts
      INNER JOIN Usuarios ON Posts.Id_usuario = Usuarios.Id_usuario
    `;
    const [rows] = await conn.query(query);
    return rows;
  } catch (error) {
    console.error('Error fetching posts with users:', error);
    throw error;
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
    `;
    const [rows] = await conn.query(query, [postId]);
    return rows[0]; // Devolvemos el primer resultado, ya que debería ser único
  } catch (error) {
    console.error('Error fetching post by ID with user:', error);
    throw error;
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
