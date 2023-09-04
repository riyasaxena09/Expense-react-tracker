import { useNavigate } from "react-router-dom";
import { useState} from "react";

function Contact(){
    const [mail,setemail]=useState();
    const [urling,seturl]=useState();
    

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBr8QUNIcET_N7fAjDUsO-MOeRg0Ntc8zc',{
        method:'POST',
        body:JSON.stringify({
            idToken:localStorage.getItem("token"),
        }),
        headers:{
            'Content-type':'aplication/json',
        },
    }).then((res)=>{
        if(res.ok){
return res.json();
   }else{
            return res.json().then((data)=>{
                let errormsg="need to update";
               // if(data && data.error && data.error.message){
                 //   errormsg=data.error.message;
               // }
               throw new Error(errormsg);
            });
        }
    }).then((data)=>{
        console.log(data.users[0].displayName)
        console.log(data.users[0].photoUrl)
  
    })
        function emailhandler(e){
            setTimeout(()=>{
                setemail(e.target.value);
            },2000)
        }
        
                function urlhandler(e){
                    setTimeout(()=>{
                    seturl(e.target.value); 
                },2000)
                }

    const nav=useNavigate();
function submit(e){
e.preventDefault();

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
            <input onChange={emailhandler}></input>
            <label>Photourl:</label>      
            <input onChange={urlhandler}></input>
            <button>Update</button>
           
            </form>
            <button onClick={logout}>Logout</button>
        </>
    )
}
export default Contact;