import React from 'react';
import Papa from "papaparse";
import {Button} from "antd";
import {DownloadOutlined} from '@ant-design/icons';

type SaveButtonProps = {
    selectedWords: Record<number, { word: string; wordId: number }[]>;
}


const SaveButton = ({selectedWords}: SaveButtonProps) => {
    const handleSaveClick = () => {
        const data = Object.values(selectedWords).map(words => words.map(word => decodeURIComponent(word.word)).join('|'));

        const csv = data.join('\n');

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'selected_words.csv';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <Button type="primary" icon={<DownloadOutlined/>} onClick={handleSaveClick}>
            Скачать сохранённые слова
        </Button>
    )
};

export default SaveButton;
