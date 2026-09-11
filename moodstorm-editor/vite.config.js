import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: { port: 5173 },
  // Expose asset paths for audio/video
  assetsInclude: ['**/*.mp3', '**/*.mp4'],
});
