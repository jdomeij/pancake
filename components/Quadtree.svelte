<script>
	import { getChartContext } from './Chart.svelte';
	import { default_x, default_y } from '../utils/accessors';
	import { quadtree } from 'd3-quadtree';

	export let data;
	export let x = default_x;
	export let y = default_y;
	export let radius = undefined;
	
	let xyRatio = 1;

	// exposing the prop lets consumers use let: or bind:
	export let closest = null;

	const { pointer, x1, x2, y1, y2, width, height } = getChartContext();

	let xNorm;
	let yNorm;
	$: xNorm = $x2-$x1||1;
	$: yNorm = $y2-$y1||1;

	function xNormCalc(val) {
		return ((val - $x1)/xNorm)*100*xyRatio;
	}

	function yNormCalc(val) {
		return ((val - $y1)/yNorm)*100;
	}

	let dataNorm = null; 
	let dataQuadtree = null;

	// On data change, clear quadtree and normalized data
	function quadTreeClear() {
		dataQuadtree = null;
		dataNorm = null;
	}
	$: quadTreeClear(data, $width, $height);

	// Creates quadtree and normalized data if needed
	// Find closest point
	function quadTreeFind(pointX, pointY, dataIn) {
		xyRatio = $width && $height ? $width/$height: 1;
		
		// Normalized XY point
		let pointXNorm = xNormCalc(pointX);
		let pointYNorm = yNormCalc(pointY);

		// Regenerate normalized data
		if (dataNorm === null) {
			dataNorm = dataIn.map((point) => {
				let xNorm = xNormCalc(x(point));
				let yNorm = yNormCalc(y(point));

				return {
					x: xNorm,
					y: yNorm,
					point: point,
				};
			});
		}

		// Create new Quadtree with normalized data
		if (dataQuadtree === null) {
			dataQuadtree = quadtree()
									.x(x)
									.y(y)
									.addAll(dataNorm);
		}

		// Find closest point
		return dataQuadtree.find(pointXNorm, pointYNorm, radius);
	}

	// Calc closest normalized point and from it get closest original point
	let closestNorm;
	$: closestNorm = $pointer ? quadTreeFind($pointer.x, $pointer.y, data) : null;

	// Convert normalized to real value
	$: closest = closestNorm != null ? closestNorm.point : null; 
</script>

<slot {closest}></slot>