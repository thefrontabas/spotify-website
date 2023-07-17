import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { NavLink, useNavigate } from "react-router-dom";
import { actfunc, playfunc, resultfunc } from "../../../Redux/Home";
import loading from "../../Asset/loading.gif";
import mainApi from "../../Api/Api";
export default function Gener(props) {
  const [music, setmusic] = useState([]);
  const [show, setshow] = useState(true);

  let token = useSelector((state) => state.home.value);
  let dispatch = useDispatch();
  let navigator = useNavigate();
  useEffect(() => {
    async function send(params) {
      const { data } = await axios(
        `https://api.spotify.com/v1/artists/${props.singer}/albums`,
        {
          headers: {
            Authorization: `Bearer ${token.tokendata}`,
          },
          params: {
            include_groups: "single",
            limit: 18,
          },
        }
      ).finally(() =>
        setTimeout(() => {
          setshow(false);
        }, 100)
      );
      setmusic(data.items);
    }
    send();
  }, []);

  const hand = async (e, item) => {
    dispatch(actfunc(item));
    document.title = `${item.name} ${String.fromCodePoint(2022)} ${
      music[0].artists[0].name
    }`;
    if (e.target.name == "play") {
      e.target.name = "pause";
      dispatch(playfunc(e.target.name));
      e.target.setAttribute("id", "action");
      let res = await mainApi(`/spotify`);

      let web = res.data.find((item) => item.lastName == token.keydata);
      let findmusic = web.recentplay.find((child) => child.name == item.name);
      if (!findmusic) {
        mainApi.put(`/spotify/${web.id}`, {
          recentplay: [...web.recentplay, item],
        });
      }
      document.querySelector("#musicplayer").play();
    } else {
      e.target.name = "play";
      dispatch(playfunc(e.target.name));
      e.target.setAttribute("id", "icon");
      document.querySelector("#musicplayer").pause();
      // dispatch(actfunc(''));
    }
  };

  function send(params) {
    dispatch(resultfunc(music));
    navigator(
      `/page/All-Results/${music[0].artists[0].name.split(" ").join("-")}`
    );
  }
  return (
    <>
      {show ? (
        <div className="loadbox">
          <img src={loading} alt="loading" />
        </div>
      ) : (
        <div className="generbox">
          <div className="generhead">
            <div className="text">Songs</div>

            <div onClick={send} className="seeall">
              SEE ALL
            </div>
          </div>
          <Swiper
            spaceBetween={28}
            slidesPerView={"auto"}
            className="generswiper"
          >
            {music.map((item, index) => {
              if (index <= 6) {
                return (
                  <SwiperSlide
                    className="generslide"
                    key={index}
                    title={item.name}
                  >
                    <div className="play">
                      <ion-icon
                        name={
                          token.actname.id == item.id && token.icon == "pause"
                            ? "pause"
                            : "play"
                        }
                        onClick={(e) => hand(e, item)}
                        id={
                          token.actname.id == item.id && token.icon == "pause"
                            ? "action"
                            : "icon"
                        }
                      ></ion-icon>
                    </div>
                    <div className="cover">
                      <NavLink to={`/Album/${item.id}`}>
                        <img src={item.images[0].url} alt="" />
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
                        to={`/Artist/${item.artists[0].id}`}
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
