import { useEffect } from "react";
import { useCallback } from "react";
import { useState,useRef } from "react"
import './App.css'

function App() {
 const[length, setLength] = useState(8);
 const [numberAllowed,setNumberAllowed] = useState(false);
 const [specialCharaterAllowed,setSpecialCharacterAllowed] = useState(false);
 const[password,setPassword] = useState('');
 const passwordRef = useRef(null)

 const passwordGenerator = useCallback(()=>{
  let pass= '';
  let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  if(numberAllowed){
    str +="0123456789"
  }
  if(specialCharaterAllowed){
    str +="!@#$%^&*()_+?"
  }
  for(let i=1;i<=length;i++){
    let char =  Math.floor(Math.random() * str.length+1);
      console.log(char)
    pass +=str.charAt(char);
   console.log(pass)
    
  }
  setPassword(pass)
 

 },[length,numberAllowed,specialCharaterAllowed,setPassword])

 
useEffect(()=>{
passwordGenerator()
},[passwordGenerator])

const copyToTheClip =useCallback(()=>{
  if (password) {
    navigator.clipboard.writeText(password)
      .then(() => {
        if (passwordRef.current) {
          passwordRef.current.select(); // Selecting input field content
        }
      })
      .catch((error) => console.error('Failed to copy:', error));
  }
 }, [password]);



  return (
    <>
   <div className="password-generator">
     <h2>password generator</h2>
    <div className="container">

      <div className="pswd-copy">
<input ref={passwordRef} onChange={(e)=>{setPassword(e.target.value)}} type="text" value={password} />
      <button onClick={copyToTheClip}>Copy</button>
      </div>
      <div className="length-range">
      <input type="range" min={3} max={20} value={length} onChange={(e)=>{setLength(e.target.value)}}/>
     <label>length:{length}</label>
      </div>
      <div className="input-checkboxes">
      <input type="checkbox" checked={numberAllowed} onChange={()=>setNumberAllowed(prev=>!prev)} />
     <label>numbers allowed</label>
     <input type="checkbox" checked={specialCharaterAllowed} onChange={()=>setSpecialCharacterAllowed(prev=>!prev)}/>
     <label>Special Characters allowed</label>


      </div>
      <button className="btn" onClick={passwordGenerator}>Generate new password</button>



    </div>

   </div>


     {/* <h2>password generator</h2>
     <div>
      <input ref={passwordRef} onChange={(e)=>{setPassword(e.target.value)}} type="text" value={password} />
      <button onClick={copyToTheClip}>Copy</button>
      <button onClick={passwordGenerator}>Generate new password</button>
     </div>
     <input type="checkbox" checked={numberAllowed} onChange={()=>setNumberAllowed(prev=>!prev)} />
     <label>numbers allowed</label>
     <input type="checkbox" checked={specialCharaterAllowed} onChange={()=>setSpecialCharacterAllowed(prev=>!prev)}/>
     <label>Special Characters allowed</label>
     <input type="range" min={3} max={20} value={length} onChange={(e)=>{setLength(e.target.value)}}/>
     <label>length:{length}</label> */}
     

    </>
  )
}

export default App
