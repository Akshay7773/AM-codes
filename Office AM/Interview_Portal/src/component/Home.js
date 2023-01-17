import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
function Home() {
    const [post, setPost] = useState([]);
    const [test, setTest] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(`http://interviewapi.stgbuild.com/getQuizData`)
            .then((response) => {
                setPost(response.data)
            })
            .catch((error) => (
                console.log(error)
            ))
    }, [])

    if (post && post.message)
        console.log(post)
    useEffect(() => {
        if (post && post.message) {
            setTest(post.tests)
        }
    }, [post])
    return (
        <div className='Home'>
            <table>
                <thead>
                    <tr>
                        <th>Test</th>
                        <th>No. Of Questionss</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        test && test.map((tname, i) => (
                            <tr key={tname.name}>
                                <td>{tname.name}</td>
                                <td className='numbers'>{tname.questions.length}</td>
                                <td> <button    
                                    onClick={() => {
                                        navigate(`/${tname._id}/${tname.questions[0]._id}`, {
                                            state: tname,
                                        });
                                    }}
                                >Start Test</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Home
