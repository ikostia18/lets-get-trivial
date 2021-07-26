import { Typography } from '@material-ui/core';
import { AMOUNT_OF_QUESTIONS } from '../../utils/constants';
import { useStyles } from './styles.js';

interface IScoreBoardProps {
  score: number;
}

// export default function ScoreBoard(props: IScoreBoardProps) {
export const ScoreBoard: React.FC<IScoreBoardProps> = (props: IScoreBoardProps) => {
  const classes = useStyles();
  
  return (
    <>
      <Typography variant="h6" className={classes.title}>
        Score: {props.score} of {AMOUNT_OF_QUESTIONS}
      </Typography>
    </>
  );
}
