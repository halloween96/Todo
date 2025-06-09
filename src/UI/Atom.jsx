import React from 'react'
import { atom } from 'recoil';

export const receiveData = atom({
    key: 'receiveData',
    default: {
        id: null,
        content: '',
        priority: '',
        dueDate: null,
        isOpen: false,
    }
});

export const listData = atom({
    key: 'listData',
    default: [{
        id: null,
        content: '',
        priority: '',
        dueDate: null,
    }]
});