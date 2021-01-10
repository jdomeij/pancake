<script>
	import { getChartContext } from './Chart.svelte';
	import { default_x, default_y } from '../utils/accessors.mjs';

	const { x_scale, y_scale } = getChartContext();

	export let data;
	export let x = default_x;
	export let y = default_y;

	export let line = svgLine;
	function svgLine(points) {
		return 'M' + 
			points.map(p=>`${p.x},${p.y}`).join('L');
	}

	$: scaled = data.map((d, i) => ({
		x:$x_scale(x(d, i)), 
		y:$y_scale(y(d, i))
	}));
	$: d = line(scaled);
</script>

<slot {d}></slot>