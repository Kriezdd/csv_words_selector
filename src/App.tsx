import React, {useState} from 'react';
import UploadFile from "./components/UploadFile/UploadFile";
import StringList from "./components/StringList/StringList";

const App = () => {
    const [data, setData] = useState<string[]>([]);
    const [selectedWords, setSelectedWords] = useState<Record<number, string[]>>({});

    const handleWordSelected = (word: string, rowIndex: number) => {
        setSelectedWords(prev => {
            const words = prev[rowIndex] || [];
            const index = words.indexOf(word);
            if (index === -1) {
                words.push(word);
            } else {
                words.splice(index,  1);
            }
            return { ...prev, [rowIndex]: words };
        });
    };

    return (
        <div>
            <UploadFile onChangeData={setData} />
            <StringList data={data} onWordSelected={handleWordSelected} />
        </div>
    );
};

export default App;
