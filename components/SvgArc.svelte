<script>
	import { radianToXY } from '../helpers/angle.mjs';

	// Center
	let centerX = 50;
	let centerY = 50;
	export {centerX as x};
	export {centerY as y};

	// Angle
	export let start;
	export let stop;

	// Size
	export let inner = 0;
	export let outer = 45;

	// Calculate SVG path for arc
	export let arc = svgArc;
	function svgArc(x, y, startAngle, endAngle, innerRadius, outerRadius) {
		const angle = Math.abs(endAngle - startAngle);
		const angle2 = angle/2;

		// Calculate outer arc
		const arcOut1 = radianToXY(x, y, outerRadius, startAngle);
		const arcOut2 = radianToXY(x, y, outerRadius, startAngle+angle2);
		const arcOut3 = radianToXY(x, y, outerRadius, startAngle+angle);

		// Quck path for rendering pie
		if (Math.abs(innerRadius)==0) {
			return ''+
				`M${arcOut3.x},${arcOut3.y}`+
				`A${outerRadius},${outerRadius},0,${angle2<=Math.PI?0:1},0,${arcOut2.x},${arcOut2.y}`+
				`A${outerRadius},${outerRadius},0,${angle2<=Math.PI?0:1},0,${arcOut1.x},${arcOut1.y}`+
				`${angle2>=Math.PI?'M':'L'}${x},${y}` +
				`Z`;
		}
		
		// Calculate inner arc for donut
		const arcIn1 = radianToXY(x, y, innerRadius, startAngle);
		const arcIn2 = radianToXY(x, y, innerRadius, startAngle+angle2);
		const arcIn3 = radianToXY(x, y, innerRadius, startAngle+angle);

		return ''+
			`M${arcOut3.x} ${arcOut3.y}`+
			`A${outerRadius},${outerRadius},0,${angle2>=Math.PI?1:0},0,${arcOut2.x},${arcOut2.y}`+
			`A${outerRadius},${outerRadius},0,${angle2>=Math.PI?1:0},0,${arcOut1.x},${arcOut1.y}`+
			`${angle2>=Math.PI?'M':'L'}${arcIn1.x},${arcIn1.y}`+
			`A${innerRadius},${innerRadius},0,${angle2>=Math.PI?1:0},1,${arcIn2.x},${arcIn2.y}`+
			`A${innerRadius},${innerRadius},0,${angle2>=Math.PI?1:0},1,${arcIn3.x},${arcIn3.y}`+
			`Z`;
	}

	$: d = arc(centerX, centerY, start, stop, inner, outer);

</script>

<slot {d}></slot>