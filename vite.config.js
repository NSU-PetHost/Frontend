import { defineConfig } from "vite";
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins:[react()],
    server: {
      host: "0.0.0.0",
      port: 4444,
    },
    define: {
      "process.env.VITE_API_BASE_URL": JSON.stringify("http://193.53.127.202:8080"),
    },
})
