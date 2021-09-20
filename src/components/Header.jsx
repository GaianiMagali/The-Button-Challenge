import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { userLoggedActions } from '../core/login/actions';
import { getNameInitials } from '../helper/getNameInitials';


export const Header = () => {
    const dispatch = useDispatch();
    const history = useHistory()
    const [showMenu, setShowMenu] = useState(false);
    const { userLogged } = useSelector(state => state);


    const logout = () => {
        dispatch(userLoggedActions.logout())
        history.push('./login')
    }

    return (
        <>
            <div className="cube"></div>

            <div className="header">
                <span>The Timer App</span>
                <div>
                    <div className="avatar" onClick={() => setShowMenu(!showMenu)} type="button">
                        {getNameInitials(userLogged.user.name)}
                    </div>
                    {
                        showMenu && <div className="container-menu slideInDown">
                            <span type="button" onClick={logout}>Logout</span>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}
