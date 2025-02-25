import React from 'react'
import { Products } from '../../../types'
import { TbEditCircle } from "react-icons/tb";
import { TiDeleteOutline } from "react-icons/ti";
import { FormatIDR } from '../../../utils/Api'

interface ProductHeader {
  id: number,
  name: string
}

interface ListProductProps {
  productHeader: ProductHeader[],
  data: Products[],
  handleDelete: (id: number) => void,
  getDetail: (id: number) => void,
  openModal: boolean,
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
  setSelectedProductId: React.Dispatch<React.SetStateAction<number>>,
}

const ListProduct: React.FC<ListProductProps> = ({ productHeader, data, handleDelete, getDetail, openModal, setOpenModal, setSelectedProductId }) => {

  const openDeleteModal = (id: number) => {
    setSelectedProductId(id);  // Set the product ID to be deleted
    setOpenModal(true);  // Open the modal
  };

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          {productHeader.map((item) => (
            <th key={item.id} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {item.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((item) => (
          <tr key={item.name}>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center gap-4">
                {item.image && (
                  <img src={item.image.url} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                )}
                <p className="text-sm font-medium">{item.name}</p>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <p className="text-sm font-medium">{FormatIDR(item.price)}</p>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <p className="text-sm font-medium">{item.description}</p>
            </td>
            <td className="px-6 py-8 flex whitespace-nowrap items-center justify-center gap-2">
              <div className="text-red-500 cursor-pointer">
                <TiDeleteOutline size={32} onClick={() => openDeleteModal(item.id)} />
              </div>
              <div className="text-blue-500 cursor-pointer">
                <TbEditCircle size={32} onClick={() => getDetail(item.id)} />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default ListProduct
