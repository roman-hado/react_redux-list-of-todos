import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Status } from '../../types/Status';
import { actions } from '../../features/filter';
import { useAppSelector } from '../../app/hooks';

export const TodoFilter: React.FC = () => {
  const [searchText, setSearchText] = useState('');

  const dispatch = useDispatch();
  const currentStatus = useAppSelector(state => state.filter.status);

  const todoListFilter = (status: Status) => {
    dispatch(actions.filterStatus(status));
  };

  const onSearch = (query: string) => {
    setSearchText(query);
    dispatch(actions.filterQuery(query));
  };

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={currentStatus}
            onChange={e => todoListFilter(e.target.value as Status)}
          >
            <option value={Status.All}>
              All
            </option>
            <option value={Status.Active}>
              Active
            </option>
            <option value={Status.Completed}>
              Completed
            </option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => onSearch(e.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>
        {searchText.length > 0 && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => onSearch('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
