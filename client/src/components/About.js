import React, { useEffect, useState } from 'react';
import MyPic from '../images/Me.png';
import { useHistory } from 'react-router-dom';

const About = () => {
    const history = useHistory();

    const [userData, setUserData] = useState({});
    console.log(userData);

    const callAboutPage = async () => {
        try {
            const res = await fetch('/about', {
                method: 'GET',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: 'include'
            });

            const data = await res.json();
            console.log(data);
            setUserData(data); //Now aba data ko value setUserData sanga hunxa ani setData ko current value hunxa

            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
        } catch (err) {
            console.log(err);
            history.push('/login');
        }
    }

    useEffect(() => {
        callAboutPage(); //hamile ehi define garna mildina kinaki hamile useEffect bhitra async/await function use garna mildina..
    }, []);

    return (
        <>
            <div className="container emp-profile">
                <form method="GET">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="profile-img">
                                <img style={{ height: "10rem" }} src={MyPic} alt="MyPic" />
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="profile-head">
                                <h5 style={{textTransform:'capitalize'}}>{userData.name}</h5>
                                <h6>{userData.work}</h6>
                                <p className="profile-rating mt-3 mb-5">RANKINGS: <span>8/10</span></p>

                                <ul className="nav nav-tabs" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Timeline</a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-md-2">
                            <input type="submit" className="profile-edit-btn" name="btnAddMore" value="Edit Profile" />
                        </div>

                    </div>

                    <div className="row">
                        {/* left side url  */}
                        <div className="col-md-4">
                            <div className="profile-work">
                                <p>WORK LINK</p>
                                <a href="https://twitter.com/saransh_pachhai" target="_blank">Twitter</a><br />
                                <a href="https://twitter.com/saransh_pachhai" target="_blank">Facebook</a><br />
                                <a href="https://twitter.com/saransh_pachhai" target="_blank">Instagram</a><br />
                                <a href="https://twitter.com/saransh_pachhai" target="_blank">Linkedin</a><br />
                                <a href="https://twitter.com/saransh_pachhai" target="_blank">Youtube</a><br />
                            </div>
                        </div>


                        {/* right side data toggle  */}
                        <div className="col-md-8 pl-5 about-info">
                            <div className="tab-content profile-tab" id="myTabContent">
                                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                    <div className="row mt-3">
                                        <div className="col-md-6 boldStyleLabel" >
                                            <label>User ID</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>12346526532</p>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-6 boldStyleLabel" >
                                            <label>Name</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{userData.name}</p>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-6 boldStyleLabel" >
                                            <label>Email</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{userData.email}</p>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-6 boldStyleLabel" >
                                            <label>Phone</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{userData.phone}</p>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-6 boldStyleLabel" >
                                            <label>Profession</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{userData.work}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                    <div className="row mt-3">
                                        <div className="col-md-6 boldStyleLabel" >
                                            <label>Experience</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>Intermediate</p>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-6 boldStyleLabel" >
                                            <label>Hourly Rate</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>20$/hr</p>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-6 boldStyleLabel" >
                                            <label>Total Projects</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>68</p>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-6 boldStyleLabel" >
                                            <label>English level</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>Intermediate</p>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-6 boldStyleLabel" >
                                            <label>Availability</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>1 year</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default About
