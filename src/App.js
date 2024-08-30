import React, { useState } from "react";
import validator from 'validator'

const App = () => {

  const [errorMessage, setErrorMessage] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const setfields = (field, value) =>{
    if (field === "username"){
      setUsername(value)
    }else{
      setPassword(value)
    }
  }

  const validate = () => {
    if (username === password) {
      setErrorMessage("username and password can't be the same");
    } else if (validator.isStrongPassword(password, {
      minLength: 14,
      minLowercase: 3,
      minUppercase: 3,
      minNumbers: 3,
      minSymbols: 1
    })) {
      setErrorMessage('Is Strong Password');
    } else {
      const upperCase = password.match(/[A-Z]/g);
      const lowerCase = password.match(/[a-z]/g);
      const specialChar = password.match(/[!@#$%^&*(),.?":{}|<>]/g);
  
      console.log(password, '\n', upperCase, '\n', lowerCase, '\n', specialChar);
      
      if (password.length < 14) {
        setErrorMessage(`Is Not Strong Password because length is ${password.length} < 14`);
      } else if (!upperCase || upperCase.length < 3) {
        setErrorMessage(`Is Not Strong Password because uppercase letters are ${upperCase ? upperCase.length : 0} < 3`);
      } else if (!lowerCase || lowerCase.length < 3) {
        setErrorMessage(`Is Not Strong Password because lowercase letters are ${lowerCase ? lowerCase.length : 0} < 3`);
      } else if (!specialChar || specialChar.length < 1) {
        setErrorMessage('Is Not Strong Password because no special character is present');
      } else {
        setErrorMessage('Password is valid but not strong enough.');
      }
    }
  };
  

  return (
    <div style={{
      marginLeft: '200px',
    }}>
      <pre>
        <h2>Welcome to Validator</h2>
        <span>Enter Username:</span><input type="text" onChange={(e) => setfields("username", e.target.value)}></input><br />
        <span>Enter Password: </span><input type="password"
          onChange={(e) => setfields("password", e.target.value)}></input> <br />
        {errorMessage === '' ? null :
          <span style={{
            fontWeight: 'bold',
            color: 'red',
          }}>{errorMessage}</span>}
      </pre>
      <div>
        <button type="submit" onClick={validate}>Validate</button>
      </div>
    </div>
  );
}

export default App
