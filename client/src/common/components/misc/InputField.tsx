const InputField = ({
    id,
    type,
    placeholder,
    value,
    setValue,
    label,
    maxLength,
    error,
    name
}: {
    id: string;
    type: string;
    placeholder?: string;
    value: string;
    setValue: (e: string) => void;
    label?: string;
    maxLength?: number;
    error?: string;
    name?:string
}) => {
    if (type === "text-area") {
        return (
            <label htmlFor={id} className="w-full flex flex-col">
                <span className=" font-bold">{label}</span>
                <textarea
                    className="block w-full border focus:outline-0 rounded p-1 resize-none h-[150px]"
                    // type={type}
                    lang="6"
                    maxLength={250}
                    id={id}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    name={name}
                />
                <p className="text-red-400 font-bold">{error}</p>
            </label>
        );
    }
    return (
        <label htmlFor={id} className="w-full flex flex-col font=b">
            <span className="font-bold">{label}</span>
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