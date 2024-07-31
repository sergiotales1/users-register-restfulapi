import Form from "./components/Form";
import Users from "./components/Users";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <section className="app">
      <ToastContainer position="top-center" />
      <Form />
      <Users />
    </section>
  );
}

export default App;
