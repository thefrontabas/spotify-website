import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { resultfunc } from "../../Redux/Home";

export default function Fans(props) {
  const [music, setmusic] = useState([]);
  let token = useSelector((state) => state.home.value);
  let loc = useLocation();
  let navigator = useNavigate();
  let dispatch = useDispatch();
  useEffect(() => {
    async function send(params) {
      const { data } = await axios.get(
        `https://api.spotify.com/v1/artists/${loc.pathname.slice(
          8
        )}/related-artists`,
        {
          headers: {
            Authorization: `Bearer ${token.tokendata}`,
          },
          params: { limit: 17 },
        }
      );
      setmusic(data.artists);
    }
    send();
  });

  function send(params) {
    dispatch(resultfunc(music));
    navigator(`/page/All-Results/Fans`);
  }

  return (
    <div className="generbox" style={{ marginTop: "60px" }}>
      <div className="generhead">
        <div className="text">Fans also like</div>

        <div onClick={send} className="seeall">
          SEE ALL
        </div>
      </div>
      <Swiper spaceBetween={28} slidesPerView={"auto"} className="generswiper">
        {music.map((item, index) => {
          if (index <= 6) {
            return (
              <SwiperSlide className="generslide" key={index} title={item.name}>
                <NavLink
                  to={`/Artist/${item.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <div className="cover" style={{ textAlign: "center" }}>
                    {item.images.length != 0 ? (
                      <img
                        style={{ borderRadius: "50%" }}
                        src={item.images[0].url}
                        alt=""
                      />
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        fill="gray"
                        width="105px"
                      >
                        <path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z" />
                      </svg>
                    )}
                  </div>
                  <div className="infobox">
                    <div className="name">{item.name}</div>
                    <div className="singer">Artist</div>
                  </div>
                </NavLink>
              </SwiperSlide>
            );
          }
        })}
      </Swiper>
    </div>
  );
}
