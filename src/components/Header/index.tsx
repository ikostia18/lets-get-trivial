import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './styles.js';

interface IHeaderProps {
  title: string;
}

// export default function Header(props: HeaderProps) {
export const Header: React.FC<IHeaderProps> = (props: IHeaderProps) => {
  const classes = useStyles();

  return (
    <>
      <header className={classes.root}>
        <Grid container direction="row">
          <Typography variant="h4" gutterBottom className={classes.typography}>
            {props.title}
            <Box
              component="div"
              display="block"
              bgcolor="#3f51b586"
              width="100%"
              height="10px"
              position="absolute"
              bottom="16px"
              zIndex="-1"
            ></Box>
          </Typography>
        </Grid>
      </header>
    </>
  );
}
