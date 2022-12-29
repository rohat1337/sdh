import React, { useEffect, useState } from 'react'
import config from '../config.json'
import "./Login.css";
const URL = config.SERVER_URL;

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

            e.target.name.value =''
            e.target.password.value=''

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
                    console.log(data)
                    setToken(data.access_token); // Temp!
                    localStorage.setItem("access_token", data.access_token);
                    console.log("LOGGED IN - NAVIGATING TO CHOOSE PLAYER");
                    props.navigation.navigate('ChoosePlayer', { token: data.access_token })
                } else {
                    console.log("setting error text");
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

    const renderForm = () => {
        return <div className="login-form">
            <div className="form">
                <form onSubmit={handleSubmit}>

                    <div className="input-container">
                        <label className='username'>Användarnamn </label>
                        <input type="text" name="name" />
                    </div>
                    <div className="input-container">
                        <label className='password'>Lösenord</label>
                        <input type="password" name="password"/>
                    </div>
                    <div className="button-container">
                        <input type="submit" value="Logga in" />
                    </div>
                </form>
            </div>
        </div>
    }

    return (<div className="root">
                <div className="app">
                    <div className='sirius-small'/>
                    <label className="header">Sirius Datahub</label>
                    {renderForm()}
                    <div style={{color:text.color, textAlign:'center', padding:'5%'}}>{text.text}</div>     
                </div>
            </div>);

}

export default Login;

