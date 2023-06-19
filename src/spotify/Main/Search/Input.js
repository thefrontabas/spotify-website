import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { searchfunc } from "../../Redux/Home";
export default function Input(params) {
  let dispatch = useDispatch();
  let ref = useRef();
  let navigate = useNavigate();
  function inputfunc(e) {
    navigate(`/search/${e.target.value.replaceAll(" ", "-")}`);
    dispatch(searchfunc(e.target.value));
  }
  useEffect(() => {
    ref.current.focus();
  });
  return (
    <>
      <div className="searchinputbox">
        <div className="inputbox">
          <div className="icon">
            <ion-icon name="search-outline"></ion-icon>
          </div>
          <div className="input">
            <input
              type="text"
              onChange={inputfunc}
              placeholder="Songs,Artists,..."
              ref={ref}
            />
          </div>
        </div>
      </div>
    </>
  );
}
