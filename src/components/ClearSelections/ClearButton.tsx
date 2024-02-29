import React from 'react';
import {Button} from "antd";

type clearButtonProps = {
    onClear: () => void;
}

const ClearButton = ({onClear}: clearButtonProps) => {
    return (
        <Button danger onClick={onClear}>
            Очистить выделенные слова
        </Button>
    );
};

export default ClearButton;
