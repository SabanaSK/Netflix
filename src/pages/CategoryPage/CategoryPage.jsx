import { useParams } from "react-router";

const CategoryPage = () => {
	const { categoryName } = useParams();

	console.log(categoryName);
	return <div>CategoryPage</div>;
};

export default CategoryPage;
