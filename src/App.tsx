import { useState, MouseEvent } from "react";
import { Meteors } from "./components/ui/meteors";
function App() {
  const [value, setValue] = useState<string>("");
  const [arr, setArr] = useState<Array<string>>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  //Add task
  const addTask = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (value === "") {
      alert("Enter the task first!");
    } else {
      if (editIndex !== null) {
        // If editIndex is not null, update the task at the specified index
        const newArr = [...arr];
        newArr[editIndex] = value;
        setArr(newArr);
        setEditIndex(null);
      } else {
        // If editIndex is null, add a new task to the array
        setArr((prev) => (prev ? [...prev, value] : [value]));
      }
      setValue("");
    }
  };

  //Delete task
  const removeItem = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const val: string = e.currentTarget.value;
    setArr((pre) => pre.filter((task) => task !== val));
  };

  // Edit task
  const handleEdit = (index: number) => {
    setEditIndex(index);
    setValue(arr[index]);
  };

  const handleSave = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (value.trim() === "") {
      alert("Enter a valid task!");
      return;
    }
    if (editIndex !== null) {
      const updatedArr = [...arr];
      updatedArr[editIndex] = value;
      setArr(updatedArr);
      setEditIndex(null);
      setValue("");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center pt-20">
      <form className="border-[1px] border-white p-4  rounded-xl">
        <input
          className="p-3 min-w-96 rounded-xl focus:bg-red-300 bg-red-400 mr-4"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter your task!"
        />
        <button
          className="p-3 min-w-24 rounded-xl focus:bg-red-400 focus:text-white text-gray-800 hover:bg-green-700 hover:text-white font-sans bg-green-400"
          onClick={editIndex !== null ? handleSave : addTask}
        >
          {editIndex !== null ? "Save" : "Add Task"}
        </button>
      </form>
      <div className="pt-9 border-b-2  border-white min-w-96"></div>
      {arr.length == 0 ? null : (
        <div className="p-5 m-5 border-white min-w-96 border-[1px] max-h-screen  text-lg rounded-md">
          {arr.map((task: string, index: number) => {
            return (
              <div
                key={task}
                className="flex gap-2 bg-gray-400 m-2 rounded-md justify-between p-3 "
              >
                <p className="text-slate-900 font-medium mr-5 overflow-hidden">
                  {task}
                </p>
                <div className="flex justify-end gap-2">
                  <button
                    className="p-2 min-w-7 rounded-xl bg-blue-500 focus:text-white hover:bg-yellow-700 text-white font-sans"
                    onClick={() => handleEdit(index)}
                  >
                    {editIndex === index ? "Cancel" : "Edit"}
                  </button>
                  <button
                    value={task}
                    className="p-2 min-w-7 rounded-xl bg-green-700 focus:text-white  hover:bg-red-400 text-white font-sans "
                    onClick={removeItem}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <Meteors number={60} />
    </div>
  );
}

export default App;
