import config from '@/common/config';
import TitleText from '@comp/TitleText';
import { useFetch } from '@/hooks/useFetch';
import { setError } from '@/features/alertSlice';
import { useRef, useCallback, useState } from 'react';
import { setSession, setPage } from '@/features/sessionSlice';
import { useAppDispatch, useAppSelector } from '@/common/store';

const InfiniteScroll = () => {
  const fetchRequest = useFetch();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const { locale, error, seed } = useAppSelector((state) => state.settings);
  const { users, info } = useAppSelector((state) => state.session);

  const observer = useRef<IntersectionObserver>();

  const fetchMoreUsers = async () => {
    const url = new URL(config.api.faker());
    url.searchParams.append('seed', seed.toString());
    url.searchParams.append('error', error.toString());
    url.searchParams.append('locale', locale);
    if (info) {
      const next = info?.page + 1;
      url.searchParams.append('page', next.toString());
    }

    const response = await fetchRequest({
      url: url.toString(),
      method: 'GET',
    });

    if (response.code === 200) {
      dispatch(setSession({ users: [...users, ...response.data] }));
      dispatch(setPage({ info: response.info }));
    } else {
      dispatch(
        setError({
          error: 'Failed to load users',
        })
      );
    }
    setLoading(false);
  };

  const lastElement = useCallback(
    (el: HTMLDivElement) => {
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver(async (entries) => {
        if (!loading && entries[0].isIntersecting) {
          setLoading(true);
          await fetchMoreUsers();
        }
      });
      if (el && !loading) {
        observer.current?.observe(el);
      }
    },
    [loading, users]
  );

  return (
    <>
      {!loading && (
        <div ref={lastElement}>
          <TitleText text="Loading..." className="justify-center" />
        </div>
      )}
    </>
  );
};
export default InfiniteScroll;
