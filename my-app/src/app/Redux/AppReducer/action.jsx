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

// Login post

const loginreq = () => {
  return {
    type: types.LOGINPOSTREQ,
  };
};

const loginsuccess = (payload) => {
  return {
    type: types.LOGINPOSTSUCESS,
    payload,
  };
};

const loginfailure = () => {
  return {
    type: types.LOGINPOSTFAILURE,
  };
};

// create workflow post 


const signupreq = () => {
return {
  type: types.SIGNUPREQ,
};
};

const signupsuccess = (payload) => {
return {
  type: types.SIGNUPSUCESS,
  payload,
};
};

const signupfailure = () => {
return {
  type: types.SIGNUPFAILURE,
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


//  Signup 

export  const SignupPost = (payload) => (dispatch) => {
  dispatch(signupreq())
  return axios.post(`https://pear-average-caterpillar.cyclic.app/user/register` ,payload)
  .then((res) =>{
return     dispatch(signupsuccess(res.data))
  })
  .catch((err) =>{
return    dispatch(signupfailure())
  })
}

//  Login 

export  const LoginPost = (payload) => (dispatch) => {
  dispatch(loginreq())
  return axios.post(`https://pear-average-caterpillar.cyclic.app/user/login` ,payload)
  .then((res) =>{
return     dispatch(loginsuccess(res.data))
  })
  .catch((err) =>{
return    dispatch(loginfailure())
  })
}

