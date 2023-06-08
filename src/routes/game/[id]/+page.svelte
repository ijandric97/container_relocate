<script lang="ts">
	import Crane from 'lib//components/Crane.svelte';
	import Ground from 'lib//components/Ground.svelte';
	import Truck from 'lib//components/Truck.svelte';
	import { problemStore } from 'lib//stores/problemStore';
	import { isProblemEmpty, isProblemFinished, loadProblem } from 'lib//util/game';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { problemsStore } from 'lib//stores/problemsStore';
	import { goto } from '$app/navigation';
	import VictoryPopup from 'lib//components/VictoryPopup.svelte';

	export let data: PageData;
	const { id } = data;

	onMount(() => {
		if (isProblemEmpty($problemStore)) {
			// Verify the problem then load it into globalstate
			if (Number(id) >= $problemsStore.length) {
				goto('/problems');
				return;
			}
			try {
				loadProblem($problemsStore[Number(id)]);
			} catch (error) {
				goto('/problems');
			}
		}
	});
</script>

<div class="game">
	{#if isProblemFinished()}
		<VictoryPopup />
		<Ground />
	{:else if !isProblemEmpty($problemStore)}
		<Crane />
		<Ground />
		<Truck />
	{/if}
</div>

<style>
	.game {
		background: linear-gradient(to bottom, #b7eaff 0%, #94dfff 100%);
		background-repeat: no-repeat;
		height: calc(100vh - 40px);
		width: 100%;
		position: relative;
		overflow: hidden; /*? Objects rendering outside the game wont spawn scrollbars*/
		opacity: 1; /*! Framer bug */
		user-select: none; /*? Prevent bug where we can drag images */
	}
</style>
