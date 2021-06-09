import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router';
import {UserContext} from '../App';

const Logout = () => {
    const {state, dispatch} = useContext(UserContext);

    const history = useHistory();
    useEffect(()=>{
        // using promises..promises bata hamile useeffect bhitrai function chlauna pauxam tara async/await ma paudinam
        fetch('/logout', {
            method: 'GET',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        }).then((res)=>{
            dispatch({type:"USER", payload:false})
            history.push('/login', {replace : true});
            if(res.status !== 200){
                const error = new Error(res.error);
                throw error;
            }
        }).catch((err)=>{
            console.log(err);
        });
    });
    return (
        <>
            <h1>Logout Page</h1>
        </>
    )
}

export default Logout
