import React, { Component } from 'react';
import { generatePESEL } from '../logic/generate';
import { filterMerge } from '../logic/filterMerge';
import { GenderEnum } from '../logic/genderEnum';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

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

    const genderRadioButtons = [
      { value: GenderEnum.Any, label: 'Dowolna' },
      { value: GenderEnum.Male, label: 'Mężczyzna' },
      { value: GenderEnum.Female, label: 'Kobieta' }
    ];

    return (
      <Container>

        <fieldset className="form-group">
          <legend>Płeć</legend>
          {genderRadioButtons.map(radioButon => {
            const id = `radioGender${radioButon.value}`;
            return <div key={radioButon.value} className="form-check form-check-inline">
              <Form.Check
                      custom
                      inline
                      label="1"
                      type="radio"
                      value={radioButon.value}
                      id={id}
                      checked={this.state.gender === radioButon.value}
                      onChange={this.handleOnGenderChange}
                      name="peselGender"
                    />

                <label className="form-check-label" htmlFor={id}>
                  {radioButon.label}
                </label>
              </div>
          })}
        </fieldset>

        <Row>

          <fieldset className="form-group col-6">
            <legend>Wiek</legend>

            <div className="form-group btn-group">
              <div className="form-group btn-group">
                <select className="mdb-select md-form" name="peselAgeSign">
                  <option value="=">=</option>
                  <option value=">">&gt;</option>
                  <option value="<">&lt;</option>
                </select>

                <input type="number"
                  className="form-control"
                  name="peselAgeNumber" />
              </div>
            </div>
          </fieldset>

          <fieldset className="form-group col-6">
            <legend>Data urodzenia</legend>
          </fieldset>
        </Row>

        <fieldset className="form-group">
          <div className="input-group mb-3">
            <input type="text" className="form-control" name="date_filter" onChange={this.handleDateFilterChange} />
            <div className="input-group-append">
              <Button onClick={this.handleGenerateButtonClick}>Generate</Button>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <div className="form-group">
            <label htmlFor="comment">Wynik</label>
            <textarea className="form-control" rows={5} value={pesels} readOnly={true}></textarea>
          </div>
        </fieldset>
      </Container>
    );
  }
}

export default App;