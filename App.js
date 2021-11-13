import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';

export default function App() {
  // Use State for Navigation
  const [getStartScreen, setStartScreen] = React.useState(true);
  const [getGameScreen, setGameScreen] = React.useState(false);
  const [getFinalScreen, setFinalScreen] = React.useState(false);

  const [getAttempt, setAttempt] = useState(5);
  const [getNum, setNum] = useState('');
  const [getScore, setScore] = useState(0);
  const [getRound, setRound] = useState(0);
  const [getHint, setHint] = useState("");
  const [getGNum, setGNum] = useState(Math.floor((Math.random() * 100) + 1));
  const [getHintsNo, setHintsNo] = React.useState(0);
  const [getCorrectGuesses, setCorrectGuesses] = React.useState(0);

  const MyButton = ({ text, onTap }) => {
    return (
      <TouchableOpacity
        style={styles.btContainer}
        activeOpacity={0.5}
        onPress={() => onTap(text)}
      >
        <Text
          style={{ fontSize: 18, color: 'white', alignSelf: 'center' }}
        >{text}</Text>
      </TouchableOpacity>
    )
  }
  const StartScreen = (props) => {
    return (
      <View>
        <Button title='Start' onPress={() => { props.Start(false); props.Game(true); }}></Button>
      </View>
    )
  }

  const GameScreen = (props) => {

    const guessing = () => {
      let num = parseInt(getNum);

      if (getAttempt == 0) {
        setRound(getRound + 1);
        props.Final(true);
      }

      if (num == getGNum) {
        setCorrectGuesses(getCorrectGuesses + 1);
        setScore(getScore + 10);
        transitionToFinal();
      }
      else {
        setAttempt(getAttempt - 1);
        setHint("Try Again");
        setNum("");
      }
    }

    const transitionToFinal = () => {
      props.Game(false);
      props.Final(true);
    }

    const hint = () => {

      if (getGNum > 0 && getGNum < 20) {
        setHint("No is in BTW 0-20.");
      }
      else if (getGNum > 20 && getGNum < 40) {
        setHint("No is in BTW 20-40.");
      }
      else if (getGNum > 40 && getGNum < 60) {
        setHint("No is in BTW 40-60.");
      }
      else if (getGNum > 60 && getGNum < 80) {
        setHint("No is in BTW 60-80.");
      }
      else {
        setHint("No is in BTW 80-100.");
      }
      setHintsNo(getHintsNo + 1);
      setScore(getScore - 2);
    }

    const onBtnPress = (n) => {
      setNum(getNum + n);
    }

    const clear = () => {
      setNum('');
      setHint("");
    }

    return (
      <View>

        <Text style={{ fontSize: 16, alignSelf: 'center', color: 'white', paddingRight: 10 }}>Score: {getScore}</Text>
        <Text style={{ fontSize: 16, alignSelf: 'center', color: 'white', paddingRight: 10 }}>Round: {getRound}</Text>
        <Text style={{ fontSize: 16, alignSelf: 'center', color: 'white', paddingRight: 10 }}>Number is: {getGNum}</Text>
        <Text style={{ fontSize: 16, alignSelf: 'center', color: 'white', paddingRight: 10 }}>Attempt Left is: {getAttempt}</Text>
        <Text style={{ fontSize: 19, alignSelf: 'flex-end', color: 'white', paddingRight: 10 }} selectable={true}> {getNum} </Text>

        <View style={styles.rowContainer}>
          <MyButton text="1" onTap={onBtnPress} />
          <MyButton text="2" onTap={onBtnPress} />
          <MyButton text="3" onTap={onBtnPress} />
        </View>

        <View style={styles.rowContainer}>
          <MyButton text="4" onTap={onBtnPress} />
          <MyButton text="5" onTap={onBtnPress} />
          <MyButton text="6" onTap={onBtnPress} />
        </View>

        <View style={styles.rowContainer}>
          <MyButton text="7" onTap={onBtnPress} />
          <MyButton text="8" onTap={onBtnPress} />
          <MyButton text="9" onTap={onBtnPress} />
        </View>

        <View style={styles.rowContainer}>
          <MyButton text="0" onTap={onBtnPress} />
          <TouchableOpacity onPress={() => { clear() }} style={styles.bt2Container} activeOpacity={0.5}>
            <Text style={{ fontSize: 18, color: 'white' }}>C</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { guessing() }} style={styles.bt2Container} activeOpacity={0.5}>
            <Text style={{ fontSize: 18, color: 'white' }}>Guess</Text>
          </TouchableOpacity>

        </View>

        <View style={styles.rowContainer}>
          <TouchableOpacity onPress={() => { hint() }} style={styles.bt2Container} activeOpacity={0.5}>
            <Text style={{ fontSize: 18, color: 'white' }}>Hint</Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 18, color: 'white' }}>{getHint}</Text>
        </View>

      </View>
    );
  }

  const FinalScreen = (props) => {
    return (
      <View styles={styles.container}>
        <Text style={{ fontSize: 16, alignSelf: 'center', color: 'white', paddingRight: 10 }}>Total Score: {getScore}</Text>
        <Text style={{ fontSize: 16, alignSelf: 'center', color: 'white', paddingRight: 10 }}>Hint Taken: {getHintsNo}</Text>
        <Text style={{ fontSize: 16, alignSelf: 'center', color: 'white', paddingRight: 10 }}>Correct Guesses: {getCorrectGuesses}</Text>
        <Text style={{ fontSize: 16, alignSelf: 'flex-end', color: 'white', paddingRight: 10 }} selectable={true}>Actual Number was: {getGNum} </Text>

        <Button title='Finish' onPress={() => { props.Final(false); props.Start(true); finish(); }}></Button>
        <Button title='Play Again' onPress={() => { props.Final(false); props.Game(true); playAgain(); }}></Button>
      </View>
    );
  }

  const First_Screen = (a) => {
    setStartScreen(a);
  }

  const Game_Screen = (b) => {
    setGameScreen(b);
  }

  const Final_Screen = (c) => {
    setFinalScreen(c);
  }

  const playAgain = () => {
    setRound(getRound + 1);
    setNum("");
    setGNum(Math.floor((Math.random() * 100) + 1));
    setAttempt(5);
    setRound(getRound + 1);
  }

  const finish = () => {
    setScore(0);
    setRound(0);
    setNum("");
    setGNum(Math.floor((Math.random() * 100) + 1));
    setAttempt(5);
    setRound(getRound + 1);
  }

  return (
    <View style={styles.container}>
      {getStartScreen && <StartScreen Game={Game_Screen} Start={First_Screen}></StartScreen>}
      {!getStartScreen && getGameScreen && <GameScreen Game={Game_Screen} Final={Final_Screen}></GameScreen>}
      {!getGameScreen && getFinalScreen && <FinalScreen Start={First_Screen} Game={Game_Screen} Final={Final_Screen}></FinalScreen>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  rowContainer: {
    flexDirection: 'row',
  },

  btContainer: {
    padding: 30,
    backgroundColor: 'rgb(51,51,51)',
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 100,
    elevation: 10,
    borderColor: 'black',
    borderWidth: 1,
  },

  bt2Container: {
    padding: 30,
    backgroundColor: 'orange',
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 100,
    elevation: 10,
    borderColor: 'black',
    borderWidth: 1,
  }
});