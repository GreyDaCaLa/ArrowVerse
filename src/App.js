import { useEffect, useState, Fragment } from "react";
import { BrowserRouter,Routes, Route } from "react-router-dom";
import "./App.css";
import PersonPage from "./comp/PersonPage";
import ShowPage from "./comp/ShowPage.jsx";
import WelcomePage from "./comp/WelcomePage";

function App() {
  const [mainD, setMainD] = useState();
  const [castD, setCastD] = useState();
  const [oneTime, setOneTime] = useState(false);

  function handleFetch_ShowMainInfo() {
    // console.log("The Main Info");
    // "tvrage":30715,"thetvdb":257655,"imdb":"tt2193021"
    let the_url = "https://api.tvmaze.com/lookup/shows?tvrage=30715";
    fetch(the_url, { mode: "cors" })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setMainD(result);
      })
      .catch((error) => {
        console.log(
          "####################################################Within a fetch catch error",
          error
        );
      });
  }

  function handleFetch_ShowMainCast() {
    // console.log("The Main Cast");
    // "tvrage":30715,"thetvdb":257655,"imdb":"tt2193021"
    // ID = 4 for arrow
    let the_url = "https://api.tvmaze.com/shows/4/cast";
    fetch(the_url, { mode: "cors" })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setCastD(result);
      })
      .catch((error) => {
        console.log(
          "####################################################Within a fetch catch error",
          error
        );
      });
  }



  useEffect(() => {
    // console.log("--within useEffect");

    if (!oneTime) {
      setOneTime(true);
      if (!mainD) {
        handleFetch_ShowMainInfo();
      }

      if (!castD) {
        handleFetch_ShowMainCast();
      }
    }

    // if (mainD && castD) {
    //   // console.log("mainD: ", mainD);
    //   // console.log("premiered: ",mainD.premiered)
    //   // console.log("name: ",mainD.name)
    //   // console.log("type: ",mainD.type)
    //   // console.log("castD: ",mainD.ended)
    //   // console.log("CastD", castD);
    // }
  },[oneTime,mainD,castD]);

  return (
    <div id="APP_MainDiv" className="Self_MainDivColor">

    <BrowserRouter>
    <Fragment>
      <Routes>

      <Route exact path="/person/:id" element={<PersonPage/>}/>
        <Route exact path="/show" element={<ShowPage mainD={mainD} castD={castD}/>}/>
        <Route exact path="/" element={<WelcomePage/>}/>

      </Routes>
      </Fragment>
    </BrowserRouter>


    <div>
      <br/>
      <br/>
      <br/>
    </div>

    <div className="card m-3 text-center">
      <p className="p-0 m-0">All information, Pictures, data are provided by TVmaze API</p>
      <a href="https://www.tvmaze.com/api">
      <p className="p-0 m-0">Click here to visit there cite API documentation</p>
      </a>
    </div>
    <div>
      <br/>
      <br/>
      <br/>
    </div>
    </div>
  );
}

export default App;

/*
4. The Main show page should display the following fields:
a. Show Name
b. Type
c. Date Primiered - Format Date as YYYY-MM-DD
d. Date Ended - Format Date as YYYY-MM-DD
e. List of Cast Members with links to Cast Member Page.
*/
