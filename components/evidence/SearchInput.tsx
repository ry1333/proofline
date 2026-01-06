import React, { useState, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import { trackEvent } from '../../utils/analytics';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = 'Search articles...',
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      onChange(newValue);

      // Track search when user types (debounced by parent if needed)
      if (newValue.length > 2) {
        trackEvent('evidence_search', { query_length: newValue.length });
      }
    },
    [onChange]
  );

  const handleClear = () => {
    onChange('');
  };

  return (
    <div
      className={`relative flex items-center border transition-colors ${
        isFocused
          ? 'border-brand-accent/50 bg-black/50'
          : 'border-brand-border bg-brand-panel'
      }`}
    >
      <Search
        size={16}
        className={`absolute left-3 transition-colors ${
          isFocused ? 'text-brand-accent' : 'text-brand-textDim'
        }`}
      />
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className="w-full bg-transparent py-2.5 pl-10 pr-10 text-sm text-white placeholder-brand-textDim focus:outline-none font-mono"
      />
      {value && (
        <button
          onClick={handleClear}
          className="absolute right-3 text-brand-textDim hover:text-white transition-colors"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

export default SearchInput;
