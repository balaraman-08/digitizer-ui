import * as React from 'react';

// Material UI Components
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
        overflowY: 'scroll',
        display: 'flex',
        justifyContent: 'center',
        marginLeft: '1rem',
        width: '360px',
        backgroundColor: '#ffffff',
        padding: "16px",
        textAlign: "left",
        color: "#0052cc",
        borderTop: '2px solid white',
        boxShadow: "-1px 4px 4px 0 rgba(0, 0, 0, 0.4)",
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        }
    },
    form: {
        width: '100%',
        padding: '8px',
    },
    fieldContainer: {
        display: 'flex'
    },
    confidenceScore: {
        margin: '0.5rem',
        alignSelf: 'center'
    }
}));

interface BoundingBox {
    top: number
    left: number
    width: number
    height: number
}

interface Field {
    extractedText: string
    correctedText: string
    conf: number
    boundingBox: BoundingBox
}

type Props = {
    fields: Field[]
    updateField: (value: string, idx: number) => void
}

const FieldContainer = ({ fields, updateField }: Props) => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <form className={classes.form} noValidate autoComplete="off">
                {
                    fields.map((field, idx) => (
                        <div
                            className={classes.fieldContainer}
                            key={idx}
                        >
                            <TextField
                                variant="outlined"
                                fullWidth
                                defaultValue={field.correctedText}
                                onChange={e => {
                                    updateField(e.target.value, idx)
                                }}
                            />
                            <p className={classes.confidenceScore}>{field.conf}</p>
                        </div>
                    ))
                }
            </form>
        </div>
    )
}

export default FieldContainer;