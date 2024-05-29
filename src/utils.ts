import { canvas, colorPickerIcon, ctx } from "./constants";
export let isActive = false;

export function drawImage(
  image: CanvasImageSource,
  sx: number,
  sy: number,
  sWidth: number,
  sHeight: number,
  dx: number,
  dy: number,
  dw: number,
  dh: number,
  xArc: number,
  yArc: number
): void {
  ctx.save();
  ctx.beginPath();
  ctx.arc(xArc, yArc, 50, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.clip();
  ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dw, dh);
}

export function rgbToHex(r: number, g: number, b: number): string {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b)
    .toString(16)
    .slice(1)
    .toUpperCase()}`;
}

export function drawCircle(
  x: number,
  y: number,
  radius: number,
  color: string,
  lineWidth: number
): void {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.stroke();
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
}

export function drawSquare(
  x: number,
  y: number,
  w: number,
  h: number,
  color: string,
  lineWidth: number,
  hexCode: string
): void {
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.beginPath();
  ctx.strokeRect(x, y, w, h);
  ctx.stroke();

  ctx.font = "12px Arial";
  ctx.fillText(hexCode, x - 20, y + 20);
  ctx.closePath();
}

export function drawGridLines(
  x: number,
  y: number,
  radius: number,
  gridSize: number
): void {
  ctx.save();
  ctx.strokeStyle = "white";
  ctx.lineWidth = 0.5;
  for (let i = x - radius; i <= x + radius; i += gridSize) {
    ctx.beginPath();
    ctx.moveTo(i, y - radius);
    ctx.lineTo(i, y + radius);
    ctx.stroke();
  }
  for (let i = y - radius; i <= y + radius; i += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x - radius, i);
    ctx.lineTo(x + radius, i);
    ctx.stroke();
  }
  ctx.restore();
}

export function activateDropper(): void {
  isActive = true;
  canvas.style.cursor = "none";
  colorPickerIcon.style.backgroundColor = "green";
}

export function deactivateDropper(image: HTMLImageElement): void {
  isActive = false;
  canvas.style.cursor = "default";
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  colorPickerIcon.style.backgroundColor = "gray";
}
