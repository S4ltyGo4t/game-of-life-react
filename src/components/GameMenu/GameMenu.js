import React from 'react';
import List from '@material-ui/core/List';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';

export let chosenWidth;
export let chosenHeight;

const styles = theme => ({
  textField: {
    color: 'white'
  }
});

class GameMenu extends React.Component {
  state = {
    button: {color: '', text: ''}
  };

  changeButton() {
    // TODO toggle Button state and change button text and color
    // TODO bind it to game logic while(running) f.e.
    console.log('Button clicked!')
  }

  render() {
    const {classes} = this.props;
    return (
        <div id={'gameMenu'}>
          <List>
            <TextField
                fullWidth
                label={'Width'}
                value={chosenWidth}
                variant={'filled'}
                InputLabelProps={{className: classes.textField}}
            />
            <TextField
                fullWidth
                label={'Height'}
                value={chosenHeight}
                variant={'filled'}
                InputLabelProps={{className: classes.textField}}
            />
            <Button
                variant={'contained'}
                style={{background: 'green', fontSize: 'large'}}
                fullWidth
                onClick={this.changeButton}
            >
              Start
            </Button>
          </List>
        </div>
    );
  }
}

export default withStyles(styles)(GameMenu);
