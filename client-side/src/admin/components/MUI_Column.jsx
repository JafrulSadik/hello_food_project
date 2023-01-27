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
        <div className="product">
          <img src={params.row.productImage} alt="" />
          <p>{params.row.productName}</p>
        </div>
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
    flex: 0.5,
  },
  {
    field: "name",
    headerName: "Name",
    headerAlign: "center",
    // align: "center",
    minWidth: 150,
    sortable: true,
    headerClassName: "super-app-theme--header",
    flex: 4,
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
    flex: 3,
    headerClassName: "super-app-theme--header",
    minWidth: 80,
    renderCell: (params) => {
      return (
        <>
          <Button
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
          </Button>
          <Button
            style={{ textTransform: "none" }}
            variant="contained"
            color="error"
            size="small"
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
    flex: 1,
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
