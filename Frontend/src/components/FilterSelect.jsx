import PropTypes from 'prop-types';

const FilterSelect = ({ label, value, options, onChange, disabled, classd }) => {
  return (
    <select name={label} id="table-filter" value={value} onChange={onChange} disabled={disabled} className={classd}>
      <option value="" >{label}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          <span>{option}</span>
        </option>
      ))}
    </select>
  );
};

FilterSelect.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string.isRequired,
  classd: PropTypes.string.isRequired,

};

export default FilterSelect;
