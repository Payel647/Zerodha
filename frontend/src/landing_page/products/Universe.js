import React from "react";
import {Link} from "react-router-dom"
function Universe() {
  return (
    <div className="container mt-5">
      <div className="row text-center">
        <h1 className="text-muted mt-3">The TraDexa Universe</h1>
        <p className="text-muted mt-3">
          Extend your trading and investment experience even further with our partner platforms
        </p>

        {/* Platforms Grid */}
        <div className="row mt-4">
          {[
            { src: "media/smallcaseLogo.png", text: "Thematic investing platform", width: "100%" },
            { src: "media/streakLogo.png", text: "Algo & strategy platform", width: "45%" },
            { src: "media/sensibullLogo.svg", text: "Option trading platform", width: "85%" },
            { src: "media/zerodhaFundhouse.png", text: "Asset management", width: "50%" },
            { src: "media/goldenpiLogo.png", text: "Bond trading platform", width: "100%" },
            { src: "media/dittoLogo.png", text: "Insurance", width: "30%" },
          ].map((item, index) => (
            <div key={index} className="col-md-4 col-sm-6 col-12 p-3 d-flex flex-column align-items-center">
              <img src={item.src} alt="" style={{ width: item.width, maxWidth: "150px" }} />
              <p className="text-small text-muted text-center p-2">{item.text}</p>
            </div>
          ))}
        </div>

        {/* Signup Button */}
        <div className="d-flex justify-content-center mt-3">
          <Link to={"/signup"}><button className="p-2 btn btn-primary fs-5 mb-5" style={{ width: "200px" }}>
            Signup Now
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Universe;