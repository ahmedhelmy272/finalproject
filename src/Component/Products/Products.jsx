import axios from "axios";
import Loading from "../Loading/Loading";
import Product from "../Product/Product";
import { useQuery } from "react-query";

export default function Products() {
  function getProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }
  let { data, isLoading } = useQuery("getProducts", getProducts);
  // let [loading, setLoading] = useState(true);
  // let [product, setProduct] = useState([]);
  // async function getProduct() {
  //   let { data } = await axios.get(
  //     "https://ecommerce.routemisr.com/api/v1/products"
  //   );
  //   setProduct(data.data);
  //   setLoading(false);
  // }
  // useEffect(() => {
  //   getProduct();
  // }, []);
  if (isLoading) return <Loading />;
  return (
    <>
      <div className="container my-5">
        <div className="row">
          {data.data.data.map((item) => {
            return <Product item={item} key={item._id}></Product>;
          })}
        </div>
      </div>
    </>
  );
}
