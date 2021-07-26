import { decodeHtml } from '../../utils/string';
import { useStyles } from './styles.js';
import { AnswerStatus } from '../../utils/constants';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

export interface IQuestion {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface IQuestionProps {
  questions: IQuestion[];
  qIndex: number;
  answer: AnswerStatus;
  handleSelectedAnswer: (ans: string) => void;
}

export const Question: React.FC<IQuestionProps> = (props: IQuestionProps) => {
  const classes = useStyles();
  const { questions, qIndex, handleSelectedAnswer } = props;

  return (
    <>
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title} variant="h1" component="h3">
            Question #{qIndex + 1} - {questions[qIndex].category}
          </Typography>

          <Typography className={classes.title} variant="h5" component="h3">
            {decodeHtml(questions[qIndex].question)}
          </Typography>

          <Typography variant="body2" component="p">
            {questions[qIndex].incorrect_answers.map((ans) => {
              return (
                <Button
                  key={ans.toString()}
                  className={classes.answer}
                  variant="contained"
                  color="primary"
                  onClick={() => handleSelectedAnswer(ans)}
                  disabled={!(props.answer === AnswerStatus.NOT_ANSWERED)}
                >
                  {decodeHtml(ans)}
                </Button>
              );
            })}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}
