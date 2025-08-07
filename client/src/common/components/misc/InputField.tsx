const InputField = ({
    id,
    type,
    placeholder,
    value,
    setValue,
    label,
    maxLength,
    error,
}: {
    id: string;
    type: string;
    placeholder?: string;
    value: string;
    setValue: (e: string) => void;
    label?: string;
    maxLength?: number;
    error?: string;
}) => {
    if (type === "text-area") {
        return (
            <label htmlFor={id} className="w-full flex flex-col">
                <span>{label}</span>
                <textarea
                    className="block w-full border focus:outline-0 rounded p-1 resize-none h-[150px]"
                    // type={type}
                    lang="6"
                    maxLength={250}
                    id={id}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    name={value}
                />
                <p className="text-red-400 font-bold">{error}</p>
            </label>
        );
    }
    return (
        <label htmlFor={id} className="w-full flex flex-col">
            <span>{label}</span>
            <input
                className="block w-full border focus:outline-0 rounded p-1"
                type={type}
                id={id}
                placeholder={placeholder}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                maxLength={maxLength}
                name={value}
            />
            <p className="text-red-400 font-bold">{error}</p>
        </label>
    );
};

export default InputField