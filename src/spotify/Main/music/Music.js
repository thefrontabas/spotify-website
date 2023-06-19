import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../home/View/Header";
import Headers from "./Headers";
import axios from "axios";
import ColorThief from "colorthief";

import "./Music.scss";
import { useLocation } from "react-router-dom";
import loading from "./../Asset/loading.gif";
import mainApi from "../Api/Api";
import Bradcrumb from "./Bradcrumb";
import Footer from "./Footer";
export default function Music(props) {
  const [colorstate, setcolorstate] = useState("");
  const [elem, setelem] = useState(null);
  const [show, setshow] = useState(false);
  const [user, setuser] = useState([]);
  const [likestate, setlikestate] = useState([]);
  let location = useLocation();
  let state = useSelector((state) => state.home.value);

  useEffect(() => {
    showdata();
  }, [location.pathname]);

  async function showdata(params) {
    setshow(true);
    try {
      let res = await mainApi(`/spotify`);

      let web = res.data.find((item) => item.lastName == state.keydata);
      setuser(web);
      setlikestate(web.like);
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    async function send(params) {
      const { data } = await axios
        .get(
          state.actname.type == "album" || state.actname.length == 0
            ? `https://api.spotify.com/v1/albums/${location.pathname.slice(7)}`
            : `https://api.spotify.com/v1/albums/${state.actname.album.id}`,
          {
            headers: {
              Authorization: `Bearer ${state.tokendata}`,
            },
            params: {},
          }
        )
        .finally(() =>
          setTimeout(() => {
            setshow(false);
          }, 1500)
        );
      setelem(
        <>
          <Bradcrumb data={data} />
          <Headers data={data} />
          <Footer data={data} user={user} likestate={likestate} />
        </>
      );
      const colorThief = new ColorThief();
      const img = new Image();

      img.addEventListener("load", async function () {
        let rgb = colorThief.getColor(img);
        setcolorstate(rgbToHex(rgb[0], rgb[1], rgb[2]));
      });

      img.crossOrigin = "Anonymous";
      img.src = data.images[0].url;
      const rgbToHex = (r, g, b) =>
        "#" +
        [r, g, b]
          .map((x) => {
            const hex = x.toString(16);
            return hex.length === 1 ? "0" + hex : hex;
          })
          .join("");
    }

    send();
  });

  return (
    <>
      {show ? (
        <div className="loadbox">
          <img src={loading} alt="loading" />
        </div>
      ) : (
        <div
          className="musicbox"
          style={{
            background: ` linear-gradient(
          to bottom,
         ${colorstate} 0%,
          rgba(15, 15, 15, 1) 84%
      )`,
          }}
        >
          <Header />

          {elem}
        </div>
      )}
    </>
  );
}
