import React from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BsStopwatch } from 'react-icons/bs'
import { HiOutlineChevronRight } from 'react-icons/hi'
import styles from './taskLists.module.css'

export default function TaskLists() {
  return (
    <Row className={`mt-5 ${styles.row}`}>
      <Col lg={12} className="list mb-4 border p-4 d-flex justify-content-between bg-warning bg-opacity-75">
        <div className='h4 m-0'>Design the App</div>

        <div className='d-flex align-items-center'>
          <span>120</span>
          <BsStopwatch className='mx-1 h4 m-0' />
          <HiOutlineChevronRight />
        </div>
      </Col>
      <Col lg={12} className="list mb-4 border p-4 d-flex justify-content-between bg-success bg-opacity-75">
        <div className='h4 m-0'>Mobile Dev Sync</div>

        <div className='d-flex align-items-center'>
          <span>30</span>
          <BsStopwatch className='mx-1 h4 m-0' />
          <HiOutlineChevronRight />
        </div>
      </Col>
      <Col lg={12} className="list mb-4 border p-4 d-flex justify-content-between bg-danger bg-opacity-75">
        <div className='h4 m-0'>Lunch with Family</div>

        <div className='d-flex align-items-center'>
          <span>40</span>
          <BsStopwatch className='mx-1 h4 m-0' />
          <HiOutlineChevronRight />
        </div>
      </Col>
    </Row>
  );
}