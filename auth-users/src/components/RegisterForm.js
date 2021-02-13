import React, {useState} from 'react';
import axios from 'axios';

export default function RegisterForm(props) {

    const [info, setInfo]= useState({
        username: '',
        password: '',
    });

    const handleChanges= evt => {
        console.log(info);
        setInfo({
            ...info,
            [evt.target.name]: evt.target.value,
        });
    };

    const handleSubmit= evt => {
        evt.preventDefault();

        setInfo({
            username: '',
            password: '',
        });

        axios
        .post('/api/register', info)
        .then(res => {
            console.log(res);
            props.history.push('/login')
        })
        .catch(err => {
            console.log('Error registering:', err);
        });
    };

    return (
        <div>
            <header>
                <h2>Registration</h2>
            </header>
            <div>
                <section>
                    <h3>
                        Create a username and password
                    </h3>
                    <form onSubmit={handleSubmit}>
                        <input
                            onChange={handleChanges}
                            placeholder='create username'
                            name='username'
                            type='text'
                            value={info.username}
                        />
                        <input
                            onChange={handleChanges}
                            placeholder='create password'
                            name='password'
                            type='text'
                            value={info.password}
                        />
                        <button type='submit'>Submit</button>
                    </form>
                </section>
            </div>
        </div>
    );
};
