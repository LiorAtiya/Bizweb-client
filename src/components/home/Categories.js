import React, { useContext } from "react";
import { BusinessContext } from "../../context/BusinessContext";
import Loading from "./Loading";
import CategoryCard from "./CategoryCard";
import "../../styles/Categories.css";

export default function Categories({ categories }) {
  const context = useContext(BusinessContext);
  const { loading } = context;

  let mapedCategories = categories.map((category, i) => {
    return (
      <CategoryCard
        key={i}
        name={category.name}
        route={category.route}
        image={category.image}
      />
    );
  });

  return (
    <section className="featured-rooms">
      <div className="featured-rooms-center">
        {loading ? <Loading /> : mapedCategories}
      </div>
    </section>
  );
}
