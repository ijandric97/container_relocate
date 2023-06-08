<script lang="ts">
	import Dropdown from 'lib//components/Dropdown.svelte';
	import ProblemGrid from 'lib//components/ProblemGrid.svelte';
	import { problemsStore } from 'lib//stores/problemsStore';
	import { settingsStore } from 'lib//stores/settingsStore';
	import { loadProblems } from 'lib//util/game';
	import { strings } from 'lib//util/language';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let size = 3;

	$: value = size === 3 ? '3x3' : '4x4';
	$: language = $settingsStore.language;

	const sizeChanged = (newSize: string) => {
		newSize === '3x3' ? (size = 3) : (size = 4);
	};

	onMount(() => {
		// When component is mounted, add the problems into the problems global state
		loadProblems();
	});
</script>

<div in:fade class="problems">
	<div class="selector">
		<label for="" class="label">{strings[language].problemspage.size}</label>
		<Dropdown
			placeholder={'3x3'}
			{value}
			options={['3x3', '4x4']}
			on:change={(ev) => sizeChanged(ev.detail)}
		/>
	</div>
	<div class="flex">
		{#each $problemsStore as problem, i}
			{#if problem.row_size === size && problem.col_size === size}
				<a href={`/game/${i}`}>
					<div class="item">
						<ProblemGrid num={i} {problem} />
					</div>
				</a>
			{/if}
		{/each}
	</div>
</div>

<style>
	.problems {
		height: calc(100% - 50px);
		padding: 10px;
	}

	.problems .selector {
		background: linear-gradient(to bottom, #262626, black);
		border: 4px solid #262626;
		border-radius: 5px;
		margin-bottom: 15px;
		padding: 10px;
		display: table;
		margin-left: auto;
		margin-right: auto;
	}

	.problems .selector .label {
		margin: 0px 10px;
	}

	.problems .flex a {
		color: inherit;
		text-decoration: inherit;
	}

	.problems .flex {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}

	.problems .flex .item {
		margin: 10px;
	}
</style>
