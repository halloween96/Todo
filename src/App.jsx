import React from 'react';
import { useState, useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { Header } from './UI/Header'
import { Editer } from './UI/Editer'
import { List } from './UI/List'
import { receiveData } from './UI/Atom'
import sky from './assets/sky.png'

function App() {
  const [todo, setTodo] = useState(() => {
    try {
      const saved = localStorage.getItem("todo");
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  const setModal = useSetRecoilState(receiveData);

  // 추가하기
  const onCreate = (newTodo) => {
    const newItem = {
      ...newTodo,
      id: Date.now(),
    };
    setTodo(prev => [newItem, ...prev]);
  };

  const onUpdate = (item) => {
    setModal({
      ...item,
      isOpen: true,
    });
  };

  // 내용 수정
  const onUpdateTodo = (updateTodo) => {
    setTodo(prev =>
      prev.map(item =>
        item.id === updateTodo.id ? { ...item, ...updateTodo } : item
      )
    );
  };

  // 삭제하기
  const onDelete = (id) => {
    setTodo(prev => prev.filter(item => item.id !== id));
  };

  //localStrage 올리기
  useEffect(() => {
    localStorage.setItem('todo', JSON.stringify(todo));
  }, [todo]);


  return (
    <div
      className="w-screen h-screen bg-cover bg-center flex justify-center items-center"
      style={{ backgroundImage: `url(${sky})` }}
    >
      <div className="w-2/5 p-4 bg-white bg-opacity-40 rounded-xl shadow-lg">
        <Header />
        <Editer onCreate={onCreate} onUpdateTodo={onUpdateTodo} />
        <List todo={todo} onUpdate={onUpdate} onDelete={onDelete} />
      </div>
    </div>
  )
}

export default App
