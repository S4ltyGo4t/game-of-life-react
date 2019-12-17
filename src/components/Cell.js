import React from "react";
import "./Cell.css"

export const CELL_SIZE = 20;
export const WIDTH = 800;
export const HEIGHT = 600;

export class Cell extends React.Component {
  render() {
    const {x, y} = this.props;
    return (
        <div className="Cell" style={{
          left: `${CELL_SIZE * x + 1}px`,
          top: `${CELL_SIZE * y + 1}px`,
          width: `${CELL_SIZE - 1}px`,
          height: `${CELL_SIZE - 1}px`,
        }}/>);
  }
}