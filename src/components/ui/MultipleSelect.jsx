import { useState } from "react";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const MultipleSelect = ({
  items,
  placeholder = "Select",
  defaultValues,
  name,
}) => {
  const [selectedMuscles, setSelectedMuscles] = useState(
    defaultValues ? defaultValues.split(",") : []
  );

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedMuscles(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <>
      <Select
        displayEmpty
        multiple
        value={selectedMuscles}
        onChange={handleChange}
        input={<OutlinedInput />}
        name={name}
        id={name}
        renderValue={(selected) => {
          if (selected.length === 0) return <em>{placeholder}</em>;

          return (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((name) => (
                <Chip key={name} label={name} />
              ))}
            </Box>
          );
        }}
        size="small"
      >
        <MenuItem disabled value="">
          <em>{placeholder}</em>
        </MenuItem>
        {items.map(({ name }) => (
          <MenuItem key={name} value={name}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

export default MultipleSelect;
