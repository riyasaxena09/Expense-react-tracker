import { useNavigate } from "react-router-dom";
function Welcome(){
 const nav=useNavigate();
    function move(e){
        e.preventDefault();
        nav('/con');
       
    }
    function verify(e){
        e.preventDefault();
        
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBr8QUNIcET_N7fAjDUsO-MOeRg0Ntc8zc',{
        method:'POST',
        body:JSON.stringify({
            idToken:localStorage.getItem("token"),
            requestType:"VERIFY_EMAIL",
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
      
  
    })
    }

    return(
        <>
<div>
        <h1>Welcome to the page</h1>
     <p>Your profile is incomplete plz<button onClick={move}>complete now</button></p>  
     <button onClick={verify}>Verify email</button>
     </div>
        <hr></hr>
        </>
    )
}
export default Welcome;