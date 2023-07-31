import { useEffect, useMemo, useState } from 'react';
import ShopMap from '../components/ShopMap';
import TodoList from '../components/TodoList';

const KEY = "todoList";
const HomePage = () => {
   const [selectedShop, setSelectedShop] = useState(null);
   const [todoLists, setTodoLists] = useState({});

   useEffect(() => {
      const storedTodoLists = localStorage.getItem(KEY);
      if (storedTodoLists) {
         setTodoLists(JSON.parse(storedTodoLists));
      } else {
         localStorage.setItem(KEY, JSON.stringify(todoLists));
      }
   }, []);
   const onShop = (obj) => {
      setSelectedShop(obj)
   }
   const updateTodoList = (shopId, todoList) => {
      setTodoLists(prevTodoLists => ({
         ...prevTodoLists,
         [`${shopId}`]: todoList,
      }));
      localStorage.setItem(KEY, JSON.stringify({
         [`${shopId}`]: todoList,
      }));
   };


   return (
      <div className="homepage">
         <ShopMap setSelectedShop={onShop} />
         <TodoList selectedShop={selectedShop}
            todoList={todoLists[selectedShop?.id] || []}
            updateTodoList={updateTodoList} />
      </div>
   )
}

export default HomePage;