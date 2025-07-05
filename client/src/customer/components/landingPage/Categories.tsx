import smartPhones from "./../../assets/images/smartphones-cover-image.png";
import accessories from "./../../assets/images/accessories-cover-image.png";
import electronics from "./../../assets/images/electronics-cover-image.png";
import superMarket from "./../../assets/images/superMarket-cover-image.png";
const Categories = () => {
    return (
        <section className="landing-page-section text-center container">
            <h2 className="text-[35px]">shop by category</h2>
            <p className="mt-2 mb-10">find exactly what you're looking for with ease.</p>
            <div className="grid grid-cols-2 gap-12 capitalize">
                <div className="category-card bg-[#7ACCFF]">
                    <span>smart phone</span>
                    <button className="primary">see more</button>
                    <img
                        className="category-card-image"
                        src={smartPhones}
                        alt="smart phones category image"
                    />
                </div>
                <div className="category-card bg-[#8ED2DA]">
                    <span>accessories</span>
                    <button className="primary">see more</button>
                    <img
                        className="category-card-image"
                        src={accessories}
                        alt="smart phones category image"
                    />
                </div>
                <div className="category-card bg-[#BDA4E5]">
                    <span>electronics</span>
                    <button className="primary">see more</button>
                    <img
                        className="category-card-image"
                        src={electronics}
                        alt="smart phones category image"
                    />
                </div>
                <div className="category-card bg-[#FC9832]">
                    <span>super market</span>
                    <button className="primary">see more</button>
                    <img
                        className="category-card-image"
                        src={superMarket}
                        alt="smart phones category image"
                    />
                </div>
            </div>
        </section>
    );
};

export default Categories;
