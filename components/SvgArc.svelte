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


	let d; $: {

		const angle = Math.abs(stop - start);
		const angle2 = angle/2;

		const center = {x: centerX, y: centerY};

		// Calculate outer arc
		const arcOut1 = radianToXY(centerX, centerY, outer, start);
		const arcOut2 = radianToXY(centerX, centerY, outer, start+angle2);
		const arcOut3 = radianToXY(centerX, centerY, outer, start+angle);

		// Quck path for rendering pie
		if (Math.abs(inner)==0) {
			d = ''+
				`M${arcOut3.x},${arcOut3.y}`+
				`A${outer},${outer},0,${angle2<=Math.PI?0:1},0,${arcOut2.x},${arcOut2.y}`+
				`A${outer},${outer},0,${angle2<=Math.PI?0:1},0,${arcOut1.x},${arcOut1.y}`+
				`${angle2>=Math.PI?'M':'L'}${center.x},${center.y}` +
				`Z`;
		}
		else {
			// Calculate inner arc for donut
			const arcIn1 = radianToXY(centerX, centerY, inner,	start);
			const arcIn2 = radianToXY(centerX, centerY, inner, start+angle2);
			const arcIn3 = radianToXY(centerX, centerY, inner, start+angle);

			d = ''+
				`M${arcOut3.x} ${arcOut3.y}`+
				`A${outer},${outer},0,${angle2>=Math.PI?1:0},0,${arcOut2.x},${arcOut2.y}`+
				`A${outer},${outer},0,${angle2>=Math.PI?1:0},0,${arcOut1.x},${arcOut1.y}`+
				`${angle2>=Math.PI?'M':'L'}${arcIn1.x},${arcIn1.y}`+
				`A${inner},${inner},0,${angle2>=Math.PI?1:0},1,${arcIn2.x},${arcIn2.y}`+
				`A${inner},${inner},0,${angle2>=Math.PI?1:0},1,${arcIn3.x},${arcIn3.y}`+
				`Z`;
		}
	}


</script>

<slot {d}></slot>