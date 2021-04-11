import * as React from 'react';
import { useState, useRef, useEffect } from 'react';

// Material UI Components
import { makeStyles } from '@material-ui/core/styles';

// Fabricjs
import { fabric } from 'fabric';

const useStyles = makeStyles(() => ({
    root: {
        overflowY: 'scroll',
        display: 'flex',
        justifyContent: 'center',
        margin: '1rem',
        flexGrow: 1,
    }
}));

type Props = {
    filename: string;
}

const ImageContainer = ({ filename }: Props) => {

    const classes = useStyles();

    // Canvas Options
    const canvasWidth = 900;
    const canvasHeight = 650;
    const canvas = useRef<fabric.Canvas | null>(null);
    const [scaleFactor, setScaleFactor] = useState(1);

    useEffect(() => {
        canvas.current = new fabric.Canvas('canvas', {
            height: canvasHeight,
            width: canvasWidth,
        });
    }, [])


    useEffect(() => {
        fabric.Image.fromURL(
            `http://localhost:5000/img/${filename}`,
            (img) => {
                const imageObject = img.set({
                    left: 0,
                    top: 0,
                    angle: 0,
                    stroke: '#aeaeaf',
                    strokeWidth: 4,
                });
                const imgRect = imageObject.getBoundingRect();

                setScaleFactor(canvasWidth / imgRect.width);
                imageObject.scale(canvasWidth / imgRect.width);
                if (canvas.current) {
                    canvas.current.setHeight(imageObject.getScaledHeight());
                    canvas.current.clear();
                    canvas.current.setViewportTransform([1, 0, 0, 1, 0, 0]);
                    canvas.current.add(imageObject);
                } else {
                    console.error("canvas.current is null")
                }
            },
            { selectable: false }
        );
    }, [filename]);

    return (
        <div className={classes.root}>
            <canvas
                id="canvas"
                style={{
                    width: 1000,
                    height: 650,
                    // border: '1px solid #f4f5f7',
                    // borderRadius: '5px',
                }}
            ></canvas>
        </div>
    )
}

export default ImageContainer;