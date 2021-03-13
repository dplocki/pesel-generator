import React, { Component } from 'react';
import moment from 'moment';
import { generatePESEL } from '../logic/generatePESEL';
import {
  Container,
  Form
} from 'react-bootstrap';
import GeneratorOptions from './GeneratorOptions';
import GeneratorOptionsDescription from './GeneratorOptionsDescription';
import { generateDate, maxiumPESELDate, minimalPESELDate } from '../logic/generateDate';
import { parseInput } from '../logic/parseInput';
import { areOptionsValid, isLogicCorrect } from '../logic/validation';
import { GenderEnum } from '../logic/genderEnum';
import { SignEnum } from '../logic/signEnum';

const PESELS_NUMBER = 5;

class App extends Component {
  constructor(props) {
    super(props);

    const startingOptions = {
      dateOrAge: '',
      gender: GenderEnum.Any,
      sign: SignEnum.Equal
    };

    this.state = {
      howMany: PESELS_NUMBER,
      generatorOptions: startingOptions,
      pesels: this.generatePESELs(startingOptions, PESELS_NUMBER)
    };

    this.handleGeneratorOption = this.handleGeneratorOption.bind(this);
  }

  buildMapFunction(value) {
    const actualDate = moment.utc();
    const [startDate, endDate] = (value.sign === SignEnum.Equal && value.dateOrAge.length === 0)
      ? [minimalPESELDate, maxiumPESELDate]
      : parseInput(value.dateOrAge, actualDate);

    return _ => {
      const date = generateDate(
        value.sign,
        startDate,
        endDate
      );

      return {
        date: date.format('YYYY/MM/DD'),
        pesel: generatePESEL(date, value.gender)
      };
    }
  }

  generatePESELs(value, howMany) {
    return value !== null
      ? Array.from(Array(howMany))
        .map(this.buildMapFunction(value))
      : [];
  }

  handleGeneratorOption(value) {
    if (!areOptionsValid(value) || !isLogicCorrect(value)) {
      this.setState(_ => ({
        generatorOptions: null,
        pesels: []
      }));

      return;
    }

    this.setState(state => ({
      ...state,
      generatorOptions: value,
      pesels: this.generatePESELs(value, state.howMany)
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
