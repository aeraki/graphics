// Canvas Base Graphics
function clear(color) {
	// If no color provided, clear as transparent;
	if (color === undefined) {
		CTX.clearRect(0, 0, WIDTH, HEIGHT);
	} else {
		CTX.fillStyle = color;
		CTX.fillRect(0, 0, WIDTH, HEIGHT);
	};
};
function line(x1, y1, x2, y2, color, width=2) {
	CTX.strokeStyle = color;
	CTX.lineWidth = width;
	CTX.beginPath();
	CTX.moveTo(x1, y1);
	CTX.lineTo(x2, y2);
	CTX.stroke();
};
function drawtext(text,x,y,color,font) {
	if (color) {CTX.fillStyle = color};
	if (font) {CTX.font = font};
	CTX.fillText(text,x,y);
};
function rectFill(x,y,w,h,color) {
	if (color) {CTX.fillStyle = color};
	CTX.fillRect(x,y,w,h);
};
function rectStroke(x,y,w,h,color,thickness) {
	if (color) {CTX.strokeStyle = color};
	if (thickness) {CTX.lineWidth = thickness};
	CTX.strokeRect(x,y,w,h);
};