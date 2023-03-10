import React, {useState, useContext} from "react";
import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import {BsPlusLg} from 'react-icons/bs'
import TaskDetail from '@/components/taskDetail'
import AddTasks from '@/components/addTasks'
import TaskLists from '@/components/taskLists'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ACTIONS, GlobalDispatchContext } from "@/context/context";


export default function Home() {
  const dispatch = useContext(GlobalDispatchContext);
  const [showModal, setModal] = useState(false);

  const handleClose = () => setModal(false);
  const handleShow = () => setModal(true);

  const addTask = ()=>{
    dispatch({type: ACTIONS.SET_CRUD, payload:"add"})
    handleShow()
  }

  return (
    <>
      <Head>
        <title>DailyTask App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container>
          <Row>
            <Col lg={4} className="position-relative pe-lg-5 border-end">
              <button className={`position-absolute btn btn-transparent fw-bolder mt-4 ${styles.plus}`}  onClick={addTask}>
                <span className='fw-bold h1 text-primary'><BsPlusLg/></span>
              </button>
              <h1 className='mt-5'>Daily Tasks</h1>
              <TaskLists/>
            </Col>
            <Col lg={8} className="vh-100">
              <TaskDetail handleClose={handleClose} handleShow={handleShow}/>
            </Col>
          </Row>
        </Container>
      </main>
      <AddTasks show={showModal} handleClose={handleClose}/>
    </>
  )
}
