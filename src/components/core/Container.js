import React from "react";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Navbar from "./Navbar";

function Container({ children }) {
  return (
    <>
      <Sidebar />

      <main className="content">
        <Navbar />
        { children }
        <Footer toggleSettings={true} showSettings={true} />
      </main>
    </>
  );
}

export default Container;
