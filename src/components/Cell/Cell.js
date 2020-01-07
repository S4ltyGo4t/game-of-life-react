import React from 'react';
import {CELL_SIZE} from '../Game';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = () => ({
  cell: {
    background: '#61dafb',
    position: 'absolute'
  }
});

class Cell extends React.Component {
  render() {
    const {x, y, classes} = this.props;
    return (
        <div className={classes.cell} style={{
          left: `${CELL_SIZE * x + 1}px`,
          top: `${CELL_SIZE * y + 1}px`,
          width: `${CELL_SIZE - 1}px`,
          height: `${CELL_SIZE - 1}px`,
        }}
        />
    );
  }
}

export default withStyles(styles)(Cell);