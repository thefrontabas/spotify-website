import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { NavLink } from "react-router-dom";
import { actfunc, playfunc } from "../../Redux/Home";
import loading from "../Asset/loading.gif";
import mainApi from "../Api/Api";
export default function Playlistbox(props) {
  const [show, setshow] = useState(true);
  const [elem, setelem] = useState(null);
  let token = useSelector((state) => state.home.value);
  let dispatch = useDispatch();

  useEffect(() => {
    async function send(params) {
      const { data } = await axios(`https://api.spotify.com/v1/search`, {
        headers: {
          Authorization: `Bearer ${token.tokendata}`,
        },
        params: {
          q: props.query,
          type: "playlist",
          limit: 7,
          market: "ES",
        },
      }).finally(() =>
        setTimeout(() => {
          setshow(false);
        }, 500)
      );
      console.log(data);
      setelem(
        <>
          {data.playlists.items.map((item, index) => {
            return (
              <SwiperSlide className="generslide" key={index} title={item.name}>
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
                  <NavLink to={`/playlist/${item.id}`}>
                    <img src={item.images[0].url} alt="" />
                  </NavLink>
                </div>
                <div className="infobox">
                  <NavLink
                    to={`/playlist/${item.id}`}
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <div className="name">{item.name}</div>
                  </NavLink>

                  <div className="singer">{item.owner.display_name}</div>
                </div>
              </SwiperSlide>
            );
          })}
        </>
      );
    }
    send();
  }, []);

  const hand = (e, item) => {
    dispatch(actfunc(item));
    // document.title = `${item.name} ${String.fromCodePoint(2022)} ${
    //     music[0].artists[0].name
    // }`;
    if (e.target.name == "play") {
      e.target.name = "pause";
      dispatch(playfunc(e.target.name));
      e.target.setAttribute("id", "action");
      mainApi.get(`/Users.json`).then((res) => {
        let todoapp = Object.entries(res.data).map(([key, value]) => {
          return {
            key,
            ...value,
          };
        });
        let web = todoapp.find((item) => item.lastName == token.keydata);
        let findmusic = web.recentplay.find((child) => child.name == item.name);
        if (findmusic == undefined) {
          mainApi.put(`/Users/${web.key}.json`, {
            firstName: web.firstName,
            lastName: web.lastName,
            password: web.password,
            like: [...web.like],
            recentplay: [...web.recentplay, item],
            follow: [...web.follow],
          });
        }
      });
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
    // dispatch(resultfunc(music));
    // navigator(
    //     `/page/All-Results/${music[0].artists[0].name.split(' ').join('-')}`
    // );
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
            {elem}
          </Swiper>
        </div>
      )}
    </>
  );
}
