/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
		extend: {
			zIndex: {
				'100': '100',
			},
			animation: {
				text: 'text 5s ease infinite',
				blink: 'blink 2s linear infinite',
				
			},
			colors: {
				// 'dark': '#262838',
				'dark': '#2C2E3E',
				'white': '#FFFFFF',
				'navy': '#0f2a44',
				'grey': '#e5e7eb'
			},
			keyframes: {
				bounce: {
					'0%, 100%': { transform: 'translateY(+4%)' },
					'50%': { transform: 'translateY(0)' },
			  	},
				text: {
					'0%, 100%': {
						'background-size':'200% 200%',
						'background-position': 'left center'
					},
					'50%': {
						'background-size':'200% 200%',
						'background-position': 'right center'
					}
				},
				blink: {
					'0%, 50%, 100%': { opacity: '1' },
					'25%, 75%': { opacity: '0' },
				},
			}
		}
	},
  plugins: [],
}
