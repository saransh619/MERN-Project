import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';

const Signup = () => {
    const history = useHistory();
    const [user, setUser] = useState({
        name: "", email: "", phone: "", work: "", password: "", cpassword: ""
    });

    let name, value;
    const handleInputs = (e) => {
        // console.log(e);
        // console.log(e.target);
        // console.log(e.target.name);
        // console.log(e.target.value);
        name = e.target.name;
        value = e.target.value;
        setUser({ ...user, [name]: value }); //yo name maathi ko name = ko name haina yo e.target.value bata aako name ho..jastai phone field ma name vaneko "phone"..
    }

    const PostData = async (e) => {
        e.preventDefault();
        const {name, email, phone, work, password, cpassword} =user;
        const res = await fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, phone, work, password, cpassword
            })
        });
        const data = await res.json();
        console.log(data);
        if(res.status === 422 || !data){
            window.alert("Invalid Registration.....");
            console.log("Invalid Registration");
        }else{
            window.alert("Registration Successful....");
            console.log("Successful Registration");

            history.push("/login");
        }
    }

    return (
        <>
            <div className="signup-form mt-0">
                <form method="POST">
                    <h2 className="UnderlineCss">SIGN UP</h2><br />
                    <p className="signupPara">Please fill in this form to create an account!</p>
                    <div className="form-group">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <span className="fa fa-user"></span>
                                </span>
                            </div>
                            <input type="text" className="form-control" name="name" placeholder="Your Name" required="required" autoComplete="off"
                                value={user.name}
                                onChange={handleInputs}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="fa fa-paper-plane"></i>
                                </span>
                            </div>
                            <input type="email" className="form-control" name="email" placeholder="Your Email Address" autoComplete="off" required="required"
                                value={user.email}
                                onChange={handleInputs}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="fa fa-phone"></i>
                                </span>
                            </div>
                            <input type="number" className="form-control" name="phone" placeholder="Your Phone Number" required="required" autoComplete="off"
                                value={user.phone}
                                onChange={handleInputs}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="fa fa-briefcase"></i>
                                </span>
                            </div>
                            <input type="text" className="form-control" name="work" placeholder="Your Profession" required="required" autoComplete="off"
                                value={user.work}
                                onChange={handleInputs}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="fa fa-lock"></i>
                                </span>
                            </div>
                            <input type="password" className="form-control" name="password" placeholder="Your Password" required="required" autoComplete="off"
                                value={user.password}
                                onChange={handleInputs}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="fa fa-lock"></i>
                                    <i className="fa fa-check"></i>
                                </span>
                            </div>
                            <input type="password" className="form-control" name="cpassword" placeholder="Confirm Your Password" required="required" autoComplete="off"
                                value={user.cpassword}
                                onChange={handleInputs}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-check-label"><input type="checkbox" required="required" /> I accept the <NavLink to="/login">Terms of Use</NavLink> &amp; <NavLink to="/login">Privacy Policy</NavLink></label>
                    </div>
                    <div className="form-group">
                        <input type="submit" className="btn btn-primary btn-lg" onClick={PostData} value="Register"/>
                    </div>

                    <div className="text-center">Already have an account? <NavLink to="/login">Login here</NavLink></div>
                </form>
            </div>
        </>
    );
}

export default Signup
