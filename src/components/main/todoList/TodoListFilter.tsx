import React, { useState } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { MenuItem } from "@mui/material";
import { useDispatch } from "react-redux";
import { taskActions } from "../../../store/slices/taskSlice";

const filters = ["all", "active", "done"];

const TodoListFilter = () => {
  const dispatch = useDispatch();
  const [filterType, setFilterType] = useState("all");

  const handleChange = (event: SelectChangeEvent<string>) => {
    setFilterType(event.target.value);
    dispatch(taskActions.setFilter(event.target.value));
  };

  return (
    <Select
      sx={{ width: 100, marginRight: 5 }}
      value={filterType}
      onChange={handleChange}
      renderValue={() => filterType}
      inputProps={{ "aria-label": "Without label" }}
    >
      {filters.map((filter) => (
        <MenuItem key={filter} value={filter}>
          {filter}
        </MenuItem>
      ))}
    </Select>
  );
};

export default TodoListFilter;
