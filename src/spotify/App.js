import React, { Suspense, lazy, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Player from "./Main/Player/Player";
import Loading from "./Main/Asset/Loding";
const Home = lazy(() => import("./Main/home/Home"));
const Content = lazy(() => import("./Main/home/View/Content"));
const Result = lazy(() => import("./Main/result/Result"));
const Music = lazy(() => import("./Main/music/Music"));
const Singer = lazy(() => import("./Main/artist/Singer"));
const Search = lazy(() => import("./Main/Search/Search"));
const Playlist = lazy(() => import("./Main/Playlist/Playlist"));
const User = lazy(() => import("./../spotify/Users/User"));
const Login = lazy(() => import("./Users/Login/Login"));
const Signup = lazy(() => import("./Users/Signup/Signup"));

export default function App(params) {
  document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });
  let state = useSelector((state) => state.home.value);
  let go = useNavigate();
  const setcooki = (cname) => {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return 0;
  };
  useEffect(() => {
    if (setcooki("login-user") == 0) {
      go("/User/Login");
    } else {
      // alert(
      // 	`سلام برای استفاره وب سایت ابتدا از منو گزینه login را انتخاب کنید
      // 	Email:abaswebgh@gmail.com
      // 	Pass:135713811401
      // 	`
      // );
    }
  }, []);
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="" element={<Home />} exact>
            <Route path="" element={<Content />} />
            <Route path="page/All-Results/:name" element={<Result />} />
            <Route path="Album/:id" element={<Music />} />
            <Route path="Artist/:id" element={<Singer />} />
            <Route path="search" element={<Search />} />
            <Route path="search/:text" element={<Search />} />
            <Route path="playlist/:id" element={<Playlist />} />
          </Route>
          <Route path="/User" element={<User />}>
            <Route path="Login" element={<Login classlogin={"animation"} />} />
            <Route
              path="SignUp-For-NewAccount"
              element={<Signup class="animation" />}
            />
          </Route>
        </Routes>
      </Suspense>

      {state.actname.length == 0 ? null : <Player />}
    </>
  );
}
