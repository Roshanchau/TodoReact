import React, { useState, useEffect } from "react";
import "./styles.css";

// getting the data from local storage.
const getLocalData = () => {
  const lists = localStorage.getItem("mytodolist");

  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

const Todo = () => {
  //useState hooks to find the state of the user.
  //here the inputData simple works as the state variable that is found inside of the input and onChange attribute helps to target the value that is changed inside of the input and helps to set it as the new state varible using the update function.
  //   and the then we have another hooks here where we have tried to find the state in the form of an array as we will store the inputdata inside of the array with a onClick function.
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  // hooks to get the id of the item to be edited and stored as a state varaible.
  const [isEditItem, setIsEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);

  // add the items function.
  const addItem = () => {
    if (!inputData) {
      alert("please fill the data!");
    } else if (inputData && toggleButton) {
      setItems(
        items.map((y) => {
          if (y.id === isEditItem) {
            // returns the other data of the item as before and only changes the name.
            return { ...y, name: inputData };
          }
          return y;
        })
      );
      // this is done to again set the input section empty
      setInputData("");
      // to remove the id from the state variable as new item can be edited again.
      setIsEditItem(null);
      // done to get the plus sign back as it toggles the button using the conditional rendering.
      setToggleButton(false);
    } else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      //the three dots means that the items before there should still be there and the new data must be added after it that the user puts inside the input area i.e. inputData.
      setItems([...items, myNewInputData]);
      //   this is done to set inputData state varible to empty again inside of the input using the setInputData update function.
      setInputData("");
    }
  };

  // editing the items.
  const editItems = (id) => {
    const newItem = items.find((x) => {
      return x.id === id;
    });
    setInputData(newItem.name);
    //here we have collected the id of the item to be edited and saved it as a state variable using useState hooks.
    setIsEditItem(id);
    setToggleButton(true);
  };

  //   Deleting the items.
  const deleteItem = (id) => {
    const updatedItems = items.filter((x) => {
      return x.id !== id;
    });

    setItems(updatedItems);
  };

  //   removing all the items
  const removeAll = () => {
    setItems([]);
  };

  // adding local storage.
  // we have used the useEffect hooks so that each time we reload the page we set the items data into local storage ,
  // here mytodolist is a key and JSON.stringify(items) is a value where the JSON.stringify(items) helps to convert array into strings as we have to convert an array into string to store the data into the local storage across the web server.
  useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(items));
  }, [items]);

  return (
    <>
      {/* JSX */}
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/todo.svg" alt="todologo" />
            <figcaption>Add Your List Here ✌</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="✍ Add Item"
              className="form-control"
              value={inputData}
              onChange={(event) => setInputData(event.target.value)}
            />
            {/* conditional rendereing */}
            {toggleButton ? (
              <i className="far fa-edit add-btn " onClick={addItem}></i>
            ) : (
              <i className="fa fa-plus add-btn " onClick={addItem}></i>
            )}
          </div>
          {/* show your items div and it can be manipulated using react as with the click on the plus sign this div will be added to the interface again and again. */}
          <div className="showItems">
            {/* here we have simply mapped through the state varible that is an array of inputData stored inside of "items" state varible of the hooks. */}
            {items.map((currElem, index) => {
              return (
                <div className="eachItem" key={currElem.id}>
                  <h3>{currElem.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn"
                      onClick={() => editItems(currElem.id)}
                    ></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      onClick={() => deleteItem(currElem.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>

          {/* button styles. */}
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAll}
            >
              <span>Check List</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
