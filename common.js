"use strict";

function Extend(Klass, Base) {
    Klass.prototype = Object.create(Base.prototype);
    Klass.prototype.constructor = Klass;
}

var Vector = function(x, y) {
    this.x = x;
    this.y = y;
};

Vector.prototype.copy = function () {
    return new Vector(this.x, this.y);
};

Vector.prototype.add = function(other) {
    this.x += other.x;
    this.y += other.y;
    return this;
};

Vector.prototype.sub = function(other) {
    this.x -= other.x;
    this.y -= other.y;
    return this;
};

Vector.prototype.mult = function (n) {
    this.x *= n;
    this.y *= n;
    return this;
};

Vector.prototype.div = function (n) {
    this.x /= n;
    this.y /= n;
    return this;
};

Vector.prototype.magSq = function () {
    var x = this.x, y = this.y;
    return (x * x + y * y);
};

Vector.prototype.mag = function () {
    return Math.sqrt(this.magSq());
};

Vector.prototype.dist = function (other) {
    var d = other.copy().sub(this);
    return d.mag();
};

Vector.prototype.normalize = function () {
    return this.div(this.mag());
};

function gcd(a, b) {
    var r = a % b;
    while(r != 0) {
        a = b;
        b = r;
        r = a % b;
    }
    return b;
}

function lcm(a, b) {
    return (a * b) / gcd(a, b);
}

function circleIntersections(x1, y1, r1, x2, y2, r2) {
    var points = new Array();

    var dx = x1 - x2;
    var dy = y1 - y2;
    var d2 = dx * dx + dy * dy;
    var d = Math.sqrt(d2);

    if( d > r1 + r2 || d < Math.abs(r1 - r2) ) {
        // No intersect
    } else {
        var a = (r1 * r1 - r2 * r2 + d2) / (2 * d);
        var h = Math.sqrt( r1*r1 - a*a );
        var xm = x1 + a * (x2 - x1) / d;
        var ym = y1 + a * (y2 - y1) / d;

        if(d == r1 + r2) {
            points.push(new Vector(xm, ym));
        } else {
            var paX = xm + h*(y2 - y1)/d;
            var paY = ym - h*(x2 - x1)/d;
            var pbX = xm - h*(y2 - y1)/d;
            var pbY = ym + h*(x2 - x1)/d;

            points.push(new Vector(paX, paY));
            points.push(new Vector(pbX, pbY));
        }
    }

    return points;
};

function drawPath(ctx, points, upto, closeWhenComplete) {
    if (points.length == 0 || upto == 0) {
        return;
    }

    var lastPoint = Math.min(upto, points.length);

    ctx.beginPath();

    ctx.moveTo(points[0].x, points[0].y);
    for(var i = 1; i <= lastPoint; ++i) {
        ctx.lineTo(points[i].x, points[i].y);
    }

    if (closeWhenComplete && upto == points.length - 1) {
        ctx.closePath();
    }

    ctx.stroke();
}
