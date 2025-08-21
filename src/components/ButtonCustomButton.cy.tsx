import React from "react";
import CustomButton from "./Button";

describe("<CustomButton />", () => {
  it("renders", () => {
    cy.mount(<CustomButton text="Click me" onClick={() => {}} />);
  });
});
