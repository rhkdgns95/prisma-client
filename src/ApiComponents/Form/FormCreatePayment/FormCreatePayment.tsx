import React from 'react';
import { CheckBox, TextBox, Button, ValidationSummary } from 'devextreme-react';
import {
  Validator,
  RequiredRule,
  CompareRule,
  EmailRule,
  PatternRule,
  StringLengthRule,
  AsyncRule
} from 'devextreme-react/validator';

import notify from 'devextreme/ui/notify';

interface IProps {

}

interface IState {

}
class FormCreatePayment extends React.Component<IProps, IState> {
    maxDate: any;
    countries: any;
    cityPattern: any;
    namePattern: any;
    phonePattern: any;
    phoneRules: any;

  constructor(props: IProps) {
    super(props);
    const currentDate = new Date();
    this.maxDate = new Date(currentDate.setFullYear(currentDate.getFullYear() - 21));
    this.countries = [
        "korea",
        "england"
    ]
    this.cityPattern = '^[^0-9]+$';
    this.namePattern = /^[^0-9]+$/;
    this.phonePattern = /^\+\s*1\s*\(\s*[02-9]\d{2}\)\s*\d{3}\s*-\s*\d{4}$/;
    this.phoneRules = {
      X: /[02-9]/
    };
   
  }

  render() {
    return (
      <form action="your-action" onSubmit={this.onFormSubmit}>
        <div className="dx-fieldset">
            <div className="dx-fieldset-header">Personal Data</div>
            <div className="dx-field">
                <div className="dx-field-label">Name</div>
                <div className="dx-field-value">
                <TextBox>
                    <Validator>
                    <RequiredRule message="Name is required" />
                    <PatternRule message="Do not use digits in the Name" pattern={this.namePattern} />
                    <StringLengthRule message="Name must have at least 2 symbols" min={2} />
                    </Validator>
                </TextBox>
                </div>
            </div>
            <div className="dx-field">
            <div className="dx-field-label">Email</div>
            <div className="dx-field-value">
              <TextBox>
                <Validator>
                  <RequiredRule message="Email is required" />
                  <EmailRule message="Email is invalid" />
                  <AsyncRule
                    message="Email is already registered"
                    validationCallback={asyncValidation} />
                </Validator>
              </TextBox>
            </div>
        </div>
        </div>
     
        <div className="dx-fieldset">
            <div>
                <CheckBox
                id="check"
                defaultValue={false}
                text="I agree to the Terms and Conditions">
                <Validator>
                    <CompareRule message="You must agree to the Terms and Conditions" comparisonTarget={this.checkComparison} />
                </Validator>
                </CheckBox>
            </div>
        </div>

        <div className="dx-fieldset">
          <ValidationSummary id="summary"></ValidationSummary>
          <Button
            id="button"
            text="Register"
            type="success"
            useSubmitBehavior={true} />
        </div>
      </form>
    );
  }

  checkComparison() {
    return true;
  }

  onFormSubmit(e: any) {
    notify({
      message: 'You have submitted the form',
      position: {
        my: 'center top',
        at: 'center top'
      }
    }, 'success', 3000);

    e.preventDefault();
  }
}

function sendRequest(value: any) {
  const validEmail = 'test@test.com';
  const valid = new Promise((resolve) => {
    setTimeout(function() {
      resolve(value === validEmail);
    }, 1000);
  });
  console.log("VALID: ", valid);
  return valid;
}

function asyncValidation(params: any) {
  return sendRequest(params.value);
}

export default FormCreatePayment;