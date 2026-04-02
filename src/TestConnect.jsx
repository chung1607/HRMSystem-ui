import { useEffect, useState } from "react";

function Test() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/hello")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>React + NestJS</h1>
      <p>Data from backend: {JSON.stringify(data)}</p>
    </div>
  );
}

export default Test;


