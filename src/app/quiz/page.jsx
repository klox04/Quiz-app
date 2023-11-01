'use client'
import React, {useState} from 'react';
import{quiz} from '../data.js';

const page = () =>{
    const [activeQuestion, setActiveQuestion]= useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [checked, setChecked] = useState(false);
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [results, setResults] =useState ({
        score: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
    });

    const {questions} = quiz;
    const {question, answers, correctAnswer} = questions [activeQuestion];

    const onAnswerSelected = (answer, idx) =>{
        setChecked(true)
        setSelectedAnswerIndex(idx)
        if(answer === correctAnswer){
            setSelectedAnswer(true)
            console.log('true') 
        }else{
            setSelectedAnswer(false)
            console.log('false')
        }
    }

    const nextQuestion =  () =>{
        setSelectedAnswerIndex(null)
        setResults((prev) =>
        selectedAnswer ? 
        {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
        }:{
           ...prev,
           wrongAnswers: prev.wrongAnswers +1,
        }
        );
        if(activeQuestion != questions.length -1){
            setActiveQuestion((prev) => prev + 1)
        } else{
            setActiveQuestion(0);
            setShowResult(true);
        }
        setChecked(false);
    };

    return(
        <div className="flex flex-col items-center justify-center h-screen">
            <h1  className="text-4xl font-bold mb-6">Quiz Page</h1>
            <div className="text-lg mb-4">
                <h2>Questions: {activeQuestion + 1}
                    <spam className="text-gray-600">/{questions.length}</spam>
                </h2>
            </div>
            <div className="mt-8 p-4  bg-white shadow-lg rounded-lg w-1/3 ">
                {!showResult ? (
                <div> 
                    <h3 className="text-xl font-semibold mb-4  text-center">{questions[activeQuestion].question}</h3>
                    {answers.map((answer,idx)=>(
                        <li key={idx} 
                        onClick={()=> onAnswerSelected(answer,idx)}
                        className={`${
                            selectedAnswerIndex === idx
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-100 hover:bg-gray-200'
                          } p-2 rounded-lg mb-2 cursor-pointer transition duration-300`}
              
                            >
                            <span>{answer}</span>
                        </li>
                    ))}
                    <div className="flex justify-center">
                    {checked ? (
                        
                    <button onClick={nextQuestion} className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded w-1/3 ">
                        {activeQuestion === questions.length - 1 ? 'Finish' : 'Next'}
                    </button>
                    ) : (
                    <button  onClick={nextQuestion} disabled className="bg-gray-300 text-gray-500 cursor-not-allowed py-2 px-4 rounded  w-1/3" >
                         {activeQuestion === questions.length -1 ? 'Finish' : 'Next'}
                    </button>
                    
                    )}
                    </div>
                </div>
                ) : (
                <div className="mt-2 p-4 bg-white shadow-lg rounded-lg text-center">
                    <h3  className="text-2xl font-bold">Results</h3>
                    <h3>Overall {(results.score / 25)*100}%</h3>
                    <p>
                        Total Questions: <span>{questions.length}</span>
                    </p>
                    <p>
                        Total Score: <span>{results.score}</span>
                    </p>
                    <p>
                        Correct Answers: <span>{results.correctAnswers}</span>
                    </p>
                    <p>
                        Wrong Answers: <span>{results.wrongAnswers}</span>
                    </p>
                    <button  className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded mt-4" onClick={() => window.location.reload()}>Restart</button>
                </div>
                )}
            </div>
          </div>
       
    )
}
export default page;