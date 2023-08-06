const MedicineDetails = ({ medicine }) => {
  return (
    <div className="px-2 py-3 sm:grid sm:grid-cols-3 sm:gap-60 sm:px-0">
      <dt className="text-sm font-medium leading-6 text-gray-900">{medicine.name}</dt>
      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{medicine.concentration} {medicine.unit}</dd>
    </div>
  )
}

export default MedicineDetails