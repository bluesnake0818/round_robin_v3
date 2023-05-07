import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Styles/Input.module.css'
import 'react-csv-importer/dist/index.css';
import Papa from 'papaparse'
import LoadingOverlay from '../../components/UI/LoadingOverlay'

const Input = () => {
  // let quantum = 2
  
  // let readyQueue = []
  const [parsedData, setParsedData] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const [values, setValues] = useState([]);
  const [quantum, setQuantum] = useState(0)
  const [evaluation, setEvaluation] = useState({
    totalTime: 0, 
    numContextSwitch: 0,
    numProcesses: 0,
    throughPut: 0,
    executionOrder: [],
    avgWaitingTime: 0, 
    avgTurnAroundTime: 0
  })

  function handleQuantumChange(event) {
    setQuantum(event.target.value);
  }

  function runRoundRobin(processes, quantum) { 
    if (!processes || !quantum) {
      alert('need to fill all fileds')
      return
    }

    let clock = 0;
    let processesCopy = [...processes]; 
    let totalTime = 0; 
    let executionOrder = []; 
    let turnAroundTime = 0; 
    let waitingTime = 0; 
    let completionTime = 0; 
    // console.log('processesCopy', processesCopy)
    // console.log('quantum', quantum)
    while (processesCopy.length > 0) { 
      for (let i = 0; i < processesCopy.length; i++) { 
        if (processesCopy[i].burstTime > 0) { 
          if (processesCopy[i].burstTime > Number(quantum)) { 
            totalTime += Number(quantum); 
            processesCopy[i].burstTime -= Number(quantum); 
            executionOrder.push(processesCopy[i].pid); 
          }
          else { 
            totalTime += Number(processesCopy[i].burstTime); 
            completionTime = totalTime; 
            turnAroundTime += completionTime - processesCopy[i].arrivalTime; 
            waitingTime += completionTime - processesCopy[i].arrivalTime - processesCopy[i].burstTime; 
            executionOrder.push(processesCopy[i].pid); 
            processesCopy.splice(i, 1); 
          } 
          console.log('totalTime', totalTime)
        } 
      } 
    } 
    let avgWaitingTime = waitingTime / processes.length; 
    let avgTurnAroundTime = turnAroundTime / processes.length; 
    // console.log(waitingTime)

    console.log({
      totalTime, 
      numContextSwitch: executionOrder.length - 1,
      numProcesses: processes.length,
      throughPut: processes.length / totalTime,
      executionOrder,
      avgWaitingTime, 
      avgTurnAroundTime
    })
    
    // return the execution order, avg waiting time and avg turn around time 

    setEvaluation({
      totalTime: totalTime, 
      numContextSwitch: executionOrder.length - 1,
      numProcesses: processes.length,
      throughPut: processes.length / totalTime,
      executionOrder: executionOrder.toString(),
      avgWaitingTime: avgWaitingTime, 
      avgTurnAroundTime: avgTurnAroundTime
    })

    return { 
      totalTime, 
      numContextSwitch: executionOrder.length - 1,
      numProcesses: processes.length,
      throughPut: processes.length / totalTime,
      executionOrder,
      avgWaitingTime, 
      avgTurnAroundTime
    }; 
  }

  const changeHandler = (event) => {
    // console.log(event.target.files[0])
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        // console.log(results.data)
        const rowsArray = [];
        const valuesArray = [];

        results.data.map((d) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
          setParsedData(results.data);
          setTableRows(rowsArray[0]);  
          setValues(valuesArray);
        });
      },
    });
  };



  return (
    <main className={styles.container}>
      <input
        type="file"
        name="file"
        accept=".csv"
        onChange={changeHandler}
        style={{ display: "block", margin: "10px auto" }}
      />

      <label className={styles.input}>
        Time quantum:
        <input 
          type="text" 
          className={styles.textInput} 
          name="quantum" 
          onChange={handleQuantumChange}
          value={quantum}
        />
      </label>

      <button
        className={styles.button}
        onClick={() => runRoundRobin(parsedData, quantum)}
      >
        Run
      </button>


      <table>
        <thead>
          <tr>
            {tableRows.map((rows, index) => {
              return <th key={index}>{rows}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {values.map((value, index) => {
            return (
              <tr key={index}>
                {value.map((val, i) => {
                  return <td key={i}>{val}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <ul>
        <li>total execution time: {evaluation.totalTime}</li>
        <li>number of context switches: {evaluation.numContextSwitch}</li>
        <li>number of processes: {evaluation.numProcesses}</li>
        <li>throughput: {evaluation.throughPut}</li>
        <li>order of execution: {evaluation.executionOrder}</li>
        <li>average waiting time: {evaluation.avgWaitingTime}</li>
        <li>average turn-around time: {evaluation.avgTurnAroundTime}</li>
      </ul>
    </main> 
  )
}

export default Input

  // cpuUtilization: 1 - ((context switch time * context switches) / total execution time)
  // throughput: numProcesses / totalExecTime 
  // aveWaitTime: totalWaitTime / numProcesses
  // aveTurnAroundTime: totalExecTime / numProcesses


  // a process that was pre-empted goes to the end of the queue
  // if a process voluntarily releases a CPU (since the job was done before time quantum was up), the next process gets a full time quantum.
