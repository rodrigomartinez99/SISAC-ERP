import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    allowedHosts: ['.ngrok-free.app', '.ngrok.io', '.share.zrok.io', '"aec79ad4674f.ngrok-free.app', "d68f07185742.ngrok-free.app"],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@api': path.resolve(__dirname, './src/api'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@images': path.resolve(__dirname, './src/assets/images'),
      '@common': path.resolve(__dirname, './src/components/common'),
      '@ui': path.resolve(__dirname, './src/components/ui'),
      '@components': path.resolve(__dirname, './src/features/employees/components'),
      '@pages_e': path.resolve(__dirname, './src/features/employees/pages'),
      '@styles_e': path.resolve(__dirname, './src/features/employees/styles'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@layouts': path.resolve(__dirname, './src/layouts'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@masters': path.resolve(__dirname, './src/features/payroll/components/masters'),
      '@processes': path.resolve(__dirname, './src/features/payroll/components/processes'),
      '@reports': path.resolve(__dirname, './src/features/payroll/components/reports'),
      '@tax': path.resolve(__dirname, './src/features/tax'),
    },
  },
})
