import { Link } from "react-router-dom"
import { useCart } from "../../context/CartProvider"

const CartSummery = () => {
    const { totals } = useCart()
    return (
        <div className="shadow rounded border border-gray-100 min-w-[300px] p-2">
            <p className="font-bold text-center mb-2">Summery</p>
            <p>Products Count : <span className="font-bold">{totals.products}</span></p>
            <p>Total Quantity : <span className="font-bold">{totals.quantity}</span></p>
            <p>Total : <span className="font-bold">{totals.price}</span></p>
            <button className="primary bold w-full mt-2"><Link to="/checkout" >Check Out</Link></button>
        </div>
    )
}

export default CartSummery