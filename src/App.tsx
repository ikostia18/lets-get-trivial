import './App.css';
import {
  GAME_TITLE,
  TRIVIA_DB_API,
  AMOUNT_OF_QUESTIONS,
  GameStatus,
  AnswerStatus,
  START_GAME_BUTTON_TEXT,
} from './utils/constants';
import { useState } from 'react';
import { useStyles } from './styles.js';
import { useCounter } from './utils/customHooks';
import Button from '@material-ui/core/Button';
import { Header } from './components/Header';
import { ScoreBoard } from './components/ScoreBoard';
import { Question, IQuestion } from './components/Question';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { Alert } from '@material-ui/lab';
import { decodeHtml } from './utils/string';
import React from 'react';
// import LoadingButton from '@material-ui/lab/LoadingButton';

// useContext test
// const appContext = {
//   dataV1: {
//     a: 'app context V1 a',
//     b: 'app context V1 b',
//   },
//   davaV2: {
//     a: 'app context V2 a',
//     b: 'app context V2 b',
//   },
// };

// export const MyContext = React.createContext(appContext.dataV1);

function App() {
  // *** Hooks *************************************************************************

  const [gameStatus, setGameStatus] = useState<GameStatus>(
    GameStatus.NOT_STARTED
  );
  const [answer, setAnswer] = useState<AnswerStatus>(AnswerStatus.NOT_ANSWERED);
  const [questions, setQuestions] = useState<IQuestion[]>();
  const [loaded, setLoaded] = useState(false);
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore, setResetScore] = useCounter();

  // *** Local Functions ****************************************************************

  const fetchTrivia = async () => {
    try {
      await fetch(TRIVIA_DB_API)
        .then((response) => response.json())
        .then((data) => {
          prepareAnswers(
            data.results[0].correct_answer,
            data.results[0].incorrect_answers
          );
          setQuestions(data.results);
          setLoaded(true);
        });
    } catch (e: unknown) {
      console.log('Fetching data error: ', e);
    }
  };

  const handleStartGame = () => {
    setGameStatus(GameStatus.IN_PROGRESS);
    setAnswer(AnswerStatus.NOT_ANSWERED);
    setQIndex(0);
    setResetScore();
    setLoaded(false);
    fetchTrivia();
  };

  // Mix the answers so the correct answer does not appear in the same place for all questions
  const prepareAnswers = (correct: string, incorrect: string[]) => {
    const index = Math.floor(Math.random() * 4);
    incorrect.splice(index, 0, correct);
  };

  const handleSelectedAnswer = (ans: string) => {
    if (!questions) return;

    if (ans === questions[qIndex].correct_answer) {
      setScore();
      setAnswer(AnswerStatus.CORRECT);
    } else {
      setAnswer(AnswerStatus.INCORRECT);
    }
  };

  const handleNextButton = () => {
    if (!questions) return;
    const nextQuestionIndex = qIndex + 1;

    if (nextQuestionIndex < AMOUNT_OF_QUESTIONS) {
      prepareAnswers(
        questions[nextQuestionIndex].correct_answer,
        questions[nextQuestionIndex].incorrect_answers
      );
      setAnswer(AnswerStatus.NOT_ANSWERED);
      setQIndex(qIndex + 1);
    } else if (nextQuestionIndex === AMOUNT_OF_QUESTIONS) {
      setGameStatus(GameStatus.FINISHED);
    }
  };

  // Show the user appropriate result according his selection
  const updateAnswerStatus = () => {
    switch (answer) {
      case AnswerStatus.CORRECT:
        return (
          <Alert className={classes.alert} severity="success">
            {questions && decodeHtml(questions[qIndex].correct_answer)} - This
            is correct!
          </Alert>
        );
      case AnswerStatus.INCORRECT:
        return (
          <Alert className={classes.alert} severity="error">
            Wrong! The correct answer is -{' '}
            {questions && decodeHtml(questions[qIndex].correct_answer)}
          </Alert>
        );
      case AnswerStatus.NOT_ANSWERED:
        return <></>;
    }
  };

  const updateScoreStatus = () => {
    if (gameStatus === GameStatus.FINISHED) {
      return (
        <Alert className={classes.alert} severity="info">
          You have scored {score} points in this game.
        </Alert>
      );
    }
  };

  // Using this static HTML Loading cause Material UI has issues with importing the 'LoadingButton'
  const isLoading = () => {
    if (!loaded && gameStatus === GameStatus.IN_PROGRESS) {
      return <p>Loading...</p>;
    }
  };

  // *** End of local Functions ********************************************************

  const classes = useStyles();

  return (
    // <MyContext.Provider value={appContext.davaV2}>
      <div className="App">
        <Header title={GAME_TITLE}></Header>

        <Button
          color="primary"
          variant={
            gameStatus === GameStatus.IN_PROGRESS ? 'outlined' : 'contained'
          }
          onClick={handleStartGame}
        >
          {START_GAME_BUTTON_TEXT}
        </Button>

        {/* Material UI has issues with importing the 'LoadingButton' at this point */}
        {/* <LoadingButton
        className={classes.startButton}
        color="primary"
        variant={
          gameStatus === GameStatus.IN_PROGRESS ? 'outlined' : 'contained'
        }
        onClick={handleStartGame}
        loading={loaded}
      >
        {START_GAME_BUTTON_TEXT}
      </LoadingButton> */}

        {isLoading()}

        <>
          {loaded && gameStatus === GameStatus.IN_PROGRESS && (
            <>
              {questions && (
                <Question
                  questions={questions}
                  qIndex={qIndex}
                  answer={answer}
                  handleSelectedAnswer={handleSelectedAnswer}
                ></Question>
              )}

              {updateAnswerStatus()}

              <Button
                className={classes.nextButton}
                disabled={answer === AnswerStatus.NOT_ANSWERED}
                variant="contained"
                onClick={handleNextButton}
                endIcon={<NavigateNextIcon />}
              >
                Next
              </Button>
              <ScoreBoard score={score}></ScoreBoard>
            </>
          )}
        </>

        {updateScoreStatus()}
      </div>
    // </MyContext.Provider>
  );
}

export default App;
