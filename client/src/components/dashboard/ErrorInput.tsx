import { useAppDispatch, useAppSelector } from '@/common/store';
import { clearSession } from '@/features/sessionSlice';
import { setSettings } from '@/features/settingsSlice';
import { ChangeEvent } from 'react';
import ContainerLayout from '../ContainerLayout';

interface Props {
  className?: string;
}

const ErrorInput = ({ className }: Props) => {
  const dispatch = useAppDispatch();
  const { error, seed, locale } = useAppSelector((state) => state.settings);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.valueAsNumber;
    if (Number.isNaN(value)) return;
    dispatch(clearSession());
    dispatch(
      setSettings({
        seed,
        locale,
        error: value,
      })
    );
  };
  return (
    <div className="input-container">
      <label htmlFor="error" className="label capitalize">
        Error:
      </label>
      <ContainerLayout>
        <input
          type="number"
          name="error"
          className={`input input-bordered border-2 border-solid input-md w-full text-base focus:outline-none focus:border-gray-500 ${className}`}
          onChange={handleOnChange}
          min="0"
          step="0.1"
          max="1000"
          value={error}
        />
        <input
          type="range"
          name="error"
          className={`range w-full ${className}`}
          onChange={handleOnChange}
          min="0"
          step="0.1"
          max="1000"
          value={error}
        />
      </ContainerLayout>
    </div>
  );
};
export default ErrorInput;
