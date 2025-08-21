import React, { useState } from "react";
import type { FormEvent } from "react";
import { Form, FormGroup, TextInput, Button } from "@patternfly/react-core";

type DataFormProps = {
  onAdd: (item: { name: string; description: string }) => void;
};

const DataForm: React.FC<DataFormProps> = ({ onAdd }) => {
  const [formData, setFormData] = useState({ name: "", description: "" });

  const handleChange = (event: FormEvent<HTMLInputElement>, value: string) => {
    const { name } = event.currentTarget;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.name && formData.description) {
      onAdd(formData);
      setFormData({ name: "", description: "" });
    }
  };

  return (
    <Form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <FormGroup label="Name" isRequired fieldId="name">
        <TextInput
          isRequired
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
        />
      </FormGroup>
      <FormGroup label="Description" isRequired fieldId="description">
        <TextInput
          isRequired
          type="text"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
        />
      </FormGroup>
      <Button variant="primary" type="submit">
        Add Item
      </Button>
    </Form>
  );
};

export default DataForm;
