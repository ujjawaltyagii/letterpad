'use client';

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Button, Modal } from 'ui';

import { getApiRootUrl } from '../lib/utils/url';
import { Subscribe } from '../src/components/subscribe';
interface Session {
  user?: {
    avatar: string;
    name: string;
    username: string;
  };
  showLogin: Dispatch<SetStateAction<boolean>>;
  showSubscribe: Dispatch<SetStateAction<boolean>>;
}
const Context = createContext<Session>({} as Session);

export function SessionProvider({ children }: any) {
  const [show, showLogin] = useState(false);
  const [showSubscribe, setShowSubscribe] = useState(false);
  const [session, setSession] = useState<Session>({
    showLogin,
    showSubscribe: setShowSubscribe,
  });

  useEffect(() => {
    fetch(`/redirect-api/client/session`, {
      headers: {
        siteurl: window.location.origin,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setSession({ ...data, showLogin, showSubscribe: setShowSubscribe });
      });
  }, []);

  return (
    <Context.Provider value={session}>
      {children}
      <Modal
        show={show}
        toggle={() => showLogin(false)}
        header={
          <span className="font-heading font-bold">You need to Login</span>
        }
        footer={[
          <Button key="back" onClick={() => showLogin(false)} variant="ghost">
            Cancel
          </Button>,
          <Button
            key="submit"
            onClick={() => {
              showLogin(false);
              window.location.href = `${getApiRootUrl()}/api/identity/login?source=${document.location.href}`;
            }}
          >
            Login
          </Button>,
        ]}
      >
        <div className="text-sm">
          You need to be logged into Letterpad for this action.
        </div>
      </Modal>
      <Modal
        toggle={() => setShowSubscribe(false)}
        show={showSubscribe}
        header={`Subscribe`}
        className="bg-white dark:bg-gray-700"
        footer={[]}
      >
        <Subscribe />
      </Modal>
    </Context.Provider>
  );
}

export const useSession = () => {
  const session = useContext(Context);
  return session;
};
