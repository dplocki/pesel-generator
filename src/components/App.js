import React, { Component } from 'react';
import moment from 'moment';
import { generatePESEL } from '../logic/generate';
import {
  Container,
  Form
} from 'react-bootstrap';
import GeneratorOptions from './GeneratorOptions';
import GeneratorOptionsDescription from './GeneratorOptionsDescription';
import { generateDate } from '../logic/generateDate';
import { parseInput } from '../logic/parseInput';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      howMany: 5,
      generatorOptions: null,
      pesels: []
    };

    this.handleGeneratorOption = this.handleGeneratorOption.bind(this);
  }

  handleGeneratorOption(value) {
    this.setState(state => ({
      ...state,
      generatorOptions: value,
      pesels: value !== null
        ? Array.from(Array(state.howMany))
          .map(_ => {
            const actualDate = moment();
            const [startDate, endDate] = parseInput(value.dateOrAge, actualDate);
            const date = generateDate(
              value.dateOrAgeSign,
              startDate,
              endDate,
              actualDate
            );

            return {
              date: date.format('YYYY-MM-DD'),
              pesel: generatePESEL(date, value.gender)
            };
          })
        : []
    }));
  }

  render() {
    const pesels = this.state.pesels
      ? this.state.pesels.reduce((result, next) => `${result}${next.date}: ${next.pesel}\n`, '')
      : '';

    return (
      <Container>
        <Form.Group>
          <Form.Label>Generuj PESEL-e:</Form.Label>
          <GeneratorOptions onChange={this.handleGeneratorOption} />
          <GeneratorOptionsDescription value={this.state.generatorOptions} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Wyniki</Form.Label>
          <Form.Control as="textarea" rows={5} value={pesels} readOnly={true} />
        </Form.Group>
      </Container>
    );
  }
}

export default App;
