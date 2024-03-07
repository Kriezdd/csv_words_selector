import React from 'react';
import {Table} from 'antd';
import {v4 as uuidv4} from 'uuid';
import './StringList.css';

type StringListProps = {
  data: string[];
  onWordSelected: (word: string, rowIndex: number, wordId: number) => void;
  selectedWords: Record<number, { word: string; wordId: number }[]>
}

const StringList = ({data, onWordSelected, selectedWords}: StringListProps) => {
  const punctuationRegexp = /(^[.,\/#!$%^&*;:{}=\-_`~()?]+)|([.,\/#!$%^&*;:{}=\-_`~()?]+$)/g;
  const columns = [
    {
      title: 'ID',
      dataIndex: 'key',
      key: 'key',
      width: 60,
      render: (key: number) => (<strong key={uuidv4()}>{++key}</strong>)
    },
    {
      title: 'Sentence',
      dataIndex: 'sentence',
      key: 'sentence',
      render: (text: string, record: any, index: number) => (
        <div key={uuidv4()}>
          {text.split(' ').map((word, id) => {
              let cleanedWord = word.replace(punctuationRegexp, (match, p1, p2) => {
                if (p1) return '';
                if (p2) return '';
                return match;
              });
              const wordClassName = selectedWords[index]?.some(
                item => item.wordId === id) ? 'selected' : '';
              const isWordClean = cleanedWord === word;
              const separatedWord = isWordClean ? null : word.split(punctuationRegexp);
              return (
                <span className="raw-word" key={uuidv4()}>
                  {
                    isWordClean
                      ?
                      <span
                        key={uuidv4()}
                        onClick={() => onWordSelected(cleanedWord, index, id)}
                        className={`word ` + wordClassName}
                      >
                        {cleanedWord}
                      </span>
                      :
                      separatedWord?.map(item => {
                          if (cleanedWord === item) {
                            return (
                              <span
                                key={uuidv4()}
                                onClick={() => {onWordSelected(cleanedWord, index, id)}}
                                className={`word ` + wordClassName}
                              >
                                {item}
                              </span>
                            );
                          } else {
                            return (<span key={uuidv4()}>{item}</span>);
                          }
                        }
                      )
                  }
                </span>
              )
            }
          )}
        </div>),
    },
  ];
  return (
    <Table columns={columns} dataSource={data.map((text, index) => ({key: index, sentence: text}))}
           pagination={false}/>
  );
};

export default StringList;
