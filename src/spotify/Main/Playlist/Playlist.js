import React, { useEffect, useState } from "react";
import Header from "../home/View/Header";
import "./Playlist";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import loading from "../Asset/loading.gif";
import mainApi from "../Api/Api";
import { plsylistfunc } from "../../Redux/Home";
import Playlistfooter from "./Playlistfooter";
import ColorThief from "colorthief";

export default function Playlist(params) {
  let state = useSelector((state) => state.home.value);
  let loc = useLocation();
  let dispatch = useDispatch();
  const [elem, setelem] = useState(null);
  const [colorstate, setcolorstate] = useState("#9DA3A3");
  const [user, setuser] = useState([]);
  const [like, setlike] = useState([]);
  const [data, setdata] = useState();
  const [show, setshow] = useState(false);

  useEffect(() => {
    setshow(true);
    getdata();
    send();
  }, [loc.pathname]);

  async function getdata(params) {
    try {
      let res = await mainApi(`/spotify`);

      let web = res.data.find((item) => item.lastName == state.keydata);
      setuser(web);
      setlike(web.like);
    } catch (e) {
      console.log(e);
    }
  }

  async function send() {
    try {
      const { data } = await axios(
        `https://api.spotify.com/v1/playlists/${loc.pathname.slice(10)}`,
        {
          headers: {
            Authorization: `Bearer ${state.tokendata}`,
          },
          params: {},
        }
      ).finally(() => {
        setTimeout(() => {
          setshow(false);
        }, 100);
      });
      setdata(data);
      dispatch(plsylistfunc(data));
      document.title = `Spotify-${data.name}`;

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

      setelem(
        <>
          <div className="singerhead" title={data.name}>
            <div className="cover">
              <img src={data.images[0].url} alt="cover-artist" />
            </div>
            <div
              className="infobox"
              style={{
                paddingTop: data.name.length <= 20 ? "40px" : "96px",
              }}
            >
              <div className="veribox">PLAYLIST</div>
              <div
                className="name"
                style={{
                  fontSize: data.name.length <= 20 ? "75px" : "40px",
                }}
              >
                {data.name.slice(0, 40)}
              </div>
              <div className="desc">{data.description.slice(0, 100)}</div>
              <div className="listenbox">
                <div className="logo">Spotify &bull;</div>
                <div className="like">
                  {new Intl.NumberFormat("en-US").format(data.followers.total)}
                  Likes &bull;
                </div>
                <div className="number">{data.tracks.items.length} songs</div>
              </div>
            </div>
          </div>
        </>
      );
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      {show ? (
        <div className="loadbox">
          <img src={loading} alt="loading" />
        </div>
      ) : (
        <div
          className="playlistbox"
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
          <Playlistfooter user={user} data={data} like={like} />
        </div>
      )}
    </>
  );
}
