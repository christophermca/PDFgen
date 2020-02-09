import React from 'react';
import { render, screen} from '@testing-library/react';
import Output from './index'

const setup = (props) => {
  return render(<Output data={props} />)
  }
describe('Output', () => {
  test('should render with default message', () => {
    const {getByText} = setup()
    const output = getByText('Click \"Preview\" to generate a preview of PDF')
    expect(output).toBeDefined();
  })
  test('should render with default message', () => {
    const {getByText} = setup();
    let output, output2;
    try {
      output = getByText('Click \"Preview\" to generate a preview of PDF');
    } catch(err) {
      output2 = getByText('123');
    }

    expect(output).toBeDefined();
    expect(output2).not.toBeDefined();
  })

  test('should render with error message', () => {
    const {getByText} = setup({error: '123'});
    let output, output2;
    try {
      output = getByText('Click \"Preview\" to generate a preview of PDF');
    } catch(err) {
      output2 = getByText('123');
    }

    expect(output).not.toBeDefined();
    expect(output2).toBeDefined();
  })
  test('should render with PDF content', () => {
    const {getByText, getByAltText} = setup({preview: 'preview'});
    let output, output2, output3;
    try {
      output = getByText('Click \"Preview\" to generate a preview of PDF');
      output2 = getByText('123');
    }

    catch(err) {
      output3 = getByAltText('preview of generated report')
    }

    expect(output).not.toBeDefined();
    expect(output2).not.toBeDefined();
    expect(output3).toBeDefined();
  })
});

