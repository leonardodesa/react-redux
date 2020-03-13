import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
  useContext,
  useImperativeHandle,
  useReducer,
} from 'react';

import { github } from './services/api';

interface User {
  name: string;
  login: string;
  avatar_url: string;
}

const App: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [users, setUsers] = useState<[User]>();

  const names = useMemo(() => users?.map((user) => user.name).join(', ') || '', [users]);

  const greeting = useCallback(
    () => alert(`hello ${names}`),
    [names],
  );

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const response = await github.get('/users');
    setUsers(response.data);
  }

  function focusOnInput() {
    inputRef.current!.focus();
  }

  return (
    <div>
      {users?.map((user) => user.name)}

      <form action="">
        <input type="text" ref={inputRef} />
      </form>
    </div>
  );
};

export default App;
