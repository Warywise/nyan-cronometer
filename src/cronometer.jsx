import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DisplayHourCheck from './DisplayHour';
import TimeComponent from './timeComponent';
import TimeIsEnd from './timeIsEnd';
import BtnComponent from './buttonComponent';
import Infos from './infos';

class Cronometer extends Component {
  constructor() {
    super();
    this.state = {
      end: false,
      start: false,
      viewHour: false,
      hour: 0,
      minutes: 0,
      seconds: 0,
    }
  }

  displayHour = ({ target: { name, checked } }) => {
    const { start } = this.state;
    if (!start) {
      this.setState({
      [name]: checked,
      hour: 0,
      });
    }
  };

  stopEvents = () => {
    if (this.mouseTimeoutId) clearTimeout(this.mouseTimeoutId);
    if (this.mouseIntervalId) clearInterval(this.mouseIntervalId);
  }

  getTotalTime() {
    const { hour, minutes, seconds } = this.state;
    return (
      (hour * 3600) + (minutes * 60) + seconds
    );
  }

  countDown = () => {
    const { hour, minutes, seconds } = this.state;
    if (hour || minutes || seconds > 0) {
      this.setState({ start: true });
  
      document.querySelector('div.nyan-cat')
        .style = `transition: ${this.getTotalTime()}s linear; margin-left: 0`;

      clearInterval(this.counterId);

      this.counterId = setInterval(() => {

        this.setState(({ hour, minutes, seconds }) => (
          seconds > 0 ? { seconds: seconds - 1 }
            : (minutes > 0 ? { minutes: minutes - 1, seconds: 59 }
              : (hour > 0 ? { hour: hour - 1, minutes: 59, seconds: 59 }
                : { start: false }))
        ));
      }, 1000);

      const totalTime = this.getTotalTime();
      this.endTimeId = setTimeout(() => this.timeEndAlarm(), (totalTime + 1.5) * 1000);
    }
  }

  playNyanAudio() {
    const audio = document.getElementById('nyan-audio');
    audio.volume = 0.7;
    audio.currentTime = 5.5;
    return audio;
  }

  timeEndAlarm = () => {
    clearInterval(this.counterId);
    this.setState({ end: true });
    this.playNyanAudio().play();
  }

  resetCountDown = () => {
    document.querySelector('div.nyan-cat')
      .style = 'margin-left: -95%';
    this.setState({ end: false });
    this.playNyanAudio().pause();
  }

  increaseTimer = (event) => {
    const { changeTimer } = this.props;
    const { start } = this.state;
    if (!start) changeTimer(this, event, true);
  };

  decreaseTimer = (event) => {
    const { changeTimer } = this.props;
    const { start } = this.state;
    if (!start) changeTimer(this, event);
  };

  onChange = ({ target: { name, value } }) => {
    const values = value.match(/\d/g) ? value.match(/\d/g) : [0, 0];
    const newValue= values.length > 2
      ? +(`${values[values.length - 2]}${values[values.length - 1]}`) : value;
    const entry = +(newValue) > 59 ? 59 : newValue;
    this.setState((prevSt) => ({
      [name]: isNaN(+(entry)) ? +(prevSt[name]) : +(entry),
    }));
  };

  pauseCounter = () => {
    clearInterval(this.counterId);
    clearTimeout(this.endTimeId);
    document.querySelector('div.nyan-cat')
      .style = `transition: ${this.getTotalTime() / 2}s linear; margin-left: -95% `;
    this.setState({
      start: false,
    });
    this.playNyanAudio().pause();
  }

  resetCounter = () => {
    clearInterval(this.counterId);
    clearTimeout(this.endTimeId);
    document.querySelector('div.nyan-cat')
      .style = 'transition: 1s linear; margin-left: -95%';
    this.setState({
      end: false,
      start: false,
      hour: 0,
      minutes: 0,
      seconds: 0,
    });
    this.playNyanAudio().pause();
  }

  render() {
    const { end, start,  viewHour, hour, minutes, seconds } = this.state;
    return (
      <>
      <Infos />
      <section className="cronometer-box">
        <DisplayHourCheck curCondition={ viewHour } getCondition={ this.displayHour } />
        <div className="cronometer">
          { viewHour && <><TimeComponent
            unit="hour"
            curTime={ +(hour) }
            ifStart={ start }
            increase={ this.increaseTimer }
            decrease={ this.decreaseTimer }
            clearEv={ this.stopEvents }
            change={ this.onChange }
          /> : </> }
          <TimeComponent
            unit="minutes"
            curTime={ +(minutes) }
            ifStart={ start }
            increase={ this.increaseTimer }
            decrease={ this.decreaseTimer }
            clearEv={ this.stopEvents }
            change={ this.onChange }
          /> :
          <TimeComponent
            unit="seconds"
            curTime={ +(seconds) }
            ifStart={ start }
            increase={ this.increaseTimer }
            decrease={ this.decreaseTimer }
            clearEv={ this.stopEvents }
            change={ this.onChange }
          />
        </div>
        { !start 
          ? <BtnComponent buttonClass="start-btn" countFunc={ this.countDown } content="Start" />
          : <BtnComponent buttonClass="pause-btn" countFunc={ this.pauseCounter } content="Pause" />
        }
        <BtnComponent buttonClass="reset-btn" countFunc={ this.resetCounter } content="RESET" />
          { end && <TimeIsEnd timeEnd={ this.resetCountDown } /> }
      </section>
      </>
    );
  }
}

Cronometer.propTypes = { changeTimer: PropTypes.func.isRequired }

export default Cronometer;
