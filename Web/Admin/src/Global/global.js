import globalHook from 'use-global-hook';
import React from 'react';
const initialState = {
  ID : -1,
  firstname : ' ',
  lastname : ' ',
  avatarurl: '',
  smsAuth : '',
};
 
const actions = {
    setID: (store, id)=>{
        store.setState({ID : id});
    },
    setFirstName: (store, firstname)=>{
        store.setState({firstname : firstname});
    },
    setLastName: (store, lastname)=>{
        store.setState({lastname : lastname});
    },
    setAvatarUrl: (store, avatarurl)=>{
        store.setState({avatarurl : avatarurl});
    },
    setSmsAuth : (store, smsAuth)=>{
        store.setState({smsAuth: smsAuth});
    },
};
 
const useGlobal = globalHook(React, initialState, actions);

export default useGlobal;