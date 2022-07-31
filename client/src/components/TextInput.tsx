interface Props {
  label: string;
  type: 'text' | 'email' | 'password';
  name: string;
  value?: string;
  defaultValue?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
  required?: boolean;
}

const TextInput = ({
  label,
  type,
  name,
  value,
  defaultValue,
  className,
  onChange,
  required,
}: Props) => (
  <div className="input-container mb-2 [&+.input-container]:mb-4">
    <label htmlFor={name} className="label capitalize">
      {label}
    </label>
    <input
      type={type}
      name={name}
      className={`input input-bordered border-2 border-solid input-md w-full text-base focus:outline-none focus:border-gray-500 ${className}`}
      onChange={onChange}
      value={value}
      defaultValue={defaultValue}
      required={required}
    />
  </div>
);

export default TextInput;
