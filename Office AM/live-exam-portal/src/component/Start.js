import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Front from "./Front";
import Pagination from "react-js-pagination";
import ReactPaginate from "react-paginate";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

function Start() {
  // const authKey = useContext(UserContext);

  // function getCookie(name) {
  //   const value = `; ${document.cookie}`;
  //   const parts = value.split(`; ${name}=`);
  //   if (parts.length === 2) return parts.pop().split(";").shift();
  // }
  // console.log(getCookie("access_token"));

  const authContext = useContext(UserContext);

  const authKey = authContext.authkey;
  console.log(authKey);
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
  const navigate = useNavigate();
  const [post, setPost] = useState([]);
  const [size, setSize] = useState(20);
  const [sub, setSub] = useState([]);
  const [searching, setSearching] = useState([]);
  const [cnt, setCnt] = useState();
  const [test, setTest] = useState(post.result);
  const [delCount, setDelCount] = useState(0);
  const [topics, setTopics] = useState([]);
  // const [hello, setHello] = useState([]);

  const key = authKey;
  if (post && post.length) console.log(test);
  console.log("Hello");
  useEffect(() => {
    axios
      .get(
        `https://admin.liveexamcenter.in/api/questions?page=${
          cnt ? cnt.selected + 1 : 1
        }&limit=${size && size.length ? size : 20}&term=${
          searching && searching.length ? searching : ""
        }&topic=${sub && sub.length ? sub : ""}`,
        {
          headers: {
            authorization: key,
          },
        }
      )
      .then((response) => {
        setPost(response.data);
        console.log("post fetch", delCount);
      })
      .catch((error) => console.log(error));
    axios
      .get(
        `http://admin.liveexamcenter.in/api/topics?page=1&limit=9007199254740991&term=    `,
        {
          headers: {
            authorization: key,
          },
        }
      )
      .then((response) => {
        setTopics(response.data);
      })
      .catch((error) => console.log(error));
  }, [size, sub, searching, cnt, delCount]);
  console.log(post);
  // console.log(topics.result[0])
  // if(topics && topics.length)
  //     console.log(topics)
  useEffect(() => {
    setTest(post.result);
    console.log("object");
    console.log(test);
  }, [post, delCount]);
  if (test && test.length) console.log(test);
  const selSize = (i) => {
    setSize(i.target.value);
  };
  const selSubject = (i) => {
    setSub(i.target.value);
    // setSearching("");
  };
  const search = (e) => {
    setSearching(e.target.value);
  };
  const changePage = (selected) => {
    setCnt(selected);
  };
  const deleteBtn = (id) => {
    console.log(id);
    axios
      .delete(`http://admin.liveexamcenter.in/api/questions/${id}`, {
        headers: {
          authorization: key,
        },
      })
      .then((response) => {
        setDelCount((prev) => prev + 1);
        // let a = test.filter((testss) => testss._id !== id);
        // setHello(a);
      });
  };
  // console.log("hello", hello);
  const res = topics.result;
  console.log(res);
  return (
    <div className="mainArea">
      <div>
        <Front />
      </div>
      <button onClick={() => navigate("/AddQuestion", { state: test })}>
        Add Question
      </button>
      <div className="QueAns">
        <select name="box" id="box" onChange={(e) => selSize(e)}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20} selected="selected">
            20
          </option>
        </select>{" "}
        records per page
        <select name="box" id="box" onChange={(e) => selSubject(e)}>
          {res && res.map((r) => <option value={r._id}>{r.name}</option>)}
        </select>
        <input onChange={(e) => search(e)} type="text" placeholder="Search.." />
        {test &&
          test.map((tests, i) => (
            <div>
              <div>
                Q. {i + 1}
                <ReactQuill
                  theme={"bubble"}
                  readOnly={true}
                  modules={modules}
                  value={tests.questionText}
                  formats={formats}
                />
              </div>
              {tests.options.map((op) => (
                <div>
                  <input
                    type={
                      tests.type === "MULTIPLE RESPONSE" ? "checkbox" : "radio"
                    }
                    disabled
                    checked={op.isCorrect === true ? true : false}
                  />
                  {/* {op.option} */}
                  <ReactQuill
                    theme="bubble"
                    readOnly={true}
                    modules={modules}
                    value={op.option}
                    formats={formats}
                  />
                </div>
              ))}
              <button
                onClick={() => {
                  navigate(`/Edit/${tests._id}`, {
                    state: tests,
                    qid: tests._id,
                  });
                }}
              >
                Edit
              </button>
              <button onClick={() => deleteBtn(tests._id)}>Delete</button>
            </div>
          ))}
      </div>
      <div>
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"next"}
          pageCount={
            test && test.length ? Math.ceil(post.totalCount / size) : 1
          }
          onPageChange={changePage}
        ></ReactPaginate>
      </div>
    </div>
  );
}
export default Start;
