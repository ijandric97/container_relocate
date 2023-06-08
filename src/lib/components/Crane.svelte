<script lang="ts">
	import { animatedStore } from '../stores/animatedStore';
	import { clientStore } from '../stores/clientStore';
	import { breaks } from '../util/misc';

	$: left =
		$clientStore.width < breaks.sm
			? $clientStore.width / 2 - 698 / 2 // MOBILE
			: $clientStore.width / 2 - 600 * (2 / 3) - 7; // DESKTOP

	$: style = `
        left: ${left}px;
        zIndex ${$animatedStore.isActive ? 20 : 0};
    `;
</script>

<img src="/images/Crane.png" draggable="false" alt="Crane" class="crane" {style} />;

<style>
	.crane {
		position: absolute;
		bottom: 60px;
		left: 0px;
		width: 800px;
		z-index: 9;
	}
</style>
