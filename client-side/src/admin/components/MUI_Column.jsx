import { Button } from "@mui/material";
import { AiOutlineEye } from "react-icons/ai";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

//Products

export const AdminProductsColumn = [
  {
    field: "id",
    headerName: "ID",
    hide: "true",
  },
  {
    field: "slNo",
    headerName: "Sl No",
    headerAlign: "center",
    align: "center",
    minWidth: 70,
    headerClassName: "super-app-theme--header",
    flex: 0.5,
  },
  {
    field: "productName",
    headerName: "Product Name",
    headerAlign: "center",
    // align: "center",
    minWidth: 200,
    sortable: true,
    headerClassName: "super-app-theme--header",
    flex: 8,
    renderCell: (params) => {
      return (
        <Link
          className="product"
          to={`/admin/product/${params.row.productUrl}`}
        >
          <img src={params.row.productImage} alt="" />
          <p>{params.row.productName}</p>
        </Link>
      );
    },
  },
  {
    field: "productCode",
    headerName: "Product Code",
    headerAlign: "center",
    align: "center",
    minWidth: 90,
    sortable: true,
    headerClassName: "super-app-theme--header",
    flex: 2.5,
  },
  {
    field: "category",
    headerName: "Category",
    headerAlign: "center",
    // align: "center",
    minWidth: 120,
    flex: 3,
    headerClassName: "super-app-theme--header",
    sortable: true,
  },
  {
    field: "price",
    headerName: "Price",
    headerAlign: "center",
    align: "center",
    minWidth: 90,
    flex: 2,
    headerClassName: "super-app-theme--header",
    sortable: true,
  },
  {
    field: "discount",
    headerName: "Discount",
    headerAlign: "center",
    align: "center",
    minWidth: 90,
    flex: 2,
    headerClassName: "super-app-theme--header",
    sortable: true,
  },
  {
    field: "quantity",
    headerName: "Quantity",
    headerAlign: "center",
    align: "center",
    minWidth: 80,
    flex: 1,
    headerClassName: "super-app-theme--header",
    sortable: true,
  },
  {
    field: "status",
    headerName: "Status",
    headerAlign: "center",
    align: "center",
    minWidth: 100,
    flex: 2,
    sortable: true,
    headerClassName: "super-app-theme--header",
    renderCell: (params) => {
      const quantity = params.row.quantity;
      return (
        <div>
          {quantity > 0 ? (
            <span className="inStock">In Stock</span>
          ) : (
            <span className="outOfStock">Out Of Stock</span>
          )}
        </div>
      );
    },
  },
  {
    field: "action",
    headerName: "Action",
    sortable: true,
    headerAlign: "center",
    align: "center",
    flex: 2,
    headerClassName: "super-app-theme--header",
    minWidth: 100,
    renderCell: (params) => {
      const productId = params.row.id;
      const confirmDelete = params.row.delete;
      return (
        <div className="action">
          <span>
            <Link
              className="view"
              to={`/admin/product/${params.row.productUrl}`}
            >
              <AiOutlineEye />
            </Link>
          </span>
          <span>
            <Link
              className="edit"
              to={`/admin/product/update/${params.row.productUrl}`}
            >
              <FaEdit />
            </Link>
          </span>
          <span>
            <Link className="delete">
              <FaTrashAlt onClick={() => confirmDelete(productId)} />
            </Link>
          </span>
        </div>
      );
    },
  },
];

// Users

