import minusIcon from './../../../assets/icons/Minus.svg'
import plusIcon from './../../../assets/icons/Plus.svg'
type CounterPropsType = {
    value: number;
    increment: () => void;
    decrement: () => void;
    min?: number;
    className?: string;
};

const Counter = ({ value, increment, decrement, className }: CounterPropsType) => {
    return (
        <div className={`flex gap-3 p-2 bg-gray-200 rounded ${className}`}>
            <img
                src={minusIcon}
                className="pointer w-5"
                alt="minus icon"
                onClick={() => decrement()}
            />
            <span>{value}</span>
            <img
                src={plusIcon}
                className="pointer w-5"
                alt="plus icon"
                onClick={() => increment()}
            />
        </div>
    );
};

export default Counter;
