import React,{useState, useContext, useEffect} from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {BsStopwatch} from 'react-icons/bs'
import {RiDashboardLine} from 'react-icons/ri'
import styles from './addTasks.module.css'
import {reactLocalStorage as ls} from 'reactjs-localstorage';
import uniqid from 'uniqid';
import { GlobalDispatchContext, GlobalStateContext, ACTIONS } from "@/context/context";

export default function AddTasks({show, handleClose}) {
  const dispatch = useContext(GlobalDispatchContext);
  const state = useContext(GlobalStateContext);

  const [txtValues, setTxtValues] = useState({
    name:"",
    length:"",
    theme:"#fff700",
  })

  const [disableButton, setDisableButton] = useState(true)

  useEffect(()=>{
    const currentTask = state.tasks.filter((t)=>t.id === state.currentTaskID)

    if (state.crud === "edit" && state.tasks.length > 0){
      setTxtValues({
        name:currentTask ? currentTask[0].name : "",
        length:currentTask ? currentTask[0].length : "",
        theme:currentTask ? currentTask[0].theme : "",
      })
    } else {
      resetTxtValues()
    }

  },[state])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTxtValues({ ...txtValues, [name]: value });
  };

  useEffect(()=>{
    if (txtValues.name && txtValues.length && txtValues.theme){
      setDisableButton(false)
    } else {
      setDisableButton(true)
    }
  },[txtValues])

  const handleSave = ()=> {
    let id
    if (state.crud === "add"){
      id = uniqid()
  
      const hasTask = ls.get("dailyTasks")
  
      if (hasTask){
        let tasks = ls.getObject("dailyTasks")
        ls.setObject("dailyTasks", tasks.concat({id, ...txtValues}))
      } else {
        ls.setObject("dailyTasks", [{id, ...txtValues}])
      }
    } else if (state.crud === "edit"){
      let tasks = ls.getObject("dailyTasks")
      id = state.currentTaskID
      let newTasks = tasks.map(t => {
        if (t.id === state.currentTaskID) {
          t.name = txtValues.name
          t.length = txtValues.length
          t.theme = txtValues.theme
        }
        return t
      })

      ls.setObject("dailyTasks", newTasks)
    }

    resetTxtValues()
    handleClose()
    dispatch({type: ACTIONS.REFRESH})
    dispatch({type: ACTIONS.CURRENT_TASK_ID, payload:id})
  }

  const deleteTask = ()=>{
    let tasks = ls.getObject("dailyTasks")
    let newTasks = tasks.filter(t=>t.id !== state.currentTaskID)

    ls.setObject("dailyTasks", newTasks)

    resetTxtValues()
    handleClose()
    dispatch({type: ACTIONS.REFRESH})
    dispatch({type: ACTIONS.SET_CRUD, payload:"add"})
    if (newTasks.length > 0){
      dispatch({type: ACTIONS.CURRENT_TASK_ID, payload:newTasks[0].id})
    }
    dispatch({type: ACTIONS.SWIPE_SLIDE, payload:0})
  }

  const resetTxtValues = ()=>{
    setTxtValues({
      name:"",
      length:"",
      theme:"#fff700",
    })
  }

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg" centered>
        {state.crud !== "add" && (
          <Modal.Header>
          <span/>
          <button className={`btn btn-transparent text-primary fw-bold`} onClick={deleteTask}>
            <span className="h4 m-0">Delete</span>
          </button>
        </Modal.Header>
        )}
        <Modal.Body className="p-5 m-4">
          <div className="row">
            <div className="col">
              <form action="" className='p-0'>
                <div className={`mb-3 ${styles.border}`}>
                  <input type="text" onChange={handleInputChange} value={txtValues.name} name='name' id="name"className="form-control-lg w-100 rounded-0 border-0"  placeholder="Design the app"/>
                </div>

                <div className={`mb-3 ${styles.border}`}>
                  <div className="input-group-lg d-flex w-100">
                    <span className="input-group-text rounded-0 flex-fill" id="basic-addon3">
                      <BsStopwatch className='h3 m-0 me-2'/> Length
                    </span>
                    <input type="number" onChange={handleInputChange} value={txtValues.length} name='length' id="length" className="form-control-lg text-end flex-stretch border-0 rounded-0" aria-describedby="basic-addon3"/>
                    <span className="input-group-text rounded-0" id="basic-addon2">Minutes</span>
                  </div>
                </div>

                <div className={`mb-3 ${styles.border}`}>
                  <div className="input-group-lg d-flex border-2">
                    <span className="input-group-text flex-fill rounded-0" id="basic-addon3">
                      <RiDashboardLine className='h3 m-0 me-2'/> Theme
                    </span>
                    
                    <input type="color" onChange={handleInputChange} value={txtValues.theme} name='theme' id="theme" className="form-control-lg form-control-color border-0 ms-auto rounded-0"  title="Choose your color"/>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button variant="transparent" size="lg" onClick={handleClose}>
            Cancel
          </Button>
          <Button disabled={disableButton} variant="primary" size="lg" className="px-5" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}