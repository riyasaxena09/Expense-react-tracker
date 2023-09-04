import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
function Forget(){
    const [load,setload]=useState(false);
    const nav=useNavigate();
  function login(){
nav('/')
  }
    const mail=useRef();
         function forg(e){
            e.preventDefault();
            setload(true);
    const email=mail.current.value;
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBr8QUNIcET_N7fAjDUsO-MOeRg0Ntc8zc',{
        method:'POST',
        body:JSON.stringify({
            email:email,
            requestType:"PASSWORD_RESET",
        }),
        headers:{
            'Content-type':'aplication/json',
        },
    }).then((res)=>{
        if(res.ok){
return res.json();
   }else{
            return res.json().then((data)=>{
                let errormsg="not a valid email";
               // if(data && data.error && data.error.message){
                 //   errormsg=data.error.message;
               // }
               throw new Error(errormsg);
            });
        }
    }).then((data)=>{
        console.log(data);
        setload(false);
    })
}
    return (
        <>
        <form onSubmit={forg}>
            <label>Enter email</label>
            <input ref={mail}></input>
            {load && <p>loading.......</p>}
            <button onClick={login}>login</button>
            <button>send</button>
        </form>
        </>
    )
}
export default Forget;