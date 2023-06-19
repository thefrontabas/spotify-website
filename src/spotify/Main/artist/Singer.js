import React, { useEffect, useState } from "react";
import Header from "../home/View/Header";
import "./Singer.scss";
import { useSelector } from "react-redux";
import axios from "axios";
import loading from "../Asset/loading.gif";
import mainApi from "../Api/Api";
import Bradcrumb from "./Bradcrumb";
import Headers from "./Headers";
import { useLocation } from "react-router-dom";
import ColorThief from "colorthief";

export default function Singer(props) {
  let state = useSelector((state) => state.home.value);
  let location = useLocation();
  const [elem, setelem] = useState(null);
  const [colorstate, setcolorstate] = useState("#1f1f1f");
  const [user, setuser] = useState([]);
  const [followstate, setfollowstate] = useState([]);

  const [show, setshow] = useState(false);

  useEffect(() => {
    showdata();
  }, [location.pathname]);
  async function showdata(params) {
    setshow(true);
    try {
      let res = await mainApi(`/spotify`);

      let web = res.data.find((item) => item.lastName == state.keydata);
      setuser(web);
      setfollowstate(web.follow);
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    async function send() {
      const { data } = await axios(
        `https://api.spotify.com/v1/artists/${location.pathname.slice(8)}`,
        {
          headers: {
            Authorization: `Bearer ${state.tokendata}`,
          },
          params: {},
        }
      ).finally(() => {
        setTimeout(() => {
          setshow(false);
        }, 2000);
      });

      setelem(
        <>
          <Bradcrumb data={data} />
          <Headers data={data} user={user} followstate={followstate} />
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
          className="singerbox"
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
