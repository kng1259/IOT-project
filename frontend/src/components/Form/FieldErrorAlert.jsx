/* eslint-disable react/prop-types */
import { MdErrorOutline } from "react-icons/md";

function FieldErrorAlert({ errors, fieldName }) {
  if (!errors || !errors[fieldName]) return null
  return (
    <div className="bg-red-300/20 flex gap-2 text-red-700 border border-red-500/50 rounded-lg px-2 py-1 my-2">
      <MdErrorOutline className="relative top-3"/>
      <div className="flex flex-col">
        <span className="font-semibold text-sm">Lỗi!</span>
        <span className="text-sm">{errors[fieldName]?.message}</span>
      </div>
      
    </div>
  )
}

export default FieldErrorAlert