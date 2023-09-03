import { useNavigate } from "react-router-dom";
import { useRef } from "react";
function Contact(){
    const nav=useNavigate();
    const email=useRef();
    const url=useRef();
    function submit(e){
e.preventDefault();
const mail=email.current.value;
const urling=url.current.value;
console.log(mail,urling)
let obj={
    idToken:localStorage.getItem("token"),
    displayName:mail,
    photoUrl:urling,
    returnSecureToken:true,
};
try{
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBr8QUNIcET_N7fAjDUsO-MOeRg0Ntc8zc',{
        method:"POST",
        body:JSON.stringify(obj),
headers:{
    "Content-Type":"application/json",
},
    }).then((response)=>{
        if(response.ok){
            return response.json();
        }else{
            alert("failed");
        }
    }).then((data)=>{
        alert("Profile data submitted");
        console.log(data);
    }).catch((e)=>{
        alert("failed")
    })

}
    catch(e){
        alert("failed")
    }

    }

function logout(e){
e.preventDefault();
nav('/');
}
    
    return(
        <>
        <form onSubmit={submit}>
            <h1>Contact Details</h1>
            <label>FullName:</label>      
            <input ref={email}></input>
            <label>Photourl:</label>      
            <input ref={url}></input>
            <button>Update</button>
           
            </form>
            <button onClick={logout}>Logout</button>
        </>
    )
}
export default Contact;