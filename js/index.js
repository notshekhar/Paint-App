const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

    ; (function init() {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight - 80
    })()

const [height, width] = [canvas.height, canvas.width]


const rectange_button = document.querySelector(".rectangle")
const circle_button = document.querySelector(".circle")
const reset = document.querySelector(".reset")

let shapes = new Array(1).fill(new Rectangle(10, 10, 200, 200))

function clearCanvas() {
    ctx.beginPath()
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, width, height)
}

let drawing = false
let draw_active = false
let drag = false
let shape
let dragable_shape
let drag_starting = []


function toggleActiveButton(...tags) {
    for (let i = 0; i < tags.length; i++) {
        let tag = tags[i]
        tag.classList.remove("active")
    }
    if (draw_active)
        tags[0].classList.add("active")
}

rectange_button.onclick = function () {
    draw_active = !draw_active
    shape = new Rectangle()
    toggleActiveButton(rectange_button, circle_button)
}
circle_button.onclick = function () {
    draw_active = !draw_active
    shape = new Circle()
    toggleActiveButton(circle_button, rectange_button)
}
reset.onclick = function () {
    shapes = []
    drawing = false
    drag = false
    draw_active = false

}


canvas.onmousedown = function (e) {
    let x = e.layerX
    let y = e.layerY
    if (draw_active) {
        drawing = !drawing
        shape = shape.clone(x, y)
        shapes.push(shape)
        return
    }
    shapes.forEach(shape => {
        if (shape.coinside(x, y)) {
            drag = true
            dragable_shape = shape
            drag_starting = [e.layerX, e.layerY]
        }
    })
}
canvas.onmousemove = function (e) {
    let x = e.layerX
    let y = e.layerY
    if (drawing && !drag) {
        shape.update(false, false, x, y)
        return
    }
    if (!drag) return
    let dx = x - drag_starting[0]
    let dy = y - drag_starting[1]
    dragable_shape.update(dx, dy)
    drag_starting = [x, y]
}

canvas.onmouseup = function (e) {
    if (draw_active) {
        drawing = !drawing
        // draw_active = false
        return
    }
    if (!drag) return

    drag = false
}



canvas.onmouseout = function (e) {
    if (drawing) {
        shapes.pop()
        drawing = !drawing
    }
}


function draw() {
    clearCanvas()
    shapes.forEach(shape => shape.draw(ctx))
    requestAnimationFrame(draw)
}

requestAnimationFrame(draw)