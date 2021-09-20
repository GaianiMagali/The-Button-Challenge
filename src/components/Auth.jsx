import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { userLoggedActions } from '../core/login/actions';
import { useForm } from '../hooks/useForm';

export const Auth = () => {
    const [inputValues, handleChange, resetForm] = useForm({
        username: ''
    })
    const history = useHistory();
    const dispatch = useDispatch();
    const { userLogged } = useSelector(state => state);


    useEffect(() => {
        userLogged.logged && history.push('/home');
    }, [userLogged])

    const submitForm = (e) => {
        e.preventDefault();
        dispatch(userLoggedActions.login(inputValues.username));
    }


    return (
        <div className="card-items">
            <h2 className="header-form-title">Sign In</h2>
            <form onSubmit={submitForm} >
                {/* <label>Username</label> */}
                <input
                    type="text"
                    placeholder="Enter your username"
                    name="username"
                    onChange={handleChange}
                    value={inputValues.username}
                />
                <button
                    type="submit"
                    className="form-button"
                >
                    <span className="text-buton-form">Signin</span>
                </button>
            </form>
        </div>
    )
}
