import * as types from "./ActionTypes";
import axios from "axios";

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

const deletereq = () => {
  return {
    type: types.DELETEFLOWREQ,
  };
};

const deletesuccess = (payload) => {
  return {
    type: types.DELETEFLOWSUCESS,
    payload
  };
};

const deletefailure = () => {
  return {
    type: types.DELETEFLOWFAILURE,
  };
};

export const Getdata = (dispatch) => {
  const utoken = localStorage.getItem("token");
  const token = utoken ? JSON.parse(utoken) : null;

  dispatch(getdatareq());
  return axios
    .get(`https://pear-average-caterpillar.cyclic.app/work/valdata`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      return dispatch(getdatasuccess(res.data));
    })
    .catch((err) => {
      return dispatch(getdatafailure());
    });
};

export const WorkflowPost = (payload) => (dispatch) => {
  dispatch(Createdatareq());
  const utoken = localStorage.getItem("token");
  const token = utoken ? JSON.parse(utoken) : null;

  return axios
    .post(
      `https://pear-average-caterpillar.cyclic.app/work/valcreate`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      return dispatch(Createdatasuccess(res.data));
    })
    .catch((err) => {
      return dispatch(Createdatafailure());
    });
};

//  Signup

export const SignupPost = (payload) => (dispatch) => {
  dispatch(signupreq());
  return axios
    .post(`https://pear-average-caterpillar.cyclic.app/user/register`, payload)
    .then((res) => {
      return dispatch(signupsuccess(res.data));
    })
    .catch((err) => {
      return dispatch(signupfailure());
    });
};

//  Login

export const LoginPost = (payload) => (dispatch) => {
  dispatch(loginreq());
  return axios
    .post(`https://pear-average-caterpillar.cyclic.app/user/login`, payload)
    .then((res) => {
      return dispatch(loginsuccess(res.data));
    })
    .catch((err) => {
      return dispatch(loginfailure(err));
    });
};

//   Delete post

export const Deleteflow = (id) => (dispatch) => {
  const utoken = localStorage.getItem("token");
  const token = utoken ? JSON.parse(utoken) : null;

  dispatch(deletereq());
  return axios 
    .delete(`https://pear-average-caterpillar.cyclic.app/work/valdata/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      return dispatch(deletesuccess(res));
    })
    .catch((err) => {
      return dispatch(deletefailure());
    });
};
