import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {DatePickerIOS,ActionSheetIOS,SafeAreaView,StyleSheet, Button,Text, View,TextInput, Alert,DynamicColorIOS} from 'react-native';
import {useState,useEffect} from "react";
// import Button from 'react-bootstrap/Button';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const Countdown = () => {
  const [run,setRun] = useState(false);
  const [started,setStarted] = useState(false);
  const [buttonText,changeButtonText] = useState("Start Timer");
  const [intervalID,changeInterval] = useState();

  const [date, setDate] = useState(new Date('August 19, 2021 23:15:30'));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const [countdownDate, setCountdownDate] = useState(date.getTime());
  const currentTime = new Date().getTime();
  const [distance,setDistance] = useState(countdownDate-currentTime);
  const [state, setState] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (run==true) {
      var interval = setInterval(()=>updateCountdown(), 1000);
      changeInterval(interval);
      
    }  else {
      // Paused, keep track of the time remaining. 
      
      clearInterval(intervalID);

    }
  }, [run]);



  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;

    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  function pressPause() {
    if (started==false) {
      console.log(date.getTime());
      setCountdownDate(date.getTime());

      setStarted(true);   
      setRun(true);
      changeButtonText("Stop")
         
    }
    else if (run==false) {
      setRun(true);
      changeButtonText("Stop");
      const currentTime = new Date().getTime();
      setCountdownDate(distance+currentTime);
    } 
    else {
      setRun(false);
      changeButtonText("Resume");
    }
    
  };
  async function pressTerminate() {
    
    setStarted(false);
    setRun(false);
    changeButtonText("Start");
    // go back to all zeros clear all interval
    let days=0;
    let hours=0;
    let minutes=0;
    let seconds=0;
    const numbersToAddZeroTo = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  
      if (numbersToAddZeroTo.includes(hours)) {
        hours = `0${hours}`;
      } else if (numbersToAddZeroTo.includes(minutes)) {
        minutes = `0${minutes}`;
      } else if (numbersToAddZeroTo.includes(seconds)) {
        seconds = `0${seconds}`;
      }
  
      // Set the state to each new time
      setState({ days: days, hours: hours, minutes, seconds });
      
  };
  const updateCountdown = () => {
    if (countdownDate) {
      // Get the current time
      const currentTime = new Date().getTime();

      // Get the time remaining until the countdown date
      const distanceToDate = countdownDate - currentTime;
      setDistance(distanceToDate);
      // Calculate days, hours, minutes and seconds remaining
      let days = Math.floor(distanceToDate / (1000 * 60 * 60 * 24));
      let hours = Math.floor(
        (distanceToDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      let minutes = Math.floor(
        (distanceToDate % (1000 * 60 * 60)) / (1000 * 60),
      );
      let seconds = Math.floor((distanceToDate % (1000 * 60)) / 1000);
  
      // For visual appeal, add a zero to each number that's only one digit
      const numbersToAddZeroTo = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  
      if (numbersToAddZeroTo.includes(hours)) {
        hours = `0${hours}`;
      } else if (numbersToAddZeroTo.includes(minutes)) {
        minutes = `0${minutes}`;
      } else if (numbersToAddZeroTo.includes(seconds)) {
        seconds = `0${seconds}`;
      }
  
      // Set the state to each new time
      setState({ days: days, hours: hours, minutes, seconds });
    }
  }
return (
  <SafeAreaView>

      <View className='countdown-wrapper' style={styles.fixToText}>
        <View className='time-section'>
          <Text className='time'>{state.days || '0'}</Text>
          <Text className="time-text">Days</Text>
        </View>
        <View className='time-section'>
          <Text className='time'>:</Text>
        </View>
        <View className='time-section'>
          <Text className='time'>{state.hours || '00'}</Text>
          <Text className="time-text">Hours</Text>
        </View>
        <View className='time-section'>
          <Text className='time'>:</Text>
        </View>
        <View className='time-section'>
          <Text className='time'>{state.minutes || '00'}</Text>
          <Text className="time-text">Minutes</Text>
        </View>
        <View className='time-section'>
          <Text className='time'>:</Text>
        </View>
        <View className='time-section'>
          <Text className='time'>{state.seconds||'00'}</Text>
          <Text className="time-text">Seconds</Text>
        </View>
      </View>
      <View className='timepicker-wrapper'>
        <View className='toggle-wrapper' style={styles.fixToText}> 
      <View>
        <Button onPress={showDatepicker} title="Show date picker!" />
      </View>
      <View>
        <Button onPress={showTimepicker} title="Show time picker!" />
      </View>
      </View>
     
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
      
      <Button title={buttonText}
          onPress={pressPause}> 
      </Button>
      <Button title="Reset"
      disabled={!started}
          onPress={pressTerminate}> 
      </Button>
      </View>
    
    </SafeAreaView>
);
};
const styles = StyleSheet.create({
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop:75,
    marginHorizontal:15,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 75,
  },

});
export default Countdown;




