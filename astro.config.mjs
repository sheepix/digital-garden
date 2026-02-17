// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import remarkWikiLink from 'remark-wiki-link';

// https://astro.build/config
export default defineConfig({
	markdown: {
		remarkPlugins: [[remarkWikiLink, { hrefTemplate: (permalink) => `/${permalink}` }]],
	},
	integrations: [
		starlight({
			title: 'Digital Garden',
			description: 'A minimalist digital garden for thoughts, knowledge, and streams of consciousness.',
			logo: {
				src: './src/assets/logo.svg',
			},
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/sheepix/digital-garden' },
			],
			customCss: [
				'./src/styles/custom.css',
			],
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
