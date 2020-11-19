
export function angleToXY(centerX, centerY, radius, degrees) {
  var radians = (degrees-90) * Math.PI / 180.0;

  return {
    x: centerX + (radius * Math.cos(radians)),
    y: centerY + (radius * Math.sin(radians))
  };
};



export function radianToXY(centerX, centerY, radius, angle) {
  angle -= Math.PI/2;
  return {
    x: centerX + (radius * Math.cos(angle)),
    y: centerY + (radius * Math.sin(angle))
  };
}