import React, { useState, useEffect } from 'react';

const Contact = () => {

    const [userData, setUserData] = useState({
        name:"", email:"", phone:"", message:""
    });

    const userContact = async () => {
        try {
            const res = await fetch('/getdata', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                },
            });

            const data = await res.json();
            console.log(data);
            setUserData({...userData, name:data.name, email:data.email, phone:data.phone}); //Now aba data ko value setUserData sanga hunxa ani setData ko current value hunxa

            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        userContact(); //hamile ehi define garna mildina kinaki hamile useEffect bhitra async/await function use garna mildina..
    }, []);


    // we are storing data in states 
    const handleInputs = (e) => {
        const {name, value} = e.target;
        setUserData({...userData, [name]:value});
    }

    // we are sending the data to backend
    const contactForm = async (e) => {
        e.preventDefault();

        const {name,email,phone,message} = userData;

        const res = await fetch('/contact', {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                name: name, email, phone, message //yo first ko name database ma bhako name ani second name vaneko user le type gareko name
            })
        });

        const data = await res.json();
        console.log(data);
        if(!data){
            console.log("Message not send");
        }else{
            alert("Message Send");
            setUserData({...userData, message:""}) //after message send successfully, message field empty hos
        }
    }

    return (
        <>
            <div className="container-fluid mt-0 contact-style" id="contactid">
                <div className="row">
                    <div className="col-md-10 col-12 mx-auto">
                        <h2 className="text-center main-heading UnderlineCss">CONTACT US</h2><br />
                        <p className="text-center sub-heading">We will be happy to help you</p>
                        <div className="row">
                            <div className="col-md-6 col-12 mx-auto">

                                <form method="POST">
                                    <div className="form-group">
                                        <label for="name">Name</label>
                                        <input type="text" className="form-control" name="name" id="name" placeholder="Full Name"
                                            onChange={handleInputs}
                                            value={userData.name}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label for="email">Email Address</label>
                                        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter your email" name="email"
                                            onChange={handleInputs}
                                            value={userData.email}
                                        />
                                        <div id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</div>
                                    </div>
                                    <div className="form-group">
                                        <label for="phone">Mobile No.</label>
                                        <input type="number" className="form-control" id="phone" name="phone" placeholder="Enter Phone No."
                                            onChange={handleInputs}
                                            value={userData.phone}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label for="message">Message</label>
                                        <textarea className="form-control" rows="30" cols="30" id="message" name="message" placeholder="Enter a message.." style={{ marginTop: "0px", marginBottom: "0px", height: "80px" }}
                                            onChange={handleInputs}
                                            value={userData.message}
                                        />
                                    </div>
                                    <button type="submit" onClick={contactForm} className="btn-style btn-primary"> Send Message </button> 
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contact
