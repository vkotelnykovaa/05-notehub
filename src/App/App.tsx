import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { keepPreviousData } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';

import SearchBox from '../SearchBox/SearchBox';
import Pagination from '../Pagination/Pagination';
import NoteList from '../NoteList/NoteList';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';
import Loader from '../components/Loader/Loader';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';

import { fetchNotes } from '../../services/noteService';
import css from './App.module.css';

const PER_PAGE = 12;

export default function App() {
  const [page, setPage] = useState(1);
  const [searchUiValue, setSearchUiValue] = useState('');
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const debounced = useDebouncedCallback((value: string) => {
    setPage(1);
    setSearch(value.trim());
  }, 400);

  const onSearchChange = (value: string) => {
    setSearchUiValue(value);
    debounced(value);
  };

  const queryKey = useMemo(() => ['notes', { page, perPage: PER_PAGE, search }], [page, search]);

  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey,
    queryFn: () => fetchNotes ({ page, perPage: PER_PAGE, search: search || undefined }),
    placeholderData: keepPreviousData,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {}
        <SearchBox value={searchUiValue} onChange={onSearchChange} />

        {}
        {totalPages > 1 && (
          <Pagination
            pageCount={totalPages}
            forcePage={page - 1}
            onPageChange={(selectedPage) => setPage(selectedPage + 1)}
          />
        )}

        {}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      {}
      {(isLoading || isFetching) && <Loader />}
      {isError && <ErrorMessage message={(error as Error)?.message || 'Request failed'} />}

      {}
      {notes.length > 0 && <NoteList notes={notes} />}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onCancel={() => setIsModalOpen(false)} onCreated={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
