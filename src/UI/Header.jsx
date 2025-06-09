import React from 'react'

const date = new Date();
const today = date.toLocaleDateString('ko-KR', {
  month: 'long',
  day: 'numeric',
  weekday: 'long',
});
export const Header = () => {
  return (
    <div className='flex flex-col items-start mb-4'>
      <h2 className='font-extrabold text-2xl mb-1'>오늘은 📅</h2>
      <h1 className='font-bold text-4xl text-blue-500'>{today}</h1>
    </div>
  )
}
