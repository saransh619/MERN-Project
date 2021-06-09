import React from 'react';

const Footer = () => {
    const date = new Date().getFullYear();
    return (
        <>
            {/* <div className ="footer">
            <div className="container">
    <p>&copy; 2021 SaranshRock. All
      Rights Reserved | Terms and Conditions</p></div>
  </div> */}

            <footer className="footer">
            <p>&copy; 2021 SaranshRock. All
      Rights Reserved | Terms and Conditions</p>
            </footer>
        </>
    );
}

export default Footer;