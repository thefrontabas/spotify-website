import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "swiper/css";
import { NavLink, useLocation } from "react-router-dom";
import { actfunc, playfunc } from "../../Redux/Home";
import { Breadcrumb } from "react-bootstrap";
import Header from "../home/View/Header";
import "./Result.scss";
import mainApi from "../Api/Api";
export default function Result(props) {
  const [musicarr, setmusicarr] = useState([]);
  let dispatch = useDispatch();
  let location = useLocation();
  let music = useSelector((state) => state.home.value);
  const hand = (e, item) => {
    dispatch(actfunc(item));
    document.title = `${item.name} ${String.fromCodePoint(2022)} ${
      music[0].artists[0].name
    }`;
    if (e.target.name == "play") {
      e.target.name = "pause";
      dispatch(playfunc(e.target.name));
      e.target.setAttribute("id", "action");
      let res = mainApi(`/spotify`);
      let web = res.data.find((item) => item.lastName == music.keydata);
      let findmusic = web.recentplay.find((child) => child.name == item.name);
      if (findmusic == undefined) {
        mainApi.put(`/spotify/${web.id}`, {
          recentplay: [...web.recentplay, item],
        });
      }
    } else {
      e.target.name = "play";
      dispatch(playfunc(e.target.name));
      e.target.setAttribute("id", "icon");
    }
  };

  useEffect(() => {
    setmusicarr(music.resultdata);
  }, [music.resultdata]);

  return (
    <div className="resultbox">
      <Header />
      <div className="bradbox">
        <Breadcrumb>
          <Breadcrumb.Item>
            <NavLink className="item" to="/">
              Home
            </NavLink>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>See Al music</Breadcrumb.Item>
          <Breadcrumb.Item active>
            {location.pathname
              .slice(18)
              .split("-")
              .map((item) => item)
              .join(" ")}
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="titlebox">
        {location.pathname
          .slice(18)
          .split("-")
          .map((item) => item)
          .join(" ")}{" "}
      </div>

      <div className="resultflex">
        {musicarr.map((item, index) => {
          if (index > 0) {
            return (
              <div className="resultmusic" key={index} title={item.name}>
                <div className="play">
                  <ion-icon
                    onClick={(e) => hand(e, item)}
                    name={
                      music.actname.name == item.name && music.icon == "pause"
                        ? "pause"
                        : "play"
                    }
                    id={
                      music.actname.name == item.name && music.icon == "pause"
                        ? "action"
                        : "icon"
                    }
                  ></ion-icon>
                </div>
                <div className="cover">
                  <NavLink
                    to={
                      item.type == "artist"
                        ? `/Artist/${item.id}`
                        : `/Album/${item.id}`
                    }
                  >
                    <img
                      src={
                        item.images[0].url
                        // item.type == "album"
                        //   ? item.images[0].url
                        //   : item.album.images[0].url
                      }
                      alt=""
                    />
                  </NavLink>
                </div>
                <div className="infobox">
                  <NavLink
                    to={
                      item.type == "artist"
                        ? `/Artist/${item.id}`
                        : `/Album/${item.id}`
                    }
                    style={{ textDecoration: "none" }}
                  >
                    <div className="name">{item.name}</div>
                  </NavLink>
                  <NavLink
                    to={`/Artist/${
                      item.type == "artist" ? item.id : item.artists[0].id
                    }`}
                    style={{ textDecoration: "none" }}
                  >
                    <div className="singer">
                      {item.type == "artist"
                        ? "Artist"
                        : `${item.artists[0].name}`}
                    </div>
                  </NavLink>
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
