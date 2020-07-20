import globalHook from 'use-global-hook';
import React from 'react';
const initialState = {
  firstname : ' ',
  lastname : ' ',
  avatarurl: '',
  smsAuth : '',
  multi_tags : [],
  multi_suggestions : [],
  multi_ID: []
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
    },
    setMultiTags: (store, multi_tags)=>{
        store.setState({multi_tags : multi_tags});
    },
    setMultiSuggestions : (store, multi_suggestions)=>{
        store.setState({multi_suggestions: multi_suggestions});
    },
    setMultiID : (store, multi_ID)=>{
        store.setState({multi_ID: multi_ID});
    }
};
 
const useGlobal = globalHook(React, initialState, actions);

export default useGlobal;