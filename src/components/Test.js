import React, { useEffect, useContext, useState } from 'react'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import userContext from '../context/user/usercontext';



export default function Test() {
    const { user, updateUser } = useContext(userContext);
    const navigate = useNavigate();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [clickedOption, setClickedOption] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [QuizData, setQuizData] = useState([
        {
            question: "",
            options: [],
            answer: 0
        },
    ])
    const [subject, setSubject] = useState(user.language)
    const fetchData = async () => {
        console.log("inside use effect ", subject, user)
        try {
            const response = await axios.post(process.env.REACT_APP_baseUrl + "questions", {
                language: subject,
            });
            console.log(response.data);
            setQuizData(response.data[0].questions);
        } catch (error) {
            console.error('Error making POST request:', error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    const endHandler = () => {
        // console.log(score,QuizData.length)
        const percentage = Math.round((score / QuizData.length) * 100)
        console.log(QuizData.slice(0, currentQuestion));
        try {
            axios.post(process.env.REACT_APP_baseUrl + "updateScore", {
                id: user._id,
                score: score,
                LP: percentage,
                QueAttemped: QuizData.slice(0, currentQuestion)
            })
                .then((response) => {
                    if (response.data.user) {
                        response.data.user.password = "";

                        updateUser(response.data.user)
                        const userData = {
                            user: response.data.user,
                        };
                        localStorage.setItem('userData', JSON.stringify(userData));

                    } else {
                        console.log(response.data);
                    }
                });
        } catch (e) {
            console.log(e);
        }
    }
    const changeQuestion = () => {
        updateScore();
        if (currentQuestion < QuizData.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setClickedOption(0);
        } else {
            setShowResult(true)
        }
    }
    const updateScore = () => {
        if (clickedOption === QuizData[currentQuestion].answer) {
            setScore(score + 1);
        }
    }
    const resetAll = () => {
        setShowResult(false);
        setCurrentQuestion(0);
        setClickedOption(0);
        setScore(0);
    }
    return (
        <div className='jjjjj'>
            <div className="containerr">
                {showResult ? (
                    // <QuizResult score={score} totalScore={QuizData.length} tryAgain={resetAll} />
                    <Button className='endTest' onClick={endHandler} variant="danger">End Test</Button>
                ) : (
                    <>
                        <div className="question">
                            <span id="question-number">{currentQuestion + 1}. </span>
                            <span id="question-txt">{QuizData[currentQuestion].question}</span>
                        </div>
                        <div className="option-container">
                            {QuizData[currentQuestion].options.map((option, i) => {
                                return (
                                    <button
                                        // className="option-btn"
                                        className={`option-btn ${clickedOption == i + 1 ? "checked" : null
                                            }`}
                                        key={i}
                                        onClick={() => setClickedOption(i + 1)}
                                    >
                                        {option}
                                    </button>
                                )
                            })}
                        </div>
                        <input type="button" value="Next" id="next-button" onClick={changeQuestion} />
                        <Button className='endTest' onClick={endHandler} variant="danger"><Link to={'/profile'} style={{ textDecoration: "none", color: "#ffff" }}>End Test</Link></Button>{' '}
                    </>)}
            </div>
        </div>
    )
}
