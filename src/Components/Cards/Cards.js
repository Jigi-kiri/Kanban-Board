import React from 'react';
import {
  ButtonGroup, Card, CardHeader, Chip, IconButton, Paper
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Delete, ModeEdit } from '@mui/icons-material';

const theme = createTheme({
  palette: {
    secondary: {
      main: '#eeea68',
      darker: '#053e85',
    },
  },
});

const Cards = (props) => {
  console.log("props", props);
  const isLow = props?.data?.priority.includes("Low");
  const isMedium = props?.data?.priority.includes("Medium");

  return (
    <React.Fragment >
      <Card
        draggable
        onDragEnter={() => props?.handleDragEnter(props.data?.title, props?.bTitle)}
        onDragEnd={() => props?.handleDragEnd(props.data?.title, props?.bTitle)}
      >
        <CardHeader
          title={props.data?.title}
          subheader={props?.data?.description}
          avatar={props?.data?.emoji}
          action={
            <ButtonGroup >
              <IconButton onClick={() => props.handleEdit(props?.data, props?.bTitle)} >
                <ModeEdit fontSize='small' />
              </IconButton>
              <IconButton onClick={() => props.deleteCard(props.data?.title, props?.bTitle)}>
                <Delete fontSize='small' />
              </IconButton>
            </ButtonGroup>
          }
        />
        <ThemeProvider theme={theme}>
          <Paper sx={{ display: 'flex', justifyContent: "flex-end" }}>
            <Chip
              style={{ margin: 8 }}
              label={props?.data?.priority}
              color={isLow ? "secondary" : isMedium ? "success" : "error"}
              size='small'
            />
          </Paper>
        </ThemeProvider>
      </Card>
    </React.Fragment >
  )
}

export default Cards