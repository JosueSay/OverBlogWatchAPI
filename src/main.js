import express from 'express'
import fs from 'fs'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import cors from 'cors'
import { getAllPosts, createPost, getPostById, deletePostById, updatePostById } from './db.js'
import { PORT } from './config.js'

const app = express()
app.use(express.json())

// Define las opciones de Swagger
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Blog API',
      version: '1.0.0',
      description: 'API for managing blog posts'
    }
  },
  apis: ['./src/main.js']
}

const specs = swaggerJsdoc(options)

// Agrega Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))

// Middleware para habilitar CORS
app.use(cors())

// Middleware para el registro de detalles de cada endpoint llamado
app.use((req, res, next) => {
  const logData = {
    time: new Date(),
    endpoint: req.path,
    method: req.method,
    payload: req.body
  }

  // Lógica para registrar la respuesta solo después de que la respuesta se ha enviado
  res.on('finish', () => {
    logData.response = res.statusCode
    fs.appendFile('./src/log.txt', JSON.stringify(logData) + '\n', (err) => {
      if (err) console.error('Error writing to log:', err)
    })
  })

  next()
})

// ENDPOINTS

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Obtiene un listado de todos los posts
 *     responses:
 *       200:
 *         description: Un array de posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 */
app.get('/posts', async (req, res) => {
  try {
    const posts = await getAllPosts()
    res.json(posts)
  } catch (error) {
    console.error('Error fetching posts:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Crea un nuevo post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: El post ha sido creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - userId
 *       properties:
 *         id:
 *           type: integer
 *           description: El ID del post
 *         title:
 *           type: string
 *           description: El título del post
 *         content:
 *           type: string
 *           description: El contenido del post
 *         userId:
 *           type: integer
 *           description: El ID del usuario que creó el post
 *         image:
 *           type: string
 *           description: Imagen en formato base64
 */
app.post('/posts', async (req, res) => {
  const { title, content, userId, image } = req.body
  try {
    const result = await createPost(title, content, userId, image)
    res.json(result)
  } catch (error) {
    console.error('Error creating post:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

/**
 * @swagger
 * /posts/{postId}:
 *   get:
 *     summary: Obtiene el detalle de un post específico
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del post
 *     responses:
 *       200:
 *         description: Un objeto conteniendo el post
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 */
app.get('/posts/:postId', async (req, res) => {
  const { postId } = req.params
  try {
    const post = await getPostById(postId)
    if (post) {
      res.json(post)
    } else {
      res.status(404).json({ error: 'Post not found' })
    }
  } catch (error) {
    console.error('Error fetching post by ID:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})
/**
 * @swagger
 * /posts/{postId}:
 *   delete:
 *     summary: Elimina un post
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del post
 *     responses:
 *       204:
 *         description: El post ha sido eliminado exitosamente
 */
app.delete('/posts/:postId', async (req, res) => {
  const { postId } = req.params
  try {
    const result = await deletePostById(postId)
    if (result.affectedRows) {
      res.status(204).send()
    } else {
      res.status(404).json({ error: 'Post not found' })
    }
  } catch (error) {
    console.error('Error deleting post by ID:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

/**
 * @swagger
 * /posts/{postId}:
 *   put:
 *     summary: Modifica un post existente
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: El post ha sido modificado exitosamente
 */
app.put('/posts/:postId', async (req, res) => {
  const { postId } = req.params
  const { title, content } = req.body
  try {
    const result = await updatePostById(postId, title, content)
    if (result.affectedRows) {
      const updatedPost = await getPostById(postId)
      res.json(updatedPost)
    } else {
      res.status(404).json({ error: 'Post not found' })
    }
  } catch (error) {
    console.error('Error updating post:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// MANEJO DE ERRORES
// Manejar métodos HTTP no implementados
app.use((req, res, next) => {
  if (!['GET', 'POST', 'PUT', 'DELETE'].includes(req.method)) {
    res.status(501).json({ error: 'Method not implemented' })
  } else {
    next()
  }
})

// Manejar endpoints no implementados
app.use((req, res, next) => {
  res.status(400).json({ error: 'Bad Request: Endpoint not found' })
})

// Validar el formato del cuerpo en PUT y POST
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    res.status(400).json({ error: 'Bad Request: Invalid JSON format in request body' })
  } else {
    next()
  }
})

app.listen(PORT, () => {
  console.log(`Server listening at http://127.0.0.1:${PORT}`)
})
