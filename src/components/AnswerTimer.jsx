import { useRef } from "react"
import { useState, useEffect } from "react"

const AnswerTimer = ({duration, onTimeUp}) => {
   const [counter, setCounter] = useState(0);
   const [progressLoaded, setProgressLoaded] = useState(0);
   const intervalRef = useRef()

  useEffect(()=> {
     intervalRef.current = setInterval(()=> {
        setCounter((prev)=> prev + 1)
    }, 1000)

    return ()=> clearInterval(intervalRef.current)
  }, [])

  useEffect(()=> {
    setProgressLoaded(100 * (counter / duration))

    if(counter === duration) {
      clearInterval(intervalRef.current);
       onTimeUp()
    }

  
  }, [counter])

  return (
    <div className='w-[60%] h-1'>
        <div
        style={{
          width: `${progressLoaded}%`,
          maxWidth: '400px',
          backgroundColor: `${
           progressLoaded < 40 
           ? "lightgreen"
           : progressLoaded < 70
           ? "orange"
           : "red"
          }`
        }} 
        className='transition duration-1000 ease-linear  h-1 bg-green-600'></div>
    </div>
  )
}

export default AnswerTimer