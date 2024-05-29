import {
  canvas,
  circleRadius,
  colorHex,
  colorPickerIcon,
  ctx,
  zoomLevel,
} from "./constants";
import {
  activateDropper,
  deactivateDropper,
  drawCircle,
  drawGridLines,
  drawImage,
  drawSquare,
  isActive,
  rgbToHex,
} from "./utils";

const img = new Image();
img.src = "./img.jpg";
window.onload = () => {
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
};

function handleMouseMove(event: MouseEvent) {
  if (!isActive) return;

  canvas.style.cursor = "none";
  const rect = canvas.getBoundingClientRect();
  const x = event.pageX - rect.left;
  const y = event.pageY - rect.top;

  const sx = (x - circleRadius / zoomLevel) * (img.width / canvas.width);
  const sy = (y - circleRadius / zoomLevel) * (img.height / canvas.height);

  const sWidth = (circleRadius * 2) / zoomLevel;
  const sHeight = (circleRadius * 2) / zoomLevel;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  const imageData = ctx.getImageData(x - 3, y - 3, 1, 1).data;
  const hex = rgbToHex(imageData[0], imageData[1], imageData[2]);

  colorHex.textContent = hex;
  colorHex.style.backgroundColor = hex;

  drawCircle(x, y, 60, hex, 6);

  drawCircle(x, y, 55, "black", 4);

  drawCircle(x, y, 50, "black", 2);

  drawImage(
    img,
    sx,
    sy,
    sWidth,
    sHeight,
    x - circleRadius,
    y - circleRadius,
    circleRadius * 2,
    circleRadius * 2,
    x,
    y
  );
  drawGridLines(x, y, circleRadius, 10);
  drawSquare(x - 3, y - 3, 6, 6, "black", 0.5, hex);
  ctx.restore();
}

canvas.addEventListener("mousemove", handleMouseMove);
canvas.addEventListener("mouseout", () => (canvas.style.cursor = "default"));
canvas.addEventListener("click", () => deactivateDropper(img));
colorPickerIcon.addEventListener("click", activateDropper);
