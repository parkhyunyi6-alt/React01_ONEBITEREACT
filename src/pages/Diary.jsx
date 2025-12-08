import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Button from '../components/Button';

const Diary = () => {
    const params = useParams();

    return (
    <div>
        {params.id} Diary
    </div>
);}

export default Diary;