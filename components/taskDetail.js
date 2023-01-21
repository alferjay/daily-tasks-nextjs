import React, {useContext, useEffect, useRef} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper";
import {FaHourglassEnd, FaHourglassStart} from "react-icons/fa"
import {BsStopCircle, BsPlayCircle, BsPauseCircle} from 'react-icons/bs'
import styles from './taskDetail.module.css'
import { GlobalStateContext, GlobalDispatchContext, ACTIONS } from "@/context/context";

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
              <div className="col-lg-6 offset-lg-3 p-5 d-flex flex-column justify-content-between h-100" style={{'backgroundColor': t.theme}}>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="text-start">
                    <p className="mb-2">Minutes Elapsed</p>
                    <div className="d-flex align-items-center">
                      <FaHourglassEnd className="h1 m-0"/>
                      <strong>00</strong>
                    </div>
                  </div>
                  <div className="text-end">
                    <p className="mb-2">Minutes Remaining</p>
                    <div>
                      <strong>{t.length}</strong>
                      <FaHourglassStart className="h1 m-0"/>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <h2>{t.name}</h2>

                  <div className="d-flex align-items-start justify-content-center">
                    <div>
                      <div className={styles.time}>{t.length}</div>
                      <div>Minutes</div>
                    </div>
                    <div className={styles.time}>:</div>
                    <div>
                      <div className={styles.time}>00</div>
                      <div>Seconds</div>
                    </div>
                  </div>
                </div>

                <div className="d-flex align-items-center justify-content-center">
                  <button className="btn text-danger"><BsStopCircle className={styles.stop_pause}/></button>
                  <button className="btn text-primary"><BsPlayCircle className={styles.play}/></button>
                  
                  <button className="btn text-muted"><BsPauseCircle className={styles.stop_pause}/></button>
                </div>
              </div>
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