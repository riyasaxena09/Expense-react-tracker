import { ItemActions } from "./items"
import { CartActions } from "./cartred"
export const fetchCartdata=()=>{
    return async(dispatch)=>{
        
        const fetchData=async()=>{
        const response=await fetch('https://ndproject-7bafc-default-rtdb.firebaseio.com/cart.json')
       
        if(!response.ok){
            throw new Error('fetching failed');
        }
        const data=await response.json(); 
        return data;
    };
    try{
        const cartData=await fetchData();
        console.log(cartData)
        dispatch(ItemActions.replaceCart({
            items:cartData.Items||[],
            totalQuantity:cartData.totalQuantity,
        }));
    }catch(error){
        dispatch(CartActions.showNotification({
            status:'error',
            title:'error',
            message:'hy'
          }))
    }
    }
}
export const sendCarddata=(cart)=>{
    console.log(cart)
    return async(dispatch)=>{
        dispatch(CartActions.showNotification({
            status:'pending',
            title:'pending',
            message:'now it is pending'
          }));
          const sendRequest=async()=>{
            const response=await fetch('https://ndproject-7bafc-default-rtdb.firebaseio.com/cart.json',{
                method:'PUT',
                body:JSON.stringify(cart),
            });
            if(!response.ok){
              throw new Error('something went wrong');
            }
          };
          try{
            await sendRequest();
            dispatch(CartActions.showNotification({
                status:'success',
                title:'success',
                message:'Request is succesful'
              }))
          }
        catch(error){
            dispatch(CartActions.showNotification({
                status:'error',
                title:'error',
                message:'Failed to request'
              }))
        }
     
    }
}
