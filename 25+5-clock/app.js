const lengthIcon = {
    up: <i class="fa-solid fa-arrow-up"></i>,
    down: <i class="fa-solid fa-arrow-down"></i>
}

const optionIcons = [
    {
        name: "Play",
        id: "play-id",
        icon: <i class="fa-solid fa-play"></i>
    },
    {
        name: "Pause",
        id: "pause-id",
        icon: <i class="fa-solid fa-pause"></i>
    },
    {
        name: "Reset",
        id: "reset-id",
        icon: <i class="fa-solid fa-rotate-left"></i>
    },
]


class Display extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            timerType: "Session",
            minutes: 25,
            seconds: 0,
            isInstantiated: true
        }
    }

    handlePlay() {
        this.setState({ counter: false })
    }

    timerControl(name) {
        if (name === "Play") {
            this.handlePlay()
        } else if (name === "Pause") {
        } else if (name === "Reset") {
            this.setState({ minutes: 25 })
            this.setState({ seconds: 0 })
        }
    }

    render() {
        return (
            <div id="display">
                <h1>{this.state.timerType}</h1>
                <h2>{this.state.minutes < 10 ? "0".concat(this.state.minutes.toString()) : this.state.minutes == 60 ? "00" : this.state.minutes} : {this.state.seconds < 10 ? "0".concat(this.state.seconds.toString()) : this.state.seconds == 60 ? "00" : this.state.seconds}</h2>
                <div id="optionsContainer">
                    {this.props.state.optionIcons.map(buttons => <button type="button" id={buttons.name} onClick={this.timerControl.bind(this, buttons.name)}> {buttons.icon}</button>)}
                </div>
            </div>
        )
    }
}

class Timer extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            breakLength: 5,
            sessionLength: 25,
            lengthIcon: lengthIcon,
            optionIcons: optionIcons
        }

    }

    increment(type) {
        if (type === "break") {
            if (this.state.breakLength < 60) {
                this.setState({ breakLength: this.state.breakLength + 1 })
            }
        } else if (type === "session") {
            if (this.state.sessionLength < 60) {
                this.setState({ sessionLength: this.state.sessionLength + 1 })
            }
        }
    }

    decrement(type) {
        if (type === "break") {
            if (this.state.breakLength > 1) {
                this.setState({ breakLength: this.state.breakLength - 1 })
            }
        } else if (type === "session") {
            if (this.state.sessionLength > 1) {
                this.setState({ sessionLength: this.state.sessionLength - 1 })
            }
        }
    }

    render() {



        return (

            <div id="timer">
                <h1>25 + 5 Clock</h1>

                <div id="length-container">

                    <div id="breakLength">
                        <h3>Break Length</h3>
                        <button type="button" onClick={this.increment.bind(this, "break")}>{this.state.lengthIcon.up}</button>
                        <h3>{this.state.breakLength}</h3>
                        <button type="button" onClick={this.decrement.bind(this, "break")}>{this.state.lengthIcon.down}</button>
                    </div>

                    <div id="sessionLength">
                        <h3>Session Length</h3>
                        <button type="button" onClick={this.increment.bind(this, "session")}>{this.state.lengthIcon.up}</button>
                        <h3>{this.state.sessionLength}</h3>
                        <button onClick={this.decrement.bind(this, "session")}>{this.state.lengthIcon.down}</button>
                    </div>

                </div>

                <Display state={this.state} />
            </div>
        )
    }
}


class App extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div id="clock">
                <Timer />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'))