import React from 'react'
import { Box,Stack} from '@mui/system'
import { Card,MenuItem,Select,TextField,Button} from '@mui/material'
import './style.css'
import {Routes,Route} from 'react-router-dom'
import Typed from 'typed.js'
import { useState,useEffect,useRef} from 'react'
import useMergedRef from '@react-hook/merged-ref'

const Home =React.forwardRef((props,ref)=> {
  const typed = useRef(null);
  const el = useRef(null);
  const hide = useRef(null);
  const correct = useRef(null);
  const inputRef=useRef(null)
  const multiRef = useMergedRef(typed,el,correct)
  const [difficulty,setDifficulty]=useState(0)
  //words array
  const words= require('an-array-of-english-words')
  const easy=words.filter((word)=>{return( word.length>=4 && word.length<6)})
  const medium=words.filter((word)=>{return( word.length>=7 && word.length<9)})
  const hard=words.filter((word)=>{return( word.length>=10 && word.length<13)})
  const speedy=words.filter((word)=>{return( word.length>=12 && word.length<18)})
  const [word,setWord] =useState('')
  const [score,setScore] =useState(0)
  const[initialTime,setInitialTime]=useState(0)
  const [timer,setTimer] =useState(initialTime)
  const [start,setStart] =useState(false)
  const [gameOver,setGameOver] =useState(false)
  const[input,setInput]=useState('')

  useEffect(() => {
    checkDifficulty()
    setTimer(initialTime)
    if(difficulty&&start){
        const options = {
        strings:[word],
        typeSpeed: 80,
        backSpeed: null,
      };
      typed.current = new Typed(el.current, options);
      // inputRef.current.focus()

      return () => {
        typed.current.destroy();
      }}
    },[initialTime,difficulty,start,score])

  useEffect(()=>{
      if(start){ 
      const timerID=setInterval(()=>{
      setTimer(time=>time!==0?time-1:gg())},1000)
      const gg=()=>{
        clearInterval(timerID);
        setGameOver(true)
        setStart(false)
      }
      return()=>{clearInterval(timerID)
      }}
    },[start])
    //length of timer based on difficulty
  
    //when user selects level
   const selectLevel=(e)=>{
    setDifficulty(e.target.value)
  }
  console.log(word)
  console.log(easy[1])
  const wordCheck=()=>{
    if(difficulty===1){setWord(easy.sort(()=>Math.random()-0.5)[1])}
    if(difficulty===2){setWord(medium.sort(()=>Math.random()-0.5)[1])}
    if(difficulty===3){setWord(hard.sort(()=>Math.random()-0.5)[1])}
    if(difficulty===4){setWord(speedy.sort(()=>Math.random()-0.5)[1])}
  }
  const checkDifficulty=()=>{
    if(difficulty===1){setInitialTime(12)}
    if(difficulty===2){setInitialTime(10)}
    if(difficulty===3){setInitialTime(7)}
    if(difficulty===4){setInitialTime(5)}
  }
  const pressEnter=(e)=>{
    if(e.key==='Enter'||e.keyCode===13){checkWord()}
  }
  //when user starts typing
  const checkWord=(e)=>{
    for(let i=0;i<word.length;i++){
      if (word===input){correct.current.style.color='green';setScore((score)=>score+10);setInput('');wordCheck()}
      else{correct.current.style.color='red';}
    }
    easy.sort(()=>Math.random()-0.5)
    medium.sort(()=>Math.random()-0.5)
    hard.sort(()=>Math.random()-0.5)
    speedy.sort(()=>Math.random()-0.5)
  }
  const checkGameOver=()=>{
    if(gameOver){hide.current.classList.remove('hide')}
  }
  checkGameOver()
  const startGame=()=>{
    if(difficulty){
    inputRef.current.focus()
    setStart(true)
    setGameOver(false)
    setScore(0)
    setInput('')
    wordCheck()
    hide.current.classList.add('hide')
  }



  }
  return (
    <Box>
      <div className='header'>
          <h1>Speedy Hands</h1>
          <h4>How about testing your typing speed and accuracy</h4>
          <h4>Let's see how fast you can type</h4>
        </div>
      <Box className='level-box'>
          <h3>SELECT A LEVEL</h3>
          <Select className='select-box' label='Select Difficulty' value={difficulty} onChange={selectLevel}>
          <MenuItem value={1}>Easy</MenuItem>
          <MenuItem value={2}>Medium</MenuItem>
          <MenuItem value={3}>Hard</MenuItem>
          <MenuItem value={4}>Speedy Hands</MenuItem>
          </Select>  
      </Box>
      {difficulty!=0&&<Box className='timer'>{!gameOver&&<h4>Countdown:{timer}s</h4>}{gameOver&&<h4>Game Over</h4>}</Box>}
      <Box className='word-display'>
        <h1 ref={multiRef}></h1>
      </Box>
      <Box className='type-here'>
        <input ref={inputRef}onKeyUp={pressEnter} autoCapitalize='off' autoComplete='off' placeholder='Type Here' value={input}  onChange={(e)=>setInput(e.target.value.toLowerCase())}></input>
        <Box>
        <button className='start' ref={hide} onClick={startGame}>Start</button>
        <button className='submit' onClick={checkWord}>Submit</button>
        <button className='clear' onClick={()=>setInput('')}>Clear</button>
        </Box>


      </Box>
      <Box className='score'>
        <h4>Score</h4>
        <h1>{score}</h1>
      </Box>
    </Box>
  )
})

export default Home  