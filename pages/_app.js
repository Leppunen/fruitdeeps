// _App.js is the top level component in the React component hierarchy.
// All pages will share App as their top level component
import React from "react";
import "../styles/_reset.css";
import "../styles/main.scss";

// eslint-disable-next-line react/prop-types
export default function App ({ Component, pageProps }) {
	return <Component {...pageProps} />;
}
