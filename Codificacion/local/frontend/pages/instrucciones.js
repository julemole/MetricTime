import Layout from "../components/Layout";
import { useState, useEffect } from "react";

const Instructions = () => {
  return (
    <Layout title="Instrucciones" notHeader="true">
      <div style={{ width: "100%", height: "100%" }}>
        <object
          data="/assets/HardwareInstrucciones.pdf"
          type="application/pdf"
          style={{
            minHeight: "100vh !important",
            width: "100vw !important",
            height: `100vh !important`,
          }}
        />
      </div>
    </Layout>
  );
};

export default Instructions;
