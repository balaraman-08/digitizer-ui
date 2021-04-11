import * as React from 'react';

import { useState } from 'react'

// Axios Import
import axios from 'axios'

// Material UI Components
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CloudUploadRounded from '@material-ui/icons/CloudUploadRounded';

// Import React FilePond
import { ActualFileObject } from 'filepond'
import { FilePond, registerPlugin } from 'react-filepond'

// Import FilePond styles
import 'filepond/dist/filepond.min.css'

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

// Custom CSS
import './custom_filepond.css'

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFileValidateType)

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    uploadButton: {
        margin: 'auto',
    }
}))

const DocumentUploader = () => {

    const classes = useStyles();
    const [files, setFiles] = useState<ActualFileObject[]>([])
    const [extractedData, setExtractedData] = useState<JSON | null>(null)

    const uploadFile = () => {
        const formData = new FormData();
        formData.append('file', files[0], files[0].name);
        axios({
            method: 'post',
            url: '/digitize/',
            data: formData,
            onUploadProgress: (e) => {
                // updating progress indicator
                console.log(e.lengthComputable, e.loaded, e.total);
            }
        })
            .then(res => {
                setExtractedData(res.data.data)
                console.log(res)
            })
            .catch(err => {
                console.error(err)
            })
    }
    return (
        <div className={classes.root}>
            <FilePond
                files={files}
                onupdatefiles={fileItems => {
                    setFiles(fileItems.map(fileItem => fileItem.file));
                    console.log(fileItems.map(fileItem => fileItem.file));
                }}
                allowFileTypeValidation={true}
                acceptedFileTypes={['image/*']}
                labelFileTypeNotAllowed={'Invalid File. Expects image like png, jpg, jpeg'}
                fileValidateTypeLabelExpectedTypesMap={{ 'image/*': '.jpg' }}
                allowMultiple={true}
                maxFiles={3}
                name="files"
                labelIdle={`Drag & Drop your files or <span class="filepond--label-action">Browse</span>`}
            />
            <Button
                variant="contained"
                color="secondary"
                onClick={uploadFile}
                className={classes.uploadButton}
                startIcon={<CloudUploadRounded />}
            >
                {'Extract'}
            </Button>
            <Typography variant={"body1"}>
                {JSON.stringify(extractedData)}
            </Typography>
        </div>
    )
}

export default DocumentUploader