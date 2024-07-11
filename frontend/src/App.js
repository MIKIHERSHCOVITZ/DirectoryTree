import Tree from './Tree/Tree';
import data from './data.json';
import {useState} from "react";

function App() {

    /// mode can be either "maintain" or "closeAll".
  // In maintain - the previes state of children folders maintains, in closeAll all children folders closed
  let mode = "maintain"


  const [selected, setSelected] = useState(null);

  /// I changed the original code - I take every root from the data and pass it to Tree instead of all the data
  return (
    <div>
        {data.map((root) => (<Tree level={0} root={root} mode={mode} selected={selected} setSelected={setSelected}/>))}
    </div>
  );
}

export default App;