export const usersColumns = [
  {
    field: "id",
    headerName: "ID",
    headerAlign: "center",
    align: "center",
    minWidth: 80,
    hide: true,
    flex: 0.5,
  },
  {
    field: "slNo",
    headerName: "Sl No",
    headerAlign: "center",
    align: "center",
    minWidth: 80,
    headerClassName: "super-app-theme--header",
    flex: 1,
  },
  {
    field: "name",
    headerName: "Name",
    headerAlign: "center",
    // align: "center",
    minWidth: 150,
    sortable: true,
    headerClassName: "super-app-theme--header",
    flex: 5,
  },
  {
    field: "email",
    headerName: "Email",
    headerAlign: "center",
    // align: "center",
    minWidth: 200,
    flex: 5,
    headerClassName: "super-app-theme--header",
    sortable: true,
  },
  {
    field: "status",
    headerName: "Status",
    headerAlign: "center",
    align: "center",
    minWidth: 130,
    flex: 3,
    sortable: true,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "action",
    headerName: "Action",
    sortable: true,
    headerAlign: "center",
    align: "center",
    flex: 2,
    headerClassName: "super-app-theme--header",
    minWidth: 80,
    renderCell: (params) => {
      const userId = params.row.id;
      const handleDelete = params.row.delete;
      return (
        <>
          {/* <Button
            style={{
              marginRight: "2px",
              textTransform: "none",
              backgroundColor: "teal",
            }}
            variant="contained"
            // color="secondary"
            size="small"
          >
            Block
          </Button> */}
          <Button
            style={{ textTransform: "none" }}
            variant="contained"
            color="error"
            size="small"
            onClick={() => handleDelete(userId)}
          >
            Delete
          </Button>
        </>
      );
    },
  },
];

// Recent Orders

export const recentOrdersColumns = [
  {
    field: "id",
    headerName: "Sl No",
    headerAlign: "center",
    align: "center",
    minWidth: 70,
    flex: 0.5,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "orderNo",
    headerName: "Order No.",
    headerAlign: "center",
    align: "center",
    minWidth: 70,
    flex: 2,
    sortable: true,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "productName",
    headerName: "Product Name",
    headerAlign: "center",
    // align: "center",
    minWidth: 250,
    flex: 4,
    sortable: true,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "category",
    headerName: "Category",
    headerAlign: "center",
    align: "center",
    minWidth: 150,
    flex: 2,
    sortable: true,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "quantity",
    headerName: "Quantity",
    sortable: true,
    headerAlign: "center",
    align: "center",
    type: "number",
    minWidth: 80,
    flex: 1,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "price",
    headerName: "Price",
    sortable: true,
    headerAlign: "center",
    align: "center",
    type: "number",
    flex: 1.5,
    minWidth: 120,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "status",
    headerName: "Status",
    headerAlign: "center",
    align: "center",
    sortable: true,
    flex: 1.5,
    minWidth: 100,
    headerClassName: "super-app-theme--header",
  },
];

// Orders

export const ordersColumns = [
  {
    field: "id",
    headerName: "ID",
    hide: "true",
  },
  {
    field: "slNo",
    headerName: "Sl No",
    headerAlign: "center",
    align: "center",
    minWidth: 70,
    flex: 0.5,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "date",
    headerName: "Date",
    headerAlign: "center",
    align: "center",
    minWidth: 80,
    flex: 1,
    sortable: true,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "orderNo",
    headerName: "Order No",
    headerAlign: "center",
    align: "center",
    minWidth: 200,
    flex: 2,
    sortable: true,
    headerClassName: "super-app-theme--header",
    renderCell: (params) => {
      const orderId = params?.row?.id;
      return (
        <Link className="orderNo" to={`/admin/orders/${orderId}`}>
          <p>{orderId}</p>
        </Link>
      );
    },
  },
  {
    field: "price",
    headerName: "Total Price",
    sortable: true,
    headerAlign: "center",
    align: "center",
    type: "number",
    flex: 1,
    minWidth: 100,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "payment",
    headerName: "Payment Method",
    sortable: true,
    headerAlign: "center",
    align: "center",
    flex: 1,
    minWidth: 100,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "deliveryStatus",
    headerName: "Delivery Status",
    headerAlign: "center",
    align: "center",
    sortable: true,
    flex: 1.5,
    minWidth: 100,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "action",
    headerName: "Action",
    sortable: true,
    headerAlign: "center",
    align: "center",
    flex: 1,
    headerClassName: "super-app-theme--header",
    minWidth: 140,
    renderCell: (params) => {
      const id = params?.row?.id;
      return (
        <div>
          <Link className="view" to={`/admin/orders/${id}`}>
            <button>View</button>
          </Link>
          <Link className="edit" to={`/admin/orders/update/${id}`}>
            <button>Edit</button>
          </Link>
        </div>
      );
    },
  },
];

