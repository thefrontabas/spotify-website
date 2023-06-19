import { useState } from "react";
import Album from "./Album";
import Fans from "./Fans";
import { Top } from "./Top";
import mainApi from "../Api/Api";
import Toast from "../../Toast/Toast";

export default function Headers({ data, user, followstate }) {
  const [mess, setmess] = useState(false);
  const [textmess, settextmess] = useState("message");


  const followfunc = (e, name) => {
    if (e.target.textContent == "FOLLOW") {
      e.target.textContent = "FOLLOWING";
      settextmess("Save to Your Library");
      setmess(true);

      setTimeout(() => {
        document.querySelector(".messbox .text").setAttribute("id", "hide");
      }, 1000);
      setTimeout(() => {
        setmess(false);
        document.querySelector(".messbox .text").setAttribute("id", "");
      }, 1300);
      let findmusic = user.follow.find((child) => child.id == name.id);
      if (!findmusic) {
        mainApi.put(`/spotify/${user.id}`, {
          follow: [...user.follow, name],
        });
      }
    } else {
      settextmess("Removed from Your Library");
      setmess(true);
      setTimeout(() => {
        document.querySelector(".messbox .text").setAttribute("id", "hide");
      }, 1000);
      setTimeout(() => {
        setmess(false);
        document.querySelector(".messbox .text").setAttribute("id", "");
      }, 1300);
      e.target.textContent = "FOLLOW";
      let findmusic = user.follow.filter((child) => child.id !== name.id);
      mainApi.put(`/spotify/${user.id}`, {
        follow: [...findmusic],
      });
    }
  };
  let app2 = followstate.find((item) => item.id == data.id);

  return (
    <>
      <div className="singerhead" title={data.name}>
        <div className="cover">
          <img src={data.images[0].url} alt="cover-artist" />
        </div>
        <div className="infobox">
          <div className="veribox">
            <span>
              <ion-icon name="cloud-done"></ion-icon>
            </span>
            <span>Verified Artist</span>
          </div>
          <div
            className="name"
            style={{
              fontSize: data.name.length <= 15 ? "85px" : "65px",
            }}
          >
            {data.name}
          </div>
          <div className="listenbox">
            {Intl.NumberFormat("en-US").format(data.followers.total)} monthly
            listeners
          </div>
        </div>
      </div>

      <div className="singerfooter">
        <div className="playboxsinger">
          <div className="btnbox">
            <button
              style={{
                borderColor: app2 == undefined ? "#ffffff48" : "#fbfbfb",
              }}
              className="follow"
              onClick={(e) => followfunc(e, data)}
            >
              {app2 == undefined ? "FOLLOW" : "FOLLOWING"}
            </button>
          </div>
        </div>
        <Top />
        <Album />
        <Fans />
        {mess && <Toast text={textmess} />}
      </div>
    </>
  );
}
