import { useEffect, useState } from "react"

const Result = ({totalQuestions, result, onTryAgain}) => {
 const [name, setName] = useState('');
 const [highScores, setHighScores] = useState([]);
 const [showScores, setShowScores] = useState(false);

 useEffect(()=> {
    setHighScores(JSON.parse(localStorage.getItem('highscores') || []))
 }, [])

 const handleSave = () => {
    const score = {
        name,
        score: result.score
    };
    
    const newHighScores =[...highScores, score].sort((a,b)=> b.score - a.score)
    setHighScores(newHighScores);
    setShowScores(true);
    localStorage.setItem('highscores', JSON.stringify(newHighScores))
 }

 const handleOnTryAgain = () => {
  setShowScores(false);
  setHighScores([]);
  onTryAgain()
 }
  return (
    <div className='text-center'>
    <h3 className='text-xl font-bold text-center my-3'>Result</h3>
    <p className='my-3'>
      Total Score: {result.score}
    </p>
    <p className='my-3'>
      Total Questions: {totalQuestions}
    </p>
    <p className='my-3'>
      Correct Questions: {result.correctAnswers}
    </p>
    <p className='my-3'>
      Wrong Answers: {result.wrongAnswers}
    </p>
    <button className='border rounded bg-gray-800 text-white p-2 relative left-2'
           onClick={handleOnTryAgain}
    >Try Again</button>

  {!showScores ?  <div className='flex flex-col gap-3 border m-2 p-2 border-gray-600'>
        <h3 className='font-thin'>
            Enter your name below <br /> to save your score
        </h3>
        <input
        placeholder="Your name"
        className='p-2 m-2'
        value={name} onChange={(evt)=> setName(evt.target.value)} />

        <button
         className='border rounded bg-black text-white r w-[40%] relative left-[30%]'
         onClick={handleSave}>Save</button>
    </div> :
    <div>
        <table className='w-[50%] text-left mt-12 mb-5 border-collapse '>
            <thead>
                <tr className='border '>
                    <th>Ranking</th>
                    <th>Name</th>
                    <th>Score</th>
                </tr>
            </thead>
                <tbody>
                {
                  highScores.map((highScore, i)=> {
                    return (
                    <tr className='border' key={`${highScore.name}${highScore.score}${i}`}>
                        <td>{i + 1}</td>
                        <td>{highScore.name}</td>
                        <td>{highScore.score}</td>
                    </tr>
                    )
                  })
                }
                    
                </tbody>
        
        </table>
    </div> 
    }
  </div>
  )
}

export default Result