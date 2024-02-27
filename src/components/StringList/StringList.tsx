import React, {useEffect, useState} from 'react';
import {List, Typography} from 'antd';
import {Data} from "../../App";

type StringListProps = {
    data: Data[];
}

const StringList = ({data}: StringListProps) => {
    const [stringsArray, setStringsArray] = useState<string[]>([]);

    const transformDataForList = (data: Data[]) => {
        setStringsArray([]);
        data.map(item => setStringsArray(prevState => [...prevState, ...item.strings]));
    }

    useEffect(() => {
        transformDataForList(data);
        console.log(data)
        console.log(stringsArray)
    }, [data]);

    return (
        <div>
            <List
                bordered
                dataSource={stringsArray}
                renderItem={(item, id) => (
                    <List.Item key={id}>
                        <Typography.Text>{++id}</Typography.Text> {item}
                    </List.Item>
                )}
            />
        </div>
    );
};

export default StringList;