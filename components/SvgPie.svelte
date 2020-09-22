<script>
	import { angleToRadian } from '../helpers/angle.mjs';

	// Center
	export let x = 50;
	export let y = 50;

	// Angle
	export let offset;
	export let angle;

	// Size
	export let cutout = 0;
	export let radiusOut;
	export {radiusOut as radius};

	// Calculate inner radius
	$: radiusIn =	cutout ? ( radiusOut - (radiusOut*(1-(Math.min(100, Math.max(cutout, 0))/100))) ) : 0;

	const calcPieSlice = (sliceOffset, sliceAngle, sliceRadiusOut, sliceRadiusIn) => {
		// Ensure angle is between 0-360
		sliceAngle = Math.min(360, Math.max(0, sliceAngle));

		const halfAngle = sliceAngle/2;
		const center = {x, y};
		const arcOut1 = angleToRadian(center.x, center.y, sliceRadiusOut, sliceOffset);
		const arcOut2 = angleToRadian(center.x, center.y, sliceRadiusOut, sliceOffset+halfAngle);
		const arcOut3 = angleToRadian(center.x, center.y, sliceRadiusOut, sliceOffset+sliceAngle);


		// Quck path for rendering pie
		if (!sliceRadiusIn) {
			return ''+
				` M ${arcOut3.x} ${arcOut3.y}`+
				` A ${sliceRadiusOut} ${sliceRadiusOut} 0 ${halfAngle<=180?0:1} 0 ${arcOut2.x} ${arcOut2.y}`+
				` A ${sliceRadiusOut} ${sliceRadiusOut} 0 ${halfAngle<=180?0:1} 0 ${arcOut1.x} ${arcOut1.y}`+
				` ${sliceAngle>=360?'M':'L'} ${center.x} ${center.y}`+
				` ${sliceAngle>=360?'M':'L'} ${arcOut3.x} ${arcOut3.y}`;
		}

		// Calculate inner arc for donut
		const arcIn1 = angleToRadian(center.x, center.y, sliceRadiusIn,	sliceOffset);
		const arcIn2 = angleToRadian(center.x, center.y, sliceRadiusIn, sliceOffset+halfAngle);
		const arcIn3 = angleToRadian(center.x, center.y, sliceRadiusIn, sliceOffset+sliceAngle);

		return ''+
			` M ${arcOut3.x} ${arcOut3.y}`+
			` A ${sliceRadiusOut} ${sliceRadiusOut} 0 ${halfAngle>=180?1:0} 0 ${arcOut2.x} ${arcOut2.y}`+
			` A ${sliceRadiusOut} ${sliceRadiusOut} 0 ${halfAngle>=180?1:0} 0 ${arcOut1.x} ${arcOut1.y}`+
			` ${sliceAngle>=360?'M':'L'} ${arcIn1.x} ${arcIn1.y}`+
			` A ${sliceRadiusIn} ${sliceRadiusIn} 0 ${halfAngle>=180?1:0} 1 ${arcIn2.x} ${arcIn2.y}`+
			` A ${sliceRadiusIn} ${sliceRadiusIn} 0 ${halfAngle>=180?1:0} 1 ${arcIn3.x} ${arcIn3.y}`+
			` ${sliceAngle>=300?'M':'L'} ${arcOut3.x} ${arcOut3.y}`;

	}

let d;
$: d = calcPieSlice(offset, angle, radiusOut, radiusIn);
</script>

<slot {d}></slot>