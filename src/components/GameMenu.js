import React from "react";
import "./Game.css";
import Select from "@material-ui/core/Select";
import {HEIGHT, WIDTH, CELL_SIZE, Cell} from "./Cell";
import {makeStyles} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

class GameMenu extends React.Component {
  render() {
    return (
        <div id={"gameMenu"}>

          <FormControl>
            <InputLabel>Width</InputLabel>
            <Select>
              <MenuItem value=""><em>None</em></MenuItem>
              <MenuItem value={300}>300</MenuItem>
              <MenuItem value={500}>500</MenuItem>
            </Select>

          </FormControl>
        </div>
    );
  }
}

export default GameMenu;
