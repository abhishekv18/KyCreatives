import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// In development, serve /api/contact with the same handler Vercel runs in
// production, so the forms can be tried locally (`npm run dev`).
function devApi() {
  return {
    name: 'dev-api',
    configureServer(server) {
      server.middlewares.use('/api/contact', async (req, res) => {
        let raw = ''
        for await (const chunk of req) raw += chunk
        req.body = raw
        res.status = (code) => ((res.statusCode = code), res)
        res.json = (obj) => {
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(obj))
        }
        const { default: handler } = await server.ssrLoadModule('/api/contact.js')
        await handler(req, res)
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), devApi()],
  build: {
    rolldownOptions: {
      output: {
        // Libraries change rarely; keeping them in their own chunks lets
        // browsers cache them across deploys of the site code.
        codeSplitting: {
          groups: [
            { name: 'react', test: /node_modules[\\/](react|react-dom|scheduler|react-router|react-router-dom)[\\/]/ },
            { name: 'motion', test: /node_modules[\\/](gsap|@gsap|lenis)[\\/]/ },
          ],
        },
      },
    },
  },
})
