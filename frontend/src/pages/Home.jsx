import BannerProduct from "../components/BannerProduct";
import CategoryList from "../components/CategoryList";
import HorizontalCardProduct from "../components/HorizontalCardProduct";
import VerticalCardProduct from "../components/VerticalCardProduct";

const Home = () => {
	return (
		<div>
			<CategoryList />
			<BannerProduct />

			<HorizontalCardProduct category={"airpodes"} heading={"Top's Airpodes"} />
			<HorizontalCardProduct category={"watches"} heading={"Pupolar's Watches"} />
			<VerticalCardProduct category={"mobile"} heading={"Mobiles"} />
			<VerticalCardProduct category={"mouse"} heading={"Mouse"} />
			<VerticalCardProduct category={"tv"} heading={"Televisions"} />
			<VerticalCardProduct category={"camera"} heading={"Camera & Photografy"} />
			<VerticalCardProduct category={"earphones"} heading={"Wired Earphones"} />
			<VerticalCardProduct category={"speakers"} heading={"Bluetooth Speakers"} />
			<VerticalCardProduct category={"refrigerator"} heading={"Refrigerator"} />
			<VerticalCardProduct category={"trimmers"} heading={"Trimmers"} />
		</div>
	);
};

export default Home;
