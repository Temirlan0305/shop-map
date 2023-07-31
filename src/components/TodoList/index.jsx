import React, { useState } from "react";
import styles from './TodoList.module.scss'

const TodoList = ({ selectedShop, todoList, updateTodoList }) => {
   const [todoItem, setTodoItem] = useState("");

   const handleAddTodo = () => {
      if (todoItem.trim() !== "") {
         const newTodoList = [...todoList, todoItem];
         updateTodoList(selectedShop.id, newTodoList);
         setTodoItem("");
      }
   };

   const removeItem = (item) => {
      const newTodoList = todoList.filter((obj) => obj != item);
      updateTodoList(selectedShop.id, newTodoList);
   }

   return (
      <div className={styles.root}>
         {selectedShop && (
            <div className={styles.rootBlock}>
               <h2>TODO List for "{selectedShop.name}"</h2>
               <div className={styles.rootContent}>
                  <input
                     type="text"
                     value={todoItem}
                     onChange={e => setTodoItem(e.target.value)}
                     placeholder="Enter item to buy"
                  />
                  <button onClick={handleAddTodo}>Add</button>
               </div>
               <ul className={styles.rootList}>
                  {todoList.map((todo, index) => (
                     <li key={index}> <span>{index + 1}. {todo}</span>
                        <button onClick={() => removeItem(todo)}>
                           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" viewBox="0 0 16 20" fill="none">
                              <path d="M1.75 17.5C1.75 18.875 2.875 20 4.25 20H11.75C13.125 20 14.25 18.875 14.25 17.5V5H1.75V17.5ZM15.5 1.25H11.75L10.5 0H5.5L4.25 1.25H0.5V3.75H15.5V1.25Z" fill="#FFF" />
                           </svg>
                        </button>
                     </li>
                  ))}
               </ul>
            </div>
         )}
      </div>
   );
};

export default TodoList;