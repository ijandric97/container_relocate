<script lang="ts">
	import { clientStore } from '../stores/clientStore';
	import { breaks } from '../util/misc';
	import TruckDesktop from './TruckDesktop.svelte';
	import TruckMobile from './TruckMobile.svelte';
</script>

{#if $clientStore.width >= breaks.sm}
	<TruckDesktop />
{:else}
	<TruckMobile />
{/if}

<style>
	.truck {
		position: absolute;
		z-index: 31;
		bottom: 60px;
		left: -300px; /*! Framer bug, move it off screen or sometimes it pops in (._.) 793px */
	}

	.truck_container {
		position: absolute;
		z-index: 30; /*? It has to be behind the truck wheel */
		bottom: 100px;
		left: -300px; /*! Framer bug, move it off screen or sometimes it pops in (._.) */
	}
</style>
