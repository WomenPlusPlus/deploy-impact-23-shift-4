import React from "react";
import { useLocation } from "react-router-dom";

interface NotFoundProps {
  link?: string;
}

const NotFound: React.FC<NotFoundProps> = ({ link }) => {

  return (
    <div>
      <h1>Not Found</h1>
    </div>
  );
};

export default NotFound;
