
/* UI and functions coded by Rengeki */
/* Data used belongs to FCC */

const drumkitOne = [
    {
        keyCode: 81,
        keyTrigger: 'Q',
        id: 'Heater-1',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
    },
    {
        keyCode: 87,
        keyTrigger: 'W',
        id: 'Heater-2',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
    },
    {
        keyCode: 69,
        keyTrigger: 'E',
        id: 'Heater-3',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
    },
    {
        keyCode: 65,
        keyTrigger: 'A',
        id: 'Heater-4',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
    },
    {
        keyCode: 83,
        keyTrigger: 'S',
        id: 'Clap',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
    },
    {
        keyCode: 68,
        keyTrigger: 'D',
        id: 'Open-HH',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
    },
    {
        keyCode: 90,
        keyTrigger: 'Z',
        id: "Kick-n'-Hat",
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
    },
    {
        keyCode: 88,
        keyTrigger: 'X',
        id: 'Kick',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
    },
    {
        keyCode: 67,
        keyTrigger: 'C',
        id: 'Closed-HH',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
    }
];

const drumkitTwo = [
    {
        keyCode: 81,
        keyTrigger: 'Q',
        id: 'Chord-1',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
    },
    {
        keyCode: 87,
        keyTrigger: 'W',
        id: 'Chord-2',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
    },
    {
        keyCode: 69,
        keyTrigger: 'E',
        id: 'Chord-3',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
    },
    {
        keyCode: 65,
        keyTrigger: 'A',
        id: 'Shaker',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
    },
    {
        keyCode: 83,
        keyTrigger: 'S',
        id: 'Open-HH',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
    },
    {
        keyCode: 68,
        keyTrigger: 'D',
        id: 'Closed-HH',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
    },
    {
        keyCode: 90,
        keyTrigger: 'Z',
        id: 'Punchy-Kick',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
    },
    {
        keyCode: 88,
        keyTrigger: 'X',
        id: 'Side-Stick',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
    },
    {
        keyCode: 67,
        keyTrigger: 'C',
        id: 'Snare',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
    }
];


/* Drumpads */
class DrumPads extends React.Component {
    constructor(props) {
        super(props);
        this.keys = ['Z', 'z', 'X', 'x', 'C', 'c', 'A', 'a', 'S', 's', 'D', 'd', 'Q', 'q', 'W', 'w', 'E', 'e']
        window.addEventListener("keydown", e => {
            if (this.props.state.power) {
                if (this.keys.includes(e.key)) {
                    const upperKey = e.key.toUpperCase()
                    this.playAudio(upperKey)
                }
            }
        })
    }

    playAudio(keyPressed) {
        this.props.updateDisplay(keyPressed)
        const audio = document.getElementById(keyPressed)
        audio.volume = this.props.state.volume / 100
        audio.currentTime = 0
        audio.play()
    }

    render() {

        const state = {
            on: this.props.state.drumKit.map(drum => <button key={drum.keyTrigger} class="btn btn-primary drum-pad" id={drum.keyCode} onClick={this.playAudio.bind(this, drum.keyTrigger)}>{drum.keyTrigger}<audio class="clip" key={drum.id} src={drum.url} id={drum.keyTrigger}></audio></button>),

            off: this.props.state.drumKit.map(drum => <button key={drum.keyTrigger} class="btn btn-secondary" id={drum.id} disabled>{drum.keyTrigger}</button>)
        }

        return (
            <div id="drum-pads">
                {this.props.state.power ? state.on : state.off}
            </div>)
    }
}

class DrumDisplay extends React.Component {
    render() {
        return (
            <div id="display">
                <h3>{this.props.state.power ? this.props.state.key : 'Offline'}</h3>
            </div>
        )
    }
}


class DrumSettings extends React.Component {

    render() {

        const powerState = (this.props.state.power) ? 'On' : 'Off';
        const drumState = (this.props.state.drumKit === drumkitOne) ? 'Drum 1' : 'Drum 2';

        const volumeIcons = (this.props.state.volume > 66) ? <i class="bi bi-volume-up"></i> : (this.props.state.volume > 33) ? <i class="bi bi-volume-down"></i> : (this.props.state.volume > 0) ? <i class="bi bi-volume-off"></i> : <i class="bi bi-volume-mute"></i>


        const onState = {
            drum: (<div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" role="switch" id="drumState" onClick={this.props.drumSwitch} />
                <label class="form-check-label" for="drumState" >{drumState}</label>
            </div>),
            volume: (<div id="volume">
                <label for="volumeRange" class="form-label">{volumeIcons}</label>
                <input type="range" class="form-range" id="volumeRange" value={this.props.state.volume} onChange={this.props.volumeListener} />
            </div>)
        }

        /* Constant States */
        const offState = {
            drum: (<div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" role="switch" id="drumState" disabled />
                <label class="form-check-label" for="drumState" >{drumState}</label>
            </div>),
            volume: (<div id="volume">
                <label for="volumeRange" class="form-label">{volumeIcons}</label>
                <input type="range" class="form-range" id="volumeRange" value={this.props.state.volume} onChange={this.props.volumeListener} disabled />
            </div>)
        }

        return (
            <div id="drum-settings">
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" role="switch" id="powerState" onClick={this.props.powerSwitch} />
                    <label class="form-check-label" for="powerState">{powerState}</label>
                </div>
                {(this.props.state.power) ? onState.drum : offState.drum}
                {(this.props.state.power) ? onState.volume : offState.volume}
            </div>
        )
    }
}


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            power: false,
            volume: 100,
            drumKit: drumkitOne,
            key: 'Heater 1',
            keyTrigger: ''
        }
    }

    powerSwitch() {
        this.setState({ power: !this.state.power })
    }

    handleVolumeChange(e) {
        this.setState({ volume: e.target.value })
    }

    drumSwitch() {
        if (this.state.drumKit === drumkitOne) {
            this.setState({ drumKit: drumkitTwo })
        } else {
            this.setState({ drumKit: drumkitOne })
        }
    }

    updateDisplay(keyPressed) {
        const keyObj = this.state.drumKit.find(drum => drum.keyTrigger === keyPressed)
        this.setState({ key: keyObj.id })
    }


    render() {
        return (
            <div id="drum-machine">
            <h2 id="text">Drum Machine</h2>
            <h5 id="author">by Rengeki</h5>
                <DrumPads state={this.state} updateDisplay={this.updateDisplay.bind(this)} />
                <DrumDisplay state={this.state} />
                <DrumSettings drumSwitch={this.drumSwitch.bind(this)} powerSwitch={this.powerSwitch.bind(this)} state={this.state} volumeListener={this.handleVolumeChange.bind(this)} />
            </div>
        )
    }
}


ReactDOM.render(<App />, document.getElementById('root'));