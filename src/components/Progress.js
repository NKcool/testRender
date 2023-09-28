import React, { useContext, useEffect, useState } from 'react';
import userContext from '../context/user/usercontext';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';

export default function Progress() {
    const [isempty, setIsempty] = useState(false);
    let user = localStorage.getItem('userData');
    user = JSON.parse(user);

    useEffect(() => {
        if (user && user.user && Array.isArray(user.user.QueAttemped) && user.user.QueAttemped.length > 0) {
            setIsempty(true);
        } else {
            setIsempty(false);
        }
    }, []); // Add an empty dependency array to run this effect only once

    console.log(user.user.QueAttemped);
    return (
        <div className='progresss'>
            <div className='containerr'>
                <h3>Progresss</h3>

                {isempty ? (
                    <ol>
                        {user.user.QueAttemped.map((item, index) => (
                            <li key={index}>
                                {item.question}
                                <ul>
                                    {item.options.map((option, optionIndex) => (
                                        <li key={optionIndex}>
                                            {option}
                                        </li>
                                    ))}
                                    <p style={{ color: "green" }}>correct option: {item.answer}</p>
                                </ul>
                                {index !== user.user.QueAttemped.length - 1 && <hr />}
                            </li>
                        ))}
                    </ol>
                ) : (
                    <p>No questions available</p>
                )}
                <Button variant="danger" className='backProfile' style={{ fontSize: "15px" }}>
                    <Link style={{ textDecoration: "none", color: "#ffff" }} to={'/profile'}>Back</Link>
                </Button>{' '}
            </div>
        </div>
    )
}
