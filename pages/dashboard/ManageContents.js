import { Button, Grid, Paper, Typography, Box, FormControlLabel, Checkbox } from "@mui/material"
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { createRef, forwardRef, useEffect, useRef, useState } from "react";

const ContentsView = dynamic(() => import("../../components/dashboard/ManageContentsList"), { ssr: false });

export async function getServerSideProps() {
  return {
    props: {
      dashboard: true,
    }
  };
}

function ManageContents() {


  return (
    <>
      <ContentsView />
    </>
  );
}

export default ManageContents;