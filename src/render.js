export default (ctx, x, y, callback) => {
    return (() => {
        let prev_pen = 0;
        return async (dx, dy, pen) => {
            x += dx, y += dy;
            if (!prev_pen) {
                ctx.lineTo(x, y);
                ctx.stroke();
            }
            ctx.moveTo(x, y);
            prev_pen = pen;
            callback && await callback(x, y, pen);
        };
    })();
};
