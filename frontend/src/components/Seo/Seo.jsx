import React from "react";
import { Helmet } from "react-helmet";

const Seo = ({ pageTitle }) => (
  <>
    <Helmet>
      <title>
        {pageTitle &&
          `${pageTitle} || Voyager Hub`}
      </title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Helmet>
  </>
);

export default Seo;
