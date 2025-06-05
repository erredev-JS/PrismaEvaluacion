import express from 'express'

import productosRoutes from './routes/productos.routes'
import imagenesRoutes from './routes/imagenes.routes'
import preciosRoutes from './routes/precios.routes'
import paisRoutes from './routes/pais.routes'
import categoriasRoutes from './routes/categorias.routes'
import provinciaRoutes from './routes/provincia.routes'
import localidadRoutes from './routes/localidad.routes'
import direccionRoutes from './routes/direccion.routes'
import tallaRoutes from './routes/talla.routes'
import coloresRoutes from './routes/colores.routes'
import usuariosRoutes from './routes/usuarios.routes'
import descuentosRoutes from './routes/descuentos.routes'
import facturasRoutes from './routes/facturas.routes'
import detalleFacturasRoutes from './routes/detalle_facturas.routes'
import detallesRoutes from './routes/detalle.router'
import { setupSwagger } from './swagger'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

setupSwagger(app)

app.use('/productos', productosRoutes)
app.use('/imagenes', imagenesRoutes)
app.use('/descuentos', descuentosRoutes)
app.use('/precios', preciosRoutes)
app.use('/categorias', categoriasRoutes)
app.use('/pais', paisRoutes)
app.use('/provincia', provinciaRoutes)
app.use('/localidad', localidadRoutes)
app.use('/direccion', direccionRoutes)
app.use('/talla', tallaRoutes)
app.use('/colores', coloresRoutes)
app.use('/usuarios', usuariosRoutes)
app.use('/facturas', facturasRoutes)
app.use('/detalle-facturas', detalleFacturasRoutes)
app.use('/detalle', detallesRoutes)


app.listen(PORT, () => {
    console.log('Server runneando en el puerto:', PORT)
    console.log('DOCS en http://localhost:3000/api-docs')
})