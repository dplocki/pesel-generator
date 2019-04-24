import React, { Component } from 'react';
import './App.css';
import { generatePESEL } from './generate';
import { filterMerge } from './filterMerge';
import { GenderEnum } from './genderEnum';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      howMany: 5,
      date_filter: '',
      gender: GenderEnum.Any
    };

    this.handleGenerateButtonClick = this.handleGenerateButtonClick.bind(this);
    this.handleDateFilterChange = this.handleDateFilterChange.bind(this);
    this.handleOnGenderChange = this.handleOnGenderChange.bind(this);
  }

  handleDateFilterChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  handleGenerateButtonClick() {
    const pesels = [...Array(this.state.howMany)]
      .map(_ => {
        const generatorData = filterMerge(this.state.value);

        return {
          date: generatorData.date.format('YYYY-MM-DD'),
          pesel: generatePESEL(generatorData.date, generatorData.gender)
        }
      });

    this.setState(state => ({
      ...state,
      pesels
    }));
  }

  handleOnGenderChange(event) {
    const value = parseInt(event.target.value);
    this.setState(state => ({
      ...state,
      gender: value
    }));
  }

  render() {
    const pesels = this.state.pesels
      ? this.state.pesels.reduce((result, next) => `${result}${next.date}: ${next.pesel}\n`, '')
      : '';

    return (
      <div className="container">
        <fieldset className="form-group">
          <div className="form-check">
            <label className="form-check-label" htmlFor="radioGenderAny">
              <input className="form-check-input"
                  type="radio"
                  name="radioGenderGroup"
                  id="radioGenderAny"
                  value={GenderEnum.Any}
                  checked={this.state.gender === GenderEnum.Any}
                  onChange={this.handleOnGenderChange} />
              Dowolna
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label" htmlFor="radioGenderFemale">
              <input className="form-check-input"
                  type="radio"
                  name="radioGenderGroup"
                  id="radioGenderFemale"
                  value={GenderEnum.Female}
                  checked={this.state.gender === GenderEnum.Female}
                  onChange={this.handleOnGenderChange} />
              Kobieta
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label" htmlFor="radioGenderMale">
              <input className="form-check-input"
                   type="radio"
                   name="radioGenderGroup"
                   id="radioGenderMale"
                   value={GenderEnum.Male}
                   checked={this.state.gender === GenderEnum.Male}
                   onChange={this.handleOnGenderChange} />
              Mężczyzna
            </label>
          </div>
        </fieldset>

        <fieldset className="form-group">
          <div className="input-group mb-3">
            <input type="text" className="form-control" name="date_filter" onChange={this.handleDateFilterChange} />
            <div className="input-group-append">
              <button type="button" className="btn btn-outline-secondary" onClick={this.handleGenerateButtonClick}>Generate</button>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <div className="form-group">
            <label htmlFor="comment">Wynik</label>
            <textarea className="form-control" rows={5} value={pesels} readOnly={true}></textarea>
          </div>
        </fieldset>
      </div>
    );
  }
}

export default App;
