import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { NavLink, useNavigate } from "react-router-dom";
import { actfunc, playfunc, resultfunc } from "../../Redux/Home";
import "./../home/View/Content.css";
import mainApi from "../Api/Api";
export default function Recent(props) {
  const [music, setmusic] = useState([]);
  let token = useSelector((state) => state.home.value);
  let dispatch = useDispatch();
  let navigator = useNavigate();
  useEffect(() => {
    show();
  });
  async function show(params) {
    try {
      let res = await mainApi(`/spotify`);
      let web = res.data.find((item) => item.lastName == token.keydata);
      setmusic(web.recentplay);
    } catch (e) {
      console.log(e);
    }
  }

  const hand = (e, item) => {
    dispatch(actfunc(item));
    document.title = `${item.name} ${String.fromCodePoint(2022)} ${
      music[0].artists[0].name
    }`;
    if (e.target.name == "play") {
      e.target.name = "pause";
      dispatch(playfunc(e.target.name));
      e.target.setAttribute("id", "action");
    } else {
      e.target.name = "play";
      dispatch(playfunc(e.target.name));
      e.target.setAttribute("id", "icon");
    }
  };

  function send(params) {
    dispatch(resultfunc(music));
    navigator(`/page/All-Results/Recently-played`);
  }
  return (
    <>
      {music.length <= 1 ? null : (
        <div className="generbox">
          <div className="generhead">
            <div className="text">Recently played</div>

            <div onClick={send} className="seeall">
              SEE ALL
            </div>
          </div>
          <Swiper
            spaceBetween={33}
            slidesPerView={"auto"}
            className="generswiper"
          >
            {music.map((item, index) => {
              if (index > 0 && index <= 6) {
                return (
                  <SwiperSlide className="generslide" key={index}>
                    <div className="play">
                      <ion-icon
                        name={token.actname.id == item.id ? "pause" : "play"}
                        onClick={(e) => hand(e, item)}
                        id={token.actname.id == item.id ? "action" : "icon"}
                      ></ion-icon>
                    </div>
                    <div className="cover">
                      <NavLink to={`/Album/${item.id}`}>
                        <img
                          src={
                            item.type == "album"
                              ? item.images[0].url
                              : item.album.images[0].url
                          }
                        />
                      </NavLink>
                    </div>
                    <div className="infobox">
                      <NavLink
                        to={`/Album/${item.id}`}
                        style={{
                          textDecoration: "none",
                        }}
                      >
                        <div className="name">{item.name}</div>
                      </NavLink>
                      <NavLink
                        to={`/Artist/${item.artists[0].name}`}
                        style={{
                          textDecoration: "none",
                        }}
                      >
                        <div className="singer">{item.artists[0].name}</div>
                      </NavLink>
                    </div>
                  </SwiperSlide>
                );
              }
            })}
          </Swiper>
        </div>
      )}
    </>
  );
}
