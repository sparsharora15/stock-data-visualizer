import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "../../services/utils";
import { PageProps } from "../../services/interfaces";
import { useLocation } from "react-router-dom";
const Protected = ({ Components }: PageProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    decodeToken().then((res) => {
      console.log(res);
      if (res?.isDecode === false) {
        navigate("/login");
      } else {
        location.pathname === "/login" || location.pathname === "/register"
          ? navigate("/")
          : navigate(location.pathname)
      }
    });
  }, []);
  return <>{Components}</>;
};

export default Protected;
