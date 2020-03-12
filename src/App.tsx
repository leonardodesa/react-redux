import React, {
  useState, useEffect, useMemo,
} from 'react';

import { github } from './services/api';

interface User {
  name: string;
  login: string;
  avatar_url: string;
}

const App: React.FC = () => {
  const [users, setUsers] = useState<[User]>();

  const names = useMemo(() => users?.map((user) => user.name).join(', '), [users]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const response: [User] = await github.get('/users');
    setUsers(response);
  }

  return <h1>Ola</h1>;
};

export default App;
