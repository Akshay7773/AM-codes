import React from 'react'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react/cjs/react.development';
import { useNavigate } from 'react-router-dom';
export default function Finish() {
    const location = useLocation();
    //  console.log("location", location)
    let l = location.state;
    // console.log("l ",l)
    const navigate = useNavigate();

    const [marks, setMarks] = useState(0);

    useEffect(() => {
        let temp = JSON.parse(localStorage.getItem("answers"))
        console.log(temp)
        console.log(l[0].correctOptionIndex)
        if (temp && temp.length) {
            for (let i = 0; i < temp.length; i++) {
                for (let j = 0; j < l.length; j++) {
                    if (l[j]._id === temp[i].id) {
                        if (typeof l[j].correctOptionIndex === "object") {
                            if ((JSON.stringify(l[j].correctOptionIndex)) === (JSON.stringify(temp[i].selectOpt.sort())))
                                setMarks((prev) => prev + 1)

                        }
                        else if (l[j].correctOptionIndex === temp[i].selectOpt)
                            setMarks((prev) => prev + 1)

                    }
                }
            }
        }
        return () => {
            localStorage.removeItem("answers")
        };
    }, [])

    return (
        <div>
            <h1 className='finish'>
                Your Score is: {marks}
            </h1>
            <button className='retHome' onClick={()=>{
                navigate("/", {state:location})
            }}>
                Home
            </button>
        </div>
    )
}
