import * as React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Typography
} from '@mui/material';
import './App.css';
import Board from './Components/Boards/Board';
import Task from "./Components/TaskForm/Task";
const Headers = require("./headers.json");


function App() {
  const [open, setOpen] = React.useState(false);
  const [board, setBoard] = React.useState(Headers);
  const [target, setTarget] = React.useState({ cTitle: "", bTitle: "" })
  const [isEdit, setIsEdit] = React.useState(false);
  const [editObj, setEditObj] = React.useState({});

  const data = {
    title: "",
    color: "",
    card: {
      title: "",
      description: "",
      priority: "",
      emoji: ""
    }
  }
  const handleClose = () => {
    setOpen(false);
  };

  //On load stores the  constant data in localStorage
  React.useEffect(() => {
    const boardData = JSON.parse(localStorage.getItem("board"));
    if (boardData) {
      setBoard(boardData);
    } else {
      localStorage.setItem('board', JSON.stringify(Headers));
      setBoard(Headers);
    }
  }, [open]);

  //Delete the card from localStorage
  const handleDelete = (cTitle, bTitle) => {
    const boardData = JSON.parse(localStorage.getItem("board"));
    const index = boardData.findIndex((el) => el.title === bTitle);
    if (index < 0) return;
    const cIndex = boardData[index].card.findIndex((el) => el.title === cTitle);
    if (cIndex < 0) return;
    const tempBoards = [...boardData];
    tempBoards[index].card.splice(cIndex, 1);
    localStorage.setItem('board', JSON.stringify(tempBoards));
    setBoard(tempBoards)
  }

  const handleDragEnter = (cTitle, bTitle) => {
    setTarget({ cTitle, bTitle });
  };

  // Remove card from existing board and append it to target board
  const handleDragEnd = (cTitle, bTitle) => {
    let s_bIndex, s_cIndex, t_bIndex, t_cIndex;
    s_bIndex = board.findIndex((el) => el.title === bTitle);
    if (s_bIndex < 0) return;

    s_cIndex = board[s_bIndex].card.findIndex((el) => el.title === cTitle);
    if (s_cIndex < 0) return;

    t_bIndex = board.findIndex((el) => el.title === target.bTitle);
    if (t_bIndex < 0) return;

    t_cIndex = board[t_bIndex].card.findIndex((el) => el.title === target.cTitle);
    if (t_cIndex < 0) return;

    const tempBoards = [...board];
    const tempCard = tempBoards[s_bIndex].card[s_cIndex];

    tempBoards[s_bIndex].card.splice(s_cIndex, 1);
    tempBoards[t_bIndex].card.splice(t_cIndex, 0, tempCard);
    localStorage.setItem('board', JSON.stringify(tempBoards));
    setBoard(tempBoards);
  };

  // Edit the card
  const handleEdit = (data, bTitle) => {
    setOpen(true);
    const boardData = JSON.parse(localStorage.getItem("board"));
    const index = boardData.findIndex((el) => el.title === bTitle);
    if (index < 0) return;
    const color = boardData[index].color;
    const obj = {
      title: bTitle,
      color: color,
      card: {
        title: data?.title,
        description: data?.description,
        priority: data?.priority
      }
    }
    setIsEdit(true);
    setEditObj(obj);
  }
  console.log("Board", board);
  return (
    <div className='app'>
      <div className='app_navbar'>
        <Typography variant='h2' className="app_navbar_top">
          Kanban Board
        </Typography>
      </div>
      <Box style={{ padding: "10px 10px" }}>
        <Box display="flex" flexDirection="row" justifyContent="flex-end">
          <Button
            variant='contained'
            color='primary'
            onClick={() => { setOpen(true); setIsEdit(false); }}
          >
            ADD TASK
          </Button>
        </Box>
      </Box>
      <Grid container spacing={3} style={{ padding: "10px 10px" }}>
        {board?.map((item, index) =>
          <Grid item key={index} xs={3}>
            <Board
              heading={item.title}
              color={item.color}
              card={item.card}
              handleDelete={handleDelete}
              handleDragEnter={handleDragEnter}
              handleDragEnd={handleDragEnd}
              handleEdit={handleEdit}
            />
          </Grid>
        )}
      </Grid>
      <Dialog
        fullWidth
        maxWidth={"sm"}
        open={open}
        disableEnforceFocus
        aria-labelledby="task-create-dialog"
      >
        <DialogTitle>Task</DialogTitle>
        <DialogContent>
          <Task
            data={isEdit ? editObj : data}
            edit={isEdit}
            handleClose={handleClose}
          />
        </DialogContent>
      </Dialog>
    </div >
  );
}

export default App;
