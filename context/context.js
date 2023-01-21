import React, { useState, useReducer, useEffect } from "react"
export const GlobalStateContext = React.createContext()
export const GlobalDispatchContext = React.createContext()
import {reactLocalStorage as ls} from 'reactjs-localstorage'

export const ACTIONS = {
  INIT: "INIT",
  REFRESH: "REFRESH",
  SWIPE_SLIDE: "SWIPE_SLIDE",
  CURRENT_TASK_ID: "CURRENT_TASK_ID",
  SET_CRUD: "SET_CRUD",
}

const initialState = {
  tasks:[],
  currentSlide:0,
  currentTaskID:null,
  crud:"add"
}

function reducer(state, action) {
  let { type, payload } = action;
  switch (type) {
    case ACTIONS.INIT:
      return {
        ...state,
        tasks: payload.tasks,
        currentTaskID: payload.first ? payload.first.id : 0
      };
    case ACTIONS.REFRESH:
      const tasks = ls.getObject("dailyTasks")
      return {
        ...state,
        tasks: tasks,
      };
    case ACTIONS.SWIPE_SLIDE:
      return {
        ...state,
        currentSlide: payload
      };
    case ACTIONS.CURRENT_TASK_ID:
      return {
        ...state,
        currentTaskID: payload
      };
    case ACTIONS.SET_CRUD:
      return {
        ...state,
        crud: payload
      };

    default:
      return state;
  }
}

const Context = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(()=>{
    const hasTask = ls.get("dailyTasks")
    if (hasTask){
      const tasks = ls.getObject("dailyTasks")
      dispatch({type:ACTIONS.INIT, payload:{tasks, first:tasks[0]}})
    }
  },[])

  return (
    <GlobalStateContext.Provider value={state}>
      <GlobalDispatchContext.Provider value={dispatch}>
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  );
};

export default Context;