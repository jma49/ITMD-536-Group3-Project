import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	// Define public environment variables accessible in the browser
	env: {
		API_KEY: process.env.API_KEY, // Pass API_KEY to the client side if needed
		MONGODB_URI: process.env.MONGODB_URI, // Pass MONGODB_URI for server-side use
	},

	webpack: (config, { isServer }) => {
		if (!isServer) {
			config.module.rules.push({
				test: /\.cy\.(js|ts|tsx)$/,
				loader: "ignore-loader",
			});
		}
		return config;
	},

	reactStrictMode: true,
};

export default nextConfig;
