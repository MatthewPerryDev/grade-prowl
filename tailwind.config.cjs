/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {},
	},
	plugins: [require("daisyui")],
	daisyui:{
		themes: [
		{
			clemson:{
				"primary": "#F56600",
				"secondary": "#988ef4",
				"accent": "#37cdbe",
				"neutral": "#3d4451",
				"base-100": "#ffffff",		
			}
		}, 
		"dark"]
	}
}
