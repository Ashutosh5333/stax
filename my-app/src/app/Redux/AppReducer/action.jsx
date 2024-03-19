import * as types from "./ActionTypes"
import axios from "axios"

const getdatareq = () => {
    return {
      type: types.GETDATAREQ,
    };
  };
  
  const getdatasuccess = (payload) => {
    return {
      type: types.GETDATASUCESS,
      payload,
    };
  };
  
  const getdatafailure = () => {
    return {
      type: types.GETDATAFAILURE,
    };
  };

  // create workflow post 

  
const Createdatareq = () => {
  return {
    type: types.CREATEWORKFLOWREQ,
  };
};

const Createdatasuccess = (payload) => {
  return {
    type: types.CREATEWORKFLOWSUCESS,
    payload,
  };
};

const Createdatafailure = () => {
  return {
    type: types.CREATEWORKFLOWSUCESS,
  };
};



 export  const Getdata = (dispatch) => {
      dispatch(getdatareq())
      return axios.get(`https://pear-average-caterpillar.cyclic.app/work/data`)
      .then((res) =>{
  return     dispatch(getdatasuccess(res.data))
      })
      .catch((err) =>{
 return    dispatch(getdatafailure())
      })
   }
  
   
   
 export  const WorkflowPost = (payload) => (dispatch) => {
  dispatch(Createdatareq())
  return axios.post(`https://pear-average-caterpillar.cyclic.app/work/create` ,payload)
  .then((res) =>{
return     dispatch(Createdatasuccess(res.data))
  })
  .catch((err) =>{
return    dispatch(Createdatafailure())
  })
}

