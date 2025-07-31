// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Catcher/', // <<=== 必須設成你 repo 名稱的路徑
})
