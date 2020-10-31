/**
 * @param ctx {CanvasRenderingContext2D}
 * @param x {number}
 * @param y {number}
 * @param overflow {boolean}
 * @param callback {() => Promise<void>}
 */
export default (ctx, x, y, overflow = true, callback) => {
    return (() => {
        let prev_pen = 0;
        const canvas = ctx.canvas;
        let x_min = canvas.width, x_max = 0, e = 0;
        let y_min = canvas.height, y_max = 0, f = 0;
        const buffer = document.createElement('canvas');
        buffer.width = canvas.width, buffer.height = canvas.height;
        const ctx_buf = buffer.getContext('2d');
        ctx_buf.imageSmoothingEnabled = false;
        return async (dx, dy, pen) => {
            x += dx, y += dy;
            if (!overflow) {
                x_min = Math.min(x_min, x + e), x_max = Math.max(x_max, x + e);
                y_min = Math.min(y_min, y + f), y_max = Math.max(y_max, y + f);
                const w = x_max - x_min, h = y_max - y_min;
                let de = 0, df = 0;
                if (x_min < 0 || x_max > canvas.width) {
                    x_max = (x_min += (de = (canvas.width - w) / 2 - x_min)) + w;
                }
                if (y_min < 0 || y_max > canvas.height) {
                    y_max = (y_min += (df = (canvas.height - h) / 2 - y_min)) + h;
                }
                if (de || df) {
                    ctx_buf.clearRect(0, 0, buffer.width, buffer.height);
                    ctx_buf.beginPath();
                    ctx_buf.drawImage(canvas, de, df);
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.beginPath();
                    ctx.drawImage(buffer, 0, 0);
                    ctx.moveTo(x - dx + (e += de), y - dy + (f += df));
                }
            }
            if (!prev_pen) {
                ctx.lineTo(x + e, y + f);
                ctx.stroke();
            }
            ctx.moveTo(x + e, y + f);
            prev_pen = pen;
            callback && await callback();
        };
    })();
};
