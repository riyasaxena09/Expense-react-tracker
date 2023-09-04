import { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import MyContext from "./Context";

function Welcome(){
    const {object,setobj}=useContext(MyContext);
    const [m,setm]=useState('');
    const [d,setd]=useState('');
    const [c,setc]=useState('');
  
    function moneyhandler(e){
setm([e.target.value]);
    }
    function catehandler(e){
        setc([e.target.value]);
            }
            function deshandler(e){
                setd([e.target.value]);
                    }
 const nav=useNavigate();
 function Submit(e){
e.preventDefault();
const obj={
    money:m,
    des:d,
    cate:c,
}
setobj([...object,obj]);

}
console.log(object);
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
        <form onSubmit={Submit}>
            <label>Money spent</label>
            <input onChange={moneyhandler}></input>
            <label>Description</label>
            <input onChange={deshandler}></input>
            <label>category</label>
            <select  onChange={catehandler}><option>Food</option>
            <option>Fuel</option>
            <option>Food</option></select>
            <button>Add</button>
        </form>
     <div>{object.map((item)=>{
        return (
        <li>{item.money}
        {item.des}
        {item.cate}</li>
        )
     })}</div>
        </>
    )
}
export default Welcome;