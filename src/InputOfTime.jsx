import React, { Component } from "react";
import PropTypes from 'prop-types';

class InputOfTime extends Component {

  enterValue(event) {
    if (event.keyCode === 13) {
      document.querySelector('.input-time-btn').click();
    }
  }

  render() {
    const { onEntryValue } = this.props;
    return (
      <div>
        <label htmlFor="input-time">
          <input
            type="text"
            id="input-time"
            className="input-time entry-time"
            onKeyDown={ this.enterValue }
          />
        </label>
        <button onClick={ onEntryValue } className="input-time-btn entry-time" >Confirmar</button>
      </div>
    );
  }
}

InputOfTime.propTypes = { onEntryValue: PropTypes.func.isRequired }

export default InputOfTime;