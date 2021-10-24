function Circle(x, y, r) {
    this.x = x || 0
    this.y = y || 0
    this.r = r || 0
    this.color = randomColor()
}
Circle.prototype.draw = function (ctx) {
    ctx.beginPath()
    ctx.fillStyle = this.color
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
    ctx.fill()
    ctx.stroke()
}
Circle.prototype.coinside = function (x, y) {
    return Math.sqrt(Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2)) <= this.r

}
Circle.prototype.update = function (dx, dy, w, h) {
    this.x = this.x + dx || this.x
    this.y = this.y + dy || this.y
    let r = (w - this.x) / 2
    if (r >= 0)
        this.r = r || this.r
}
Circle.prototype.clone = function (x, y, w, h) {
    return new Circle(x, y)
}