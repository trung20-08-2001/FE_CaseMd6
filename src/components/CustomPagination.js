import * as React from 'react';
import Pagination from '@mui/material/Pagination';


function CustomPagination(props) {
    const handleChange = (event, value) => {
        props.setPageCurrent(value-1)
    };
    return (
            <Pagination count={props.totalPages} page={props.pageCurrent} onChange={handleChange}/>
    );
}

export default CustomPagination;
