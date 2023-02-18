import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Footer from "../components/Footer";
import MobileMenu from "../components/MobileMenu";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import Spinner from "../components/Spinner";
import { getAllProducts } from "../redux/features/product/productSlice";
import { mobile } from "../responsive";

const SearchResult = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.product);
  const [filterProducts, setFilterProducts] = useState();

  const text = useLocation();
  const searchText = text?.search.split("=")[1]?.toLowerCase();

  useEffect(() => {
    dispatch(getAllProducts());
    const filteredProducts = products?.filter((product) =>
      product?.name?.toLowerCase()?.includes(searchText)
    );
    setFilterProducts(filteredProducts);

    // eslint-disable-next-line
  }, [searchText]);

  // Begin Pagination
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(filterProducts?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filterProducts?.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filterProducts]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filterProducts?.length;
    setItemOffset(newOffset);
  };
  // End Pagination

  return (
    <div style={{ backgroundColor: "#fcf8f8" }}>
      <Navbar />
      <Container>
        <div className="wrapper">
          <div className="result-text">
            <div className="result-text-div">
              <h3>
                Showing result for <span>{searchText}</span>
              </h3>
              <p>{filterProducts?.length} item found</p>
            </div>
          </div>
          <div className="productsList">
            {currentItems?.map((item) => {
              return <ProductCard item={item} key={item._id} />;
            })}
          </div>
          <div>
            <ReactPaginate
              nextLabel="Next"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={pageCount}
              previousLabel="Prev"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
              renderOnZeroPageCount={null}
            />
          </div>
        </div>
      </Container>
      <Footer />
      <MobileMenu />
      {loading && <Spinner />}
    </div>
  );
};

const Container = styled.div`
  .wrapper {
    margin: 20px 50px;
    ${mobile({
      margin: 0,
    })}
  }
  .result-text {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .result-text-div {
    width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
    margin-bottom: 20px;
    background-color: white;
    padding: 10px 0;
    border: 1px solid #8080801a;
  }
  .productsList {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    grid-gap: 10px;

    ${mobile({
      gridTemplateColumns: "repeat(auto-fit, minmax(135px, 1fr))",
      margin: "4%",
    })}
  }
  .pagination {
    display: flex;
    list-style: none;
    justify-content: flex-end;
    margin: 40px;
    gap: 15px;
    ${mobile({
      margin: "20px 10px",
      gap: "5px",
    })}
  }

  .page-item {
    cursor: pointer;
    border: 1px solid lightgray;
    padding: 5px 10px;
    border-radius: 2px;
  }
  .active {
    background-color: green;
    color: white;
  }
`;
export default SearchResult;

/*

  
  
  4000 / 1000 = 4 kg - 2 kg = 2kg * 15 + 90 = 120

              */
