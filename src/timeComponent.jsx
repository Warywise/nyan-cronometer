import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TimeComponent extends Component {
  render() {
    const { change, unit, curTime, ifStart, increase, decrease, clearEv } = this.props;
    return (
      <div>
        <button name={ unit } onMouseDown={ increase } onMouseUp={ clearEv }> ▲ </button>
        <div>
          <input
            type="text"
            name={ unit }
            value={ curTime < 10 ? '0' + curTime : curTime }
            className="time-unit"
            onChange={ change }
            disabled={ ifStart }
          />
        </div>
        <button name={ unit } onMouseDown={ decrease } onMouseUp={ clearEv }> ▼ </button>
      </div>
    );
  }
}

TimeComponent.propTypes = {
  change: PropTypes.func.isRequired,
  unit: PropTypes.string.isRequired,
  curTime: PropTypes.number.isRequired,
  ifStart: PropTypes.bool.isRequired,
  increase: PropTypes.func.isRequired,
  decrease: PropTypes.func.isRequired,
  clearEv: PropTypes.func.isRequired,
}

export default TimeComponent;
