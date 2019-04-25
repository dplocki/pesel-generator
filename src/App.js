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
          <legend>Płeć</legend>
          <div className="form-check form-check-inline">
            <input className="form-check-input"
              type="radio"
              name="peselGender"
              id="radioGenderAny"
              value={GenderEnum.Any}
              checked={this.state.gender === GenderEnum.Any}
              onChange={this.handleOnGenderChange} />
            <label className="form-check-label" htmlFor="radioGenderAny">
              Dowolna
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input"
              type="radio"
              name="peselGender"
              id="radioGenderFemale"
              value={GenderEnum.Female}
              checked={this.state.gender === GenderEnum.Female}
              onChange={this.handleOnGenderChange} />
            <label className="form-check-label" htmlFor="radioGenderFemale">
              Kobieta
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input"
              type="radio"
              name="peselGender"
              id="radioGenderMale"
              value={GenderEnum.Male}
              checked={this.state.gender === GenderEnum.Male}
              onChange={this.handleOnGenderChange} />
            <label className="form-check-label" htmlFor="radioGenderMale">
              Mężczyzna
            </label>
          </div>
        </fieldset>

        <div className="row">

          <fieldset className="form-group col-6">
            <legend>Wiek</legend>

            <div className="form-group btn-group">
              <div className="form-group btn-group">
                <select className="mdb-select md-form" name="peselAgeSign">
                  <option value="=" selected="selected">=</option>
                  <option value=">">&gt;</option>
                  <option value="<">&lt;</option>
                </select>

                <input type="number"
                  class="form-control"
                  name="peselAgeNumber" />
              </div>
            </div>
          </fieldset>

          <fieldset className="form-group col-6">
            <legend>Data urodzenia</legend>
          </fieldset>
        </div>

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
