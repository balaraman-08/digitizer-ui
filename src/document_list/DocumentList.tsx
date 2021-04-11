import * as React from 'react';

import { useState, useEffect } from 'react';

// Axios Import
import axios from 'axios'

// Router
import { Link } from "react-router-dom";

// Material UI Components
import { DataGrid, GridRowData, GridCellParams } from '@material-ui/data-grid';
import { Typography } from '@material-ui/core';

const columns = [
    {
        field: 'id',
        headerName: 'S. No',
        width: 100,
    },
    {
        field: 'filename',
        headerName: 'File name',
        width: 180,
        renderCell: (params: GridCellParams) => (
            <Typography
                variant="body1"
                component={Link} 
                to={`/verify-documents/${params.row._id}`} 
                style={{
                    color: 'black',
                    textDecoration: 'none'
                }}>
                {params.row.filename}
            </Typography>
        )
    },
    {
        field: 'time',
        headerName: 'Date',
        type: 'date',
        valueGetter: (params: any) => {
            return `${new Date(params.row.timestamp).toLocaleDateString('en-IN',
                {
                    hour: '2-digit',
                    minute: '2-digit',
                    month: 'short',
                    year: 'numeric',
                    day: '2-digit',
                }
            )}`
        },
        sortComparator: (v1: any, v2: any, param1: any, param2: any) => param1.row.timestamp - param2.row.timestamp,
        width: 180,
    },
    {
        field: 'status',
        headerName: 'Status',
        width: 150,
        valueGetter: (params: any) => `${params.row.status.toUpperCase()}`
    },
];


const DocumentList = () => {
    const [documentList, setDocumentList] = useState<GridRowData[]>()

    useEffect(() => {
        axios.get('/documents/')
            .then(res => {
                console.log(res.data)
                let data = res.data.map((ele: any, idx: number) => {
                    ele["id"] = idx + 1
                    return ele;
                })
                setDocumentList(data)
            })
            .catch(err => {
                console.error(err)
            })
    }, [])
    return (
        <div style={{ height: 400, width: '60%', display: 'flex', margin: 'auto' }}>
            {
                documentList ?
                    <DataGrid
                        rows={documentList}
                        columns={columns}
                        pageSize={5}
                        checkboxSelection
                        disableSelectionOnClick
                    />
                    :
                    <p>{`No Data`}</p>
            }
        </div>
    )
}

export default DocumentList;