// Categories

export const AdminCategoriesColumn = [
  {
    field: "id",
    headerName: "ID",
    hide: "true",
  },
  {
    field: "slNo",
    headerName: "Sl No",
    headerAlign: "center",
    align: "center",
    minWidth: 70,
    headerClassName: "super-app-theme--header",
    flex: 1,
  },
  {
    field: "categoryName",
    headerName: "Category Name",
    headerAlign: "center",
    // align: "center",
    minWidth: 150,
    sortable: true,
    headerClassName: "super-app-theme--header",
    flex: 8,
    renderCell: (params) => {
      return (
        <div className="categoryColumn">
          <img src={params.row.categoryImage} alt="" />
          <p>{params.row.categoryName}</p>
        </div>
      );
    },
  },
  {
    field: "action",
    headerName: "Action",
    sortable: true,
    headerAlign: "center",
    align: "center",
    flex: 2,
    headerClassName: "super-app-theme--header",
    minWidth: 100,
    renderCell: (params) => {
      const categoryUrl = params.row.categoryUrl;
      const categoryId = params.row.id;
      const confirmDelete = params.row.delete;
      return (
        <div>
          <Link className="edit" to={`/admin/category/update/${categoryUrl}`}>
            <Button
              style={{
                textTransform: "none",
                backgroundColor: "teal",
              }}
              variant="contained"
              // color="secondary"
              size="small"
            >
              Edit
            </Button>
          </Link>
          <Link className="delete">
            <Button
              style={{ textTransform: "none" }}
              onClick={() => confirmDelete(categoryId)}
              variant="contained"
              color="error"
              size="small"
            >
              Delete
            </Button>
          </Link>
        </div>
      );
    },
  },
];

// Sliders

export const SlidersColumn = [
  {
    field: "id",
    headerName: "ID",
    hide: "true",
  },
  {
    field: "slNo",
    headerName: "Sl No",
    headerAlign: "center",
    align: "center",
    minWidth: 70,
    headerClassName: "super-app-theme--header",
    flex: 1,
  },
  {
    field: "sliderName",
    headerName: "Slider Name",
    headerAlign: "center",
    align: "center",
    minWidth: 200,
    sortable: true,
    headerClassName: "super-app-theme--header",
    flex: 4,
    renderCell: (params) => {
      return (
        <div className="sliderName">
          <img src={params.row.sliderImage} alt="" />
          <p>{params.row.sliderName}</p>
        </div>
      );
    },
  },
  {
    field: "action",
    headerName: "Action",
    sortable: true,
    headerAlign: "center",
    align: "center",
    flex: 2.5,
    headerClassName: "super-app-theme--header",
    minWidth: 120,
    renderCell: (params) => {
      const sliderId = params.row.id;
      const confirmDelete = params.row.delete;
      return (
        <div>
          <Link className="edit" to={`/admin/slider/update/${sliderId}`}>
            <Button
              style={{
                textTransform: "none",
                backgroundColor: "teal",
              }}
              variant="contained"
              // color="secondary"
              size="small"
            >
              Edit
            </Button>
          </Link>
          <Link className="delete">
            <Button
              style={{ textTransform: "none" }}
              onClick={() => confirmDelete(sliderId)}
              variant="contained"
              color="error"
              size="small"
            >
              Delete
            </Button>
          </Link>
        </div>
      );
    },
  },
];
