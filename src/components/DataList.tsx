import React from "react";
import DataItem from "./DataItem";
import { Gallery } from "@patternfly/react-core";

// Define the type for a data item
type DataItemType = {
  id: number;
  name: string;
  description: string;
};

// Define the props type for DataList
type DataListProps = {
  data: DataItemType[];
  updateDataItem: (item: DataItemType) => void;
  deleteDataItem: (id: number) => void;
};

const DataList: React.FC<DataListProps> = ({
  data,
  updateDataItem,
  deleteDataItem,
}) => {
  console.log("DataList rendered with data:", data);
  return (
    <Gallery hasGutter>
      {data.map((item: DataItemType) => (
        <DataItem
          key={item.id}
          id={item.id}
          title={item.name}
          description={item.description}
          onEdit={() => updateDataItem(item)}
          onDelete={() => deleteDataItem(item.id)}
        />
      ))}
    </Gallery>
  );
};

export default DataList;
