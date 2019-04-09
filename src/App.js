import React, { Component } from 'react';
import './App.css';
import { generatePESEL } from './generate';
import { filterMerge } from './filterMerge';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      howMany: 5,
      date_filter: ''
    };

    this.handleGenerateButtonClick = this.handleGenerateButtonClick.bind(this);
    this.handleDateFilterChange = this.handleDateFilterChange.bind(this);
  }

  handleDateFilterChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  handleGenerateButtonClick() {
    const pesels = [...Array(this.state.howMany)]
      .map(_ => {
        const date = filterMerge(this.state.value);

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
      ? this.state.pesels.reduce((result, next) => `${result}${next.date}: ${next.pesel}\n`, '')
      : '';

    return (
      <div className="App">
        <p>
          <input type="text" name="date_filter" onChange={this.handleDateFilterChange} />
          <button onClick={this.handleGenerateButtonClick}>Generate</button>
        </p>

        <textarea value={pesels} rows="10" cols="111" readOnly={true} />
      </div>
    );
  }
}

export default App;
