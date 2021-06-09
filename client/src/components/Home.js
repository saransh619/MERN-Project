import React, { useState, useEffect } from 'react';

const Home = () => {

    const [username, setUserName] = useState('');
    const [show, setShow] = useState(false);

    const userHomePage = async () => {
        try {
            const res = await fetch('/getdata', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                },
            });

            const data = await res.json();
            console.log(data);
            setUserName(data.name);
            setShow(true);

        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        userHomePage(); //hamile ehi define garna mildina kinaki hamile useEffect bhitra async/await function use garna mildina..
    }, []);

    return (
        <div className="main_div">
            <div className="center_div">
                <h1 className="pt-5 text-center text-color font-weight-bold">WELCOME</h1><br />
                <h1 className="dynamicNameHome">{username}</h1>
                <h2 style={{fontSize:"3rem", textAlign:"center", color:"#a5ffba"}}> {show ? 'Happy to see you back' : 'WE ARE THE MERN DEVELOPER'}</h2>
            </div>
        </div>
    )
}

export default Home
