<script lang="ts">
	import { fade, scale } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';

	export let open = false;
</script>

{#if open}
	<div class="background" transition:fade={{ duration: 200, easing: cubicInOut }} />
	<div
		class="popup"
		transition:scale={{ duration: 150, easing: cubicInOut, start: 1.2, opacity: 0 }}
	>
		<div class="content">
			<slot />
		</div>
	</div>
{/if}

<style>
	.background {
		background: rgba(0, 0, 0, 0.7);

		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;

		z-index: 100;
	}
	.popup {
		/* background: rgba(0, 0, 0, 0.7); */
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;

		display: flex;
		justify-content: center;
		align-items: center;

		z-index: 101;
	}

	.popup .content {
		background: var(--light-color);
		border-radius: var(--border-radius);

		box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.5);
		-webkit-box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.5);
		-moz-box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.5);

		padding: 15px 30px;
		margin: 15px;

		min-width: 350px;
		max-height: 90%;
		overflow-y: scroll;

        text-align: center;
	}
</style>
