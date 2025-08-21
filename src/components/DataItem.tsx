import React from "react";
import { Card, CardHeader, CardBody, Button } from "@patternfly/react-core";

interface DataItemProps {
  id: number;
  title: string;
  description: string;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const DataItem: React.FC<DataItemProps> = ({
  id,
  title,
  description,
  onEdit,
  onDelete,
}) => {
  return (
    <Card style={{ marginBottom: "1rem" }}>
      <CardHeader>
        <strong>{title}</strong>
      </CardHeader>
      <CardBody>
        <p>{description}</p>
      </CardBody>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "0.5rem",
          padding: "0.5rem",
        }}
      >
        <Button variant="secondary" onClick={() => onEdit(id)}>
          Edit
        </Button>
        <Button variant="danger" onClick={() => onDelete(id)}>
          Delete
        </Button>
      </div>
    </Card>
  );
};

export default DataItem;
