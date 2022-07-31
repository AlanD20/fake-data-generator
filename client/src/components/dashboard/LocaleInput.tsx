import { ChangeEvent } from 'react';
import { Locale } from '@/common/types';
import { clearSession } from '@/features/sessionSlice';
import { setSettings } from '@/features/settingsSlice';
import { useAppDispatch, useAppSelector } from '@/common/store';

const LocaleInput = () => {
  const dispatch = useAppDispatch();
  const { locale, error, seed } = useAppSelector((state) => state.settings);

  const handleOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as Locale;
    dispatch(clearSession());
    dispatch(
      setSettings({
        seed,
        error,
        locale: value,
      })
    );
  };
  return (
    <div className="input-container">
      <label htmlFor="locale" className="label capitalize">
        Locale
      </label>
      <select
        name="locale"
        defaultValue={locale}
        onChange={handleOnChange}
        className="select select-bordered w-full max-w-xs"
      >
        <option disabled>Select Locale</option>
        <option value="en">English</option>
        <option value="es">Spanish</option>
        <option value="pl">Polish</option>
      </select>
    </div>
  );
};
export default LocaleInput;
