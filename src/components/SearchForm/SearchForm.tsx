import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { searchQuery } from "../../features/searchQuery/searchQuerySlice";
import './SearchForm.scss';
import React from "react";
import classNames from "classnames";

export const SearchForm = React.memo(() => {
  const dispatch = useAppDispatch();
  const [query, setQuery] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
      dispatch(searchQuery(query));
      setQuery('');
  }
  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input 
        className={classNames('input', {'search-form__input': !query})}
        type="text" 
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />

      <button className="button is-link" type='submit'>Search</button>
    </form>
  )
})