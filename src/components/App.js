import React, { Component } from 'react';
import { generatePESEL } from '../logic/generate';
import { filterMerge } from '../logic/filterMerge';
import { GenderEnum } from '../logic/genderEnum';
import {
  Container,
  Form
} from 'react-bootstrap';
import GeneratorOptions from './GeneratorOptions';


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

    const description = 'Dowolny PESEL';

    return (
      <Container>
        <Form.Group>
          <Form.Label>Generuj PESEL-e:</Form.Label>
          <GeneratorOptions></GeneratorOptions>
          <Form.Text className="text-muted">
            {description}
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Wyniki</Form.Label>
          <Form.Control as="textarea" rows={5} value={pesels} readOnly={true} />
        </Form.Group>
      </Container>
    );
  }
}

export default App;
