import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { NavLink } from "react-router-dom";
export default function Top(params) {
  const [elem, setelem] = useState(null);
  let state = useSelector((state) => state.home.value);
  useEffect(() => {
    send();
  }, [state.query]);

  async function send(params) {
    try {
      const { data } = await axios(`https://api.spotify.com/v1/search`, {
        headers: {
          Authorization: `Bearer ${state.tokendata}`,
        },
        params: {
          q: state.query,
          type: "artist",
          limit: 5,
          market: "ES",
        },
      });
      setelem(
        <>
          <NavLink
            to={`/Artist/${data.artists.items[0].id}`}
            style={{
              textDecoration: "none",
            }}
          >
            <div className="topcard" title={data.artists.items[0].name}>
              <div className="cover">
                <img src={data.artists.items[0].images[0].url} alt="" />
              </div>
              <div className="name" style={{ textDecoration: "none" }}>
                {data.artists.items[0].name}
              </div>
              <div className="title" style={{ textDecoration: "none" }}>
                Artists
              </div>
            </div>
          </NavLink>
        </>
      );
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <>
      <div className="topbox">
        <div className="tophead">Top result</div>
        {elem}
      </div>
    </>
  );
}
