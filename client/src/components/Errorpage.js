import React from 'react';
import {NavLink} from 'react-router-dom';

const Errorpage = () => {
    return (
        <>
           <div id="notfound">
               <div className="notfound">
                   <div className="notfound-404">
                       <h1>404</h1>
                   </div>
                   <h2>We are sorry page not found</h2>
                   <p className="mb-5">
                       The page you are looing for might have been removed had its name changed or is temporialy unavailable.
                   </p>
                   <NavLink to="/"> Back to homepage </NavLink>
               </div>
           </div> 
        </>
    )
}

export default Errorpage
