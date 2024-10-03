import { useEffect, useState } from "react"
import Quiz from "./components/Quiz"


function App() {
  const [questions, setQuestions] = useState([])
   useEffect(()=> {
      getQuestions();
   }, [])

  const getQuestions = async()=> {
       try{
        const response = await fetch('https://644982a3e7eb3378ca4ba471.mockapi.io/questions');
        const questionResponse = await response.json()
        setQuestions(questionResponse);

       } catch(error) {
          console.log(error)
       }
  }
  return (
    <div className='w-full h-screen bg-slate-950 flex justify-center items-center'>
      {questions.length && <Quiz  questions={questions}/>}
    </div>
  )
}

export default App
