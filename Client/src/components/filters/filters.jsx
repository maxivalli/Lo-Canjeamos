import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCategory,
  selectLocality,
  selectProvince,
  getPostByProvince,
  getPostByLocality,
  getPostByCategory,
  getAllPosts,
} from "../../redux/actions";
import style from "./Filters.module.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Product from "../../assets/product.jpeg";

const Filters = () => {
  const selectedProvince = useSelector((state) => state.selectedProvince);
  const selectedLocality = useSelector((state) => state.selectedLocality);
  const selectedCategory = useSelector((state) => state.selectedCategory);
  const dispatch = useDispatch();
  const allPosts = useSelector((state) => state.allPosts);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  const handleProvinceChange = (event) => {
    const province = event.target.value;
    dispatch(selectProvince(province));
    dispatch(getPostByProvince(province));
  };

  const handleLocalityChange = (event) => {
    const locality = event.target.value;
    dispatch(selectLocality(locality));
    dispatch(getPostByLocality(locality));
  };

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    dispatch(selectCategory(category));
    dispatch(getPostByCategory(category));
  };


  const categories = allPosts.map((post) => post.category);

  const locations = allPosts.map((post) => post.ubication);

  // Crear un mapa de provincias y sus localidades correspondientes
  const provinceToLocalityMap = new Map();
  locations.forEach((location) => {
    const [locality, province] = location.split(", ");
    if (!provinceToLocalityMap.has(province)) {
      provinceToLocalityMap.set(province, []);
    }
    provinceToLocalityMap.get(province).push(locality);
  });

  // Obtener las provincias únicas
  const provinces = Array.from(provinceToLocalityMap.keys());

  return (
    <>
      <div className={style.filters}>
        <Link to="/profile">
          <img src={Product} className={style.product} alt="Product" />
        </Link>
        <span>Filtros:</span>
        <select value={selectedProvince} onChange={handleProvinceChange}>
          <option value="">Provincia</option>
          {provinces.map((province, index) => (
            <option key={index} value={province}>
              {province}
            </option>
          ))}
        </select>

        <select value={selectedLocality} onChange={handleLocalityChange}>
          <option value="">Localidad</option>
          {provinceToLocalityMap.get(selectedProvince) &&
            provinceToLocalityMap.get(selectedProvince).map((locality, index) => (
              <option key={index} value={locality}>
                {locality}
              </option>
            ))}
        </select>

        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">Categoría</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default Filters;
