import React from "react";
import { useState } from "react";
import {axiosInstance} from "../config";
import copy from "copy-to-clipboard";
function URLshortnertool() {
  const [longUrl, setlongUrl] = useState("");
  const [shortUrl, setshortUrl] = useState("");
  const [copied, setCopied] = useState(true);
  const copyUrl = () => {
    copy(shortUrl);
    setCopied(false);
  };
  const handleSubmit = async(event) => {
    event.preventDefault();
    try {
      const response = await axiosInstance.post("https://urlshortnershortly.herokuapp.com/api/urls", {
        longUrl,
      });
      const data = response.data.id;
      setshortUrl(data);
      copyUrl();
    } catch (error) {
      console.log(error);
    }
  };
  function copy(text) {
    navigator.clipboard.writeText(text);
  }
  return (
    <div className="shortner_tool">
      <h2 id="shortner_heading">Get your URL shortened!</h2>

      <form onSubmit={handleSubmit}>
        <input
          className="shortner_inputs"
          placeholder="paste your long URL here "
          type="text"
          value={longUrl}
          onChange={(e) => setlongUrl(e.target.value)}
        />
        <input className="shortner_buttons" type="submit" />
      </form>
      <br></br>
      <span>
        <input
          className="shortner_inputs"
          placeholder="shortened URL"
          value={shortUrl}
        ></input>
        <button
          onClick={() => {
            console.log("clicked");
            copy(shortUrl);
          }}
          className="shortner_buttons"
          disabled={copied}
        >
        <span className = "copy_text">
            Copy
        </span>
         
        </button>
      </span>
    </div>
  );
}

export default URLshortnertool;