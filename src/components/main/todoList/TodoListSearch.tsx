import React, { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { taskActions } from "../../../store/slices/taskSlice";
import CustomInput from "../../common/CustomInput";

const TodoListSearch = () => {
  const dispatch = useDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(taskActions.setSearchTerm(e.target.value));
  };

  return (
    <CustomInput
      id="standard-basic"
      placeholder="Search"
      sx={{ marginRight: 10 }}
      onChange={handleChange}
    />
  );
};

export default TodoListSearch;
