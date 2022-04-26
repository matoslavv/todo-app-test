import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { TextField, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import styled from "@emotion/styled";
import Modal from "@mui/material/Modal";
import { useNavigate, useParams } from "react-router-dom";
import { Box } from "@mui/system";
import {
  createTask,
  getTask,
  taskActions,
  updateTask,
} from "../../store/slices/taskSlice";
import { useAppDispatch, IRootStore } from "../../store/store";
import { TaskFormValues, ITaskForm } from "../../types/ITask";
import CustomButton from "../common/CustomButton";
import CustomButtonGroup from "../common/CustomButtonGroup";
import Loading from "../Loading";

const validationSchema = yup.object({
  title: yup.string().required("Task title is required"),
  description: yup
    .string()
    .min(10, "Task description must have atleast 10 characters")
    .required("Task description is required"),
  deadlineDate: yup.string().required("Task deadline is required"),
});

const StyledBoxForm = styled(Box)({
  background: "#F2F3F8",
  width: "700px",
  margin: "70px auto",
  padding: "20px 30px ",
});

const TaskForm = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const { listId, taskId } = useParams();
  const submitting = useSelector((state: IRootStore) => state.task.submitting);
  const loading = useSelector((state: IRootStore) => state.task.loading);
  const selectedTask = useSelector(
    (state: IRootStore) => state.task.selectedTask
  );
  const [initialValues, setInitialValues] = useState(
    new TaskFormValues(selectedTask!)
  );

  const handleSubmit = (values: any) => {
    if (listId) {
      if (taskId) {
        const updatedTask: ITaskForm = {
          ...values,
        };

        dispatch(updateTask({ listId, taskId, updatedTask }));
      } else {
        const newTask: ITaskForm = {
          title: values.title,
          description: values.description,
          deadlineDate: values.deadlineDate,
        };

        dispatch(createTask({ listId, newTask }));
      }

      handleClose();
    }
  };

  useEffect(() => {
    if (taskId && listId) {
      dispatch(getTask({ listId, taskId }));
      setInitialValues(new TaskFormValues(selectedTask!));
    }

    return () => {
      dispatch(taskActions.setSelectedTask(null));
    };
  }, [dispatch, listId, taskId]);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  const handleClose = () => {
    setOpen(false);
    navigate(`/list/${listId}`);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <StyledBoxForm>
        <Typography
          variant="h4"
          component="h3"
          fontWeight={700}
          textAlign="center"
        >
          {taskId ? "Edit task" : "Create task"}
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="title"
            name="title"
            label="Title"
            variant="outlined"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
            margin="normal"
          />
          <TextField
            fullWidth
            id="description"
            name="description"
            label="Description"
            variant="outlined"
            multiline
            rows={3}
            value={formik.values.description}
            onChange={formik.handleChange}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
          />
          <TextField
            fullWidth
            id="deadlineDate"
            name="deadlineDate"
            type="datetime-local"
            label="Deadline date"
            variant="outlined"
            value={formik.values.deadlineDate}
            onChange={formik.handleChange}
            error={
              formik.touched.deadlineDate && Boolean(formik.errors.deadlineDate)
            }
            helperText={
              formik.touched.deadlineDate && formik.errors.deadlineDate
            }
            margin="normal"
          />
          <CustomButtonGroup
            sx={{ marginTop: 3, textAlign: "right", justifyContent: "end" }}
          >
            <CustomButton
              color="primary"
              variant="contained"
              type="submit"
              disabled={submitting || !formik.isValid || formik.isSubmitting}
            >
              Submit
            </CustomButton>
            <CustomButton
              variant="outlined"
              color="secondary"
              onClick={handleClose}
            >
              Cancel
            </CustomButton>
          </CustomButtonGroup>
        </form>
      </StyledBoxForm>
    </Modal>
  );
};

export default TaskForm;
