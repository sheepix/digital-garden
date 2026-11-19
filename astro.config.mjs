import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwind from '@astrojs/tailwind';
import remarkWikiLink from 'remark-wiki-link';

export default defineConfig({
	site: 'https://www.sheepx.fun',
	markdown: {
		remarkPlugins: [[remarkWikiLink, { hrefTemplate: (permalink) => `/garden/${permalink}` }]],
	},
	integrations: [
		tailwind({ applyBaseStyles: false }),
		starlight({
			title: "Sheepx's Garden",
			description: '数字花园：随手记录的思考、知识与半成品。',
			logo: { src: './src/assets/logo.svg' },
			customCss: ['./src/styles/custom.css'],
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/sheepix/digital-garden' }],
			sidebar: [{ label: '笔记', autogenerate: { directory: 'garden' } }],
			editLink: { baseUrl: 'https://github.com/sheepix/digital-garden/edit/main/' },
			pagination: false,
			lastUpdated: true,
		}),
	],
});
