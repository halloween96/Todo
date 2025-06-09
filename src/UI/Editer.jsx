import { useState, useRef } from 'react'
import { Modal } from './Modal';
import { receiveData } from './Atom';
import { useSetRecoilState, useRecoilValue } from 'recoil';

export const Editer = ({ onCreate, onUpdateTodo }) => {
    const [content, setContent] = useState("");
    const inputRef = useRef();
    const setModal = useSetRecoilState(receiveData);
    const modalData = useRecoilValue(receiveData);

    // 아이템 추가
    const onChangeContent = (e) => {
        setContent(e.target.value);
    };

    // 빈 입력 방지 및 모달 호출
    const onSend = () => {
        if (!content.trim()) {
            alert('목표를 입력하세요');
            inputRef.current.focus();
            return;
        };
        setModal({
            // id: Date.now(),
            content,
            priority: '보통',
            dueDate: null,
            isOpen: true
        });
        setContent('');
    };

    // 모달 완료시
    const ModalComplete = (modalData) => {
        if (modalData.id) {
            onUpdateTodo(modalData);
        } else {
            onCreate(modalData);
        }
        setModal(prev => ({
            ...prev,
            isOpen: false
        }));
    };

    // enter로 입력
    const onKeyDown = (e) => {
        if (e.key === 'Enter') {
            onSend();
        }
    };

    return (
        <div className='flex flex-col items-start mb-4'>
            <h1 className='font-extrabold text-2xl mb-1'>Todo 입력 ✍️</h1>
            <div className='w-full flex justify-between'>
                <input
                    ref={inputRef}
                    value={content}
                    onChange={onChangeContent}
                    onKeyDown={onKeyDown}
                    className='border-gray-300 border-b-2 w-4/5 px-2 bg-transparent outline-none placeholder-black'
                    type="text" placeholder='여기에 입력하세요' />
                <button onClick={onSend}
                    className='rounded-md py-2 w-1/6 bg-blue-500  border-white text-white hover:bg-white hover:text-blue-500'>추가</button>
            </div>
            {modalData.isOpen && (
                <Modal
                    initialId={modalData.id}
                    initialContent={modalData.content}
                    initialDueDate={modalData.dueDate}
                    initialPriority={modalData.priority}
                    onSubmit={ModalComplete}
                />
            )}
        </div>
    )
}
