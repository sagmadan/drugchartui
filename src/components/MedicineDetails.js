const MedicineDetails = ({ medicine }) => {
    return (
        <div className="medicine-details">
          <p>{medicine.name} {medicine.concentration} {medicine.unit}</p>
        </div>
      )
}

export default MedicineDetails