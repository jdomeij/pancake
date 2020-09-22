
export function angleToRadian(centerX, centerY, radius, degrees) {
  var radians = (degrees-90) * Math.PI / 180.0;

  return {
    x: centerX + (radius * Math.cos(radians)),
    y: centerY + (radius * Math.sin(radians))
  };
};

