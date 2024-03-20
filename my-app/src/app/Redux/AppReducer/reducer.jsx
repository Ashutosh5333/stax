import * as types from "./ActionTypes"

 const initailState ={
     isLoading:true,
     iserror:false,
      workflow:[],
      loggeduser:null
 }
  //  console.log("insss",initailState)

 export const reducer = (state=initailState,action) =>{
     const {type,payload} =action;

       switch (type){
        case types.GETDATAREQ:
            return {
              ...state,
              isLoading: true,
            };
      
          case types.GETDATASUCESS:
            return {
              ...state,
              isLoading: false,
              workflow: payload,
            };
      
          case types.GETDATAFAILURE:
            return {
              ...state,
              isLoading: true,
              workflow: [],
            };

            case types.LOGGEDUSER:
              return {
                ...state,
                isLoading: true,
                loggeduser: localStorage.getItem("user"),
              };
            default:
                return state
       }

 }