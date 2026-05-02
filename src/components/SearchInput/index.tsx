import CloseIcon from '@/components/icons/CloseIcon';
import SearchIcon from '@/components/icons/SearchIcon';

import './index.scss';

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export default function SearchInput({
  value,
  onChange,
  placeholder = 'Search products...',
}: Props) {
  return (
    <div className="SearchInput">
      <span className="SearchInput__icon" aria-hidden="true">
        <SearchIcon />
      </span>

      <input
        className="SearchInput__field"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
      />

      {value && (
        <button
          className="SearchInput__clear"
          type="button"
          onClick={() => onChange('')}
          aria-label="Clear search"
        >
          <CloseIcon />
        </button>
      )}
    </div>
  );
}
