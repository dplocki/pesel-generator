import React, { Component } from 'react';
import { generatePESEL } from '../logic/generate';
import { filterMerge } from '../logic/filterMerge';
import { GenderEnum } from '../logic/genderEnum';
import {
  Container,
  Form
} from 'react-bootstrap';
import GeneratorOptions from './GeneratorOptions';
import GeneratorOptionsDescription from './GeneratorOptionsDescription';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      howMany: 5,
      date_filter: '',
      gender: GenderEnum.Any
    };

    this.handleGenerateButtonClick = this.handleGenerateButtonClick.bind(this);
    this.handleGeneratorOption = this.handleGeneratorOption.bind(this);
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

  handleGeneratorOption(value) {
    this.setState(state => ({
      ...state,
      generatorOptions: value
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
