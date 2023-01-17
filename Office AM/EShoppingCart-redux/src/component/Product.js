import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addData, incPrice } from "../actions/action";
import { useNavigate } from "react-router-dom";

function Product() {
  const list = useSelector((state) => state.todoReducer.list);
  const navigate = useNavigate();
  // console.log(list);
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  const [uniqueArray, setUniqueArray] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [dispArray, setDispArray] = useState([]);
  const [pageCnt, setPageCntCnt] = useState([]);
  const [val, setVal] = useState(0);
  let baseUrl = "http://xapi.ngminds.com/";
  useEffect(() => {
    axios.get("http://xapi.ngminds.com/api/getAllProducts").then((resp) => {
      setPosts(resp.data.products);
      console.log(resp.data.products.length);
      let arr = [];
      let index =
        resp.data &&
        resp.data.products &&
        resp.data.products.length % itemsPerPage === 0
          ? resp.data.products.length / itemsPerPage
          : resp.data.products.length / itemsPerPage + 1;
      for (let i = 1; i <= index; i++) {
        arr.push(i);
      }
      setPageCntCnt(arr);
      console.log(arr);
    });
  }, []);

  useEffect(() => {
    let index =
      posts && posts.length % itemsPerPage === 0
        ? posts.length / itemsPerPage
        : posts.length / itemsPerPage + 1;
    // console.log(index);
    let arr = [];
    for (let i = 1; i <= parseInt(index); i++) {
      arr.push(i);
    }
    setPageCntCnt(arr);
  }, [itemsPerPage]);

  useEffect(() => {
    let arr = [];

    for (let i = 0; i < posts.length; i++) {
      if (i < itemsPerPage) arr.push(posts[i]);
    }
    // console.log("arr", arr);
    console.log("hii postarray");
    setDispArray(arr);
  }, [posts, itemsPerPage, val]);

  useEffect(() => {
    setUniqueArray([
      ...new Map(
        list && list.map((item) => [JSON.stringify(item), item])
      ).values(),
    ]);
  }, [list]);
  // console.log(uniqueArray);

  const storeincart = (data) => {
    // console.log("data", data);
    dispatch(addData(data));
  };

  // console.log(itemsPerPage);
  const changePageValues = (e) => {
    setItemsPerPage(e.target.value);
  };

  const changePage = (i) => {
    let arr = [];
    let cnt = 0;
    console.log(itemsPerPage);
    for (let j = i * itemsPerPage; j < posts.length; j++) {
      arr.push(posts[j]);
      cnt++;
      console.log(cnt);
      if (parseInt(cnt) === parseInt(itemsPerPage)) {
        console.log(cnt);

        console.log("first");
        break;
      }
    }
    // console.log(arr);
    setDispArray(arr);
    arr = [];
  };

  const sortInAscending = (e) => {
    setVal((prev) => prev + 1);
    let arr = [];
    if (e.target.value === "Low to High") {
      arr = posts.sort((a, b) => {
        return a.price - b.price;
      });
      setPosts(arr);
      // console.log(arr);
    } else if (e.target.value === "High to Low") {
      arr = posts.sort((a, b) => {
        return b.price - a.price;
      });
      setPosts(arr);
    } else {
      axios
        .get("http://xapi.ngminds.com/api/getAllProducts")
        .then((resp) => setPosts(resp.data.products));
    }
  };

  console.log("first");
  return (
    <div>
      <div class="container">
        <h1>
          <a href="/product">My Ecommerce Site</a>
          <span className="pull-right">
            <button onClick={() => navigate("/Cart", { state: uniqueArray })}>
              Cart ({uniqueArray.length})
            </button>
          </span>
        </h1>
        <hr />
        <div class="row">
          <div class="col-sm-12">
            <div>
              <label for="" class="control-label">
                Sort by:
              </label>
              <select onChange={(e) => sortInAscending(e)} name="" id="">
                <option value="">Default</option>
                <option value="High to Low">High to Low</option>
                <option value="Low to High">Low to High</option>
              </select>
            </div>
          </div>
        </div>
        <div class="row">
          {dispArray &&
            dispArray.map((post, i) => (
              <div class="col-xs-3">
                <div
                  className={
                    i % 4 === 0
                      ? "bg-info"
                      : i % 4 === 1
                      ? "bg-success"
                      : i % 4 === 3
                      ? "bg-warning"
                      : "bg-danger"
                  }
                >
                  <img
                    src={`${baseUrl}${post.image}`}
                    width="100"
                    height="200"
                  />
                  <br />
                  <p>{post.name}</p>
                  <p>
                    <i class="fa fa-inr"></i>
                    {post.price}
                  </p>
                  <button
                    onClick={() => storeincart(post)}
                    class="btn btn-warning"
                  >
                    Add to Cart
                  </button>
                </div>
                <br />
                <hr />
                <br />
              </div>
            ))}
        </div>
      </div>
      <div class="row">
        <div class="col-sm-8">
          <ul class="pagination">
            <li class="page-item">
              <a class="page-link">Previous</a>
            </li>
            {pageCnt &&
              pageCnt.map((page, i) => (
                <li class="page-item">
                  <a class="page-link" onClick={() => changePage(i)}>
                    {page}
                  </a>
                </li>
              ))}
            <li class="page-item">
              <a class="page-link">Next</a>
            </li>
          </ul>
        </div>
        <div class="col-sm-4 text-right">
          <div>
            <label for="" class="control-label">
              Items Per Page:
            </label>
            <select onChange={(e) => changePageValues(e)} name="" id="">
              <option defaultValue value="5">
                5
              </option>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
