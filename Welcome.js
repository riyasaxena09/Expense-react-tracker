import { useState,useContext, useEffect,useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import MyContext from "./Context";

function Welcome(){
    const {load,setload,object,setobject}=useContext(MyContext);
 const moneyhandler=useRef();
 const deshandler=useRef();
 const catehandler=useRef();
 const e=[];

 //   const [m,setm]=useState('');
   // const [d,setd]=useState('');
    //const [c,setc]=useState('');
    const bsdk=useCallback(async()=>{
        try{
            const response =await fetch('https://storedata-1b64f-default-rtdb.firebaseio.com/riya.json')
        
if(!response.ok){
throw new Error('something wenr wrong');
}
const data=await response.json();
for(const key in data){
 e.push({
    money:data[key].money,
    des:data[key].des,
    cate:data[key].cate,
 })
}
setload(e);
        }
   catch(error){

    }
   
},[])

useEffect(()=>{
    bsdk();
      },[object]);
  
 
  console.log(load)
   // function moneyhandler(e){
//setm([e.target.value]);
  //  }
    //function catehandler(e){
      //  setc([e.target.value]);
        //    }
          //  function deshandler(e){
            //    setd([e.target.value]);
              //      }
 const nav=useNavigate();
 function Submit(e){
e.preventDefault();
const m=moneyhandler.current.value;
const d=deshandler.current.value;
const c=catehandler.current.value;
const obj={
    money:m,
    des:d,
    cate:c,
}
setobject(obj);

fetch('https://storedata-1b64f-default-rtdb.firebaseio.com/riya.json', 
{
     method:'POST',
body:JSON.stringify(obj),
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
            <input ref={moneyhandler}></input>
            <label>Description</label>
            <input ref={deshandler}></input>
            <label>category</label>
            <select ref={catehandler}><option>Food</option>
            <option>Fuel</option>
            <option>Food</option></select>
            <button>Add</button>
        </form>
    <div>
        {load.map((item)=>{
           return(<li> {item.money} {item.des}{item.cate}</li>
           )
        })
        }
    </div>
        </>
    )
}
export default Welcome;