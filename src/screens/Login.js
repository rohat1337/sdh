import React, { useEffect, useState } from 'react'
import "./Login.css";
const URL = "http://localhost:5000";

function Login(props) {

    const [token, setToken] = useState(0)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [text, setText] = useState({ text: "", color: "black" })
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {

            const username = e.target.name.value
            const password = e.target.password.value

            const response = await fetch(`${URL}/login`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            })
            .then((response) => {
                const statusCode = response.status;
                const data = response.json();
                return Promise.all([statusCode, data]);
            })
            .then((data) => {
                data = data[1];
                if (data.access_token) {
                    setToken(data.access_token); // Temp!
                    localStorage.setItem("access_token", data.access_token);
                    // setText({
                    //     text: "Sucessfully logged in!",
                    //     color: "green"
                    // });
                    console.log("LOGGED IN - NAVIGATING TO CHOOSE PLAYER");
                    props.navigation.navigate('ChoosePlayer', { token: data.access_token })
                } else {
                    setText({
                        text: "Incorrect email or password",
                        color: "red"
                    });
                }
            });

            const data = await response.json()
            if (data.error) {
                setError(data.error)
            } else {
                // do something with the token
            }
        } catch (error) {
            setError(error.message)
        }
    }

    // return (
    //     <form onSubmit={handleSubmit}>
    //         <input
    //             type="text"
    //             placeholder="username"
    //             value={username}
    //             onChange={(e) => setUsername(e.target.value)}
    //         />
    //         <input
    //             type="password"
    //             placeholder="password"
    //             value={password}
    //             onChange={(e) => setPassword(e.target.value)}
    //         />
    //         <button type="submit">Login</button>
    //     </form>
    // )

    const handleLogout = (event) => {
        event.preventDefault();

        try {
            fetch(`${URL}/logout`,
                {
                    method: "POST",
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                })
                .then((response) => {
                    const statusCode = response.status;
                    const data = response.json();
                    return Promise.all([statusCode, data]);
                })
                .then((data) => {
                    console.log(data)
                    localStorage.removeItem("access_token");
                    setToken(0);
                    setText({
                        text: "Succesfully logged out!",
                        color: "green"
                    })
                })
        } catch (err) {
            console.log(err);
        }
    };


    const RenderLoggedInState = () => {
        return <div>
                <h1>You are logged in!</h1>
                {/* <button onClick={handleProfileClick}>Profile</button> */}
                <button onClick={handleLogout}>Logout</button>
            </div>
    }

    const renderForm = () => {
        return <div className="login-form">
            <div className="form">
                <div className="title">Sign In</div>
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <label>Username </label>
                        <input type="text" name="name" />
                    </div>
                    <div className="input-container">
                        <label>Password</label>
                        <input type="password" name="password" />
                    </div>
                    <div className="button-container">
                        <input type="submit" value="Login" />
                    </div>
                </form>
            </div>
            <div>
                <h5>Do you have an invitation code? If so, signup here!</h5>
            </div>
        </div>
    }

    return (<div className="app">
        {token === 0 ? renderForm() : RenderLoggedInState()}
        {text.text}
    </div>);

}

export default Login;

