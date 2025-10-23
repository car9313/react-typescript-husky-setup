import { useCallback, useMemo, useState } from 'react';

type User = {
  id: number;
  name: string;
  email: string;
};
const users: User[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `Usuario ${i + 1}`,
  email: `usuario ${i + 1}@example.com`,
}));

export default function UserSearch() {
  const [query, setQuery] = useState('');
  const [sortAsc, setSortAsc] = useState(true);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const filteredUsers = useMemo(() => {
    console.log('Filtrando usuarios...');
    return users.filter(
      user =>
        user.name.toLocaleLowerCase().includes(query.toLowerCase()) ||
        user.email.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
    );
  }, [query]);

  const sortedUsers = useMemo(() => {
    console.log('Ordenando usuarios...');
    return [...filteredUsers].sort((a, b) =>
      sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
    );
  }, [filteredUsers, sortAsc]);

  const paginatedUsers = useMemo(() => {
    console.log('Paginando usuarios...');
    const start = (page - 1) * pageSize;
    return sortedUsers.slice(start, start + pageSize);
  }, [sortedUsers, page]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const toggleSort = useCallback(() => setSortAsc(prev => !prev), []);

  const nextPage = useCallback(
    () => setPage(p => Math.min(p + 1, Math.ceil(sortedUsers.length / pageSize))),
    [sortedUsers.length],
  );
  return (
    <div className='p-6 max-w-2xl mx-auto'>
      <h1 className='text-2xl font-bold mb-4'>Gestión de Usuarios</h1>
    </div>
  );
}
