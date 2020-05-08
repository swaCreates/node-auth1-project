import React from 'react';
import {Route, Link, Switch} from 'react-router-dom';
import '../sass/Welcome.scss';

export default function Welcome() {

    return (
        <div>
            <section>
                <div className='intro-content'>
                    <p>
                        Join the local group of React friends
                    </p>
                </div>
                <div className='btn-div'>
                        <Link to='/register' ><button className='register'>Register</button></Link>
                        <Link to='/login' ><button className='login'>Log in</button></Link>
                </div>
            </section>
        </div>
    )
}
