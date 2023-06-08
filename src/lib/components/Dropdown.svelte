<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let value: string;
	export let options: string[];
	export let placeholder: string = 'Select';

	let open = false;

	let dropRef: HTMLDivElement | null = null;
	const handleClick = (event: MouseEvent) => {
		if (!open || dropRef === null) return;

		// // Check if we clicked outside of the component
		const target = event.target as HTMLElement;
		if (!dropRef.contains(target)) {
			open = false;
		}
	};

	const dispatch = createEventDispatcher();
	const handleChange = (selectedValue: string) => {
		dispatch('change', selectedValue);
		open = false;
	};
</script>

<svelte:window on:mousedown|preventDefault={handleClick} />
<div bind:this={dropRef} class="dropdown">
	<button class="dropdown toggle" on:click={() => (open = !open)}>
		{value || placeholder}
		<p class="dropdown arrow">▼</p>
	</button>
	{#if open}
		<ul class="dropdown menu">
			{#each options as option}
				<li class="dropdown item" on:click={() => handleChange(option)} aria-hidden>
					{option}
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	.dropdown {
		position: relative;
		display: inline-block;
		width: fit-content;
	}

	.dropdown .toggle {
		width: 100%;
		background: linear-gradient(to bottom, #262626, black);
		padding: 6px 12px;
		color: white;
		border: 1px solid #262626;
		border-radius: 5px;
		outline: none; /*? Prevent focus blue over item */
		font-size: 16px;
		cursor: pointer;
	}

	.dropdown .toggle:active {
		opacity: 0.5;
	}

	.dropdown .menu {
		position: absolute;
		list-style: none;
		padding: 0;
		left: 0;
		margin: 0;
		background: linear-gradient(to top, #262626, black);
		border-left: 1px solid #262626;
		border-right: 1px solid #262626;
		border-bottom: 1px solid #262626;
		width: -webkit-fill-available;
		z-index: 100;
	}

	.dropdown .item {
		width: fit-content;
		background: transparent;
		padding: 6px 12px;
		color: white;
		outline: none;
		font-size: 16px;
		cursor: pointer;
	}

	.dropdown .item:active {
		opacity: 0.5;
	}

	.dropdown .arrow {
		bottom: 2px;
		display: inline;
		font-size: 8px;
		left: 2px;
		position: relative;
	}
</style>
