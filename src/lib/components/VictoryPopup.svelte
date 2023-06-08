<script lang="ts">
	import { clientStore } from '../stores/clientStore';
	import { historyStore } from '../stores/historyStore';
	import { settingsStore } from '../stores/settingsStore';
	import { strings } from '../util/language';
	import { elasticOut } from 'svelte/easing';

	$: moveCount = $historyStore.length;
	$: language = $settingsStore.language;
	$: popupStyle = `
        left: ${$clientStore.width / 2 - 157}px;
		top: ${$clientStore.height / 2 - 302}px;
    `;

	const spin = (node: any, { duration }: { duration: number }) => {
		return {
			duration,
			css: (t: number) => {
				const eased = elasticOut(t);

				return `
                    animation-iteration-count: infinite;
					transform: scale(${eased}) rotate(${eased * 1080}deg);
					color: hsl(
						${Math.trunc(t * 360)},
						${Math.min(100, 1000 - 1000 * t)}%,
						${Math.min(50, 500 - 500 * t)}%
					);`;
			}
		};
	};
</script>

<div class="popup" style={popupStyle}>
	<img
		transition:spin={{ duration: 800 }}
		draggable="false"
		src="/images/Trophy.png"
		alt="Trophy"
		class="trophy"
	/>
	<p>
		{strings[language].gamepage.victory[0]}
		<b>{moveCount}</b>
		{strings[language].gamepage.victory[1]}
	</p>
</div>

<style>
	.popup {
		position: absolute;
		background-color: rgba(255, 255, 255, 0.9);
		border-radius: 25px;
		color: black;
		padding: 25px;
		width: 264px;
		text-align: center;
		z-index: 50; /* Definitely above all */
	}

	.trophy {
		width: 100%;
		height: 100%;
	}
</style>
