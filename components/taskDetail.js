import React, {useContext, useEffect, useRef, useState} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper";
import {FaHourglassEnd, FaHourglassStart} from "react-icons/fa"
import {BsStopCircle, BsPlayCircle, BsPauseCircle} from 'react-icons/bs'
import styles from './taskDetail.module.css'
import { GlobalStateContext, GlobalDispatchContext, ACTIONS } from "@/context/context";
import Countdown,{zeroPad} from 'react-countdown';

const renderer = ({hours, minutes, seconds, completed, props }) => {
  const {name, length} = props.props

  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <div className="text-start">
          <p className="mb-2">Minutes Elapsed</p>
          <div className="d-flex align-items-center">
            <FaHourglassEnd className="h1 m-0"/>
            <strong>{(parseInt(length)) - (minutes  + (hours * 60))}</strong>
          </div>
        </div>
        <div className="text-end">
          <p className="mb-2">Minutes Remaining</p>
          <div>
            <strong>{minutes  + (hours * 60)}</strong>
            <FaHourglassStart className="h1 m-0"/>
          </div>
        </div>
      </div>
      <div className="text-center">
        <h2>{name}</h2>
        <div className="d-flex align-items-start justify-content-center">
          <div>
            <div className={styles.time}>{zeroPad(minutes + (hours * 60))}</div>
            <div>Minutes</div>
          </div>
          <div className={styles.time}>:</div>
          <div>
            <div className={styles.time}>{zeroPad(seconds)}</div>
            <div>Seconds</div>
          </div>
        </div>

        {completed && (<div className="h1 m-0 text-danger">Times Up!!</div>)}
      </div>
    </>
  )
};

const TaskCountdown = ({length, name, theme}) => {
  const [date, setDate] = useState(Date.now())

  const countdownRef = useRef();
  const handleStart = () => {
    if (countdownRef.current.isCompleted()){
      setDate(Date.now())
    }
    countdownRef.current.start()
  };
  const handlePause = () => countdownRef.current.pause();
  const handleStop = () => {
    countdownRef.current.stop()
    setDate(Date.now())
  };

  return (
    <>
    <div className="col-lg-6 offset-lg-3 p-5 d-flex flex-column justify-content-between h-100" style={{'backgroundColor': theme}}>
      <Countdown 
        date={date + parseInt(length) * 60000} 
        renderer={renderer} 
        daysInHours
        autoStart={false}
        ref={countdownRef}
        props={{name, length }}
      />
      <div className="d-flex align-items-center justify-content-center">
        <button className="btn text-danger" onClick={handleStop}><BsStopCircle className={styles.stop_pause}/></button>
        <button className="btn text-primary" onClick={handleStart}><BsPlayCircle className={styles.play}/></button>
        <button className="btn text-muted" onClick={handlePause}><BsPauseCircle className={styles.stop_pause}/></button>
      </div>
    </div>
    </>
  );
}

export default function TaskDetail({handleShow}) {
  const state = useContext(GlobalStateContext)
  const dispatch = useContext(GlobalDispatchContext)
  const swiperRef = useRef(null)

  useEffect(()=>{
    swiperRef.current.swiper.slideTo(state.currentSlide);
  }, [state.currentSlide])

  const editTask = ()=>{
    handleShow()
    dispatch({type: ACTIONS.SET_CRUD, payload:"edit"})
  }

  return (
    <div className="position-relative h-100">
      {state.tasks.length > 0 && (
        <button className={`btn position-absolute btn-transparent text-primary fw-bold mt-4 ${styles.edit}`}onClick={editTask}><span className="h4">Edit</span></button>
      )}
      <Swiper
        ref={swiperRef}
        navigation={true} pagination={true}
        modules={[Navigation, Pagination]}
        className="w-100 h-100 p-5"
        onSlideChange={(swiper) => {
          let id = swiper.slides[swiper.activeIndex].id
          dispatch({type: ACTIONS.CURRENT_TASK_ID, payload:id})
        }}
      >
        {state.tasks && state.tasks.map(t=>(
          <SwiperSlide key={t.id} id={t.id} className="text-center d-flex align-items-center justify-content-center">
            <div className="row w-100 h-100">
              <TaskCountdown length={t.length} name={t.name} theme={t.theme}/>
            </div>
          </SwiperSlide>
        ))}
        {state.tasks == false && (
          <SwiperSlide className="text-center d-flex align-items-center justify-content-center">
            No tasks found.
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
}