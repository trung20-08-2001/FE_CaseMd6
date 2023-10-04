import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import CheckIcon from '@mui/icons-material/Check';
import SaveIcon from '@mui/icons-material/Save';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import { green } from '@mui/material/colors';
import Fab from '@mui/material/Fab';


function Saving() {
    const saving = useSelector(state => state.house.saving);

    const buttonSx = {
        ...(saving && {
            bgcolor: green[500],
            '&:hover': {
                bgcolor: green[700],
            },
        }),
    };

    return (
        <>
            <Backdrop
                sx={{ color: 'white', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={saving}
            >
                <Box sx={{ m: 1, position: 'relative' }}>
                    <Fab aria-label="save"
                        sx={buttonSx}
                    >
                        {!saving ? <CheckIcon /> : <SaveIcon />}
                    </Fab>
                    {saving && (
                        <CircularProgress
                            size={68}
                            sx={{
                                color: green[500],
                                position: 'absolute',
                                top: -6,
                                left: -6,
                                zIndex: (theme) => theme.zIndex.drawer + 1 
                            }}
                        />
                    )}
                </Box>
            </Backdrop>
        </>
    )
}

export default Saving
