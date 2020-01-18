import {FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILURE} from '../constants';

const initialState ={
state: {},
error : {},
isRequesting: false
}

const forgotPassword = (state = initialState, action) =>{
  
  switch(action.type){
      case FORGOT_PASSWORD_REQUEST:{
        return(Object.assign({}, state ,{
            data:{}, 
            error:{}, 
            isRequesting: true
        }))
      }
      case FORGOT_PASSWORD_SUCCESS:{
       return Object.assign({}, state ,{
            data:action.payload.data , 
            error:{}, 
            isRequesting: false
        })
      }
       case FORGOT_PASSWORD_FAILURE:{
        console.log(" Reduxer ==== payload=====", action.payload.error); 
       return Object.assign({}, state ,{
           // state:{ }, 
            error:"Chandni =======" , 
            isRequesting: false
        })
       }
       default: 
         return state;
  }
}

export default forgotPassword