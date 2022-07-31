import Button from '@comp/Button';
import { ChangeEvent } from 'react';
import config from '@/common/config';
import TextInput from '@comp/TextInput';
import { BiRefresh } from 'react-icons/bi';
import { useFetch } from '@/hooks/useFetch';
import { setError } from '@/features/alertSlice';
import ContainerLayout from '@comp/ContainerLayout';
import { setSettings } from '@/features/settingsSlice';
import { useAppDispatch, useAppSelector } from '@/common/store';
import { clearSession, setPage, setSession } from '@/features/sessionSlice';

const SeedInput = () => {
  const fetchRequest = useFetch();
  const dispatch = useAppDispatch();
  const { locale, error, seed } = useAppSelector((state) => state.settings);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (Number.isNaN(value)) return;
    dispatch(clearSession());
    dispatch(
      setSettings({
        error,
        locale,
        seed: value,
      })
    );
  };

  const handleOnClick = async () => {
    const rng = Math.floor(Math.random() * 1000000);

    dispatch(
      setSettings({
        error,
        locale,
        seed: rng,
      })
    );

    dispatch(clearSession());

    const url = new URL(config.api.faker());
    url.searchParams.append('seed', seed.toString());
    url.searchParams.append('error', error.toString());
    url.searchParams.append('locale', locale);

    const data = await fetchRequest({
      url: url.toString(),
      method: 'GET',
    });

    if (data?.code === 200) {
      dispatch(setSession({ users: data.data }));
      dispatch(setPage({ info: data.info }));
    } else {
      dispatch(setError({ error: data?.errors ?? data?.message }));
    }
  };

  return (
    <ContainerLayout>
      <TextInput
        label="Seed:"
        type="text"
        name="seed"
        value={seed.toString()}
        onChange={handleOnChange}
        required
      />
      <Button
        type="button"
        onClick={handleOnClick}
        className="btn-accent gap-0 self-end mb-2"
      >
        <BiRefresh className="text-3xl" />
      </Button>
    </ContainerLayout>
  );
};
export default SeedInput;
