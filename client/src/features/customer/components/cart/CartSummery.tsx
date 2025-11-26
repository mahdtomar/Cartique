import { Link } from "react-router-dom"
import { useCart } from "../../context/CartProvider"
import { useTranslation } from "react-i18next"

const CartSummery = () => {
    const { totals } = useCart()
    const { t } = useTranslation("cart")
    return (
        <div className="shadow rounded border border-gray-100 min-w-[300px] p-2">
            <p className="font-bold text-center mb-2">{t("summery")}</p>
            <div className="flex flex-col items-start">
                <p>{t("productCount")} : <span className="font-bold">{totals.products}</span></p>
                <p>{t("totalQuantity")}  : <span className="font-bold">{totals.quantity}</span></p>
                <p>{t("total")} : <span className="font-bold">{totals.price}</span></p></div>
            <button className="primary font-bold w-full mt-2 "><Link to="/checkout" >{t("checkOut")}</Link></button>
        </div>
    )
}

export default CartSummery