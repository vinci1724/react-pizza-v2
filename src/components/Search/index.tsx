import type { ChangeEvent } from 'react';

import { debounce } from 'lodash';
import {
  // use,
  useCallback,
  useRef,
  useState,
} from 'react';
import { useDispatch } from 'react-redux';

import { setSearchValue } from '../../redux/slices/filterSlice';
// import { SearchContext } from '../../context/SearchContext';
import styles from './Search.module.scss';

const Search = () => {
  const dispatch = useDispatch();

  const [value, setValue] = useState('');
  // const { setSearchValue } = use(SearchContext);
  const inputRef = useRef<HTMLInputElement>(null);

  const onClickClear = () => {
    // setSearchValue('');
    dispatch(setSearchValue(''));
    setValue('');
    // document.querySelector('input')?.focus();
    inputRef.current?.focus();
  };

  const updateSearchValue = useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 150),
    [],
  );

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        id="Capa_1"
        x="0px"
        y="0px"
        viewBox="0 0 513.749 513.749"
        width="512"
        height="512"
      >
        <g>
          <path d="M504.352,459.061l-99.435-99.477c74.402-99.427,54.115-240.344-45.312-314.746S119.261-9.277,44.859,90.15   S-9.256,330.494,90.171,404.896c79.868,59.766,189.565,59.766,269.434,0l99.477,99.477c12.501,12.501,32.769,12.501,45.269,0   c12.501-12.501,12.501-32.769,0-45.269L504.352,459.061z M225.717,385.696c-88.366,0-160-71.634-160-160s71.634-160,160-160   s160,71.634,160,160C385.623,314.022,314.044,385.602,225.717,385.696z" />
        </g>
      </svg>
      <input
        ref={inputRef}
        className={styles.input}
        placeholder="Поиск пиццы..."
        onChange={onChangeInput}
        value={value}
      />
      {
        value && (
          <svg
            onClick={onClickClear}
            className={styles.clearIcon}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
          >
            <title>chrome-close</title>
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="m7.116 8l-4.558 4.558l.884.884L8 8.884l4.558 4.558l.884-.884L8.884 8l4.558-4.558l-.884-.884L8 7.116L3.442 2.558l-.884.884z"
              clipRule="evenodd"
            />
          </svg>
        )
      }
    </div>
  );
};

export default Search;
