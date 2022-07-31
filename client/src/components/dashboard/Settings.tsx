import SeedInput from './SeedInput';
import ErrorInput from './ErrorInput';
import LocaleInput from './LocaleInput';
import ContainerLayout from '../ContainerLayout';
import Button from '@comp/Button';
import { useAppSelector } from '@/common/store';
import { ExportToCsv } from 'export-to-csv';

const Settings = () => {
  const { users, info } = useAppSelector((state) => state.session);
  const { locale, seed, error } = useAppSelector((state) => state.settings);

  const handleOnClick = () => {
    const fileName = `${info?.locale ?? 'en'}_${new Date().getTime()}`;
    const data = users.map((user, i) => ({
      index: i,
      id: user.id,
      first_name: user.firstName,
      middle_name: user.middleName,
      last_name: user.lastName,
      address: Object.values(user.address).join(' '),
      phone: user.phone,
    }));
    const count = (info?.count ?? 10) * ((info?.page ?? 1) + 1);
    const csv = new ExportToCsv({
      filename: fileName,
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: `
      Locale: ${locale}
      Seed: ${seed}
      Error: ${error}
      Count: ${count}`,
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
    });

    csv.generateCsv(data);
  };

  return (
    <ContainerLayout className="gap-8">
      <SeedInput />
      <LocaleInput />
      <ErrorInput />

      <Button
        type="button"
        label="CSV Export"
        className="mt-8 text-lg"
        onClick={handleOnClick}
      />
    </ContainerLayout>
  );
};

export default Settings;
