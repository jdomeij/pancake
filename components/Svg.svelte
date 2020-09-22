<script>
	let className = '';
	export {className as class};

	export let style = '';
	export let clip = false;
	export let noPointerEvents = true;
</script>

<svg
	viewBox="0 0 100 100" 
	preserveAspectRatio="none"
	class:pancake-svg--clip={clip}
	class:pancake-svg--no-pointer-events={noPointerEvents}
	class='pancake-svg {className}'
	{style}
>
	<slot></slot>
</svg>

<style>
	.pancake-svg {
		position: absolute;
		width: 100%;
		height: 100%;
		overflow: visible;
	}

	.pancake-svg--clip {
		overflow: hidden;
	}

	.pancake-svg--no-pointer-events {
		pointer-events: none;
	}

	.pancake-svg :global(*) {
		vector-effect: non-scaling-stroke;
	}
</style>

