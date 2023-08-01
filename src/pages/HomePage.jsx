import { useEffect, useRef, useState } from 'react';
import ShopMap from '../components/ShopMap';
import TodoList from '../components/TodoList';
import ArcgisMap from '../components/ArcgisMap';

const KEY = "todoList";
const HomePage = () => {
   const [selectedShop, setSelectedShop] = useState(null);
   const [todoLists, setTodoLists] = useState({});
   const localRef = useRef(false)
   useEffect(() => {
      const storedTodoLists = localStorage.getItem(KEY);
      if (storedTodoLists) {
         setTodoLists(JSON.parse(storedTodoLists));
         localStorage.setItem(KEY, storedTodoLists)
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
      const storedTodoLists = localStorage.getItem(KEY);
      if (storedTodoLists) {
         let json = JSON.parse(storedTodoLists);
         localStorage.setItem(KEY, JSON.stringify({
            ...json,
            [`${shopId}`]: todoList,
         }));
      } else {
         localStorage.setItem(KEY, JSON.stringify({
            [`${shopId}`]: todoList,
         }));
      }
   };


   return (
      <div className="homepage">
         <ArcgisMap setSelectedShop={onShop} />
         {/* <ShopMap setSelectedShop={onShop} /> */}
         <TodoList selectedShop={selectedShop}
            todoList={todoLists[selectedShop?.id] || []}
            updateTodoList={updateTodoList} />
      </div>
   )
}

export default HomePage;