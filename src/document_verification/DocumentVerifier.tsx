import * as React from 'react';
import { useState, useEffect } from 'react';

// Axios Import
import axios from 'axios'

// Router
import { useParams } from "react-router-dom";

// Material UI Components
import { makeStyles } from '@material-ui/core/styles';

// Components
import ImageContainer from './ImageContainer'
import FieldContainer from './FieldContainer'

interface ParamTypes {
    id: string
}

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        height: `calc(100vh)`,
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

interface DocumentData {
    filename: string
    fields: Field[]
}

const DocumentVerifier = () => {
    const { id } = useParams<ParamTypes>();
    const classes = useStyles();
    const [documentData, setDocumentData] = useState<DocumentData>();

    useEffect(() => {
        axios.get(`/documents/${id}`)
            .then(res => {
                console.log(res.data)
                setDocumentData(res.data)
            })
            .catch(err => {
                console.error(err)
            })
    }, [id])

    const updateField = (value: string, idx: number) => {
        setDocumentData((prevData) => {
            if (prevData) {
                if (value !== prevData.fields[idx].correctedText) {
                    prevData.fields[idx].correctedText = value
                }
            }
            return prevData
        })
    }

    return (
        documentData ?
            <div className={classes.root}>
                <ImageContainer filename={documentData.filename} />
                <FieldContainer fields={documentData.fields} updateField={updateField} />
            </div>
            :
            <p>{'Error'}</p>
    )
}

export default DocumentVerifier;