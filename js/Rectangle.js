function randomColor() {
    return `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`
}

function Rectangle(x, y, width, height) {
    this.x = x || 0
    this.y = y || 0
    this.width = width || 0
    this.height = height || 0
    this.color = randomColor()
}
Rectangle.prototype.draw = function (ctx) {
    ctx.beginPath()
    ctx.fillStyle = this.color
    ctx.rect(this.x, this.y, this.width, this.height)
    ctx.fill()
    ctx.stroke()
}
Rectangle.prototype.coinside = function (x, y) {
    return x >= this.x && y >= this.y && x <= this.x + this.width && y <= this.y + this.height
}
Rectangle.prototype.update = function (dx, dy, width, height) {
    // this.x = x || this.x
    // this.y = y || this.y
    // this.width = width || this.width
    // this.height = height || this.height
    this.x = this.x + dx || this.x
    this.y = this.y + dy || this.y
    this.width = width - this.x || this.width
    this.height = height - this.y || this.height
}
Rectangle.prototype.clone = function (x, y, w, h) {
    return new Rectangle(x, y, w, h)
}