const PackageSelector = ({ value, onChange, packages }) => (
  <div className="form-group">
    <label>Membership Package</label>
    <select
      name="memberShip"
      className="form-control"
      value={value}
      onChange={onChange}
    >
      <option value="">Select Package</option>
      {packages.map((pkg) => (
        <option key={pkg.id} value={pkg.packageName}>
          {pkg.packageName} - {pkg.numberOfDays} days
        </option>
      ))}
    </select>
  </div>
);

export default PackageSelector;
