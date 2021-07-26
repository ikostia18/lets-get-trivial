import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginLeft: 100,
      marginRight: 100,
      position: 'relative',
      marginTop: 30,
    },
    typography: {
      flexGrow: 1,
      letterSpacing: 1,
      fontWeight: theme.typography.fontWeightBold,
      textAlign: 'center',
    },
  })
);

export { useStyles };
