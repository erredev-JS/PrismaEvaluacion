import express from 'express'

import productosRoutes from './routes/productos.routes'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())


app.use('/productos', productosRoutes)


app.listen(PORT, () => {
    console.log('Server runneando en el puerto:', PORT)
})