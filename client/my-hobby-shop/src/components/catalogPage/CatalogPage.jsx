import styles from './CatalogPage.module.css'
import CatalogProductCard from '../catalogProductCard/CatalogProductCard'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Pagination, Slider } from "@mui/material";
import Checkbox from '../../common/checkboxWithText/checkbox';

export default function CatalogPage() {
    const [products, setProducts] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 100]);
    const [sortOption, setSortOption] = useState("");
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);

    useEffect(() => {
        fetchData();
        fetchCategories();
        fetchBrands();
    }, [page, limit, sortOption]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${process.env.API_BASE_URL}/products`, {
                params: {
                    brandId: selectedBrands.join(','), // Преобразуйте массив в строку для brandId
                    categoryId: selectedCategories.join(','), // Преобразуйте массив в строку для categoryId
                    limit,
                    page,
                },
            });
            setProducts(response.data.rows);
            setTotalPages(Math.ceil(response.data.count / limit));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${process.env.API_BASE_URL}/categories`);
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchBrands = async () => {
        try {
            const response = await axios.get(`${process.env.API_BASE_URL}/brands`);
            setBrands(response.data);
        } catch (error) {
            console.error('Error fetching brands:', error)
        }
    };

    const handlePriceSliderChange = (event, newValue) => {
        setPriceRange(newValue);
        // Дополнительные действия при изменении диапазона цен ь

    };

    const handleSortChange = (event) => {
        const selectedOption = event.target.value;
        setSortOption(selectedOption);
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const sortedProducts = () => {
        let sorted = [...products];
        if (sortOption === "price-desc") {
            sorted.sort((a, b) => b.price - a.price);
        } else if (sortOption === "price-asc") {
            sorted.sort((a, b) => a.price - b.price);
        } else if (sortOption === "name-asc") {
            sorted.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortOption === "name-desc") {
            sorted.sort((a, b) => b.name.localeCompare(a.name))
        }
        return sorted;
    };

    const handlePaginationChange = (event, value) => {
        setPage(value);
    };

    const handleCategoryChange = (category) => {
        const updatedCategories = selectedCategories.includes(category)
            ? selectedCategories.filter((cat) => cat !== category)
            : [...selectedCategories, category];
        setSelectedCategories(updatedCategories);
    };

    const handleBrandChange = (brand) => {
        const updatedBrands = selectedBrands.includes(brand)
            ? selectedBrands.filter((br) => br !== brand)
            : [...selectedBrands, brand];
        setSelectedBrands(updatedBrands);
    };

    const applyFilters = () => {
        fetchData();
    };
    return (
        <div>
            <main className={styles.catalogPage}>
                <section className={styles.catalogWindow}>
                    <div className={styles.container}>
                        <form action="" className={styles.fromCatalog}>
                            <div className={styles.filter}>
                                <div className={styles.filterCategory}>
                                    <button className={styles.hideFilter}>Сбросить фильтр(ы) </button>
                                    <div className={styles.category}>
                                        <p className={styles.selectName}>Категории</p>
                                        <div className={styles.list}>
                                            {categories.map(category => (
                                                <Checkbox key={category.id} label={category.name}
                                                    checked={selectedCategories.includes(category.id)}
                                                    onChange={() => handleCategoryChange(category.id)} />
                                            ))}
                                        </div>
                                    </div>
                                    <div className={styles.brand}>
                                        <p className={styles.selectName}>Бренды</p>
                                        <div className={styles.list}>
                                            {brands.map(brand => (
                                                <Checkbox key={brand.id} label={brand.name}
                                                    checked={selectedBrands.includes(brand.id)}
                                                    onChange={() => handleBrandChange(brand.id)} />
                                            ))}
                                        </div>
                                    </div>
                                    <div className={styles.price}>
                                        <p className={styles.selectName}>Цена</p>
                                        <Slider
                                            value={priceRange}
                                            onChange={handlePriceSliderChange}
                                            min={0}
                                            max={100}
                                            step={1}
                                            slotProps={{
                                                thumb: {
                                                    className: styles.orangeThumb,
                                                },
                                                rail: {
                                                    className: styles.orangeRail,
                                                },
                                                track: {
                                                    className: styles.orangeTrack,
                                                },

                                            }}
                                            disableSwap
                                        />
                                    </div>
                                    <div className={styles.blockPrice}>
                                        <input type="number" className={styles.minPrice} />
                                        <input type="number" className={styles.maxPrice} />
                                    </div>
                                    <button type='button' className={styles.applyFilter} onClick={applyFilters}>
                                        Применить фильтры</button>
                                </div>
                            </div>
                            <div className={styles.catalogPanel}>
                                <div className={styles.sortBy}>
                                    <p className={styles.sortName}>Сортировать по</p>
                                    <select
                                        name="сортировка"
                                        className={styles.sortCombobox}
                                        value={sortOption}
                                        onChange={handleSortChange}
                                    >
                                        <option value="">По умолчанию</option>
                                        <option value="name-asc">Названию (А-Я)</option>
                                        <option value="name-desc">Названию (Я-А)</option>
                                        <option value="price-desc">Цена (убывание)</option>
                                        <option value="price-asc">Цена (возрастание)</option>
                                    </select>
                                </div>
                                <div className={styles.content}>
                                    {products.length > 0 ? (
                                        sortedProducts().map(product => (
                                            <CatalogProductCard key={product.id} product={product} />
                                        ))
                                    ) : (
                                        <p className={styles.noProducts}>Нет доступных товаров</p>
                                    )}
                                </div>
                                <div className={styles.pagination}>
                                    <Pagination
                                        count={totalPages}
                                        page={page}
                                        onChange={handlePaginationChange}
                                        sx={{
                                            "& .MuiPaginationItem-root": {
                                                color: "black",
                                                "&:hover": {
                                                    backgroundColor: "orange",
                                                    color: "white",
                                                },
                                                "&.Mui-selected": {
                                                    backgroundColor: "orange",
                                                    color: "white",
                                                },
                                            },
                                        }}
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </section>
            </main>
        </div>
    )
}
