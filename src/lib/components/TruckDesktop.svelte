<script lang="ts">
	import { animatedStore } from '../stores/animatedStore';
	import { clientStore } from '../stores/clientStore';
	import { getContainerWidth } from '../util/game';

	$: style = `
        width: ${getContainerWidth() + 10}px;
		height: ${getContainerWidth() + 10}px;
		left: ${$clientStore.width / 2 + 250}px;
        z-index: 7;
    `;
</script>

<!-- {#if !$animatedStore.isActive && $animatedStore.destIndex === -1} -->
<img draggable="false" class="truck" src="/images/Truck.png" alt="Truck" {style} />;

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
