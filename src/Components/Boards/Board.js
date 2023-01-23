import React from 'react';
import { Grid, Typography } from '@mui/material';
import Cards from '../Cards/Cards';

const Board = (props) => {

  return (
    <React.Fragment>
      <Typography align='center' variant='body1' style={
        { borderTop: `4px solid ${props.color}`, borderRadius: "6px" }
      }>
        {props.heading}
      </Typography>
      <Grid
        container
        spacing={2}
        direction="column"
        className='board_cards'
      >
        {props?.card && props?.card.map((item, index) =>
          <Grid item style={{ paddingLeft: 0 }} key={index}>
            <Cards
              data={item}
              bTitle={props.heading}
              deleteCard={props.handleDelete}
              handleDragEnd={props.handleDragEnd}
              handleDragEnter={props.handleDragEnter}
              handleEdit={props.handleEdit}
            />
          </Grid>
        )}
      </Grid>
    </React.Fragment>
  )
}

export default Board