import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Translator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shift: props.shift,
            original: '',
            encrypted: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleEncrypt = this.handleEncrypt.bind(this);
        this.handleDecrypt = this.handleDecrypt.bind(this);
    }

    handleChange(event){
        let id = event.target.id;
        console.log('id: ' + id);
        if(id === 'original') {
            this.setState({original: event.target.value});
        }else if(id === 'encrypted'){
            this.setState({encrypted: event.target.value});
        }
    }

    handleEncrypt(event){
        console.log(event.target.name);
        let msg = caesarShift(this.state.original, this.state.shift);
        console.log(msg);
        this.setState({encrypted: msg});
        event.preventDefault();
    }

    handleDecrypt(event){
        console.log(event.target.name);
        let msg = caesarShift(this.state.encrypted, -this.state.shift);
        console.log(msg);
        this.setState({original: msg});
        event.preventDefault();
    }

    render(){
        return(
            <form>
                <label>
                    Szöveg:
                    <textarea id="original" value={this.state.original} onChange={this.handleChange} />
                </label>
                <label>
                    Titkosított szöveg:
                    <textarea id="encrypted" value={this.state.encrypted} onChange={this.handleChange} />
                </label>
                <button onClick={this.handleEncrypt} name="encrypt">Titkosítás</button>
                <button onClick={this.handleDecrypt} name="decrypt">Visszafejtés</button>
                <a href="">Vissza a kezdőlapra</a>
            </form>
        );
    }

}

export default Translator;

/*
JavaScript Caesar shift
by Evan Hahn (evanhahn.com)
*/

var caesarShift = function(str, amount) {

    // Wrap the amount
    if (amount < 0)
        return caesarShift(str, amount + 26);

    // Make an output variable
    var output = '';

    // Go through each character
    for (var i = 0; i < str.length; i ++) {

        // Get the character we'll be appending
        var c = str[i];

        // If it's a letter...
        if (c.match(/[a-z]/i)) {

            // Get its code
            var code = str.charCodeAt(i);

            // Uppercase letters
            if ((code >= 65) && (code <= 90))
                c = String.fromCharCode(((code - 65 + amount) % 26) + 65);

            // Lowercase letters
            else if ((code >= 97) && (code <= 122))
                c = String.fromCharCode(((code - 97 + amount) % 26) + 97);

        }

        // Append
        output += c;

    }

    // All done!
    return output;

};
