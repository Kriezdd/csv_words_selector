import React, {useEffect, useState} from 'react';
import {List, Table, Typography} from 'antd';

type StringListProps = {
    data: string[];
    onWordSelected: (word: string, rowIndex: number) => void;
}

const StringList = ({data, onWordSelected}: StringListProps) => {
    const columns = [
        {
            title: 'id',
            dataIndex: 'key',
            key: 'key',
            render: (key: number) => (<strong>{key}</strong>)
        },
        {
            title: 'Sentence',
            dataIndex: 'sentence',
            key: 'sentence',
            render: (text: string, record: any, index: number) => (
                <div>
                    {text.split(' ').map((word, wordIndex) => (
                        <span
                            key={wordIndex}
                            onClick={() => onWordSelected(word, index)}
                            style={{cursor: 'pointer', marginRight: '5px'}}
                        >
              {word}
            </span>
                    ))}
                </div>
            ),
        },
    ];
    return (
        <Table columns={columns} dataSource={data.map((text, index) => ({key: index, sentence: text}))}
               pagination={false}/>
    );
};

export default StringList;