import { defineConfig } from "vite"
import path from "path"
import react from "@vitejs/plugin-react-swc"

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		watch: {
			usePolling: true,
		},
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	base: "/paratext-ask/",
})
