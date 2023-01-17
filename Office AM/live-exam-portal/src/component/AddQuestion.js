import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Front from "./Front";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
// import { UserContext } from "../App";
// import { useContext } from "react/cjs/react.development";

function AddQuestion() {
  const navigate = useNavigate();
  const [post, setPost] = useState([]);
  const [topic, setTopic] = useState([]);
  //main
  // console.log(topic);
  // const authKey = useContext(UserContext);
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }
  // console.log(getCookie("access_token"));

  const authKey = getCookie("access_token");
  const [subId, setSubId] = useState(undefined);
  const [topicId, setTopicId] = useState("");
  const [queType, setQType] = useState("");
  const [diffLevel, setDiffLevel] = useState("");
  const [right, setRight] = useState("");
  const [wrong, setWrong] = useState("");
  const [Que, setQue] = useState("");
  const [opt, setOpt] = useState([
    { option: "", isCorrect: false, richTextEditor: false },
    { option: "", isCorrect: false, richTextEditor: false },
    { option: "", isCorrect: false, richTextEditor: false },
    { option: "", isCorrect: false, richTextEditor: false },
  ]);
  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      [{ color: [] }, { background: [] }],
      ["clean"],
    ],
  };
  const formats = [
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "list",
    "bullet",
    "align",
    "color",
    "background",
  ];
  const [cnt, setCnt] = useState(0);

  console.log(Que);
  const key = authKey;
  // console.log(queType);
  //   console.log(opt);
  //   let obj={
  //         type:queType,
  //         diffiLevel:diffLevel,
  //         options:opt,
  //         questionText:Que,
  //         rightMarks:right,
  //         subject:subId,
  //         topic:topicId,
  //         wrongMarks:wrong
  //     }
  // console.log(opt);
  useEffect(() => {
    axios
      .get("http://admin.liveexamcenter.in/api/subjects?term=", {
        headers: {
          authorization: key,
        },
      })
      .then((response) => setPost(response.data));
  }, []);
  const result = post.result;
  const selectTopic = (e) => {
    setSubId(e.target.value);
    axios
      .get(
        `http://admin.liveexamcenter.in/api/topics/subject/${e.target.value}`,
        {
          headers: {
            authorization: key,
          },
        }
      )
      .then((response) => setTopic(response.data));
  };
  const selTopicId = (e) => {
    setTopicId(e.target.value);
  };
  const selQueType = (e) => {
    console.log(e.target.value);
    setQType(e.target.value);
  };
  const changeDiffLevel = (e) => {
    setDiffLevel(e.target.value);
  };
  const selRight = (e) => {
    setRight(e.target.value);
  };
  const selWrong = (e) => {
    setWrong(e.target.value);
  };
  // const selQue = (e) => {
  //   setQue(e.target.value);
  // };
  const addOpt = () => {
    setOpt([...opt, { option: "", isCorrect: false, richTextEditor: "false" }]);
  };
  console.log(opt);
  //not working properly
  const removeOpt = (e) => {
    let ab = [];
    for (let i = 0; i < opt.length; i++) {
      if (i !== e) ab.push(opt[i]);
    }
    setOpt(ab);
    // setOpt(prev=>prev.filter((op,i)=>i!==e))// this is also another trick
  };
  const optValue = (e, i) => {
    // console.log(i);
    // console.log(e.target.value );
    // let temp = opt;
    // temp[i] = {
    //   option: e.target.value,
    //   isCorrect: temp[i].isCorrect,
    //   richTextEditor: temp[i].richTextEditor,
    // };
    // setOpt(temp);
    //  console.log(e);
    //  console.log(i);

    setOpt((prev) =>
      prev.map((op, j) => (i === j ? { ...op, option: e.target.value } : op))
    );
  };

  useEffect(() => {
    var valueArr = opt.map(function (item) {
      return item.option;
    });
    let cnt = 0;
    console.log(valueArr);
    for (let i = 0; i < valueArr.length; i++) {
      for (let j = i + 1; j < valueArr.length; j++) {
        if (valueArr[j] !== "") {
          if (valueArr[i] === valueArr[j]) setCnt(cnt + 1);
        } else {
          setCnt(cnt - 1);
        }
      }
    }
  }, [opt]);

  console.log(cnt);
  const saveQue = () => {
    if (
      opt.filter((op) => op.option === "").length ||
      subId === "" ||
      topicId === "" ||
      queType === "" ||
      queType === "" ||
      right === "" ||
      wrong === "" ||
      opt.filter((op) => op.isCorrect === true).length === 0 ||
      opt.length <= 1 ||
      cnt === 1
    )
      return;
    else {
      axios
        .post(
          "https://admin.liveexamcenter.in/api/questions",
          {
            type: queType,
            diffiLevel: diffLevel,
            options: opt,
            questionText: Que,
            rightMarks: parseInt(right),
            subject: subId,
            topic: topicId,
            wrongMarks: parseInt(wrong),
          },
          {
            headers: {
              authorization: key,
            },
          }
        )
        .then(navigate("/Start"));
    }
  };
  const clickRadio = (i) => {
    // console.log(opt);
    // let temp = opt;
    // console.log(queType);
    if (queType === "MULTIPLE CHOICE" || queType === "FILL IN BLANKS") {
      setOpt((prev) =>
        prev.map((op, j) =>
          i === j ? { ...op, isCorrect: true } : { ...op, isCorrect: false }
        )
      );
    } else {
      setOpt((prev) =>
        prev.map((op, j) =>
          i === j ? { ...op, isCorrect: !op.isCorrect } : op
        )
      );
    }
    // console.log(temp);
  };
  // useEffect(() => {
  //   console.log(opt);
  // }, [opt]);
  console.log(opt);

  // console.log(isDup);
  // function fun() {
  //   let ops = opt.filter((op) => op.isCorrect === true).length;
  //   console.log(ops);
  // }
  // fun();
  // console.log(subId);
  const [QueRich, setQueRich] = useState(false);
  const QuestionRich = () => {
    setQueRich(!QueRich);
  };
  // console.log(opt);
  const OptionRich = (i) => {
    setOpt((prev) =>
      prev.map((op, j) =>
        i === j
          ? { ...op, richTextEditor: !op.richTextEditor }
          : { ...op, richTextEditor: op.richTextEditor }
      )
    );
  };

  return (
    <div>
      <div>
        <Front></Front>
      </div>
      <div className="mainAddQue">
        <div className="addQueInAddQue">
          {" "}
          <h1 id="addQueInAddQue">Add Question</h1>
        </div>
        <div id="selSub">
          <div className="selSub">
            <h3>Select Subject</h3>
            <select
              onClick={(e) => selectTopic(e)}
              onBlur={() =>
                subId === undefined ? setSubId("") : setSubId(subId)
              }
            >
              <option value="" selected disabled>
                Select Subject
              </option>
              {result &&
                result.map((subject) => (
                  <option value={subject._id}>{subject.name}</option>
                ))}
            </select>
            {subId === "" ? (
              <p style={{ color: "red" }}>Please Select Atleast One subject</p>
            ) : (
              ""
            )}
          </div>
          <div className="selTopic">
            <h3>Select Topic</h3>
            <select onChange={(e) => selTopicId(e)}>
              <option value="" selected disabled>
                Select Topic
              </option>
              {topic &&
                topic.map((topics) => (
                  <option value={topics._id}>{topics.name}</option>
                ))}
            </select>
            {topicId === "" ? (
              <p style={{ color: "red" }}>Please Select Topic!</p>
            ) : (
              ""
            )}
          </div>
        </div>
        <div id="queType">
          <div>
            <h3>Question Type</h3>
            <select onChange={(e) => selQueType(e)}>
              <option selected value="">
                Select Question Type
              </option>
              <option value="MULTIPLE CHOICE">MULTIPLE CHOICE</option>
              <option value="MULTIPLE RESPONSE">MULTIPLE RESPONSE</option>
              <option value="FILL IN BLANKS">FILL IN BLANKS</option>
            </select>
            {queType === "" ? (
              <p style={{ color: "red" }}>Please Select Question Type</p>
            ) : (
              ""
            )}
          </div>
          <div>
            9:23
            <h3>Difficulty level</h3>
            <select onChange={(e) => changeDiffLevel(e)}>
              <option selected disabled>
                Select Difficulty Level
              </option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
            {diffLevel === "" ? (
              <p style={{ color: "red" }}>Please Select Difficulty Level</p>
            ) : (
              ""
            )}
          </div>
          <div>
            <h3>Right Marks</h3>
            <input type="text" onChange={(e) => selRight(e)}></input>
            {right === "" ? (
              <p style={{ color: "red" }}>Please Enter Right Marks</p>
            ) : (
              ""
            )}
          </div>
          <div>
            <h3>Wrong Marks</h3>
            <input type="text" onChange={(e) => selWrong(e)}></input>
            {wrong === "" ? (
              <p style={{ color: "red" }}>Please Enter wrong Marks</p>
            ) : (
              ""
            )}
          </div>
        </div>
        <div id="question">
          <h3>Question</h3>
          <div className="questionAdd">
            {QueRich === true ? (
              <ReactQuill
                theme="snow"
                modules={modules}
                value={Que}
                formats={formats}
                onChange={setQue}
                id="questionAdd"
              />
            ) : (
              <input
                value={Que}
                onChange={(e) => setQue(e.target.value)}
                style={{ height: 100, width: 800 }}
              />
            )}
          </div>
          <button onClick={() => QuestionRich()}>
            {QueRich === false
              ? "Enable Rich Text Editor"
              : "Disable Rich Text Editor"}
          </button>
          {/* <input name="helo" id="que" onChange={() => setQue()}></input> */}
          {Que === "" ? (
            <p id="validate" className="qvalidate" style={{ color: "red" }}>
              Question Text is required
            </p>
          ) : (
            ""
          )}
        </div>
        <div></div>
        <div className="options">
          <h3>Options</h3>
          {opt &&
            opt.map((op, i) => (
              <div>
                <div id="opt">
                  {/* {JSON.stringify(op.isCorrect)} */}
                  <input
                    id="radio"
                    onChange={() => clickRadio(i)}
                    type={
                      queType === "MULTIPLE RESPONSE" ? "checkbox" : "radio"
                    }
                    checked={op.isCorrect}
                    name="akshay"
                  />
                  <div id="optionNumber">Option. {i + 1}</div>
                  {op.richTextEditor === true ? (
                    <ReactQuill
                      theme="snow"
                      modules={modules}
                      value={op.option}
                      className="quillOpt"
                      key={"quil" + i}
                      formats={formats}
                      // onChange={(e) => optValue(e, i)}
                      onChange={(e) =>
                        setOpt((prev) =>
                          prev.map((op, j) =>
                            i === j ? { ...op, option: e } : op
                          )
                        )
                      }
                    />
                  ) : (
                    <input
                      id="inputOptions"
                      value={op.option !== "" ? op.option : ""}
                      type="textarea"
                      onChange={(e) => optValue(e, i)}
                    />
                  )}
                </div>
                <button className="btnRemove" onClick={() => removeOpt(i)}>
                  Remove
                </button>
                <button onClick={() => OptionRich(i)} className="richText">
                  {op.richTextEditor === false
                    ? "Enable Rich Text Editor"
                    : "Disable Rich Text Editor"}
                </button>
                {op.option === "" ? (
                  <p id="validate" style={{ color: "red" }}>
                    Option is required
                  </p>
                ) : (
                  ""
                )}
              </div>
            ))}
          <div>
            {opt && opt.length <= 1 ? (
              <p style={{ color: "blue" }}>Add at least 2 Options</p>
            ) : (
              ""
            )}
          </div>
          {cnt === 1 ? (
            <p style={{ color: "red" }}>Duplicate options are not allowded</p>
          ) : (
            ""
          )}
          <button className="addOption" onClick={() => addOpt()}>
            +Add Option
          </button>
        </div>
        {opt.filter((op) => op.isCorrect === true).length === 0 ? (
          <p id="validate" style={{ color: "blue" }}>
            Select atleast one Option
          </p>
        ) : (
          ""
        )}
        <button id="savebtn" onClick={() => saveQue()}>
          Save Question
        </button>
        <button id="cancelbtn">Cancel</button>
        {opt.filter((op) => op.option === "").length ||
        subId === "" ||
        topicId === "" ||
        queType === "" ||
        queType === "" ||
        right === "" ||
        wrong === "" ||
        opt.length <= 1 ||
        opt.filter((op) => op.isCorrect === true).length === 0 ? (
          <p id="validate" style={{ color: "red" }}>
            Please Enter all Fields
          </p>
        ) : (
          ""
        )}
      </div>
      {/* <div style={{ width: 500, height: 100 }}>
        <div ref={quillRef} ><input /></div>
      </div> */}
    </div>
  );
}
export default AddQuestion;
