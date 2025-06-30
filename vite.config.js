import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  //base: '/admin/',
  plugins: [
    
    react(), // ✅ Lowercase 'react', not 'React()'
    tailwindcss(),
  ],
})
