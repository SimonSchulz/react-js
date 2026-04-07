import {useNavigate, useRouteError} from 'react-router-dom';

export default function RouteError() {
    const error = useRouteError();
    const navigate = useNavigate();
    return (
        <div style={{ textAlign: 'center', marginTop: 50 }}>
            <h2>Something went wrong</h2>
            <p>{`${error.status}: ${error.data}` || 'Unknown error'}</p>
            <button onClick={() => navigate(-1)}>go back
            </button>
        </div>
    );
}