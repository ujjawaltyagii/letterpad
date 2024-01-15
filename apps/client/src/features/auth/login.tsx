'use client';
import { Button } from 'ui';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { getApiRootUrl } from '../../../lib/utils/url';
import { getAuthCookieName } from '../../../lib/utils/authCookie';

export const Login = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    if (token) {
      document.cookie = `${getAuthCookieName()}=${token}`;
      document.location.href = document.location.href.replace(
        document.location.search,
        ''
      );
    }
  }, [token]);

  const onClick = () => {
    document.location.href = `${getApiRootUrl()}/api/identity/login?callbackUrl=${
      document.location.href
    }`;
  };
  return <Button onClick={onClick}>Login</Button>;
};