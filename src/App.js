import momentRandom from 'moment-random';
import React, { Component } from 'react';
import './App.css';
import { generatePESEL } from './generate';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      howMany: 5
    };

    this.handleGenerateButtonClick = this.handleGenerateButtonClick.bind(this);
  }

  handleGenerateButtonClick() {
    const pesels = [...Array(this.state.howMany)]
      .map(_ => {
        const date = momentRandom();

        return {
          date: date.format('YYYY-MM-DD'),
          pesel: generatePESEL(date)
        }
      });

    this.setState(state => ({
      ...state,
      pesels
    }));
  }

  render() {
    const pesels = this.state.pesels
      ? this.state.pesels.reduce((result, next) => result + '\n' + next.date + ':' + next.pesel, '')
      : '';

    return (
      <div className="App">
        <textarea value={pesels} rows="10" cols="111" />

        <button onClick={this.handleGenerateButtonClick}>Generate</button>
      </div>
    );
  }
}

export default App;
