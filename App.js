import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';

function App() {

  const [name, setName] = useState('');
  const [mark, setMark] = useState('');
  const [markList, setMarkList] = useState([]);

  const [newMark, setNewMark] = useState('');

  useEffect(() =>{
    Axios.get("http://localhost:3001/api/get").then((response) =>{
      setMarkList(response.data);
    });
  }, []);

  const submitMark = () =>{
    Axios.post("http://localhost:3001/api/insert", {
      name:name,
      mark:mark,
     });
     setMarkList([
       ...markList,
       {name:name, mark: mark},
     ]);
  };

  const deleteMark =(mark) =>{
    Axios.delete(`http://localhost:3001/api/delete/${mark}`);
  }

  const updateMark =(sname) =>{
    Axios.put("http://localhost:3001/api/update", {
      name:sname,
      mark:newMark,
    });
    setNewMark("");
  };


  return (
    <div className="App">
      <h1>STUDENT MARK LIST</h1>
      <div className="form">
        <label>StudentName</label>
        <input type="text" name="name" onChange={(e) =>{
          setName(e.target.value)
        }}/>
        <label>StudentMark</label>
        <input type="text" name="mark" onChange={(e) =>{
          setMark(e.target.value)
        }}/>
        <button onClick={submitMark}>Save</button>
        {markList.map((val) =>{
          return(
          <div className="card">
            <h1>{val.name}</h1>
            <p>{val.mark}</p>

            <button onClick={() =>{deleteMark(val.name)}}>Delete</button>
            <input type="text" id="updateInput" onChange={(e) =>{
              setNewMark(e.target.value);
            }}/>
            <button onClick={() =>{updateMark(val.name)}}>Update</button>
            </div>
         ) })}
      </div>
      
    </div>
  );
}

export default App;
