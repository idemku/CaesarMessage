import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Translator from './Translator';

class KeyForm extends Component{
    constructor(props){
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        this.setState({value: event.target.value});
    }

    handleSubmit(event){
        fetch('/caesar', {method: 'post', body: JSON.stringify({'key': this.state.value}),
            headers: {'content-type': 'application/json'}
            })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    if(result['err']){
                        ReactDOM.render(<p>Hiba történt: {result['err']}</p>, document.getElementById('errMsg'));
                    }else {
                        ReactDOM.render(<Translator shift={result['shift']}/>, document.getElementById('root'));
                    }
                },
                (error) => {
                    console.log(error);
                }
            );

        event.preventDefault();
    }

    render(){
        return(
            <form id="keyForm" onSubmit={this.handleSubmit}>
                <label>
                    Add meg a titkosító kulcsot:
                    <input type="text" name="key" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Tovább" />
                <div id="errMsg"></div>
            </form>
        );
    }
}

export default KeyForm;
