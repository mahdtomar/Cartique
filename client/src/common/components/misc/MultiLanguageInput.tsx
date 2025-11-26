import type { UseFormRegister, Path, FieldValues } from 'react-hook-form';

interface MultiLanguageInputProps<T extends FieldValues> {
    label: string;
    name: Path<T>;
    register: UseFormRegister<T>;
    required?: boolean;
    type?: string;
}

const MultiLanguageInput = <T extends FieldValues>({
    type = 'text',
    name,
    register,
    required,
    label
}: MultiLanguageInputProps<T>) => {
    return (
        <div className='relative'>
            <label>{label}</label>
            <input
                type={type}
                {...register(name, { required ,})}
            />
            
        </div>
    )
}

export default MultiLanguageInput;