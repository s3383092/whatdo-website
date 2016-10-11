app = {
    components: {}
};

app.components.Spinner = function (wheel, button, ops) {
    //set options and defaults
    ops = ops ? ops : {};
    var onStop = ops.onStop ? ops.onStop : function () { };
    var destination = ops.destination;
    var slices = ops.slices;

    var clicker = new app.components.Wheel(button);
    var spinner = new app.components.Wheel(wheel, {
        timeout: 2000,
        onStop: function (degrees) {
            clicker.rotate(0);
            console.log("destination = " + destination);
        },
        onRotate: function (degrees) {
            clicker.rotate((degrees % 360 % (slices * 2)) + (360 - slices));
        }
    });

    this.reset = function () {
        spinner.rotate(0);
    };

    this.setDestination = function (degrees) {
        stopAt = degrees;
    };

    button.addEventListener("click", function () {
        if (!spinner.isAccelerating() && !spinner.isStopping()) {
            spinner.start();

            window.setTimeout(function () {
                spinner.stop(destination);
            }, 4000);
        }
    });

    this.clicker = clicker;
    this.spinner = spinner;
};

app.components.Wheel = function (target, ops) {
    //set options and defaults
    ops = ops ? ops : {};
    var timeout = ops.timeout;
    var acceleration = ops.accelerationDelay ? ops.accelerationDelay : 100;
    var onRotateListener = ops.onRotate ? ops.onRotate : function () { };
    var onStopListener = ops.onStop ? ops.onStop : function () { };
    var increment = ops.increment ? ops.increment : 1;
    var delay = ops.delay ? ops.delay : 10;

    var state = {
        accelerating: false,
        stopping: false,
        destination: null,
        degrees: 0
    };

    var intervals = {
        accelerater: null,
        decelerater: null,
        spinner: []
    };

    var rotate = function (deg) {
        target.style.webkitTransform = 'rotate(' + deg + 'deg)';
        target.style.mozTransform = 'rotate(' + deg + 'deg)';
        target.style.msTransform = 'rotate(' + deg + 'deg)';
        target.style.oTransform = 'rotate(' + deg + 'deg)';
        target.style.transform = 'rotate(' + deg + 'deg)';
        state.degrees = deg;
        onRotateListener.apply(this, [deg]);
    };

    var spin = function (speed) {
        intervals.spinner.push(window.setInterval(function () {
            rotate((state.degrees + speed) % 360);

            if (state.destination !== null && intervals.spinner.length == 1) {
                if (state.degrees == state.destination) {
                    window.clearInterval(intervals.spinner.pop());
                    state.destination = null;
                    state.stopping = false;
                    onStopListener.apply(this, [state]);
                }
            }
        }, delay));
    };

    var accelerate = function () {
        state.accelerating = true;
        intervals.accelerater = window.setInterval(spin.bind(this, increment), acceleration);

        if (timeout > 0) {
            window.setTimeout(function () {
                window.clearInterval(intervals.accelerater);
                state.accelerating = false;
            }, timeout);
        }
    };

    var decelerate = function (to) {
        state.stopping = true;
        state.accelerating = false;
        window.clearInterval(intervals.accelerater);
        var slowDown = function () {
            if (intervals.spinner.length > 1) {
                window.clearInterval(intervals.spinner.pop());
            } else {
                window.clearInterval(intervals.decelerater);

                if (to || to === 0) {
                    state.destination = to;
                } else {
                    window.clearInterval(intervals.spinner.pop());
                    state.stopping = false;
                    onStopListener.apply(this, [state]);
                }
            }
        };

        intervals.decelerater = window.setInterval(slowDown, acceleration);
    };

    //expose
    this.isAccelerating = function () {
        return state.accelerating;
    };
    this.isStopping = function () {
        return state.stopping;
    };
    this.start = accelerate;
    this.stop = decelerate;
    this.rotate = rotate;
    this.spin = spin;
};

app.spinner = new app.components.Spinner(
document.getElementById('spinner-wheel'),
document.getElementById('spinner-button'), {
    slices: 7,
    onStop: function (state) {
        console.log(state);
        alert("stopped");
    }
});