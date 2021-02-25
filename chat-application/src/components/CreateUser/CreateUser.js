import React, {useState} from 'react';
import axios from 'axios';
import config from "../../Helpers/config.json"
import './CreateUser.css'

const CreateUser = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const submit = async () => {
        setError(false);
        setIsLoading(true);
        await axios.post(`${config.apiUrl}/create`,{
            name, room
        })
        .then(response => {
            if(response.data["code"] === 201 ) {
                window.location.href = '/';
            } else {
                setError(response.data.message);
            }
            setIsLoading(false);
        });
    };

    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Create User</h1>
                {isLoading && (
                <div className="loading">
                    <span className="loadingspan" style={{}}>
                    loading..
                    </span>
                </div>
                )}
                {error && (
                <div className="login-error">
                    <span className="error" style={{}}>
                    {error}
                    </span>
                </div>
                )}
                <div><input placeholder="username" className="joinInput" type="text" onChange={(event) => setName(event.target.value)}/></div>
                <div><input placeholder="chatroom" className="joinInput mt-20" type="text" onChange={(event) =>setRoom(event.target.value)}/></div>
                {/* <Link onClick={event => (!name || !room) ? event.preventDefault() : null} to={`/`}> */}
                    <button className="button mt-20" onClick={submit} type="submit"> Create User</button>
                {/* </Link> */}
            </div>
        </div>
    )
}
export default CreateUser;