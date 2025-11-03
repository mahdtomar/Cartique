import type React from "react";
import minusIcon from './../../../assets/icons/Minus.svg'
import plusIcon from './../../../assets/icons/Plus.svg'
type CounterPropsType = {
    value: number;
    setValue: React.Dispatch<React.SetStateAction<number>>;
    min?: number;
    className?: string;
};

const Counter = ({ value, setValue, min = 0, className }: CounterPropsType) => {
    return (
        <div className={`flex gap-3 p-2 bg-gray-200 rounded ${className}`}>
            <img
                src={minusIcon}
                className="pointer w-5"
                alt="minus icon"
                onClick={() => setValue(prev => prev === min ? prev : prev - 1)}
            />
            <span>{value}</span>
            <img
                src={plusIcon}
                className="pointer w-5"
                alt="plus icon"
                onClick={() => setValue(prev => prev + 1)}
            />
        </div>
    );
};

export default Counter;
