import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // Disable minification
    minify: false,

    // Prevent chunk splitting
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },

    // Generate source maps
    sourcemap: true,

    // Preserve module structure
    modulePreload: false,

    // Make output more verbose
    reportCompressedSize: false,
    chunkSizeWarningLimit: 1,

    // Optionally, you can rename the output file
    // rollupOptions: {
    //   output: {
    //     entryFileNames: 'assets/[name].js',
    //     chunkFileNames: 'assets/[name].js',
    //     assetFileNames: 'assets/[name].[ext]'
    //   }
    // }
  },
})