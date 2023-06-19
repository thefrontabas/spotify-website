import { Breadcrumb } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function Bradcrumb({ data }) {
  return (
    <div className="bradbox">
      <Breadcrumb>
        <Breadcrumb.Item>
          <NavLink className="item" to="/">
            Home
          </NavLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item style={{ color: "#bebebe" }} active>
          {data.album_type} {data.type}
        </Breadcrumb.Item>
        <Breadcrumb.Item style={{ color: "#bebebe" }} active>
          <NavLink className="item" to={`/Artist/${data.artists[0].id}`}>
            {" "}
            {data.artists[0].name}
          </NavLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item style={{ color: "#bebebe" }} active>
          {data.name}
        </Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
}
