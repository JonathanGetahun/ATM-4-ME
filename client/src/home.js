import React, { useState } from 'react';
import logo from './images/atm4.png';
import feedbackAPI from './apis/feedbackAPI';


function Home() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const [emailErr, setEmailErr] = useState({});
    const [messageErr, setMessageErr] = useState({});

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }
    
    const handleMessage = (e) => {
        setMessage(e.target.value);
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        const isValid = formValidation();

        if(isValid){
            try {
                await feedbackAPI.post('/', {email,message});

                setEmail("");
                setMessage("");
            }catch(err) {
                console.log(err)
            }
        }
    }

    const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

    const formValidation = () => {
        const emailErr = {};
        const messageErr = {};
        let isValid = true;

        let regexMatch = validEmailRegex.test(email);

        if(!regexMatch) {
            emailErr.isNotValid = "Please Enter a Valid Email.";
            isValid = false;
        };

        if(message.length < 1){
            console.log("reached")
            messageErr.tooShort = "Please enter a message.";
            isValid = false;
        };

        setEmailErr(emailErr);
        setMessageErr(messageErr);
        return isValid;
    } 

    return (
        <div>
            <div className="title_section">
            <img className="logo" src={logo} alt="no cash logo"/>
            <h1>Welcome to ATM-4-ME</h1>
            </div>

      <p>We made this service for people who need cash A$AP. Text <a>406-MYATM-90</a> (406-692-8690)
          and we will send you the nearest ATMs where you can get the cash you need.
      </p>

      <p><a>If you would like to submit an atm location, please do so here</a>.</p>

      <p>This information was scraped from <a href="https://network.americanexpress.com/globalnetwork/atm_locator/en/#search">American Express</a>.</p>

      <p>This project can be found on <a href="https://github.com/JonathanGetahun/ATM-4-ME">github</a>, please like the repository if you find it useful.</p>

      <h4>Have Any Feedback? Leave your thoughts below and we will get back to you, we enjoy finding new ways to improve! </h4>

      <form className="email_form" onSubmit={(e) => handleSubmit(e)}>
          <label>
              <b>Email:</b> 
              <input className="email" type='text' value={email} onChange={(e) => handleEmail(e)} />
              {Object.keys(emailErr).map((key,idx) => {
                  return <div key={idx} style={{color: "black"}}>{emailErr[key]}</div>
              })}
          </label>
          <br></br>
          <label>
              <b>Message:</b>
          </label><br />
          <textarea value={message} onChange={(e) => handleMessage(e)} placeholder="Please leave questions or comments here" />
          {Object.keys(messageErr).map((key,idx) => {
                  return <div key={idx} style={{color: "black"}}>{messageErr[key]}</div>
              })}
          <br />
          <input className="form-submit-button" type="submit" value="Submit" />

      </form>

        </div>
    )
}

export default Home



