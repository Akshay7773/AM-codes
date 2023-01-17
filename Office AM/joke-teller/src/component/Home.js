import React, { Component } from "react";
import { Field, Form, Formik } from "formik";
import axios from "axios";
let initialValues = {
  category: "Any",
  customCategory: [],
  language: "en",
  flags: [],
  respFormat: "json",
  jokeType: ["single", "twopart"],
  searchString: "",
  minRange: 0,
  maxRange: 1368,
  maxRange2: 1368,
  amount: 1,
  data: [],
};

// console.log(initialValues);
var disable = true;
var str = "Any";
let count = 0;

var url = `https://v2.jokeapi.dev/joke/`;
export class Home extends Component {
  componentDidMount() {
    axios
      .get("https://v2.jokeapi.dev/info")
      .then((resp) => {
        this.setState({ ...this.state, data: resp.data.jokes.idRange });

        // console.log(resp);
      })
      .catch((error) => console.log(error));
  }

  constructor(props) {
    super(props);
    this.state = {
      basicUrl: "https://v2.jokeapi.dev/joke",
      url: `https://v2.jokeapi.dev/joke/${str}`,
      data: {},
      data2: {},
      delcount: 0,
      types: "",
      url2: `https://v2.jokeapi.dev/joke/Any`,
    };
    // this.props.changeFormData(initialValues);
  }

  // changeCount = () => {
  //   count = 1;
  //   this.setState({ ...this.state, delcount: 0 });
  //   // console.log(this.props.URL);

  //   // console.log(this.props.URL);
  //   axios
  //     .get(this.props.URL)
  //     .then((resp) => {
  //       this.setState({ ...this.state, data2: resp.data });

  //       // console.log(resp);
  //     })
  //     .catch((error) => console.log(error));
  // };

