import "./App.css";
import Autocomplete from "./components/AutoComplete";
import MyForm from "./components/MyApp";
import { sleep } from "./utils";

function App() {
  const asyncRequest = async () => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // await sleep(5000);
      const data = await response.json();
      return data; // Giả định data là một mảng các tùy chọn
    } catch (error) {
      console.error("Error fetching data:", error);
      return []; // Trả về mảng rỗng trong trường hợp có lỗi
    }
  };

  return (
    <div className="App">
      <h1 className="text-5xl font-bold underline">test</h1>

      <MyForm />
    </div>
  );
}

export default App;
