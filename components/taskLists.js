import React,{useContext, useState} from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BsStopwatch } from 'react-icons/bs'
import { HiOutlineChevronRight } from 'react-icons/hi'
import styles from './taskLists.module.css'
import { GlobalStateContext, GlobalDispatchContext, ACTIONS } from "@/context/context";

export default function TaskLists() {
  const state = useContext(GlobalStateContext);
  const dispatch = useContext(GlobalDispatchContext);
  const [activeTask, setActiveTask] = useState(0)
  
  const swipeSlide = (index, id) => {
    setActiveTask(index)
    dispatch({type: ACTIONS.SWIPE_SLIDE, payload:index})
    dispatch({type: ACTIONS.CURRENT_TASK_ID, payload:id})
  }

  return (
    <Row className={`mt-5 ${styles.row}`}>
      {state.tasks && state.tasks.map((t,index)=>{
        return(
          <Col
            lg={12} key={t.id}
            onClick={()=>swipeSlide(index, t.id)}
            role="button"
            style={{'backgroundColor': t.theme}}
            className={`list mb-4 border p-4 d-flex justify-content-between bg-opacity-75 ${activeTask == index ? styles.activeTask:''}`}
          >
            <div className='h4 m-0'>{t.name}</div>

            <div className='d-flex align-items-center'>
              <span>{t.length}</span>
              <BsStopwatch className='mx-1 h4 m-0' />
              <HiOutlineChevronRight />
            </div>
          </Col>
        )
      })}
      {state.tasks == false && (<p>Please add your new tasks by clicking the plus button.</p>)}
    </Row>
  );
}