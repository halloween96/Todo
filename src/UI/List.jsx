import React, { useState } from 'react'
import { useRecoilValue } from 'recoil';
import { Item } from './Item'
import { listData } from './Atom';

export const List = ({ todo, onUpdate, onDelete }) => {

  // 검색하기
  const [search, setSearch] = useState("");

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearchResult = () => {
    // 검색어 일치할떄만 필터링
    return search === ""
      ? todo
      : todo.filter((item) =>
        item.content.toLowerCase().includes(search.toLowerCase())
      );
  };

  const todoList = useRecoilValue(listData);

  const [array, setArray] = useState({ key: null, direction: 'asc' });

  const arrayToggle = (key) => {
    setArray(prev => {
      if (prev.key === key) {
        return { key, direction: prev.direction === 'asc' ? 'desc' : 'ass' };
      }
      return { key, direction: 'asc' };
    });
  }

  const priorityHight = {
    '높음': 3,
    '보통': 2,
    '낮음': 1
  };

  const arrayList = [...getSearchResult()].sort((a, b) => {
    if (!array.key) return 0;

    let valA = a[array.key];
    let valB = b[array.key];

    if (array.key === 'priority') {
      valA = priorityHight[valA];
      valB = priorityHight[valB];
    }

    if (valA < valB) return array.direction === 'asc' ? 1 : -1;
    if (valA > valB) return array.direction === 'asc' ? -1 : 1;
    return 0;
  });

  return (
    <div>
      <h1 className='font-extrabold text-2xl mb-1'>List 📑</h1>
      <input
        value={search}
        onChange={onChangeSearch}
        className='border-b-2 border-gray-300 w-full outline-none px-2 bg-transparent placeholder-black'
        type="text" placeholder='검색어를 입력하세요' />
      <table className='w-full'>
        <thead className='h-16'>
          <tr className='border-blue-500 border-b-2'>
            <th onClick={() => arrayToggle('priority')}
              className='hover:cursor-pointer hover:text-blue-500'>중요도</th>
            <th className='w-1/2'>내용</th>
            <th onClick={() => arrayToggle('dueDate')}
              className='hover:cursor-pointer hover:text-blue-500'>마감일</th>
            <th>수정</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody className='text-center'>
          {arrayList.map(item => (
            <Item key={item.id} item={item} onUpdate={onUpdate} onDelete={onDelete} />
          ))}
        </tbody>
      </table >
    </div >
  )
}
