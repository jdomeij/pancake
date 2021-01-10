<script>
	import { getChartContext } from './Chart.svelte';
	import { default_x, default_y } from '../utils/accessors.mjs';
	
	const { x_scale, y_scale } = getChartContext();

	export let data;
	export let floor = 0;
	export let x = default_x;
	export let y = default_y;

	export let area = svgArea;
	function svgArea(points) {
		return 'M' +
			`${points[0].x},${100-floor}L` +
			points.map((p) => `${p.x},${p.y}`).join('L') + 
			'L' +
			`${points[points.length - 1].x},${100-floor}` +
			'Z';
	}

	$: scaled = data.map((d, i) => ({
		x:$x_scale(x(d, i)), 
		y:$y_scale(y(d, i))
	}));
	$: d = area(scaled);

</script>

<slot {d}></slot>