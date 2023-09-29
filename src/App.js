import "./App.css";
import React, { useState } from "react";

function App() {
  const [list, setList] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [editIndex, setEditIndex] = useState(-1);
  const [archive, setArchive] = useState([]);

  const handleNewItem = (event) => {
    setNewItem(event.target.value);
  };

  const addItem = () => {
    if (newItem.trim() !== "") {
      if (editIndex === -1) {
        setList([...list, newItem]);
      } else {
        const updatedList = [...list];
        updatedList[editIndex] = newItem;
        setList(updatedList);
        setEditIndex(-1);
      }
      setNewItem("");
    }
  };

  const editItem = (index) => {
    setEditIndex(index);
    setNewItem(list[index]);
  };

  const removeItem = (index) => {
    const updatedList = [...list];
    updatedList.splice(index, 1);
    setList(updatedList);
  };

  const archiveItem = (index) => {
    const archivedItem = list[index];
    setArchive([...archive, archivedItem]);
    removeItem(index);
  };

  const removeArchivedItem = (index) => {
    const updatedArchive = [...archive];
    updatedArchive.splice(index, 1);
    setArchive(updatedArchive);
  };

  return (
    <div className="App">
      <>
        <h1 className="Heading">Your to-do list</h1>
        <input
          className="input-bar"
          type="text"
          onChange={handleNewItem}
          value={newItem}
        ></input>
        <button className="add-button" onClick={addItem} disabled={!newItem}>
          {editIndex === -1 ? "+" : "Save"}
        </button>
      </>
      <div className="lists">
        <div className="list">
          <ul>
            {list.map((item, index) => {
              return (
                <li key={index}>
                  {editIndex === index ? (
                    <input
                      type="text"
                      value={newItem}
                      onChange={handleNewItem}
                    ></input>
                  ) : (
                    item
                  )}
                  <button
                    className="edit-button"
                    onClick={() => editItem(index)}
                  >
                    {editIndex === index ? "Cancel" : "Edit"}
                  </button>
                  <button
                    className="remove-button"
                    onClick={() => removeItem(index)}
                  >
                    -
                  </button>
                  <button
                    className="archive-button"
                    onClick={() => archiveItem(index)}
                  >
                    Archive
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="list">
        <h2>Archived Items</h2>
        <ul>
          {archive.map((item, index) => (
            <li key={index}>
              {item}
              <button
                className="remove-button"
                onClick={() => removeArchivedItem(index)}
              >
                -
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
