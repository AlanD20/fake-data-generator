import config from '@/common/config';
import { User } from '@/common/types';
import TitleText from '@comp/TitleText';
import PageLayout from '@comp/PageLayout';
import { useFetch } from '@/hooks/useFetch';
import UserRow from '@comp/dashboard/UserRow';
import { useCallback, useEffect } from 'react';
import Settings from '@comp/dashboard/Settings';
import { setError } from '@/features/alertSlice';
import TableHead from '@comp/dashboard/TableHead';
import AlertStatus from '@comp/dashboard/AlertStatus';
import InfiniteScroll from '@comp/dashboard/InfiniteScroll';
import { setPage, setSession } from '@/features/sessionSlice';
import { useAppDispatch, useAppSelector } from '@/common/store';
import ContainerLayout from '@comp/ContainerLayout';

const Dashboard = () => {
  const fetchRequest = useFetch();
  const dispatch = useAppDispatch();
  const { users, info } = useAppSelector((state) => state.session);

  const fetchUsers = useCallback(async () => {
    const { data, code, info } = await fetchRequest({
      url: config.api.faker() + '?seed=0&error=0&locale=en',
      method: 'GET',
    });

    if (code === 200) {
      dispatch(setSession({ users: data }));
      dispatch(setPage({ info: info }));
    } else {
      dispatch(
        setError({
          error: 'Failed to load users',
        })
      );
    }
  }, []);

  useEffect(() => void fetchUsers(), [fetchUsers]);

  const currentPage = info?.page ?? 0;

  return (
    <PageLayout>
      <TitleText text="Fake Data Generator" />
      <div className="w-full flex flex-col items-center mb-4 py-4">
        <AlertStatus className="my-0" />
        <Settings />
        <ContainerLayout>
          <span>
            Locale:
            <span className="uppercase font-bold">
              {' ' + (info?.locale ?? '')}
            </span>
          </span>
          <span>|</span>
          <span>
            Page:
            <span className="font-bold">{' ' + (currentPage + 1)}</span>
          </span>
        </ContainerLayout>
      </div>

      <div className="overflow-x-auto w-full pb-2 px-16 h-screen">
        <table className="table w-full">
          <TableHead />
          <tbody className="relative">
            {users?.length > 0 &&
              users.map((user: User, index: number) => (
                <UserRow key={user.id} index={index} user={user} />
              ))}
          </tbody>
        </table>
        <InfiniteScroll />
      </div>
    </PageLayout>
  );
};

export default Dashboard;
