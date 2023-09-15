import { useState,useContext, useEffect,useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import MyContext from "./Context";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "./redux/login";
import { darkActions } from "./redux/login";
import { CSVLink } from "react-csv";
function Welcome(){
   const [sumu,setsum]=useState(0);
   const [toggle,settoggle]=useState(false);
    const {load,setload}=useContext(MyContext);
    const [behnchod,setbehnchod]=useState('');
const [data,setdata]=useState([]);
  const dispatch=useDispatch();
  const s=useSelector(state=>state.com1.to)
  const mystyle=useSelector(state=>state.com3.style)
  const allow=useSelector(state=>state.com3.allow)
 const moneyhandler=useRef();
 const deshandler=useRef();
 const catehandler=useRef();

 const e=[];
 const m=[];
const [right,setright]=useState(true);

function EditItem(id){
    setright(!right);
    fetch(`https://storedata-1b64f-default-rtdb.firebaseio.com/riya/${id}.json`,{
        method:'DELETE',
        headers:{
            'Content-type':'application/json',
        },
    }).then((res)=>{
        if(res.ok){
    return res.json();
    }else{
            return res.json().then((data)=>{
                let errormsg="not a valid email";
     
               throw new Error(errormsg);
            });
        }
    }).then((data)=>{
        console.log(data);
      setdata(data);
        
    })   
}
console.log(sumu);
console.log(data)
  function bsdk(){
   
    fetch('https://storedata-1b64f-default-rtdb.firebaseio.com/riya.json',{
     method:'GET',
        headers:{
            'Content-type':'application/json',
        },
    }).then((res)=>{
        if(res.ok){
    return res.json();
        }else{
            return res.json().then((data)=>{
                let errormsg="Authentication fault";
               // if(data && data.error && data.error.message){
                 //   errormsg=data.error.message;
               // }
               throw new Error(errormsg);
            });
        }
    }).then((data)=>{
       console.log(data)
       dispatch(expenseActions.add([data]))
       let sum=0;
       for(const key in data){
        console.log(key)
        
       
     e.push({
        money:data[key].money,
        des:data[key].des,
        cate:data[key].cate,
    id:key,
     })
     sum=sum+Number(data[key].money);
    }
    setload(e);
setsum(sum);
dispatch(expenseActions.total(sum))
    })
    .catch((err)=>{
    alert(err.message);
    })        
    }
  console.log(load)
 useEffect(()=>{
   // if(right===true){
    bsdk();
   
//  }
    setright(false);
    
      },[right]);
const nav=useNavigate();
function DeleteItem(id){
console.log(id);
setright(!right);
fetch(`https://storedata-1b64f-default-rtdb.firebaseio.com/riya/${id}.json`,{
    method:'DELETE',
    headers:{
        'Content-type':'application/json',
    },
}).then((res)=>{
    if(res.ok){
return res.json();
}else{
        return res.json().then((data)=>{
            let errormsg="not a valid email";
 
           throw new Error(errormsg);
        });
    }
}).then((data)=>{
    console.log(data);
    bsdk();
})
}
 function Submit(e){
  setright(!right);
e.preventDefault();
const m=moneyhandler.current.value;
const d=deshandler.current.value;
const c=catehandler.current.value;


const obj={
    money:m,
    des:d,
    cate:c,
}

fetch('https://storedata-1b64f-default-rtdb.firebaseio.com/riya.json', 
{
     method:'POST',
body:JSON.stringify(obj),
headers:{
    'Content-type':'application/json',
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
console.log(data.name);
setright(!right);

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
        console.log(data.name);
    })
    }
console.log(s);
function black(e){
    e.preventDefault();
   
   dispatch(darkActions.enable());
}
function Toggle(e){
    e.preventDefault();
 settoggle(!toggle);
    if(toggle===true){
        dispatch(darkActions.enable());
    }else{
        dispatch(darkActions.disable());
    }
}
const headers=[
    {
label:"Money",key:"money"
    },{
        label:"Description",key:"des"
    },{
        label:"Category",key:"cate"
    }
]
const csvLink={
    headers:headers,
    data:load,
    filename:"file.csv",
}
    return(
       <div style={mystyle}>
        
<div>
        <h1>Welcome to the page</h1>
     <p>Your profile is incomplete plz<button onClick={move}>complete now</button></p>  
     <button onClick={verify}>Verify email</button>
     </div>
        <hr></hr>
        <form onSubmit={Submit}>
            <label>Money spent</label>
            <input ref={moneyhandler} ></input>
            <label>Description</label>
            <input ref={deshandler} ></input>
            <label>category</label>
            <select ref={catehandler} ><option>Food</option>
            <option>Fuel</option>
            <option>Food</option></select>
            <button>Add</button>
          
        </form>
        <div>
          {sumu>=10000&&<button onClick={black}>Premium</button>}
          </div>
          <div>
          <button onClick={Toggle}>Toggle</button>
          </div>
          <div>
        <CSVLink {...csvLink}>Download file</CSVLink>
          </div>
    <div>
        {load.map((item)=>{
            
          
           return(
           <li> {item.money} {item.des}{item.cate}<button onClick={()=>DeleteItem(item.id)}>delete</button><button onClick={()=>EditItem(item.id)}>Edit</button></li>
           )
        })

        }
<li>{behnchod.money} {behnchod.des} {behnchod.cate}</li>
    </div>
   
        </div>
    )

}
export default Welcome;