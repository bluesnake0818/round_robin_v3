import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Styles/Input.module.css'

const Input = () => {
  // const [pidOneData, setPidOneData] = useState({
  //   pid: 1, 
  //   arrive: 0, 
  //   burst: 0
  // })
  // const [pidTwoData, setPidTwoData] = useState({
  //   pid: 2, 
  //   arrive: 0, 
  //   burst: 0
  // })
  // const [pidThreeData, setPidThreeData] = useState({
  //   pid: 3, 
  //   arrive: 0, 
  //   burst: 0
  // })
  // const [pidFourData, setPidFourData] = useState({
  //   pid: 4, 
  //   arrive: 0, 
  //   burst: 0
  // })
  
  let processes = [
    {pid: 1, arrivalTime: 0, burstTime: 5},
    {pid: 2, arrivalTime: 1, burstTime: 7},
    {pid: 3, arrivalTime: 0, burstTime: 2},
    {pid: 4, arrivalTime: 2, burstTime: 6},
  ]
  let quantum = 0
  let contextSwitch = 0
  let readyQueue = []
  const evaluation = {
    cpuUtilization: '',
    troughput: 0,
    aveWaitTime: 0,
    aveTurnAroundTime: 0,
  }

  // a process that was pre-empted goes to the end of the queue
  // if a process voluntarily releases a CPU (since the job was done before time quantum was up), the next process gets a full time quantum.

  function runRoundRobin(processes, quantum) { 
    let clock = 0;
    // create a copy of processes array 
    let processesCopy = [...processes]; 
    
    // initialise total time to 0 
    let totalTime = 0; 
    
    // create an array to output the execution order 
    let executionOrder = []; 
    
    // initialise turn around time, waiting time and completion time to 0 
    let turnAroundTime = 0; 
    let waitingTime = 0; 
    let completionTime = 0; 
    
    // while loop until all processes are completed 
    while (processesCopy.length > 0) { 
      // loop through each process 
      for (let i = 0; i < processesCopy.length; i++) { 
        // if the process has not finished yet 
        if (processesCopy[i].burstTime > 0) { 
          // if the burst time is greater than the quantum 
          if (processesCopy[i].burstTime > quantum) { 
            // increment the total time by quantum 
            totalTime += quantum; 
            
            // decrement the burst time of the process by quantum 
            processesCopy[i].burstTime -= quantum; 
            
            // push the pid of the process to executionOrder array 
            executionOrder.push(processesCopy[i].pid); 
          } 
          // if the burst time is less than or equal to the quantum 
          else { 
            // increment the total time by burst time 
            totalTime += processesCopy[i].burstTime; 
            
            // set the completion time of the process 
            completionTime = totalTime; 
            
            // calculate the turn around time 
            turnAroundTime += completionTime - processesCopy[i].arrivalTime; 
            
            // calculate the waiting time 
            waitingTime += completionTime - processesCopy[i].arrivalTime - processesCopy[i].burstTime; 
            
            // push the pid of the process to executionOrder array 
            executionOrder.push(processesCopy[i].pid); 
            
            // remove the process from the processes array 
            processesCopy.splice(i, 1); 
          } 
        } 
      } 
    } 
    
    // calculate the average waiting time 
    let avgWaitingTime = waitingTime / processes.length; 
    
    // calculate the average turn around time 
    let avgTurnAroundTime = turnAroundTime / processes.length; 
    
    // return the execution order, avg waiting time and avg turn around time 
    return { 
      executionOrder, 
      avgWaitingTime, 
      avgTurnAroundTime 
    }; 
  }

  return (
    <main className={styles.container}>
      <button
        className={styles.button}
        onClick={runRoundRobin}
      >
        Run
      </button>
      {/* <form
        autoComplete="off"
        // onSubmit={handleSubmit}
        className={styles.form}
      >
        <div className={styles.inputSection}>
          <div className={styles.row}>
            <label className={styles.input}>
              PID
            </label>
            <label className={styles.input}>
              Arrive
            </label>
            <label className={styles.input}>
              Burst
            </label>
          </div>
          <div className={styles.row}>
            <label className={styles.input}>
              <input 
                type="text" 
                className={styles.textInput} 
                // name="location" 
                // onChange={handleLocationChange}
                // value={location}
              />
            </label>
            <label className={styles.input}>
              <input 
                type="text" 
                className={styles.textInput} 
                // name="numCopies" 
                // onChange={handleNumCopiesChange}
                // value={numCopies}
              />
            </label >
            <label className={styles.input}>
              <input 
                type="text" 
                className={styles.textInput} 
                // name="numCopies" 
                // onChange={handleNumCopiesChange}
                // value={numCopies}
              />
            </label >
          </div>
          <div className={styles.row}>
            <label className={styles.input}>
              <input 
                type="text" 
                className={styles.textInput} 
                // name="product" 
                // onChange={handleProductChange}
                // value={product}
              />
            </label>
            <label className={styles.input}>
              <input 
                type="text" 
                className={styles.textInput} 
                // name="brand" 
                // onChange={handleBrandChange}
                // value={brand}
              />
            </label>
            <label className={styles.input}>
              <input 
                type="text" 
                className={styles.textInput} 
                // name="price" 
                // onChange={handlePriceChange}
                // value={price}
              />
            </label>
          </div>
          <div className={styles.row}>
            <label className={styles.input}>
              <input 
                type="text" 
                className={styles.textInput} 
                // name="location" 
                // onChange={handleLocationChange}
                // value={location}
              />
            </label>
            <label className={styles.input}>
              <input 
                type="text" 
                className={styles.textInput} 
                // name="numCopies" 
                // onChange={handleNumCopiesChange}
                // value={numCopies}
              />
            </label >
            <label className={styles.input}>
              <input 
                type="text" 
                className={styles.textInput} 
                // name="numCopies" 
                // onChange={handleNumCopiesChange}
                // value={numCopies}
              />
            </label >
          </div>
          <div className={styles.row}>
            <label className={styles.input}>
              <input 
                type="text" 
                className={styles.textInput} 
                // name="location" 
                // onChange={handleLocationChange}
                // value={location}
              />
            </label>
            <label className={styles.input}>
              <input 
                type="text" 
                className={styles.textInput} 
                // name="numCopies" 
                // onChange={handleNumCopiesChange}
                // value={numCopies}
              />
            </label >
            <label className={styles.input}>
              <input 
                type="text" 
                className={styles.textInput} 
                // name="numCopies" 
                // onChange={handleNumCopiesChange}
                // value={numCopies}
              />
            </label >
          </div>
        </div>
        <div className={styles.buttonSection}>
          <button
            className={styles.button}
            // onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form> */}
    </main>
  )
}

export default Input
