// loading condition div

import CircularProgress from '@mui/material/CircularProgress';
function Is_LoadingDiv() {
    return (
        <div style={{
            width: '100%',
            padding: 'inherit',
            textAlign: 'center',
           
        }}>
            <CircularProgress

            />
        </div>
    )
}

export default Is_LoadingDiv
