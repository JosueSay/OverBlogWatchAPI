import express from 'express';
import fs from 'fs'
import { getAllPosts, createPost, getPostById, deletePostById, updatePostById } from './db.js';

const app = express();
app.use(express.json());

// Middleware para el registro de detalles de cada endpoint llamado
app.use((req, res, next) => {
  const logData = {
    time: new Date(),
    endpoint: req.path,
    method: req.method,
    payload: req.body,
  };

  // Lógica para registrar la respuesta solo después de que la respuesta se ha enviado
  res.on('finish', () => {
    logData.response = res.statusCode;
    fs.appendFile('./src/log.txt', JSON.stringify(logData) + '\n', (err) => {
      if (err) console.error('Error writing to log:', err);
    });
  });

  next();
});

// ENDPOINTS
// Endpoint para obtener todos los posts
app.get('/posts', async (req, res) => {
  try {
    const posts = await getAllPosts();
    res.json(posts);
  } catch (error) {
    //console.error('Error fetching posts:', error);
	//res.status(500).json({ error: `Internal Server Error: ${error.message}` });
	console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint para crear un nuevo post
app.post('/posts', async (req, res) => {
  const { title, content, userId } = req.body;
  try {
    const result = await createPost(title, content, userId);
    res.json(result);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint para obtener un post por su ID
app.get('/posts/:postId', async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await getPostById(postId);
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (error) {
    console.error('Error fetching post by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint para borrar un post por su ID
app.delete('/posts/:postId', async (req, res) => {
  const { postId } = req.params;
  try {
    const result = await deletePostById(postId);
    if (result.affectedRows) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (error) {
    console.error('Error deleting post by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Endpoint para modificar un post existente
app.put('/posts/:postId', async (req, res) => {
  const { postId } = req.params;
  const { title, content } = req.body;
  try {
    const result = await updatePostById(postId, title, content);
    if (result.affectedRows) {
      const updatedPost = await getPostById(postId);
      res.json(updatedPost);
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// MANEJO DE ERRORES
// Manejar métodos HTTP no implementados
app.use((req, res, next) => {
  if (!['GET', 'POST', 'PUT', 'DELETE'].includes(req.method)) {
    res.status(501).json({ error: 'Method not implemented' });
  } else {
    next();
  }
});

// Manejar endpoints no implementados
app.use((req, res, next) => {
  res.status(400).json({ error: 'Bad Request: Endpoint not found' });
});

// Validar el formato del cuerpo en PUT y POST
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    res.status(400).json({ error: 'Bad Request: Invalid JSON format in request body' });
  } else {
    next();
  }
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server listening at http://127.0.0.1:${port}`);
});
