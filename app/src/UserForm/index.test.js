import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import sinon from 'sinon';
import UserForm from './index'

describe('UserForm', () => {
  const {getByText, getByPlaceholderText} = render(<UserForm  patientId={''} theme={'default'} />)

  test('should render theme selection field', () => {
    const themeField = getByText('default');
    expect(themeField).toBeInTheDocument();
  })

  test('should render patient id field', () => {
    const {getByText, getByPlaceholderText} = render(<UserForm  patientId={''} theme={'default'} />)
    const patietIDInput = getByPlaceholderText(/Patient ID \(0000000\)/);
    expect(patietIDInput).toBeInTheDocument();
  })

  describe('interacting with form', () => {
    let selectThemeSpy, setPatientIdSpy, onSubmissionSpy;
    beforeEach(() => {
      selectThemeSpy = sinon.spy();
      setPatientIdSpy = sinon.spy();
      onSubmissionSpy = sinon.spy();

    });

    test('handling patient id', () => {
      const {getByPlaceholderText} =  render(<UserForm  patientId={''} setPatientId={setPatientIdSpy} theme={'default'} />)
      const pID = getByPlaceholderText(/Patient ID \(0000000\)/);

      fireEvent.change(pID, {target: {value: '123'}});
      expect(setPatientIdSpy.called).toBe(true);
    });

    test('makes call to generate_pdf/', () => {
      const { getByText } = render(<UserForm
                      selectTheme={selectThemeSpy} setPatientId={setPatientIdSpy} onSubmission={onSubmissionSpy}
                      patientId={''} theme={'default'} />);
      const previewButton = getByText('Preview');
      fireEvent.submit(previewButton);;
      expect(onSubmissionSpy.called).toBe(true);

    })
  });

});
