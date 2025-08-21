import React from "react";
import { Form, FormGroup, TextInput, Button } from "@patternfly/react-core";

const LoginForm: React.FC = () => {
  return (
    <Form data-testid="login-form" className="pf-u-w-100 pf-u-mx-auto pf-u-p-4">
      <FormGroup label="Email" fieldId="email">
        <TextInput
          id="email"
          name="email"
          type="email"
          data-testid="email-input"
        />
      </FormGroup>
      <FormGroup label="Password" fieldId="password">
        <TextInput
          id="password"
          name="password"
          type="password"
          data-testid="password-input"
        />
      </FormGroup>
      <Button data-testid="login-button" variant="primary" type="submit">
        Login
      </Button>
    </Form>
  );
};

export default LoginForm;
