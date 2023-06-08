<script>
	import { onMount } from 'svelte';
	import Navbar from 'lib//components/Navbar.svelte';
	import { clientStore } from 'lib//stores/clientStore';
	import { settingsStore } from 'lib//stores/settingsStore';

	let ready = false;

	const handleResize = () => {
		clientStore.set({
			height: window.innerHeight,
			width: window.innerWidth
		});
	};

	onMount(() => {
		settingsStore.loadFromStorage();
		handleResize();
		ready = true;
	});
</script>

<svelte:window on:resize={handleResize} />

<!-- This is used to make :in transitions trigger everywhere :) -->
{#if ready}
	<Navbar />
	<slot />
{/if}

<style>
	:root {
		position: absolute;
		top: 0px;
		left: 0px;
		width: 100%;
		margin: 0px;
		/*! height: 100%;*/
	}
</style>
