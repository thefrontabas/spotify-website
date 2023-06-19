import { NavLink } from "react-router-dom";

export default function Headers({ data }) {
  let time = Math.round(data.tracks.items[0].duration_ms / 1000);
  let min = Math.trunc(time / 60);
  let sec = Math.trunc(Math.abs(min * 60 - time));

  return (
    <div className="musichead">
      <div className="cover">
        <img
          title={data.name}
          src={data.images[0].url}
          id="cover-music"
          alt="cover-music"
        />
      </div>
      <div
        className="infobox"
        style={{
          paddingTop: data.name.length <= 18 ? "100px" : "140px",
        }}
      >
        <div className="type">SINGLE</div>
        <div
          className="name"
          style={{
            fontSize: data.name.length <= 18 ? "70px" : "40px",
          }}
        >
          {data.name}
        </div>
        <div className="infoflex">
          {data.artists.map((item, index) => (
            <NavLink to={`/Artist/${item.id}`} key={index}>
              <div className="singer">{item.name} &bull;</div>
            </NavLink>
          ))}
          <div className="year">
            {new Date(data.release_date).getFullYear()} &bull;
          </div>
          <div className="time">
            {" "}
            {min} min {sec > 0 ? `${sec} sec` : ""}
          </div>
        </div>
      </div>
    </div>
  );
}
