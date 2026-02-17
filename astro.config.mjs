// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwind from '@astrojs/tailwind';
import remarkWikiLink from 'remark-wiki-link';

// https://astro.build/config
export default defineConfig({
	markdown: {
		remarkPlugins: [[remarkWikiLink, { hrefTemplate: (permalink) => `/${permalink}` }]],
	},
	integrations: [
		tailwind({ applyBaseStyles: false }),
		starlight({
			title: 'Digital Garden',
			description: 'A minimalist digital garden for thoughts, knowledge, and streams of consciousness.',
			logo: {
				src: './src/assets/logo.svg',
			},
			head: [
				{
					tag: 'link',
					attrs: {
						rel: 'stylesheet',
						href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
					},
				},
				{
					tag: 'link',
					attrs: {
						rel: 'stylesheet',
						href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap',
					},
				},
			],
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/sheepix/digital-garden' },
			],
			customCss: ['./src/styles/custom.css'],
			sidebar: [
				{
					label: 'Stream',
					autogenerate: { directory: 'stream' },
				},
				{
					label: 'Wiki',
					autogenerate: { directory: 'wiki' },
				},
				{
					label: 'Meta',
					autogenerate: { directory: 'meta' },
				},
			],
			editLink: {
				baseUrl: 'https://github.com/sheepix/digital-garden/edit/main/',
			},
			pagination: false,
			lastUpdated: true,
			components: {
				MarkdownContent: './src/components/MarkdownContent.astro',
			},
		}),
	],
});
