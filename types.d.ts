
// Typedefs
export type PancakePoint = {
  x: number;
  y: number;
};

export type PancakeMouse = {
  x: number,
  y: number,
  left: number,
  top: number,
};

export type PancakeGetVal = { (d:any, index?: number): number };

// Functions
export const default_x: PancakeGetVal = (d: any) => d.x;
export const default_y: PancakeGetVal = (d: any) => d.y;

export function angleToXY(
  centerX: number,
  centerY: number,
  radius: number,
  degrees: number
): PancakePoint;

export function radianToXY(
  centerX: number,
  centerY: number,
  radius: number,
  angle: number
): PancakePoint;


// Components
export class Bars {
  $$prop_def: {
    data: any[],
    height?: number,
    x?: PancakeGetVal,
    y?: PancakeGetVal,
  }
  $$slot_def: {
    value: number,
    index: number,
    first: boolean,
    last: boolean,
  }
}

export class Box {
  $$prop_def: {
    x1?: number,
    x2?: number,
    y1?: number,
    y2?: number,
  }
  $$slot_def: {
  }
}

export class Chart {
  $$prop_def: {
    class?: string,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    clip?: boolean;
  }
  $$slot_def: {
  }
}

export class Columns {
  $$prop_def: {
    data: any[],
    width?: number,
    x?: PancakeGetVal,
    y?: PancakeGetVal,
  }
  $$slot_def: {
    value: number,
    index: number,
    first: boolean,
    last: boolean,
  }
}

export class Grid {
  $$prop_def: {
    count?: number,
    ticks?: any[],
    horizontal?: boolean,
    vertical?: boolean,
  }
  $$slot_def: {
    value: number,
    index: number,
    first: boolean,
    last: boolean,
  }
}

export class Point {
  $$prop_def: {
    x: number,
    y: number,
  }
  $$slot_def: {
  }
}

export class Quadtree {
  $$prop_def: {
    data: any[],
    x?: PancakeGetVal,
    y?: PancakeGetVal,
    radius?: number,
    closest?: PancakePoint | null,
    maxLevels?: number,
  }
  $$slot_def: {
    closest: PancakePoint | null,
  }
}

export class Svg {
  $$prop_def: {
    class?: string,
    style?: string,
    clip?: boolean,
    noPointerEvents?: boolean,
  }
  $$slot_def: {
  }
}

// Convert points to SVG area
export function SvgAreaFunc(
  points: PancakePoint[],
): string;

export class SvgArea {
  $$prop_def: {
    data: any[],
    floor?: number,
    x?: PancakeGetVal,
    y?: PancakeGetVal,
    area?: SvgAreaFunc,
  }
  $$slot_def: {
    d: number,
  }
}

// Converts points to SVG line
export function SvgLineFunc(
  points: PancakePoint[],
): string;

export class SvgLine {
  $$prop_def: {
    data: any[],
    x?: PancakeGetVal,
    y?: PancakeGetVal,
    line?: SvgLineFunc,
  }
  $$slot_def: {
    d: number,
  }
}

// SVG generator function
export function SvgArcFunc(
  x: number, 
  y: number, 
  startAngle: number, 
  endAngle: number, 
  innerRadius: number, 
  outerRadius: number,
): string;

export class SvgArc {
  $$prop_def: {
    x?: number,
    y?: number,
    start: number,
    stop: number,
    inner?: number,
    outer?: number,
    arc?: SvgArcFunc,
  }
  $$slot_def: {
    d: number,
  }
}

export class SvgPoint {
  $$prop_def: {
    x: number,
    y: number,
  }
  $$slot_def: {
    d: number,
  }
}

export class SvgPolygon {
  $$prop_def: {
    data: any[],
    x?: PancakeGetVal,
    y?: PancakeGetVal,
  }
  $$slot_def: {
    d: number,
  }
}

export class SvgRect {
  $$prop_def: {
    x1?: number,
    x2?: number,
    y1?: number,
    y2?: number,
  }
  $$slot_def: {
    x: number,
    y: number,
    width: number,
    height: number,
  }
}

export class SvgScatterPlot {
  $$prop_def: {
    data: any[],
    x?: PancakeGetVal,
    y?: PancakeGetVal,
  }
  $$slot_def: {
    d: number,
  }
}