// import { Navigate } from 'react-router-dom';

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";


function PersonPage() {
  const [perD, setPersD] = useState();
  const [oneTime, setOneTime] = useState(false);

  const navigate = useNavigate();


  const { id } = useParams();

  function handleFetch_PersonInfo() {
    console.log("The Person Info");
    // "tvrage":30715,"thetvdb":257655,"imdb":"tt2193021"
    let the_url = "https://api.tvmaze.com/people/" + `${id}`;
    fetch(the_url, { mode: "cors" })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setPersD(result);
      })
      .catch((error) => {
        console.log(
          "####################################################Within a fetch catch error",
          error
        );
      });
  }

  useEffect(() => {
    if (!oneTime) {
      if (!perD) {
        handleFetch_PersonInfo();
      }
    }

    if (perD) {
      console.log("perD", perD);
      // console.log(perD.name.replace(/ /g,''))
    }
  }, [oneTime, perD]);

  function downloadFile(data) {
    const blob = new Blob([data], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", `Person-${perD.name.replace(/ /g, "")}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  function dataToCsvFormat(data) {
    // console.log("object to csv data: ",data)
    let csvRows = [];
    let headarr = [];
    for (let key in data) {
      headarr.push(key);
    }
    console.log("Headarr", headarr);
    csvRows.push(headarr.join(","));
    console.log("csvRows1: ", csvRows);

    // Creating values and dealing with commas and quatations
    let values = [];
    for (let key in data) {
      // console.log(data[key])
      const escaped = String(data[key]).replace(/"/g, '\\"');
      values.push(`"${escaped}"`);
    }
    // console.log("values: ",values.join(','))
    csvRows.push(values.join(","));
    return csvRows.join("\n");
  }

  async function getDataForCsv() {
    const data = {
      name: perD.name,
      gender: perD.gender,
      country: perD.country.name,
      deathday: perD.deathday == null ? "Still Living" : perD.deathday,
      id: perD.id,
      updated: perD.updated,
    };
    // console.log("data---: ",data)
    const csvData = dataToCsvFormat(data);
    // console.log(csvData)
    downloadFile(csvData);
  }

  function dispPerD(){

    return(   
    <div className="row justify-content-center align-items-center p-3">
      <div className="col-12 col-md-5">
        <img src={perD.image.original} alt="..." className="img-fluid rounded" />
      </div>
      <div className="col-12 col-md-5">
        <div className="card text-center border border-3 border-dark " style={{backgroundColor:"grey" }}>
          <div className="card-header h1">{perD.name}</div>
          <div className="card-text p-3">
            <span className="border border-dark border-3 rounded-pill p-1 m-1 Self-PillColor">
            <strong>Born on: {perD.birthday}</strong>
            </span>
            <br />
            <br />
            <span className="border border-dark border-3 rounded-pill p-1 m-1 Self-PillColor"><strong>Country: {perD.country.name}</strong></span>
            <br />
            <br />
            <span className="border border-dark border-3 rounded-pill p-1 m-1 Self-PillColor"><strong>Gender: {perD.gender}</strong></span>
          </div>

          <div className="row">
              <div className="col-6">
              <button className="border border-primary border-3 rounded-pill" onClick={()=>{navigate("/show")}}>Previous page</button>
              </div>
              <div className="col-6">
              <button className="border border-primary border-3 rounded-pill" onClick={()=>{getDataForCsv()}}>Download Actor Data</button>
              </div>

          </div>

        </div>
      </div>
      {/* {perD?<button onClick={()=>{getReport()}}>DownLoad Person INFO TO CSV</button>:""} */}
    </div>
    )
  }

  return (
    <div id="PersonPageMainDiv">

        {perD?dispPerD():""}

      </div>
  );
}

export default PersonPage;
