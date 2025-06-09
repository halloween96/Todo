import React from 'react'

export const Item = ({ item, onUpdate, onDelete }) => {
  const { id, content, dueDate, priority } = item;

  // 수정하기
  const onClickUpdate = () => {
    onUpdate({ id, content, dueDate, priority });
  }

  // 삭제하기
  const onClickDelete = () => {
    onDelete(id);
  }
  return (
    <tr className='h-12 border-blue-400 border-b-2'>
      <td>{priority}</td>
      <td>{content}</td>
      <td>{dueDate}</td>
      <td>
        <button onClick={onClickUpdate}>
          <span className="material-symbols-outlined">edit</span>
        </button>
      </td>
      <td>
        <button onClick={onClickDelete}>
          <span className="material-symbols-outlined">delete</span>
        </button>
      </td>
    </tr>
  )
}
