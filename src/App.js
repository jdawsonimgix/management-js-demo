import "./App.css";
import { useState } from "react";
import Imgix from "react-imgix";
const ImgixAPI = require("imgix-management-js");

function App() {
  let arrSearchImgix = [];
  const [arrImgixSearched, setImgixSearchArray] = useState([]);

  async function searchPictureTags(searchItemSent) {
    console.log(`searchItem is: ` + searchItemSent);

    const imgix_api_key = process.env.REACT_APP_IMGIX_KEY;

    const imgix = new ImgixAPI({
      apiKey: `${imgix_api_key}`
    });

    await imgix
      .request(`assets/622f76522d67dbae5fb46268?filter[tags]=` + searchItemSent)
      .then((response) => {
        console.log(response);

        for (var i = 0; i < response.data.length; i++) {
          arrSearchImgix.push(response.data[i].attributes.origin_path);
        }
        setImgixSearchArray(arrSearchImgix);
        return response;
      });
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => searchPictureTags("Coffee+cup")}>
          Coffee Cup
        </button>
        <button onClick={() => searchPictureTags("fashion+accessory")}>
          Fashion Accessory
        </button>
        <button onClick={() => searchPictureTags("logo")}>Logo</button>

        <h2>How to use imgix-management.js in React</h2>
        <div class="column">
          {arrImgixSearched.map((value) => (
            <Imgix
              src={"https://ix-shop.imgix.net" + value}
              width={100} // This sets what resolution the component should load from the CDN and the size of the resulting image
              height={100}
            />
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
