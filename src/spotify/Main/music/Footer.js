import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { actfunc, playfunc } from "../../Redux/Home";

import mainApi from "../Api/Api";
import Gener from "../home/View/Gener";
import Toast from "../../Toast/Toast";

export default function Footer({ data, user, likestate }) {
  const [mess, setmess] = useState(false);
  const [textmess, settextmess] = useState("message");
  const [play, setplay] = useState();

  let dispatch = useDispatch();

  let state = useSelector((state) => state.home.value);
  let time = Math.round(data.tracks.items[0].duration_ms / 1000);
  let min = Math.trunc(time / 60);
  let sec = Math.trunc(Math.abs(min * 60 - time));

  const heart = (e, name) => {
    if (e.target.name == "heart-outline") {
      settextmess("Save to Your Library");
      setmess(true);
      e.target.setAttribute("id", "anim");

      setTimeout(() => {
        setmess(false);
        e.target.setAttribute("id", "");
      }, 1300);

      e.target.name = "heart";
      e.target.style.color = "#1db954";
      let findmusic = user.like.find((child) => child == name);
      if (!findmusic) {
        mainApi.put(`/spotify/${user.id}`, {
          like: [...user.like, name],
        });
      }
    } else {
      settextmess("Removed from Your Library");
      setmess(true);
      e.target.setAttribute("id", "anim");

      setTimeout(() => {
        setmess(false);
        e.target.setAttribute("id", "");
      }, 1300);
      e.target.name = "heart-outline";
      e.target.style.color = "#adadad";
      let findname = user.like.filter((child) => child != name);
      mainApi.put(`/spotify/${user.id}`, {
        like: [...findname],
      });
    }
  };

  const hand = async (e, item) => {
    dispatch(actfunc(item));
    document.title = `${item.name} ${String.fromCodePoint(2022)} ${
      item.artists[0].name
    }`;
    if (e.target.name == "play") {
      document.querySelector(".musicfooter .mainbox").style.background =
        "#fafafa2f";
      setplay(true);
      e.target.name = "pause";
      dispatch(playfunc(e.target.name));

      let web = user.find((item) => user.lastName == state.keydata);
      let findmusic = web.recentplay.find((child) => child.name == item.name);
      if (!findmusic) {
        mainApi.put(`/spotify/${web.id}`, {
          recentplay: [...web.recentplay, item],
        });
      }
      document.querySelector("#musicplayer").play();
    } else {
      e.target.name = "play";
      setplay(false);
      dispatch(playfunc(e.target.name));
      document.querySelector(".musicfooter .mainbox").style.background = "";
      document.querySelector("#musicplayer").pause();
    }
  };
  let app = likestate.find((item) => item === data.id);

  return (
    <div className="musicfooter">
      <div className="playboxmusic">
        <div className="play">
          <ion-icon
            name={
              state.actname.id == data.id && state.icon == "pause"
                ? "pause"
                : "play"
            }
            onClick={(e) => hand(e, data)}
          ></ion-icon>
        </div>
        <div className="heart">
          <ion-icon
            name={app ? "heart" : "heart-outline"}
            style={{
              color: app ? "#1db954" : "#adadad",
            }}
            onClick={(e) => heart(e, data.id)}
          ></ion-icon>
        </div>
      </div>

      <div className="mainplayer">
        <div className="titlebox">
          <div className="text"># TITLE</div>
          <div className="icon">
            <ion-icon name="time-outline"></ion-icon>
          </div>
        </div>
        <div
          className="mainbox"
          title={data.name}
          onMouseMove={() => setplay(true)}
          onMouseLeave={() => {
            state.actname.id == data.id && state.icon == "pause"
              ? setplay(true)
              : setplay(false);
          }}
          style={{
            backgroundColor:
              state.actname.id == data.id && state.icon == "pause"
                ? "#fafafa2f"
                : "",
          }}
        >
          <div className="firstbox">
            {play && state.actname.id == data.id ? (
              <div className="play">
                <ion-icon
                  name={
                    state.actname.id == data.id && state.icon == "pause"
                      ? "pause"
                      : "play"
                  }
                  onClick={(e) => hand(e, data)}
                ></ion-icon>
              </div>
            ) : (
              <div className="number">1</div>
            )}

            <div className="infobox">
              <div className="name">{data.name}</div>
              <div className="singer">
                {data.artists.map((item, index) => (
                  <span key={index}>
                    <NavLink
                      style={{
                        textDecoration: "none",
                        color: "#aaa7a7",
                      }}
                      to={`/Artist/${item.id}`}
                    >
                      {item.name} ,
                    </NavLink>
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="timebox">
            <div className="time">
              {min}:{sec < 10 ? `0${sec}` : sec}
            </div>
          </div>
        </div>
      </div>
      <Gener
        singer={data.artists[0].id}
        tit={`More by ${data.artists[0].name}`}
      />
      {mess && <Toast text={textmess} />}
    </div>
  );
}
