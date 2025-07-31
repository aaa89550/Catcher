// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Catcher/', // 記得加斜線！
  plugins: [react()]
})
