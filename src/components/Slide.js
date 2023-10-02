import React from 'react';

function Slide(props) {
  return (
    <>
      {props.images.length !== 0 ?
        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel" style={props.styleImage} >
          <ol className="carousel-indicators">
            {props.images.map((image, index) => {
              if (index === 0) return (<li key={JSON.stringify(image)} data-target="#carouselExampleIndicators" data-slide-to={index} className="active"></li>)
              else return (<li key={JSON.stringify(image)} data-target="#carouselExampleIndicators" data-slide-to={index}></li>)
            })}
          </ol>
          <div className="carousel-inner">
            {props.images.map((image, index) => {
              if (index === 0) return (
                <div className="carousel-item active" key={JSON.stringify(image)}>
                  <img className="d-block" style={props.styleImage} src={image.url} alt="House" />
                </div>)
              else return (
                <div className="carousel-item" key={JSON.stringify(image)}>
                  <img className="d-block" style={props.styleImage} src={image.url} alt="House" />
                </div>)
            })}

          </div>
          <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
        : <h1>Chưa có dữ liệu</h1>}
    </>

  );
}

export default Slide;