import React from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {BsStopwatch} from 'react-icons/bs'
import {RiDashboardLine} from 'react-icons/ri'
import styles from './addTasks.module.css'

export default function AddTasks({show, handleClose}) {
  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg" centered>
        
        <Modal.Body className="p-5 m-4">
          <div className="row">
            <div className="col">
              <form action="" className='p-0'>
                <div className={`mb-3 ${styles.border}`}>
                  <input type="text" className="form-control-lg w-100 rounded-0 border-0" id="exampleFormControlInput1" placeholder="Design the app"/>
                </div>

                <div className={`mb-3 ${styles.border}`}>
                  <div className="input-group-lg d-flex w-100">
                    <span className="input-group-text rounded-0 flex-fill" id="basic-addon3">
                      <BsStopwatch className='h3 m-0 me-2'/> Length
                    </span>
                    <input type="number" className="form-control-lg text-end flex-stretch border-0 rounded-0" id="basic-url" aria-describedby="basic-addon3"/>
                    <span className="input-group-text rounded-0" id="basic-addon2">Minutes</span>
                  </div>
                </div>

                <div className={`mb-3 ${styles.border}`}>
                  <div className="input-group-lg d-flex border-2">
                    <span className="input-group-text flex-fill rounded-0" id="basic-addon3">
                      <RiDashboardLine className='h3 m-0 me-2'/> Theme
                    </span>
                    
                    <input type="color" className="form-control-lg form-control-color border-0 ms-auto rounded-0" id="exampleColorInput" title="Choose your color"/>
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
          <Button variant="primary" size="lg" className="px-5" onClick={handleClose}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}