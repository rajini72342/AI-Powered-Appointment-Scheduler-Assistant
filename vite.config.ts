
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Use '.' instead of process.cwd() to resolve directory to avoid TypeScript errors regarding the missing cwd method on the process type.
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react()],
    server: {
      port: 5500,
      strictPort: true,
      host: '127.0.0.1'
    },
    define: {
      'process.env.API_KEY': JSON.stringify(env.VITE_API_KEY || env.API_KEY)
    }
  };
});
