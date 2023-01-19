import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper";
import {FaHourglassEnd, FaHourglassStart} from "react-icons/fa"
import {BsStopCircle, BsPlayCircle, BsPauseCircle} from 'react-icons/bs'
import styles from './taskDetail.module.css'

export default function TaskDetail({handleShow}) {
  return (
    <div className="position-relative h-100">
      <button className={`btn position-absolute btn-transparent text-primary fw-bold mt-4 ${styles.edit}`}onClick={handleShow}><span className="h4">Edit</span></button>
      <Swiper navigation={true} pagination={true} modules={[Navigation, Pagination]} className="w-100 h-100 p-5">
        <SwiperSlide className="text-center d-flex align-items-center justify-content-center">
          <div className="row w-100 h-100">
            <div className="col-lg-6 offset-lg-3 bg-warning bg-opacity-75 p-5 d-flex flex-column justify-content-between h-100">
              <div className="d-flex align-items-center justify-content-between">
                <div className="text-start">
                  <p className="mb-2">Minutes Elapsed</p>
                  <div className="d-flex align-items-center">
                    <FaHourglassEnd className="h1 m-0"/>
                    <strong>19</strong>
                  </div>
                </div>
                <div className="text-end">
                  <p className="mb-2">Minutes Remaining</p>
                  <div>
                    <strong>101</strong>
                    <FaHourglassStart className="h1 m-0"/>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <h2>Design the App</h2>

                <div className="d-flex align-items-start justify-content-center">
                  <div>
                    <div className={styles.time}>101</div>
                    <div>Minutes</div>
                  </div>
                  <div className={styles.time}>:</div>
                  <div>
                    <div className={styles.time}>45</div>
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
        <SwiperSlide className="text-center d-flex align-items-center justify-content-center">
          <div className="row w-100 h-100">
            <div className="col-lg-6 offset-lg-3 bg-success bg-opacity-50 p-5 d-flex flex-column justify-content-between h-100">
              <div className="d-flex align-items-center justify-content-between">
                <div className="text-start">
                  <p className="mb-2">Minutes Elapsed</p>
                  <div className="d-flex align-items-center">
                    <FaHourglassEnd className="h1 m-0"/>
                    <strong>19</strong>
                  </div>
                </div>
                <div className="text-end">
                  <p className="mb-2">Minutes Remaining</p>
                  <div>
                    <strong>101</strong>
                    <FaHourglassStart className="h1 m-0"/>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <h2>Mobile Dev Sync</h2>

                <div className="d-flex align-items-start justify-content-center">
                  <div>
                    <div className={styles.time}>101</div>
                    <div>Minutes</div>
                  </div>
                  <div className={styles.time}>:</div>
                  <div>
                    <div className={styles.time}>45</div>
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

        <SwiperSlide className="text-center d-flex align-items-center justify-content-center">
          <div className="row w-100 h-100">
            <div className="col-lg-6 offset-lg-3 bg-danger bg-opacity-50 p-5 d-flex flex-column justify-content-between h-100">
              <div className="d-flex align-items-center justify-content-between">
                <div className="text-start">
                  <p className="mb-2">Minutes Elapsed</p>
                  <div className="d-flex align-items-center">
                    <FaHourglassEnd className="h1 m-0"/>
                    <strong>19</strong>
                  </div>
                </div>
                <div className="text-end">
                  <p className="mb-2">Minutes Remaining</p>
                  <div>
                    <strong>101</strong>
                    <FaHourglassStart className="h1 m-0"/>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <h2>Lunch with Family</h2>

                <div className="d-flex align-items-start justify-content-center">
                  <div>
                    <div className={styles.time}>101</div>
                    <div>Minutes</div>
                  </div>
                  <div className={styles.time}>:</div>
                  <div>
                    <div className={styles.time}>45</div>
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
      </Swiper>
    </div>
  );
}