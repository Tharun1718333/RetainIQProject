import { ToastContainer } from "react-toastify";
import Body from "./body";
import Header from "./header";

export default function Home() {
  return (
    <div>
      <Header />
      <Body />
      <ToastContainer />
    </div>
  );
}
