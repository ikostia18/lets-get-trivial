import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
    createStyles({
        nextButton: {
            "&.MuiButtonBase-root": {
                marginTop: 20
            }
        },
        alert: {
            marginTop: 20,
            marginLeft: 100,
            marginRight: 100,
        },
    })
);

export { useStyles };
