import React from 'react'
import { useEffect, useState } from 'react/cjs/react.development'
import { useLocation, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
function Start() {

    let qid = useParams();
    console.log("qid ", qid)
    const navigate = useNavigate()
    const [count, setCount] = useState(0)
    const location = useLocation();
    const question = location.state.questions

    const tname = location.state;
    const [marked, setMarked] = useState(0)
    const [markedArr, setMarkedArr] = useState([])
    const [arri, setArri] = useState([]);

    let selectType = "radio"
    if (question[count].type)
        selectType = "checkbox"

    const next = () => {
        if (count < question.length - 1)
            setCount((prev) => prev + 1)
        navigate(`/${tname._id}/${question[count + 1]._id}`, {
            state: tname
        })
    }
    const previous = () => {
        if (count > 0)
            setCount((prev) => prev - 1)
        navigate(`/${tname._id}/${question[count - 1]._id}`,
            { state: tname })

    }
    const [answers, setAnswers] = useState([])

    const storeValue = (i) => {
        let duplicate = -1;
        for (let j = 0; j < answers.length; j++) {
            if (answers[j].id === question[count]._id)
                duplicate = j;
        }

        if (!question[count].type) {
            if (duplicate >= 0) {
                // console.log("in duplicate")
                setAnswers(
                    answers.map((ans) => (
                        ans.id === question[count]._id
                            ? { id: ans.id, selectOpt: i }
                            : { id: ans.id, selectOpt: ans.selectOpt }
                    ))
                )
            }
            else {
                setAnswers([
                    ...answers, {
                        id: question[count]._id,
                        selectOpt: i
                    }
                ])
            }
        }
        else {
            if (duplicate >= 0) {

                if (markedArr.includes(i)) {
                    setAnswers(
                        answers.map((ans) =>
                            ans.id === question[count]._id
                                ? { id: ans.id, selectOpt: ans.selectOpt.filter((index) => index !== i) }
                                : { id: ans.id, selectOpt: ans.selectOpt }
                        )
                    )
                }
                else {
                    setAnswers(
                        answers.map((ans) =>
                            ans.id === question[count]._id
                                ? { id: ans.id, selectOpt: [...ans.selectOpt, i] }
                                : { id: ans.id, selectOpt: ans.selectOpt }
                        )

                    )
                }
            }
            else {
                setArri([...arri, i])
            }
        }
    }

    useEffect(() => {
        if (arri.length) {
            setAnswers([
                ...answers, {
                    id: question[count]._id,
                    selectOpt: arri
                }
            ])
        }
    }, [arri])

    useEffect(() => {
        if (answers && answers.length)
            localStorage.setItem("answers", JSON.stringify(answers))
    }, [answers])

    useEffect(() => {
        setMarked()
        setMarkedArr([])
    }, [count])

    useEffect(() => {
        let temp = JSON.parse(localStorage.getItem("answers"))
        console.log(temp)
        let op = temp && temp.filter((q) => q.id === question[count]._id)
        //console.log(op)
        if (op && op.length && selectType === "radio") {
            setMarked(op[0].selectOpt)
            setMarkedArr([])
        }
        else if (op && op.length) {
            setMarkedArr(op[0].selectOpt)
            setMarked();
        }
    }, [answers, count])

    useEffect(() => {
        if (localStorage.getItem("answers"))
            setAnswers(JSON.parse(localStorage.getItem("answers")))
        setCount(
            question.findIndex((q) => JSON.stringify(q._id) === JSON.stringify(qid.id))
        )

    }, [])

    console.log("answers", answers)
    return (
        <div key={question[count].questionText} className="queAns">
            <h3 className='subject'>{location.state.name}</h3>
            <h2 className='questions'>
                {count + 1}.{question[count].questionText}
            </h2>

            <div key={question[count].questionText} className='options '>
                {
                    question[count].options.map((op, i) => (
                        
                            <div key={op}>
                                <input
                                    type={selectType}
                                    key={i}
                                    name="akshay"

                                    id={i}
                                    // value={op}
                                    checked={
                                        selectType === "radio"
                                            ? marked === i
                                            : markedArr.includes(i)
                                    }
                                    onChange={() => storeValue(i)}

                                />
                                {op}
                            </div>

                        
                    )
                    )
                }
                <div className='btn'>
                    <button onClick={() => previous()} className='prev'>Previous</button>
                    <button onClick={() => next()} className='next'>Next</button>
                </div>
                <></><br></br>
                <button id='finish' onClick={() => {
                    navigate("/Finish", { state: question })
                }}>Finish</button>
            </div>
        </div>
    )
}

export default Start
