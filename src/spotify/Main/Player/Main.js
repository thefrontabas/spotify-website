import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Player.scss";
import axios from "axios";
import { actfunc, playfunc } from "../../Redux/Home";
export default function Main(rparams) {
  let [music, setmusic] = useState("");
  const [time, settime] = useState();

  let state = useSelector((state) => state.home.value);
  let dispatch = useDispatch();
  function range(params) {
    let pos = 0;
    if (!isNaN(document.querySelector("#musicplayer").duration)) {
      pos =
        document.querySelector("#musicplayer").currentTime *
        (100 / document.querySelector("#musicplayer").duration);
      document.querySelector(".rangeinput").value = pos;
    }
  }
  useEffect(() => {
    send();
    settime(setInterval(range, 800));
    dispatch(playfunc("pause"));
    document.querySelector("#musicplayer").loop = true;
  }, [state.actname.id]);

  async function send(params) {
    try {
      if (state.actname.type == "album") {
        const { data } = await axios(
          `https://api.spotify.com/v1/albums/${state.actname.id}`,
          {
            headers: {
              Authorization: `Bearer ${state.tokendata}`,
            },
            params: {},
          }
        );
        setmusic(data.tracks.items[0].preview_url);
        document.title = `${data.artists[0].name}-${data.name}`;
        dispatch(actfunc(data));
      } else {
        if (state.actname.preview_url != undefined) {
          setmusic(state.actname.preview_url);
          dispatch(actfunc(state.actname));
        } else {
          setmusic("");
        }
        document.title = `${state.actname.artists[0].name}-${state.actname.name}`;
      }
    } catch (e) {
      console.log(e);
    }
  }
  function play(e) {
    if (e.target.class == "fa-solid fa-circle-play") {
      e.target.class = "fa-solid fa-circle-pause";
      document.querySelector("#musicplayer").play();
      dispatch(actfunc(state.actname));
      dispatch(playfunc("pause"));
      settime(setInterval(range, 800));
    } else {
      e.target.class = "fa-solid fa-circle-play";
      document.querySelector("#musicplayer").pause();
      dispatch(playfunc("play"));
      clearInterval(time);
    }
  }

  function change(params) {
    let slider =
      document.querySelector("#musicplayer").duration *
      (document.querySelector(".rangeinput").value / 100);
    document.querySelector("#musicplayer").currentTime = slider;
  }

  async function arrowfunc(number) {
    const song = await axios(
      `https://api.spotify.com/v1/artists/${state.actname.artists[0].id}/albums`,
      {
        headers: {
          Authorization: `Bearer ${state.tokendata}`,
        },
        params: {
          include_groups: "single",
          limit: 20,
        },
      }
    );

    const { data } = await axios(
      `https://api.spotify.com/v1/albums/${song.data.items[number].id}`,
      {
        headers: {
          Authorization: `Bearer ${state.tokendata}`,
        },
        params: {},
      }
    );

    setmusic(data.tracks.items[0].preview_url);
    dispatch(actfunc(data));
    dispatch(playfunc("pause"));
  }

  return (
    <div className="mainbox">
      <div className="iconbox">
        <div
          className="back"
          onClick={() => {
            arrowfunc(Math.round(Math.random() * 10));
          }}
        >
          <i class="fa-solid fa-backward-step"></i>
        </div>
        <div className="play">
          <i
            class={
              state.icon == "pause"
                ? "fa-solid fa-circle-pause"
                : "fa-solid fa-circle-play"
            }
            onClick={play}
          ></i>
        </div>
        <div
          className="forw"
          onClick={() => {
            arrowfunc(Math.round(Math.random() * 10));
          }}
        >
          <i class="fa-solid fa-forward-step"></i>
        </div>
      </div>
      <div className="timingbox">
        <div className="rangebox">
          <input
            type="range"
            className="rangeinput"
            min="1"
            max="100"
            onChange={change}
          />
        </div>
        <div className="time">0:29</div>
      </div>
      <audio src={music} autoPlay id="musicplayer" />
    </div>
  );
}
