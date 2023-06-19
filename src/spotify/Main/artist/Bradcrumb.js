import { Breadcrumb } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function Bradcrumb({ data }) {
  return (
    <>
      <div className="bradbox">
        <Breadcrumb>
          <Breadcrumb.Item>
            <NavLink to="/" style={{ color: "#bebebe" }}>
              Home
            </NavLink>
          </Breadcrumb.Item>
          <Breadcrumb.Item style={{ color: "#bebebe" }} active>
            Artists
          </Breadcrumb.Item>
          <Breadcrumb.Item style={{ color: "#bebebe" }} active>
            {data.genres[0]}
          </Breadcrumb.Item>
          <Breadcrumb.Item style={{ color: "#bebebe" }} active>
            {data.name}
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
    </>
  );
}
