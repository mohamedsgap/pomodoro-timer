import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {Countdown , TimeInput, TimerToggleButton} from './components';
import {Timer, vibrate} from './utils'

const DEFAULT_WORK_MINS = 25
const DEFAULT_BREAK_MINS = 5

const minToSec = mins => mins * 60
nextTimer = {work: 'break', break: 'work'}

export default class App extends React.Component {
  state = {
    workTime = minToSec(DEFAULT_WORK_MINS),
    breakTime = minToSec(DEFAULT_BREAK_MINS),
    timeRemaining: minToSec(DEFAULT_WORK_MINS) * 1000,
    isRunning: false,
    activeTimer: 'work',
  }

  componentDidMount() {
    this.timer = new Timer(this.state.timeRemaining, this.updateTimeRemaining, this.handleTimerEnd)
    this.setState({isRunning: this.timer.isRunning})
  }

  componentWillUnmount() {
    if(this.timer) this.timer.stop()
  }

  updateTime = target => (time, shouldStartTimer) => {
    if (this.state.activeTimer === target) {
      if (this.timer) this.timer.stop()
      const timeRemaining = +time * 1000
      this.timer = new Timer(timeRemaining, this.updateTimeRemaining, this.handleTimerEnd)
      if (!shouldStartTimer) this.timer.stop()
      this.setState({[`${target}Time`]: time, timeRemaining, isRunning: this.timer.isRunning})
    } else {
  this.setState({[`${target}:Time`]: time, isRunning: this.timer.isRunning})
    }
  }


  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
