import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import ColorThief from "colorthief";

export default function Welcome(props) {
  const [art, setart] = useState([]);
  const [text, settext] = useState("");
  let state = useSelector((state) => state.home.value);

  useEffect(() => {
    send();
    let time = new Date().getHours();

    if (time >= 4 && time <= 12) {
      settext("morning");
    } else if (time >= 13 && time <= 16) {
      settext("afternoon");
    } else {
      settext("evening");
    }
  }, []);

  async function send(params) {
    try {
      const { data } = await axios.get(
        `https://api.spotify.com/v1/artists/5BWEzcCkhlDK9MLrw7sDKu/related-artists`,
        {
          headers: {
            Authorization: `Bearer ${state.tokendata}`,
          },
          params: { limit: 4 },
        }
      );
      setart(data.artists);
    } catch (e) {
      console.log(e);
    }
  }

  const hover = (source) => {
    const colorThief = new ColorThief();
    const img = new Image();

    img.addEventListener("load", async function () {
      let rgb = colorThief.getColor(img);
      document.querySelector(
        ".contentbox"
      ).style.background = ` linear-gradient(
        to bottom,
                             ${rgbToHex(rgb[0], rgb[1], rgb[2])} 0%,
                               rgba(15, 15, 15, 1) 44%
                             )`;
    });

    img.crossOrigin = "Anonymous";
    img.src = source;
    const rgbToHex = (r, g, b) =>
      "#" +
      [r, g, b]
        .map((x) => {
          const hex = x.toString(16);
          return hex.length === 1 ? "0" + hex : hex;
        })
        .join("");
  };

  return (
    <>
      <div className="welbox">
        <div className="welhead">Good {text}</div>
        <div className="welflex">
          {art.map((item, index) => {
            if (index > 0 && index <= 6) {
              return (
                <div
                  className="welmusic"
                  title={item.name}
                  onMouseEnter={() => hover(item.images[0].url)}
                  key={index}
                >
                  <div className="cover">
                    <NavLink to={`/Artist/${item.id}`}>
                      <img src={item.images[0].url} />
                    </NavLink>
                  </div>
                  <div className="infobox">
                    <NavLink
                      to={`/Artist/${item.id}`}
                      style={{
                        textDecoration: "none",
                      }}
                    >
                      <div className="name">{item.name}</div>
                    </NavLink>
                  </div>

                  <div className="play">
                    <NavLink
                      to={`/Artist/${item.id}`}
                      style={{
                        textDecoration: "none",
                      }}
                    >
                      <ion-icon id="icon" name="play"></ion-icon>
                    </NavLink>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </>
  );
}
