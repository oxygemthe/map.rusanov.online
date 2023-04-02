let canvas = {
    element: document.getElementById('balls'),
    width: document.getElementById('balls').offsetWidth + 40,
    height: document.getElementById('balls').offsetHeight - 40,
    initialize: function () {
        this.element.style.width = this.width + 'px';
        this.element.style.height = this.height + 'px';
        document.body.appendChild(this.element);
    }
};

let Ball = {
    create: function (src, name, dx, dy) {
        let newBall = Object.create(this);
        newBall.dx = dx;
        newBall.dy = dy;
        newBall.width = 80;
        newBall.height = 80;
        newBall.element = document.createElement('div');
        newBall.avatar = document.createElement('img');
        newBall.avatar.src = src;
        newBall.element.style.width = newBall.width + 'px';
        newBall.element.style.height = newBall.height + 'px';
        newBall.element.classList.add('ball');
        newBall.name = document.createElement('h4');
        newBall.name.innerText = name;
        newBall.element.append(newBall.avatar);
        newBall.element.append(newBall.name);
        newBall.width = parseInt(newBall.element.style.width);
        newBall.height = parseInt(newBall.element.style.height);
        canvas.element.appendChild(newBall.element);
        return newBall;
    },
    moveTo: function (x, y) {
        this.element.style.left = x + 'px';
        this.element.style.top = y + 'px';
    },
    changeDirectionIfNecessary: function (x, y) {
        if (x < 0 || x > canvas.width - this.width) {
            this.dx = -this.dx;
        }
        if (y < 0 || y > canvas.height - this.height) {
            this.dy = -this.dy;
        }
    },
    draw: function (x, y) {
        this.moveTo(x, y);
        let ball = this;
        setTimeout(function () {
            ball.changeDirectionIfNecessary(x, y);
            ball.draw(x + ball.dx, y + ball.dy);
        }, 1000 / 60);
    }
};

export {canvas, Ball};
