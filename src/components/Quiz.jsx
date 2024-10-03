import { useState } from "react";
import { resultInitialState } from '../constant.js';
import AnswerTimer from "./AnswerTimer.jsx";
import Result from "./Result.jsx";

const Quiz = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answerIndex, setAnswerIndex] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [result, setResult] = useState(resultInitialState);
  const [showResult, setShowResult] = useState(false);
  const [showTimerAnswer, setShowTimerAnswer] = useState(true)
  const [inputAnswer, setInputAnswer] = useState('')

  const { question, choices, correctAnswer, type } = questions[currentQuestion];

  // styles
  const selectedAnswer =
    "border rounded m-2 hover:cursor-pointer p-2 border-slate-800 text-white bg-black";
  const notSelected =
    "border rounded m-2 hover:cursor-pointer p-2 border-slate-300";

  const onAnswerClick = (choice, index) => {
    setAnswerIndex(index);
    if (choice === correctAnswer) {
      setAnswer(true);
    } else {
      setAnswer(false);
    }
  };

  const onClickNext = (finalAnswer) => {
    setAnswerIndex(null);
    setShowTimerAnswer(false);
    setInputAnswer('')
    setResult((prev) =>
      finalAnswer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
          }
        : {
            ...prev,
            wrongAnswers: prev.wrongAnswers + 1,
          }
    );

    if (currentQuestion !== questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setCurrentQuestion(0);
      setShowResult(true);
    }

    setTimeout(()=> {
      setShowTimerAnswer(true)
    })
  };

  const onTryAgain =() => {
    setResult(resultInitialState)
    setShowResult(false)
  }

  const handleTimeUp = () => {
   setAnswer(false);
   onClickNext(false);
  }

  const handleInputChange = (evt) => {
      setInputAnswer(evt.target.value)  
      if(evt.target.value === correctAnswer) {
        setAnswer(true)
      } else {
        setAnswer(false)
      }
  }

  const getAnswerUi = () => {
       if(type === 'FIB') {
        return (
          <input value={inputAnswer} className='border rounded p-2 m-2' onChange={handleInputChange}/>
        )
       }
    return (
      <ul>
      {choices.map((choice, index) => (
        <li
          onClick={() => onAnswerClick(choice, index)}
          key={choice}
          className={
            answerIndex === index ? selectedAnswer : notSelected
          }
        >
          {choice}
        </li>
      ))}
    </ul>

    )
  }

  return (
    // question box container
    <div className="box-border w-[500px] bg-slate-100 rounded-md mt-[100px] py-[30px] px-[60px]">
      {!showResult ? (
        <>
          {showTimerAnswer &&  <AnswerTimer duration={10} onTimeUp={handleTimeUp}/>}
          {/* position of the question */}
          <span className="text-3xl font-bold text-black-500">
            {currentQuestion + 1}
          </span>
          <span className="text-2xl font-bold text-gray-300">
            /{questions.length}
          </span>

          {/* questions */}
          <h2 className="text-2xl font-extralight">{question}</h2>
            {getAnswerUi()}
          <div>
            <button
              onClick={() => onClickNext(answer)}
              disabled={answerIndex === null && !inputAnswer}
              className={`border rounded bg-gray-800 text-white p-2 relative left-2 
                    ${
                      answerIndex === null && !inputAnswer
                        ? "opacity-50 cursor-not-allowed"
                        : "opacity-100"
                    }`}
            >
              {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
            </button>
          </div>
        </>
      ) : (
          <Result result={result} onTryAgain={onTryAgain} totalQuestions={questions.length}/>
      )}
    </div>
  );
};

export default Quiz;
