import React from 'react';
import {
  Button,
  Box,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material';
import { useFormik } from "formik";

const Task = (props) => {
  const emojis = ['😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', '🫠', '😉', '😊', '😇', '🥰', '😍', '🤩', '😘', '😗', '☺', '😚', '😙', '🥲', '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🫢', '🫣', '🤫', '🤔', '🫡', '🤐', '🤨', '😐', '😑'];

  const formik = useFormik({
    initialValues: props?.data,
    onSubmit: (values) => { onFormSubmit && onFormSubmit(values); },
    enableReinitialize: true,
  });

  //  submit Handling event in form
  const onFormSubmit = (values) => {
    const randomNumber = Math.floor(Math.random() * emojis.length);
    if (!props.edit) values.card.emoji = emojis[randomNumber];
    let items = JSON.parse(localStorage.getItem("board")) || [];
    let newArray = [];
    if (items.length) {
      let tempArray = [...items];
      if (props?.edit) {
        const editIndex = items.findIndex((el) => el.title === props?.data?.title);
        if (editIndex < 0) return;
        const editCrd = items[editIndex].card.findIndex((el) => el.title === values?.card?.title);
        items[editIndex].card.splice(editCrd, 1);
      }
      const index = items.findIndex((el) => el.title === values?.title);
      if (index < 0) return;
      tempArray[index].card.push(values.card);
      newArray = tempArray;
    } else {
      console.log("No Board Found!")
    }
    localStorage.setItem('board', JSON.stringify(newArray));
    handleReset();
    props.handleClose();
  }

  const { values, handleChange, handleSubmit, handleReset } = formik;

  return (
    <React.Fragment>
      <Grid container spacing={2} direction="column">
        <Grid item>
          <TextField
            name='card.title'
            fullWidth
            label="Title"
            required
            type="text"
            variant='standard'
            value={values.card.title || ""}
            onChange={handleChange}
            helperText="Please add title"
          />
        </Grid>
        <Grid item>
          <TextField
            name='card.description'
            type="text"
            fullWidth
            required
            multiline
            onChange={handleChange}
            rows={4}
            rowsMax={4}
            value={values.card.description || ""}
            variant='standard'
            helperText="Please add description"
            label="Description"
          />
          <Box sx={{ minWidth: 120 }} direction="column" style={{ marginTop: 10 }}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <InputLabel>Priority</InputLabel>
                <Select
                  name='card.priority'
                  fullWidth
                  required
                  onChange={handleChange}
                  variant='standard'
                  value={values.card.priority || ""}
                  label="Priority"
                >
                  <MenuItem value="Low Priority">Low Priority</MenuItem>
                  <MenuItem value="Medium Priority">Midium Priority</MenuItem>
                  <MenuItem value="High Priority">High Priority</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={4}>
                <InputLabel>Status</InputLabel>
                <Select
                  name='title'
                  fullWidth
                  required
                  onChange={handleChange}
                  value={values.title || ""}
                  variant='standard'
                  label="Status"
                >
                  <MenuItem value="BACKLOG">BACKLOG</MenuItem>
                  <MenuItem value="TODO">TODO</MenuItem>
                  <MenuItem value="IN PROGRESS">INPROGRESS</MenuItem>
                  <MenuItem value="COMPLETE">COMPLETE</MenuItem>
                </Select>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item sx={2} display="flex" flexDirection="row" justifyContent="flex-end">
          <Button variant="outlined" onClick={props?.handleClose}>Close</Button>
          <Button
            variant="contained"
            autoFocus
            style={{ marginLeft: 20 }}
            onClick={handleSubmit}
          >
            {props.edit ? "Update" : "Create"}
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default Task