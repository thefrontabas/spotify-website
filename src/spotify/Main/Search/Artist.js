import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useSelector } from "react-redux";
import axios from "axios";
import { NavLink } from "react-router-dom";

export default function Artist(params) {
  const [elem, setelem] = useState(null);
  let state = useSelector((state) => state.home.value);
  useEffect(() => {
    getdata();
  }, [state.query]);

  async function getdata(params) {
    try {
      const { data } = await axios(`https://api.spotify.com/v1/search`, {
        headers: {
          Authorization: `Bearer ${state.tokendata}`,
        },
        params: {
          q: state.query,
          type: "artist",
          limit: 7,
          market: "ES",
        },
      });
      setelem(
        <>
          <div className="generbox">
            <Swiper
              spaceBetween={28}
              slidesPerView={"auto"}
              className="generswiper"
            >
              {data.artists.items.map((item, index) => {
                return (
                  <SwiperSlide
                    className="generslide"
                    key={index}
                    title={item.name}
                  >
                    <div className="cover">
                      <NavLink to={`/Artist/${item.id}`}>
                        <img src={item.images[0].url} alt="" />
                      </NavLink>
                    </div>
                    <div className="infobox">
                      <NavLink
                        to={`/Artist/${item.id}`}
                        style={{
                          textDecoration: "none",
                        }}
                      >
                        <div className="name">{item.name}</div>
                      </NavLink>

                      <div className="singer">Artist</div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </>
      );
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div className="artbox">
      <div className="arthead">
        <div className="text">Artists</div>
      </div>
      {elem}
    </div>
  );
}
