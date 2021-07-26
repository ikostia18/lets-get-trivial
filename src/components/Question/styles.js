import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginTop: 40,
    marginLeft: 100,
    marginRight: 100,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  answer: {
    margin: 5,
    textTransform: 'none',
  },
});

export { useStyles };
