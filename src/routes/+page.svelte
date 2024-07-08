<script>
    import { onMount, beforeUpdate, afterUpdate } from 'svelte';
    import { goto, beforeNavigate, afterNavigate } from '$app/navigation';
	import { assets, base } from '$app/paths';
	import {S, SS, asset, root_api, ajax, token, checkLogin, _get, lib } from '$lib/base';
</script>

<div class="container">
    Main
</div>

