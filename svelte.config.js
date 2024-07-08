import adapter from '@sveltejs/adapter-auto';
//import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		//adapter: adapter()
		adapter: adapter({
			// default options are shown. On some platforms
			// these options are set automatically — see below
			//pages: 'build',
			//assets: 'build',
			//fallback: "200.html",
			//precompress: false,
			//strict: true
			
		}),
		//outDir: "dist",
		paths: {
			assets: "",
			//base: "/sales", // <a href="{base}/your-page">Link</a>
			//relative: true,
		},
		prerender: {
			concurrency: 1,
			//entries: ['/', '/product'], //["*"]
			entries: ["*"]
		},

	}
};

export default config;