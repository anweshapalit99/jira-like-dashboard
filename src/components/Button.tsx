import React from "react";
import { Button } from "@patternfly/react-core";

interface ButtonProps {
  text: string;
  onClick: () => void;
  variant?: "primary" | "secondary" | "tertiary" | "danger";
}

const CustomButton: React.FC<ButtonProps> = ({
  text,
  onClick,
  variant = "primary",
}) => {
  return (
    <Button data-testid="button" onClick={onClick} variant={variant}>
      {text}
    </Button>
  );
};

export default CustomButton;