  setDelCount = () => {
    this.setState({ ...this.state, delcount: 1 });
  };
  render(props) {
    // console.log(this.state.data2);
    // console.log(this.state.data2.type);
    // console.log(initialValues);
    // console.log(this.props.URL);
    // console.log(this.state.url2);
    // console.log(initialValues);
    return (
      <div className="form-div">
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            count = 1;
            this.setState({ ...this.state, delcount: 0 });
            axios
              .get(this.state.url2)
              .then((resp) => {
                this.setState({ ...this.state, data2: resp.data });
              })
              .catch((error) => console.log(error));
          }}
          validate={(values) => {
            console.log(values);
            // this.props.changeFormData(values);
            url = `https://v2.jokeapi.dev/joke/${
              values.category === "Any"
                ? "Any"
                : values.customCategory.length > 0
                ? values.customCategory
                : "Any"
            }${values.language === "en" ? "" : "?lang=" + values.language}${
              values.flags && values.flags.length > 0
                ? values.language === "en"
                  ? "?blacklistFlags=" + values.flags
                  : "&blacklistFlags=" + values.flags
                : ""
            }${
              values.respFormat !== "json"
                ? values.language !== "en" || values.flags.length > 0
                  ? "&format=" + values.respFormat
                  : "?format=" + values.respFormat
                : ""
            }${
              values.jokeType.length === 0 || values.jokeType.length === 2
                ? ""
                : values.language !== "en" ||
                  values.flags.length > 0 ||
                  values.respFormat !== "json"
                ? "&type=" + values.jokeType
                : "?type=" + values.jokeType
            }${
              values.searchString !== ""
                ? values.language !== "en" ||
                  values.flags.length > 0 ||
                  values.respFormat !== "json" ||
                  (values.jokeType.length !== 0 && values.jokeType.length !== 2)
                  ? "&contains=" + values.searchString
                  : "?contains=" + values.searchString
                : ""
            }${
              (values.maxRange === values.maxRange2 && values.minRange === 0) ||
              values.minRange === ""
                ? ""
                : values.minRange > values.maxRange
                ? ""
                : values.minRange === values.maxRange
                ? values.language !== "en" ||
                  values.flags.length > 0 ||
                  values.respFormat !== "json" ||
                  values.searchString !== "" ||
                  (values.jokeType.length !== 2 && values.jokeType.length !== 0)
                  ? "&idRange=" + values.minRange
                  : "?idRange=" + values.minRange
                : values.language !== "en" ||
                  values.flags.length > 0 ||
                  values.respFormat !== "json" ||
                  values.searchString !== "" ||
                  (values.jokeType.length !== 0 && values.jokeType.length !== 2)
                ? "&idRange=" + values.minRange + "-" + values.maxRange
                : "?idRange=" + values.minRange + "-" + values.maxRange
            }${
              values.amount === 1 || values.amount === ""
                ? ""
                : values.language !== "en" ||
                  values.flags.length > 0 ||
                  values.respFormat !== "json" ||
                  values.searchString !== "" ||
                  values.maxRange !== values.maxRange2 ||
                  values.minRange !== 0
                ? "&amount=" + values.amount
                : "?amount=" + values.amount
            }`;
            // this.props.changeApiUrl(url);
            this.setState({ ...this.state, url2: url });
            // this.setState({ ...this.state, url2: url });
          }}
        >
          {(props, resetForm) => (
            <Form>
              {console.log(props)}
              {/* {console.log(props.values)} */}
              {/* {console.log(props.values.customCategory.length)} */}

              {/* <h2 style={{ color: "white" }}>
                {JSON.stringify(props.values.maxRange)}
              </h2> */}
              <table>
                <tbody>
                  {props.values.category !== "Any"
                    ? (disable = false)
                    : (disable = true)}
                  <tr className="form-control spacer">
                    <td className="left-col">
                      <label htmlFor="category" style={{ color: "white" }}>
                        Select{" "}
                        <label style={{ color: "#717eea" }}>
                          category/categories
                        </label>
                        :
                      </label>
                    </td>
                    <td className="right-col">
                      <div
                        data-testid="todo-2"
                        className="input-div"
                        style={
                          props.values.category === "categories" &&
                          props.values.customCategory.length === 0
                            ? { borderColor: "red" }
                            : { borderColor: "white" }
                        }
                        //  style={
                        //    props.values.category === "" &&
                        //    (props.values.customCategory === "Any" ||
                        //      JSON.stringify(props.values.customCategory) ===
                        //        JSON.stringify([]))
                        //      ? { border: "1px solid red" }
                        //      : {}
                        //  }
                      >
                        <Field
                          type="radio"
                          id="category1"
                          name="category"
                          value="Any"
                        ></Field>
                        <label htmlFor="category1" style={{ color: "white" }}>
                          Any
                        </label>

                        <br />

                        <Field
                          type="radio"
                          id="category2"
                          name="category"
                          value="categories"
                          title="secondBtn"
                        />
                        <label style={{ color: "white" }} htmlFor="category2">
                          Custom
                        </label>
                        <Field
                          data-testid="cbShowHide1"
                          type="checkbox"
                          name="customCategory"
                          value="Programming"
                          disabled={disable}
                          style={{
                            marginLeft: "10px",
                            marginRight: "2px",
                          }}
                        />
                        <label
                          style={{ color: "white" }}
                          htmlFor="customCategory"
                        >
                          Programming
                        </label>
                        <Field
                          data-testid="cbShowHide2"
                          type="checkbox"
                          name="customCategory"
                          value="Miscellaneous"
                          disabled={disable}
                          style={{ marginLeft: "10px", marginRight: "2px" }}
                        />
                        <label
                          style={{ color: "white" }}
                          htmlFor="customCategory"
                        >
                          Misc
                        </label>
                        <Field
                          type="checkbox"
                          name="customCategory"
                          value="Dark"
                          disabled={disable}
                          style={{ marginLeft: "10px", marginRight: "2px" }}
                        />
                        <label
                          style={{ color: "white" }}
                          htmlFor="customCategory"
                        >
                          Dark
                        </label>
                        <Field
                          type="checkbox"
                          name="customCategory"
                          value="Pun"
                          disabled={disable}
                          style={{ marginLeft: "10px", marginRight: "2px" }}
                        />
                        <label
                          style={{ color: "white" }}
                          htmlFor="customCategory"
                        >
                          Pun
                        </label>
                        <Field
                          type="checkbox"
                          name="customCategory"
                          value="Spooky"
                          disabled={disable}
                          style={{ marginLeft: "10px", marginRight: "2px" }}
                        />
                        <label
                          style={{ color: "white" }}
                          htmlFor="customCategory"
                        >
                          Spooky
                        </label>
                        <Field
                          type="checkbox"
                          name="customCategory"
                          value="Christmas"
                          disabled={disable}
                          style={{ marginLeft: "10px", marginRight: "2px" }}
                        />
                        <label
                          style={{ color: "white" }}
                          htmlFor="customCategory"
                        >
                          Christmas
                        </label>
                      </div>
                    </td>
                  </tr>

                  {/* for languages */}
                  <tr className="form-control">
                    <td className="left-col">
                      <label htmlFor="languages" style={{ color: "white" }}>
                        Select
                        <label style={{ color: "#717eea" }}> language</label>:
                      </label>
                    </td>
                    <td className="right-col">
                      <div className="input-div">
                        <Field
                          data-testid="selects"
                          onClick={() => {
                            props.values.maxRange =
                              this.state.data[props.values.language][1];
                            props.values.maxRange2 = props.values.maxRange;
                          }}
                          as="select"
                          id="language"
                          name="language"
                        >
                          <option data-testid="select-option" value="cs">
                            cs-Czech
                          </option>
                          <option data-testid="select-option" value="de">
                            de-German
                          </option>
                          <option data-testid="select-option" value="en">
                            en-English
                          </option>
                          <option data-testid="select-option" value="es">
                            es-Spanish
                          </option>
                          <option data-testid="select-option" value="fr">
                            fr-French
                          </option>
                          <option data-testid="select-option" value="pt">
                            pt-Portuguese
                          </option>
                        </Field>
                      </div>
                    </td>
                  </tr>
                  {/* for flags */}
                  <tr className="form-control">
                    <td className="left-col">
                      <label style={{ color: "white" }}>Select </label>
                      <label style={{ color: "#717eea" }}>flags </label>
                      <label style={{ color: "white" }}> to blacklist:</label>
                    </td>
                    <td className="right-col">
                      <div className="input-div">
                        <label style={{ color: "white" }}>(optional)</label>
                        <Field
                          style={{ marginLeft: "10px" }}
                          id="flags"
                          name="flags"
                          value="nsfw"
                          type="checkbox"
                        ></Field>
                        <label style={{ color: "white" }}>nsfw</label>
                        <Field
                          style={{ marginLeft: "10px" }}
                          id="flags"
                          name="flags"
                          value="religious"
                          type="checkbox"
                        ></Field>
                        <label style={{ color: "white" }}>religious</label>
                        <Field
                          style={{ marginLeft: "10px" }}
                          id="flags"
                          name="flags"
                          value="political"
                          type="checkbox"
                        ></Field>
                        <label style={{ color: "white" }}>political</label>
                        <Field
                          style={{ marginLeft: "10px" }}
                          id="flags"
                          name="flags"
                          value="racist"
                          type="checkbox"
                        ></Field>
                        <label style={{ color: "white" }}>racist</label>
                        <Field
                          style={{ marginLeft: "10px" }}
                          id="flags"
                          name="flags"
                          value="sexist"
                          type="checkbox"
                        ></Field>
                        <label style={{ color: "white" }}>sexist</label>
                        <Field
                          style={{ marginLeft: "10px" }}
                          id="flags"
                          name="flags"
                          value="explicit"
                          type="checkbox"
                        ></Field>
                        <label style={{ color: "white" }}>explicit</label>
                      </div>
                    </td>
                  </tr>
                  {/* for format */}
                  <tr style={{ color: "white" }} className="form-control">
                    <td className="left-col">
                      <label style={{ color: "white" }}>Select </label>
                      <label style={{ color: "#717eea" }}>
                        response format
                      </label>
                      :
                    </td>
                    <td className="right-col">
                      <div className="input-div">
                        <Field
                          title="json"
                          style={{ marginLeft: "10px" }}
                          type="radio"
                          name="respFormat"
                          id="json"
                          value="json"
                        />
                        <label htmlFor="json" style={{ color: "white" }}>
                          default (json)
                        </label>
                        <Field
                          style={{ marginLeft: "10px" }}
                          type="radio"
                          id="json"
                          name="respFormat"
                          value="xml"
                        />
                        <label htmlFor="json" style={{ color: "white" }}>
                          xml
                        </label>

                        <Field
                          title="yaml"
                          style={{ marginLeft: "10px" }}
                          type="radio"
                          name="respFormat"
                          id="yaml"
                          value="yaml"
                        />
                        <label htmlFor="yaml" style={{ color: "white" }}>
                          yaml
                        </label>
                        <Field
                          title="yaml"
                          style={{ marginLeft: "10px" }}
                          type="radio"
                          name="resp"
                          id="txt"
                          value="txt"
                        />
                        <label htmlFor="txt" style={{ color: "white" }}>
                          plain text
                        </label>
                      </div>
                    </td>
                  </tr>
                  <tr style={{ color: "white" }} className="form-control">
                    <td className="left-col">
                      <label style={{ color: "white" }}>
                        Select at least one{" "}
                      </label>
                      <label style={{ color: "#717eea" }}>joke type</label>:
                    </td>
                    <td className="right-col">
                      <div
                        style={
                          props.values.jokeType &&
                          props.values.jokeType.length >= 1
                            ? { borderColor: "white" }
                            : { borderColor: "red" }
                        }
                        className="input-div"
                      >
                        <Field
                          data-testid="single"
                          style={{ marginLeft: "10px" }}
                          type="checkbox"
                          name="jokeType"
                          id="type"
                          value="single"
                        ></Field>
                        <label>single</label>
                        <Field
                          data-testid="twopart"
                          style={{ marginLeft: "10px" }}
                          type="checkbox"
                          name="jokeType"
                          id="type"
                          value="twopart"
                        ></Field>
                        <label>twopart</label>
                      </div>
                    </td>
                  </tr>
                  <tr style={{ color: "white" }} className="form-control">
                    <td className="left-col">
                      <label>Search for a joke that</label>
                      <br />
                      <label>contains this </label>
                      <label style={{ color: "#717eea" }}>search string</label>:
                    </td>

                    <td className="right-col">
                      <div className="input-div">
                        <Field
                          aria-label="string-input"
                          name="searchString"
                          style={{ width: "100%" }}
                          type="text"
                          id="search"
                          placeholder="optional"
                        />
                      </div>
                    </td>
                  </tr>
                  <tr style={{ color: "white" }} className="form-control">
                    <td className="right-col">
                      <label>Search for a joke</label>
                      <br />
                      <label>in this </label>
                      <label style={{ color: "#717eea" }}>ID range</label>:
                    </td>
                    <td className="right-col">
                      <div
                        className="input-div"
                        style={
                          props.values.minRange > props.values.maxRange
                            ? { borderColor: "red" }
                            : { borderColor: "white" }
                        }
                      >
                        <Field
                          aria-label="number-input1"
                          type="number"
                          min={0}
                          defaultValue={0}
                          id="idRange"
                          name="minRange"
                          style={{ width: "12%" }}
                        />{" "}
                        to
                        <Field
                          aria-label="number-input2"
                          type="number"
                          min={0}
                          max={props.values.maxRange2}
                          defaultValue={props.values.maxRange}
                          id="idRange"
                          name={"maxRange"}
                          style={{ width: "12%" }}
                        />
                      </div>
                    </td>
                  </tr>
                  <tr style={{ color: "white" }} className="form-control">
                    <td className="left-col">
                      <label style={{ color: "#717eea" }}>Amount </label>
                      <label>of Jokes</label>:
                    </td>
                    <td className="right-col">
                      <div className="input-div">
                        <Field
                          aria-label="amount"
                          style={{ width: "10%" }}
                          type="number"
                          min="1"
                          id="amount"
                          name="amount"
                        ></Field>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>

              <hr />
              <br />
              <br />
              <div id="urlBuilderWrapper" className="flexItem">
                <label>
                  "URL: "
                  <span id="urlBuilderUrl">
                    {/* {parseInt(url.length) === 28 ? (
                    <h3 style={{ color: "white", marginLeft: "30px" }}>
                      {this.state.url}
                    </h3>
                  ) : (
                    <h3 style={{ color: "white", marginLeft: "30px" }}>
                      {this.props.URL}
                    </h3>
                  )} */}
                    <div>
                      <h3 data-testid="url" label="URL">
                        {this.state.url2}
                      </h3>
                    </div>
                  </span>
                </label>
                <br />
                <button
                  onClick={() => {
                    const confirmBox = window.confirm(
                      "Do you really want to reset form?"
                    );

                    if (confirmBox === true) {
                      // this.props.changeApiUrl(
                      //   "https://v2.jokeapi.dev/joke/Any"
                      // );
                      // this.props.changeFormData(initialValues);
                      props.resetForm();
                      this.setState({ ...this.state, types: "reset" });
                    }
                  }}
                  // type="reset"
                >
                  Reset Form
                </button>
                <button type="submit">Send Request</button>
              </div>
              <code id="urlBuilderPrettyprint">
                <span className="nocode codeheader">
                  <h3>Result:</h3>
                </span>
              </code>
              <div className="actualCode" id="tryItResult">
                {/* {count === 1 ? "hello" : "HII"} */}
              </div>
            </Form>
          )}
        </Formik>
        {count === 1 ? (
          this.state.data2.error === false ? (
            // <pre>{JSON.stringify(this.state.data2, undefined, 4)}</pre>
            this.state.data2.type === "twopart" ? (
              <>
                <div className="twopart">{`setup: ${this.state.data2.setup}`}</div>

                <br />

                {this.state.delcount === 0 ? (
                  ""
                ) : (
                  <>
                    <span>
                      {`delivery: 
                 ${this.state.data2.delivery}`}
                    </span>
                    <br />
                  </>
                )}
                <button onClick={this.setDelCount}>Show delivery</button>
              </>
            ) : (
              <>
                {/* <div>{`jokes len=${this.state.data2.jokes.length}`}</div> */}
                {this.state.data2 &&
                this.state.data2.jokes &&
                this.state.data2.jokes.length > 0 ? (
                  <>
                    {this.state.data2.jokes.map((joke) =>
                      // <div>{`joke: ${joke.joke}`}</div>
                      joke.joke ? (
                        <div>
                          <span>{`joke: ${joke.joke}`}</span>
                        </div>
                      ) : (
                        <>
                          <div
                            id="set"
                            className="setupDiv"
                          >{`setup: ${joke.setup}`}</div>
                          {this.state.delcount === 0 ? (
                            ""
                          ) : (
                            <>
                              {" "}
                              {`delivery: ${joke.delivery}`}
                              <br />
                              <br />
                            </>
                          )}
                        </>
                      )
                    )}
                    <button onClick={this.setDelCount}>Show Delivery</button>
                  </>
                ) : (
                  <div>{`Joke: ${this.state.data2.joke}`}</div>
                )}
              </>
            )
          ) : (
            <div style={{ color: "red" }}>
              {this.state.data2.additionalInfo}
            </div>
          )
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Home;
