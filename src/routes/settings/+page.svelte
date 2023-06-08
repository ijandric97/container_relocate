<script lang="ts">
	import { settingsStore, type TLanguageCode } from 'lib//stores/settingsStore';
	import { strings } from 'lib//util/language';
	import { fade } from 'svelte/transition';

	$: animationDuration = $settingsStore.animationDuration;
	$: language = $settingsStore.language;

	const flagClicked = (country: TLanguageCode) => {
		if (country !== language) {
			localStorage.setItem('language', country);
			settingsStore.update((prev) => ({ ...prev, language: country }));
		}
	};

	const sliderChange = (value: string) => {
		localStorage.setItem('duration', value);
		settingsStore.update((prev) => ({ ...prev, animationDuration: Number(value) }));
	};
</script>

<div in:fade class="settings">
	<h1>{strings[language].settingspage.speed[0]}</h1>
	<p>{strings[language].settingspage.speed[1] + (1 / animationDuration).toFixed(1)}x</p>
	<div class="animation">
		<p>{strings[language].settingspage.slider[0]}</p>
		<input
			type="range"
			min="0.1"
			max="2"
			step="0.1"
			value={animationDuration}
			class="slider"
			on:change={(ev) => sliderChange(ev.currentTarget.value)}
		/>
		<p>{strings[language].settingspage.slider[1]}</p>
	</div>
	<h1>{strings[language].settingspage.language}</h1>
	<div class="flex">
		<div
			aria-hidden
			class={`item ${language !== 'hr' ? 'active' : ''}`}
			on:click={() => flagClicked('hr')}
		>
			<img src="/images/CroatianFlag.png" alt={strings[language].settingspage.alt[0]} />
		</div>
		<div
			aria-hidden
			class={`item ${language !== 'en' ? 'active' : ''}`}
			on:click={() => flagClicked('en')}
		>
			<img src="/images/BritishFlag.png" alt={strings[language].settingspage.alt[1]} />
		</div>
		<div
			aria-hidden
			class={`item ${language !== 'de' ? 'active' : ''}`}
			on:click={() => flagClicked('de')}
		>
			<img src="/images/GermanFlag.png" alt={strings[language].settingspage.alt[2]} />
		</div>
	</div>
</div>

<style>
	.settings {
		height: calc(100% - 50px);
		padding: 10px;
	}

	.settings .flex {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}

	.settings .flex .item {
		width: 350px;
		margin: 10px;
		border-radius: 5px;
		padding: 10px;
		transition: all 0.5s;
		border: 4px solid #262626;
		background: linear-gradient(to bottom, #262626, black);
	}

	.settings .flex .item.active {
		background: none;
		border: 4px solid transparent;
	}

	.settings .flex .item.active:hover {
		filter: brightness(2);
		border: 4px solid #262626;
		cursor: pointer;
	}

	.settings .flex .item img {
		width: inherit;
	}

	.settings .animation {
		width: 100%;
	}

	.settings .animation p {
		display: inline-block;
		vertical-align: super;
		margin-left: 10px;
		margin-right: 10px;
		transform: translateY(-5px);
	}

	.settings .animation .slider {
		direction: rtl;
		appearance: none;
		width: 350px;
		height: 25px;
		background: black;
		border: 4px solid #262626;
		border-radius: 5px;
		transition: all 0.5s;
	}

	.settings .animation .slider:hover {
		filter: brightness(2);
	}

	.settings .animation .slider::-webkit-slider-thumb {
		appearance: none;
		width: 25px;
		height: 25px;
		background: darkslategray;
		border: 4px solid darkslategray;
		border-radius: 5px;
		cursor: pointer;
	}

	.settings .animation .slider::-moz-range-thumb {
		appearance: none;
		width: 25px;
		height: 25px;
		background: darkslategray;
		border: 4px solid darkslategray;
		border-radius: 5px;
		cursor: pointer;
	}
</style>
