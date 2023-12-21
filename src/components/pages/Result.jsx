import Analysis from "../Analysis";
import Summary from "../Summary";
import { useLocation, useParams } from "react-router-dom";

export default function Result() {
  const {state} = useLocation()
  console.log(state)
  return (
    <>
      <Summary />
      <Analysis />
    </>
  );
}
