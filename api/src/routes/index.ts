// ./routes/index.js
import visites from './visites.ts'
import photos from './photos.js'
 
const mountRoutes = (app) => {
  app.use('/users', users)
  app.use('/photos', photos)
  // etc..
}
 
export default mountRoutes