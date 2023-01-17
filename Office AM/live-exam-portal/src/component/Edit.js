import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import Front from "./Front";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import { UserContext } from "../App";
// import { useContext } from "react/cjs/react.development";

function Edit() {
  const authContext = useContext(UserContext);

  // console.log(getCookie("access_token"));

  const authKey = authContext.authkey;

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
  const [post, setPost] = useState([]);
  const [question, setQuestion] = useState();
  const location = useLocation();
  const ids = location.state.subject;
  console.log(question);
  const qid = useParams();
  const key = authKey;
  // console.log(qid);
  //   console.log(qid);
  // console.log(location.state.subject)
  // console.log(location.state.result[0])
  // const resultsid=location.state.subject;
  // console.log(resultsid)
  const [opt, setOpt] = useState([]);
  const [topic, setTopic] = useState([]);
  // let topic_id=question.subject._id;
  const [sub, setSub] = useState([]);
  const [topic2, setTopic2] = useState([]);
  const [qType, setQType] = useState([]);
  const [diffLevel, setDiffLevel] = useState([]);
  const [right, setRight] = useState("");
  const [wrong, setWrong] = useState("");
  const [quest, setQuest] = useState([]);
  console.log(opt);
  useEffect(() => {
    axios
      .get(
        "http://admin.liveexamcenter.in/api/subjects?term=", //
        {
          headers: {
            authorization: key,
          },
        }
      )
      .then((response) => setPost(response.data));
    axios
      .get(`http://admin.liveexamcenter.in/api/questions/${qid.id}`, {
        headers: {
          authorization: key,
        },
      })
      .then((response) => {
        setQuestion(response.data);
      });
    console.log(question);
    axios
      .get(
        `http://admin.liveexamcenter.in/api/topics/subject/${ids}`, //
        {
          headers: {
            authorization: key,
          },
        }
      )
      .then((response) => setTopic(response.data));
  }, []);
  useEffect(() => {
    setSub(question && question.subject && question.subject._id);
    setTopic2(question && question.topic && question.topic._id);
    setQType(question && question.type);
    setDiffLevel(question && question.diffLevel);
    setRight(question && question.rightMarks);
    setWrong(question && question.wrongMarks);
    setQuest(question && question.questionText);
    if (question && question.type) setOpt(question.options);
  }, [question]);
  // console.log(qid);
  // console.log(question);
  // console.log(sub);
  // console.log(topic2);
  // console.log(qType);
  // console.log(diffLevel);
  // console.log(right);
  // console.log(wrong);
  // console.log(quest);
  // console.log(opt);
  // console.log(topic);
  // console.log(question);
  const result = post.result;
  // console.log(result);
  //for changing topic on the basis of subject
  const [QueRich, setQueRich] = useState(false);
  const [optRich, setOptRich] = useState(false);
  const QuestionRich = () => {
    setQueRich(!QueRich);
  };
  const optionRich = () => {
    setOptRich(!optRich);
  };
  const selTopic = (e) => {
    let id = "";
    for (let i = 0; i < result.length; i++) {
      if (e.target.value === result[i].name) {
        id = result[i]._id;
      }
    }
    setSub(id);
    axios
      .get(`http://admin.liveexamcenter.in/api/topics/subject/${id}`, {
        headers: {
          authorization: key,
        },
      })
      .then((response) => setTopic(response.data));
  };
  console.log(post);
  const addOpt = () => {
    setOpt([...opt, { option: "", isCorrect: false, richTextEditor: false }]);
  };
  const changeOpt = (e, i) => {
    // console.log(e.target.value);
    // console.log(i);
    setOpt((prev) =>
      prev.map((op, j) => (i === j ? { ...op, option: e.target.value } : op))
    );
  };
  console.log(topic);
  const changeTopic = (e) => {
    console.log(e.target.value);
    // setTopic2(e.target.value);
    let id = "";
    for (let i = 0; i < topic.length; i++) {
      if (topic[i] === e.target.value) {
        id = topic._id;
      }
    }
    setTopic2(id);
  };
  const changeType = (e) => {
    // console.log(e.target.value);
    setQType(e.target.value);
  };
  const changeDiffLevel = (e) => {
    // console.log(e.target.value);
    setDiffLevel(e.target.value);
  };
  const RightMarks = (e) => {
    // console.log(e.target.value);
    setRight(e.target.value);
  };
  const wrongMarks = (e) => {
    // console.log(e.target.value);
    setWrong(e.target.value);
  };
  // const changeQuestionText = (e) => {
  //   setQuest(e.target.value);
  // };
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
  const clickRadio = (i) => {
    console.log(i);
    if (qType === "MULTIPLE CHOICE" || qType === "FILL IN BLANKS") {
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
  };
  // console.log(parseInt(right));
  // console.log(parseInt(wrong));
  console.log(question);
  const [cnt, setCnt] = useState(0);

  const update = () => {
    if (
      opt.filter((op) => op.option === "").length ||
      sub === "" ||
      topic2 === "" ||
      qType === "" ||
      right === "" ||
      wrong === "" ||
      opt.length <= 1 ||
      opt.filter((op) => op.isCorrect === true).length === 0 ||
      quest === "" ||
      cnt === 1
    )
      return;
    else {
      axios.put(
        `http://admin.liveexamcenter.in/api/questions/${qid.id}`,
        {
          type: qType,
          diffLevel: diffLevel,
          options: opt,
          questionText: quest,
          rightMarks: parseInt(right),
          subject: sub,
          topic: topic2,
          wrongMarks: parseInt(wrong),
        },
        {
          headers: {
            authorization: key,
          },
        }
      );
    }
  };
  console.log(right);
  console.log(wrong);
  return (
    <div>
      <Front></Front>
      <div className="mainAddQue">
        <div className="addQueInAddQue">
          {" "}
          <h1 id="addQueInAddQue">Edit Question</h1>
        </div>
        <div className="selectTopicAndAllInEdit">
          <div id="selSub">
            <div className="selSub">
              <h3>Select Subject</h3>
              <select onChange={(e) => selTopic(e)}>
                {result &&
                  result.map((res) => (
                    <option
                      // value={res._id}
                      selected={
                        question &&
                        question.subject &&
                        question.subject.name === res.name
                      }
                    >
                      {res.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="selTopic">
              <h3>Select Topic</h3>
              <select onChange={(e) => changeTopic(e)}>
                <option value="" disabled>
                  Choose Topic
                </option>
                {topic &&
                  topic.map((topics) => (
                    <option
                      selected={
                        question &&
                        question.subject &&
                        question.subject._id === topics._id
                      }
                    >
                      {topics.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div id="queType">
            <div>
              <h2>Question Type</h2>
              <select onChange={(e) => changeType(e)}>
                <option
                  selected={
                    question && question.type === "MULTIPLE CHOICE"
                      ? true
                      : false
                  }
                >
                  MULTIPLE CHOICE
                </option>
                <option
                  selected={
                    question && question.type === "MULTIPLE RESPONSE"
                      ? true
                      : false
                  }
                >
                  MULTIPLE RESPONSE
                </option>
                <option
                  selected={
                    question && question.type === "FILL IN BLANKS"
                      ? true
                      : false
                  }
                >
                  FILL IN BLANKS
                </option>
              </select>
            </div>
            <div>
              <h2>Difficulty Level</h2>
              <select
                selected={question && question.diffLevel}
                onChange={(e) => changeDiffLevel(e)}
              >
                <option
                  selected={
                    question && question.diffLevel === "Easy" ? true : false
                  }
                >
                  Easy
                </option>
                <option
                  selected={
                    question && question.diffLevel === "Medium" ? true : false
                  }
                >
                  Medium
                </option>
                <option
                  selected={
                    question && question.diffLevel === "Hard" ? true : false
                  }
                >
                  Hard
                </option>
              </select>
            </div>
            <div>
              <h2>Right Marks</h2>
              <input
                defaultValue={question && question.rightMarks}
                onChange={(e) => RightMarks(e)}
              ></input>
              {right === "" ? (
                <p stycntle={{ color: "red" }}>Please Enter Right Marks</p>
              ) : (
                ""
              )}
            </div>
            <div>
              <h2>Wrong Marks</h2>
              <input
                defaultValue={question && question.wrongMarks}
                onChange={(e) => wrongMarks(e)}
              ></input>
              {wrong === "" ? (
                <p style={{ color: "red" }}>Please Enter wrong Marks</p>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div id="question">
          <h2>Question</h2>
          <div>
            {QueRich === true ? (
              <ReactQuill
                theme="snow"
                modules={modules}
                value={quest}
                formats={formats}
                onChange={setQuest}
                id="questionAdd"
              />
            ) : (
              <input
                id="que"
                defaultValue={question && question.questionText}
                onChange={(e) => setQuest(e.target.value)}
              />
            )}
          </div>
        </div>
        <button onClick={() => QuestionRich()}>
          {QueRich === false
            ? "Enable Rich Text Editor"
            : "Disable Rich Text Editor"}
        </button>
        {quest === "" ? (
          <p style={{ color: "red" }}>Please Enter Question Text</p>
        ) : (
          ""
        )}
        <div className="options">
          <h2>Options</h2>
          {opt &&
            opt.map((op, i) => (
              <div>
                <div id="opt">
                  <input
                    id="radio"
                    type={
                      question && question.type === "MULTIPLE RESPONSE"
                        ? "checkbox"
                        : "radio"
                    }
                    onChange={() => clickRadio(i)}
                    checked={op && op.isCorrect === true}
                  ></input>
                  <div id="optionNumber">Option. {i + 1}</div>
                  <div>
                    {optRich === true ? (
                      <ReactQuill
                        theme="snow"
                        modules={modules}
                        value={op.option}
                        key={"quil" + i}
                        formats={formats}
                        onChange={(e) =>
                          setOpt((prev) =>
                            prev.map((op, j) =>
                              i === j ? { ...op, option: e } : op
                            )
                          )
                        }
                        // id="questionAdd"
                      />
                    ) : (
                      <input
                        id="inputOptions"
                        defaultValue={op.option}
                        onChange={(e) => changeOpt(e, i)}
                      />
                    )}
                  </div>
                </div>
                <button
                  className="btnRemove"
                  onClick={() =>
                    setOpt((prev) => prev.filter((op, j) => j !== i))
                  }
                >
                  Remove Option
                </button>
                <button onClick={() => optionRich()} className="richText">
                  {optRich === false
                    ? "Enable Rich Text Editor"
                    : "Disable Rich Text Editor"}
                </button>
                {op.option === "" ? (
                  <p id="validate" style={{ color: "red" }}>
                    Please Enter Option
                  </p>
                ) : (
                  ""
                )}
              </div>
            ))}
        </div>
        {opt.filter((op) => op.isCorrect === true).length === 0 ? (
          <p id="validate" style={{ color: "red" }}>
            Select atleast one Option
          </p>
        ) : (
          ""
        )}
        <div>
          <div>
            {opt.length <= 1 ? (
              <p id="validate" style={{ color: "blue" }}>
                Add atleast 2 Options
              </p>
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
            Add Option
          </button>
        </div>
        <div>
          <button id="savebtn" onClick={() => update()}>
            Update Question
          </button>
          <button id="cancelbtn">Cancel</button>
          {opt.filter((op) => op.option === "").length ||
          sub === "" ||
          topic === "" ||
          qType === "" ||
          right === "" ||
          wrong === "" ||
          opt.length <= 1 ||
          opt.filter((op) => op.isCorrect === true).length === 0 ? (
            <p style={{ color: "red" }}>Please Enter all Fields</p>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
export default Edit;
