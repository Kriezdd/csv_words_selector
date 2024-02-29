import React from 'react';
import {Button} from "antd";
import {DownloadOutlined} from '@ant-design/icons';

type SaveButtonProps = {
    selectedWords: Record<number, string[]>;
}


const SaveButton = ({selectedWords}: SaveButtonProps) => {
    const handleSaveClick = () => {
        const selectedWordsString = Object.values(selectedWords)
            .map(words => words.join(' '))
            .join('|');
        const csvContent = `data:text/csv;charset=utf-8,${selectedWordsString}\n`;

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "selected_words.csv");
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
