import React, { useState } from 'react';
import {Link} from 'react-router-dom';

import submit_atmAPI from './apis/submit_atmAPI';

function SubmitATM() {
    //firstname, lastname, email, name of atm, address, postal code
    //restricted, wheelchair, brail, fee, chip, deposit
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [atmName, setATMName] = useState("");
    const [address, setAddress] = useState("");
    const [cityState, setCityState] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [comment, setComment] = useState("");

    //attributes
    const [restricted, setRestricted] = useState("Y");
    const [wheelchair, setWheelchair] = useState("Y");
    const [brail, setBrail] = useState("Y");
    const [fee, setFee] = useState('Y');
    const [chip, setChip] = useState('Y');
    const [deposit, setDeposit] = useState("Y");

    const [duplicate, setDuplicate] = useState(false);
    const [success, setSuccess] = useState(false);

    const [err, setErr] = useState({email:{}, 
        fullName:{}, 
        atmName:{},
        address:{},
        cityState:{},
        postalCode:{}});

    const handleSubmit = async(e) => {
        e.preventDefault();
        const isValid = formValidation();

        if(isValid){
            try{
                
                await submit_atmAPI.post('/', {
                    email,
                    fullName,
                    atmName,
                    address,
                    cityState,
                    postalCode,
                    comment,
                    restricted,
                    wheelchair,
                    brail,
                    fee,
                    chip,
                    deposit
                })

                setSuccess(true);
                setDuplicate(false);

                setEmail("");
                setFullName("");
                setATMName("");
                setAddress("");
                setCityState("");
                setPostalCode("");
                setComment("");
                setRestricted("Y");
                setWheelchair("Y");
                setBrail("Y");
                setFee("Y");
                setChip("Y");
                setDeposit("Y");
            }catch(err){
                setSuccess(false);
                setDuplicate(true);
            }
        }
    }

    const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
    const validFullName = RegExp(/^[a-z ,.'-]+$/i);
    const validAddress = RegExp(/\w+(\s\w+){2,}/);
    const validCityState = RegExp(/\w+,.\w+/);

    const formValidation = () => {
        const err = {email:{}, 
            fullName:{}, 
            atmName:{},
            address:{},
            cityState:{},
            postalCode:{}};

        let isValid = true;

        let regexMatchEmail = validEmailRegex.test(email);
        if(!regexMatchEmail){
            err.email.isNotValid = "Please enter a valid email address.";
            isValid = false;
        }

        let regexMatchFullname = validFullName.test(fullName);
        if(!regexMatchFullname){
            err.fullName.isNotValid = "Please enter a valid first and last name.";
            isValid = false;
        }

        let regexMatchatm = validFullName.test(atmName);
        if(!regexMatchatm){
            err.atmName.isNotValid = "Please enter a valid atm name.";
            isValid = false;
        }

        let regexMatchAddress = validAddress.test(address);
        if(!regexMatchAddress){
            err.address.isNotValid = "Please enter a valid address";
            isValid = false;
        }

        let regexMatchCityState = validCityState.test(cityState);
        if(!regexMatchCityState){
            err.cityState.isNotValid = "Please enter a valid city, state with correct format";
            isValid = false;
        }

        if(postalCode.length < 1){
            err.postalCode.isNotValid = "Please enter a postal code.";
            isValid = false;
        }


        setErr(err);
        return isValid;

    }

    
    return (
        <>
        <div className="submitATMform">
            <h3>Submit a new ATM</h3>
            <h5 style={{color:"black"}}>* = required fields</h5>

            <form className="submitATMform" onSubmit={(e) => handleSubmit(e)}>
            <label className="submitInput">
              <div><b>Email:</b> <span style={{color:"black"}}>*</span></div>
              <input style={{outline:"none"}} type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
              {Object.keys(err.email).map((key,idx) => {
                  return <div key={idx} style={{color: "black"}}>{err.email[key]}</div>
              })}
          </label>

          <label className="submitInput">
              <div><b>Full Name:</b> <span style={{color:"black"}}>*</span></div>
              <input style={{outline:"none"}} type='text' value={fullName} onChange={(e) => setFullName(e.target.value)} />
              {Object.keys(err.fullName).map((key,idx) => {
                  return <div key={idx} style={{color: "black"}}>{err.fullName[key]}</div>
              })}
          </label>

          <label className="submitInput">
              <div><b>Name of ATM:</b> <span style={{color:"black"}}>*</span></div>
              <input style={{outline:"none"}} type='text' value={atmName} onChange={(e) => setATMName(e.target.value)} />
              {Object.keys(err.atmName).map((key,idx) => {
                  return <div key={idx} style={{color: "black"}}>{err.atmName[key]}</div>
              })}
          </label>

          <label className="submitInput">
              <div><b>Address (123 Main St.):</b> <span style={{color:"black"}}>*</span></div>
              <input style={{outline:"none"}} type='text' value={address} onChange={(e) => setAddress(e.target.value)} />
              {Object.keys(err.address).map((key,idx) => {
                  return <div key={idx} style={{color: "black"}}>{err.address[key]}</div>
              })}
          </label>

          <label className="submitInput">
              <div><b>City, State (in this format):</b> <span style={{color:"black"}}>*</span></div>
              <input style={{outline:"none"}} type='text' value={cityState} onChange={(e) => setCityState(e.target.value)} />
              {Object.keys(err.cityState).map((key,idx) => {
                  return <div key={idx} style={{color: "black"}}>{err.cityState[key]}</div>
              })}
          </label>

          <label className="submitInput">
              <div><b>Postal Code:</b> <span style={{color:"black"}}>*</span></div>
              <input style={{outline:"none"}} type='text' value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
              {Object.keys(err.postalCode).map((key,idx) => {
                  return <div key={idx} style={{color: "black"}}>{err.postalCode[key]}</div>
              })}
          </label>

          <label className="submitInput">
              <div><b>Comments:</b> </div>
              <textarea style={{outline:"none"}} value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Please leave a description if in special location..." />
          </label>
        
          <h5 style={{color:"black"}}>Attributes (all required)</h5>
          <div className="attributes">
              <label >Restricted</label>
              <select value={restricted} name="restricted" onChange={(e) => {setRestricted(e.target.value)}}>
                  <option value="Y">Yes</option>
                  <option value="N">No</option>
                  <option value=" ">N/A</option>
              </select>

              <label >Wheelchair accessible</label>
              <select value={wheelchair} name="restricted" onChange={(e) => {setWheelchair(e).target.value}}>
                  <option value="Y">Yes</option>
                  <option value="N">No</option>
                  <option value=" ">N/A</option>
              </select>

              <label >Brail</label>
              <select value={brail} name="restricted" onChange={(e) => {setBrail(e.target.value)}}>
                  <option value="Y">Yes</option>
                  <option value="N">No</option>
                  <option value=" ">N/A</option>
              </select>

              <label >Fee</label>
              <select value={fee} name="restricted" onChange={(e) => {setFee(e.target.value)}}>
                  <option value="Y">Yes</option>
                  <option value="N">No</option>
                  <option value=" ">N/A</option>
              </select>

              <label >Chip</label>
              <select value={chip} name="restricted" onChange={(e) => {setChip(e.target.value)}}>
                  <option value="Y">Yes</option>
                  <option value="N">No</option>
                  <option value=" ">N/A</option>
              </select>

              <label >Includes Deposit</label>
              <select value={deposit} name="restricted" onChange={(e) => {setDeposit(e.target.value)}}>
                  <option value="Y">Yes</option>
                  <option value="N">No</option>
                  <option value=" ">N/A</option>
              </select>
          </div>
          {duplicate && <div style={{color: "black"}}>{"This address already exists in our database, but we appreciate your submission."}</div>}
          {success && <div style={{color: "black"}}>{"Submitted Successfully!"}</div>}
          <input className="form-submit-button" type="submit" value="Submit" />
            </form>
        </div>
        <br></br>
        <div style={{fontSize:"20px"}}><Link to="/">Go back</Link></div>
        </>
    )
}

export default SubmitATM
