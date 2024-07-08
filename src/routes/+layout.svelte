<script>
	import '$lib/css/style.scss';

	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
</script>

<div class="app">
	
	<Header />
	<main  id="wrap" style="min-height: 500px;">
		<slot />
	</main>

	<Footer />
</div>

<!--<div>
	<style>
		/* global */
		.body {
			display: block;
		}
	</style>
</div>-->