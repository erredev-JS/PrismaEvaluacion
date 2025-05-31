import express from 'express'

import productosRoutes from './routes/productos.routes'
import paisRoutes from './routes/pais.routes'
import categoriasRoutes from './routes/categorias.routes'
import provinciaRoutes from './routes/provincia.routes'
import coloresRoutes from './routes/colores.routes'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())



app.use('/productos', productosRoutes)
app.use('/categorias', categoriasRoutes)
app.use('/pais', paisRoutes)
app.use('/provincia', provinciaRoutes)
app.use('/colores', coloresRoutes)


app.listen(PORT, () => {
    console.log('Server runneando en el puerto:', PORT)
})