import "../components.scss";

const ViewCabinetModal = (prop: any) => {
  return (
    <div className="view-cabinet-modal">
      <h4>{prop.cabinets.name} Cabinet</h4>
      <div className="drawers">
        {prop.cabinets.drawers?.map((dr, i) => (
          <div className="drawer" key={i}>
            <i className="ti ti-package"></i>

            <p>Drawer #{dr.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewCabinetModal;
