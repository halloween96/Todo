import { useEffect, useState } from 'react'
import { useSetRecoilState } from 'recoil';
import { receiveData } from './Atom';

export const Modal = ({ initialId, initialContent, initialDueDate, initialPriority, onSubmit }) => {

    const [dueDate, setDueDate] = useState(initialDueDate || '');
    const [content, setContent] = useState(initialContent);
    const [priority, setPriority] = useState(initialPriority || '보통');
    const setModal = useSetRecoilState(receiveData);


    useEffect(() => {
        if (initialDueDate === null || initialDueDate === undefined || initialDueDate === '') {
            const today = new Date();
            const yyyy = today.getFullYear();
            const mm = String(today.getMonth() + 1).padStart(2, '0');
            const dd = String(today.getDate()).padStart(2, '0');
            setDueDate(`${yyyy}-${mm}-${dd}`);
        } else {
            setDueDate(initialDueDate);
        }
    }, [initialDueDate]);

    useEffect(() => {
        setContent(initialContent);
    }, [initialContent]);

    const modalSubmit = () => {
        if (!content.trim()) {
            alert('일정을 입력하세요');
            return;
        }
        onSubmit({ id: initialId, content, dueDate, priority });
    };

    // 모달창 닫기
    const closeModal = () => {
        setModal(prev => ({
            ...prev,
            isOpen: false
        }));
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="w-full max-w-md overflow-hidden flex flex-col">
                <div className="p-6 bg-white rounded-t-md flex flex-col gap-4 flex-grow">
                    <div className='flex justify-between'>
                        <h1 className="text-2xl font-bold">Todo 추가</h1>
                        <button onClick={closeModal}>
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>
                    <div className="flex items-center gap-4">
                        <label className="text-lg">마감일</label>
                        <input
                            type="date" min={dueDate}
                            className="flex-grow border p-2 rounded-md"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)} />
                    </div>
                    <div className="flex items-center gap-4">
                        <label className="text-lg">우선순위</label>
                        <select className="flex-grow border p-2 rounded-md"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}>
                            <option>높음</option>
                            <option>보통</option>
                            <option>낮음</option>
                        </select>
                    </div>
                    <textarea
                        className="border p-2 rounded-md h-[20vh]"
                        value={content}
                        onChange={e => setContent(e.target.value)}
                    />
                </div>
                <button
                    onClick={modalSubmit}
                    className="w-full py-3 bg-blue-600 text-white rounded-b-md hover:bg-blue-700">
                    확인
                </button>
            </div>
        </div>
    )
}