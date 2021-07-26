/**
 * General constants
 */

export const GAME_TITLE = `Let's Get Trivial`;
export const START_GAME_BUTTON_TEXT = `Bring me the Questions and start a new game`;

export const AMOUNT_OF_QUESTIONS = 10;
export const TRIVIA_DB_API = `https://opentdb.com/api.php?amount=${AMOUNT_OF_QUESTIONS}`;

export enum AnswerStatus {
  CORRECT,
  INCORRECT,
  NOT_ANSWERED,
}

export enum GameStatus {
  NOT_STARTED,
  IN_PROGRESS,
  FINISHED,
}
