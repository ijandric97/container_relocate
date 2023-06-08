<script lang="ts">
	import { fade } from 'svelte/transition';
	import { clientStore } from 'lib//stores/clientStore';
	import { breaks } from 'lib//util/misc';
	import { strings } from 'lib//util/language';
	import { settingsStore } from 'lib//stores/settingsStore';
	import { problemStore } from '../stores/problemStore';

	let isOpen = false;
	const setNotOpen = () => {
		if (isOpen === true) {
			isOpen = false;
		}
	};

	$: isMobile = $clientStore.width < breaks.sm;
	$: language = $settingsStore.language;
	$: gameLink = `/game/${$problemStore.id ?? 0}`;
</script>

<nav in:fade class="navbar" aria-hidden="true">
	<a href="/">
		<img src="/images/Logo.png" draggable="false" class="logo" alt="Logo" />
		<p class="title">Container Relocate</p>
	</a>

	{#if isMobile}
		<span class="hamburger" on:click={() => (isOpen = !isOpen)} aria-hidden="true"> ≡ </span>
	{/if}

	{#if !isMobile || isOpen}
		<div in:fade class="menu" class:mobile={isMobile}>
			<div class:border={isMobile}>
				<a href="/problems" class="link" class:mobile={isMobile} on:click={setNotOpen}>
					{strings[language].navbar.problems}
				</a>
				<a href="/settings" class="link" class:mobile={isMobile} on:click={setNotOpen}>
					{strings[language].navbar.settings}
				</a>
				<a href={gameLink} class="link color" class:mobile={isMobile} on:click={setNotOpen}>
					{strings[language].navbar.game}
				</a>
			</div>
		</div>
	{/if}
</nav>

<style>
	.navbar {
		background: linear-gradient(to bottom, #262626, black);
		color: white;
		height: 40px;
		line-height: 40px;
	}

	.logo {
		padding: 4px 0px;
		margin-left: 8px;
		float: left;
	}

	.title {
		color: white;
		float: left;
		margin: 0 8px;
		text-decoration: none;
		transition: all 0.5s;
	}

	.title:hover {
		filter: brightness(2);
	}

	.menu {
		float: right;
		margin-right: 4px;
	}

	.menu.mobile {
		display: block;
		float: none;
		margin-top: 40px;
		text-align: center;
		width: 100%;
		height: calc(100% - 40px);
		backdrop-filter: blur(5px);
		background-color: rgba(0, 0, 0, 0.5);
		position: absolute;
		z-index: 100;
	}

	.link {
		clear: right;
		text-decoration: none;
		color: grey;
		margin: 0 10px;
		transition: all 0.5s;
	}

	.link:hover {
		filter: brightness(2);
	}

	.link.color {
		color: darkcyan;
	}

	.link.mobile {
		backdrop-filter: blur(5px);
		border-bottom: 1px solid darkslategrey;
		display: block;
		font-size: 32px;
		line-height: 80px;
		margin: 0;
		padding: 0;
		user-select: none;
	}

	.hamburger {
		display: block;
		cursor: pointer;
		float: right;
		font-size: 30px;
		margin-right: 8px;
		width: 28px;
	}

	.border {
		border-top: 1px solid darkslategrey;
	}
</style>
