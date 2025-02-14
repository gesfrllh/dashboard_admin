import React, { useEffect, useState, useRef } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import HTTPOFFICE, { FormatIDR } from "../../utils/Api";
import { CiSearch } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";
import { useNotification } from "../../context/NotificationContext";
import { Products } from "../../types";
import ListProduct from "./components/ListProduct";
import BaseModal from "../../components/BaseModal";



const Product: React.FC = () => {
  const { user } = useAuth();
  const [data, setData] = useState<Products[]>([]);
  const [focusedSearch, setFocusedSearch] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const searchRef = useRef<HTMLInputElement>(null);
  const { showNotification } = useNotification();
  const navigate = useNavigate()
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);


  const productHeader = [
    { id: 1, name: "Product Name" },
    { id: 2, name: "Price" },
    { id: 3, name: "Description" },
    { id: 4, name: "Action" },
  ];

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFocusedSearch(true);
    getData(event.target.value);
    if (event.target.value !== "") {
      setSearchInput(event.target.value);
    }
  };

  const getData = async (query: string) => {
    if (user?.token) {

      try {
        const response = await HTTPOFFICE.get(`api/products?query=${query}`);
        setData(response.data.data);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleDelete = async (id: number) => {
    if (user?.token) {
      try {
        const response = await HTTPOFFICE.delete(`api/products/${id}`);
        if (response.status === 200) {
          showNotification('Success Data Berhasil Dihapus', 'success')
          getData('')
        } else {
          showNotification('Maaf Data Tidak Berhasil Dihapus', 'error')
        }
      } catch (err) {
        showNotification('Server Error', "error")
      }
    }
  }

  const getDetail = async (id: number) => {
    try {
      const response = await HTTPOFFICE.get(`api/products/${id}`)
      if (response.status === 200) {
        navigate(`/add-product/${id}`)
      }
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (user?.token) {
      setTimeout(() => {
        getData(searchInput);
      }, 300)
    }
  }, [user?.token]);


  return (
    <>
      <BaseModal isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onDelete={handleDelete} />
      <DashboardLayout type="product">
        <main>
          <div className="px-8">
            <div className="flex flex-col py-2 rounded-lg bg-white shadow-lg">
              <div className="border-b-2 flex py-2 justify-between items-center px-4">
                <div>
                  <p>Product</p>
                </div>
                <div className="flex items-center gap-8">
                  <div ref={searchRef} className={`py-2  px-4 flex items-center right-10 bg-white rounded-lg ${focusedSearch ? "border-2 border-blue-500" : "border-2 border-gray-200"}`}>
                    <input
                      type="text"
                      className="outline-none text-sm"
                      placeholder="search"
                      onFocus={() => setFocusedSearch(true)}
                      onChange={handleSearch}
                    />
                    <CiSearch color="gray" />
                  </div>
                  <Link to={`/add-product`} className="text-sm font-medium">
                    <div className="flex items-center gap-2 bg-blue-300 p-2 rounded-lg text-white hover:bg-blue-500 transition-all ease-in-out cursor-pointer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4.5v15m7.5-7.5h-15"
                        />
                      </svg>
                      Add Product
                    </div>
                  </Link>
                </div>
              </div>
              <ListProduct productHeader={productHeader}
                data={data}
                handleDelete={handleDelete}
                getDetail={getDetail}
                openModal={openModal}
                setOpenModal={setOpenModal}
                setSelectedProductId={setSelectedProductId} />
              <div className="justify-center py-2 flex gap-2">
                <p className="pagination">1</p>
                <p className="pagination">2</p>
                <p className="pagination">3</p>
              </div>
            </div>
          </div>
        </main>
      </DashboardLayout>
    </>
  );
};

export default Product;
