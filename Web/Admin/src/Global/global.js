import globalHook from 'use-global-hook';
import React from 'react';
const initialState = {
  firstname : '',
  lastname : '',
  avatarurl: '',
  smsAuth : '',
};
 
const actions = {
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
    }
};
 
const useGlobal = globalHook(React, initialState, actions);

export default useGlobal;