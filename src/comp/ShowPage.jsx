import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ShowPage({ mainD, castD }) {
  // const [picNum,setPicNum] = useState(0);
  const [images, setImages] = useState();
  const [imgCount, setImgCount] = useState();
  const [oneTime, setOneTime] = useState(false);

  function handleFetch_ShowMainInfo() {
    console.log("The Images Info");
    // "tvrage":30715,"thetvdb":257655,"imdb":"tt2193021"
    let the_url = "https://api.tvmaze.com/shows/4/images";
    fetch(the_url, { mode: "cors" })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setImages(result);
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
      setOneTime(true);
      if (!images) {
        handleFetch_ShowMainInfo();
      }
    }

    if (images && !imgCount) {
      setImgCount(images.length + 1);
      console.log("Show Images", images);
    }
  }, [oneTime, images]);

  function dispPic() {
    // switch(picNum){
    //   case 0:
    //   case 1:
    //   case 2:
    //   case 3:
    //   case 4:
    //   default:
    //     return
    // }

    if (imgCount >= images.length + 1) {
      return mainD.image.original;
    }

    return images[imgCount - 1].resolutions.original.url;
  }

  function dispMainD() {
    return (
      <>
        <div className="row col-md-5 col-12 m-2">
          <div>
          <div
            className="card m-0 p-0 text-center border border-dark border-3"
            style={{ backgroundColor: "grey" }}
          >
            <div className="card-header h3">Offical Title</div>
            <div className="card-text Self_ShowName">{mainD.name}</div>
            <div className="card-footer row">
              <div className="mb-3">
                <span className="border border-dark border-3 rounded-pill p-1 m-1 Self-PillColor">
                  <strong>{`Status: ${mainD.status}`}</strong>
                </span>
              </div>

              <div className="mb-3">
                <span className="border border-dark border-3 rounded-pill p-1 m-1 Self-PillColor">
                  <strong>{`Rating: ${mainD.rating.average}`}</strong>
                </span>
              </div>

              <div className="mb-3">
                <span className="border border-dark border-3 rounded-pill p-1 m-1 Self-PillColor">
                  <strong>{`Type: ${mainD.type}`}</strong>
                </span>
              </div>

              <div className="mb-3">
                <span className="border border-dark border-3 rounded-pill p-1 m-1 Self-PillColor">
                  <strong>{`Primiered: ${mainD.premiered}`}</strong>
                </span>
              </div>

              <div className="mb-3">
                <span className="border border-dark border-3 rounded-pill p-1 m-1 Self-PillColor">
                  <strong>{`Ended: ${mainD.ended}`}</strong>
                </span>
              </div>

              <div className="mb-3">
                <div className="border border-dark border-3 rounded-pill Self-PillColor">

                <span className=" p-1 m-1">
                  <strong>{`Genre: ${mainD.genres.join("/")}`}</strong>
                </span>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>

        <div
          className="card bg-dark text-white p-3 col-6"
          onClick={() => {
            imgCount >= images.length + 1
              ? setImgCount(1)
              : setImgCount(imgCount + 1);
          }}
        >
          <img src={dispPic()} className="card-img" alt="..." />
          {`${imgCount}/${images.length + 1} click for more images`}
          <div className="card-img-overlay"></div>
        </div>

        <div>

        <div className="accordion" id="accordionPanelsStayOpenExample">
        <div className="accordion-item">
          <h2 className="accordion-header" id="panelsStayOpen-heading1">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapse1"
              aria-expanded="false"
              aria-controls="panelsStayOpen-collapse1"
            >
              Summary
            </button>
          </h2>
          <div
            id="panelsStayOpen-collapse1"
            className="accordion-collapse collapse"
            aria-labelledby="panelsStayOpen-heading1"
          >
           <div className="accordion-body text-center">
           <div className="row m-0 justify-content-around g-2">
           <p>{mainD.summary.replace('</p>','').replace('<p>','')}</p>
            </div> 

          </div>
        </div>
      </div>
      </div>

        </div>
      </>
    );
  }

  function moremore() {
    return (
      
      
      <div className="accordion" id="accordionPanelsStayOpenExample">
        <div className="accordion-item">
          <h2 className="accordion-header" id="panelsStayOpen-heading2">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapse2"
              aria-expanded="false"
              aria-controls="panelsStayOpen-collapse2"
            >
              Cast
            </button>
          </h2>
          <div
            id="panelsStayOpen-collapse2"
            className="accordion-collapse collapse"
            aria-labelledby="panelsStayOpen-heading2"
          >
           <div className="accordion-body Self-SkillCardCont">
           <div className="row m-0 justify-content-around g-2">
           {dispCastD()}
            </div> 

          </div>
        </div>
      </div>
      </div>
    );
  }

  function midPictureContent(act) {
    let CharacterNames = act.character.name.split("/");
    // console.log(CharacterNames)

    return (
      <>
        <p className="text-start p-0 m-0 Self_MidPictureText">
          <strong>{`Character:`}</strong>
        </p>
        {/* <br /> */}
        <p className="text-start p-0 m-0 Self_MidPictureText">
          <strong>{`${CharacterNames[0]}`}</strong>
        </p>
        <br />
        {/* <br /> */}
        <p className="text-end p-0 m-0 Self_MidPictureText">
          <strong>{`Actor:`}</strong>
        </p>
        {/* <br /> */}
        <p className="text-end p-0 m-0 Self_MidPictureText">
          <strong>{`${act.person.name}`}</strong>
        </p>
      </>
    );
  }

  function dispCastD() {
    return (
      <>
        {castD.map((act, index) => {
          return (
            <div
              className="card col-md-5 col-11 border border-3 border-dark"
              key={act.person.name + `${index}`}
              style={{ backgroundColor: "grey" }}
            >
              <Link
                to={`/person/${act.person.id}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <div className=" row justify-content-center m-0 p-1">
                  <div className="col-3 p-0">
                    <img
                      src={act.character.image.original}
                      className="rounded float-start w-100"
                      alt="character alt"
                    />
                  </div>

                  <div className="col-5 text-center">
                    {midPictureContent(act)}
                  </div>

                  <div className="col-3 p-0">
                    <img
                      src={act.person.image.original}
                      className="rounded float-end w-100"
                      alt="person alt"
                    />
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </>
    );
  }

  return (
    <>
      <div>
        <div className="row m-0 justify-content-center">
          {mainD && images && imgCount ? dispMainD() : ""}
        </div>
      </div>
      <div className="m-2">

          {mainD && castD ? moremore() : ""}
        
      </div>
      
    </>
  );
}

export default ShowPage;
