import React, { Component } from 'react';
import { generatePESEL } from '../logic/generatePESEL';
import {
  Container,
  Form
} from 'react-bootstrap';
import GeneratorOptions from './GeneratorOptions';
import GeneratorOptionsDescription from './GeneratorOptionsDescription';
import { generateDate, maximumPESELDate as maximumPESELDate, minimalPESELDate } from '../logic/generateDate';
import { parseInput } from '../logic/parseInput';
import { areOptionsValid, isLogicCorrect } from '../logic/validation';
import { GenderEnum } from '../logic/genderEnum';
import { SignEnum } from '../logic/signEnum';
import { format } from 'date-fns';

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
    const actualDate = new Date();
    const [startDate, endDate] = (value.sign === SignEnum.Equal && value.dateOrAge.length === 0)
      ? [minimalPESELDate, maximumPESELDate]
      : parseInput(value.dateOrAge, actualDate);

    return _ => {
      const date = generateDate(
        value.sign,
        startDate,
        endDate
      );

      return {
        date: format(date, 'yyyy/MM/dd'),
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
    this.setState(state => ({
      ...state,
      generatorOptions: value,
      pesels: areOptionsValid(value) && isLogicCorrect(value)
        ? this.generatePESELs(value, state.howMany)
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
