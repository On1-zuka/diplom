import styles from './CatalogPage.module.css';
import CatalogProductCard from '../catalogProductCard/CatalogProductCard';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Pagination, Slider } from "@mui/material";
import Checkbox from '../../common/checkboxWithText/checkbox';
import { ToastContainer } from 'react-toastify';
import { useLocation, useParams } from 'react-router-dom';
import noStock from "../../assets/Error/OutOfStock.jpg"

export default function CatalogPage() {
    const [products, setProducts] = useState([]);
    const [maxPrice, setMaxPrice] = useState(null); // Изменено здесь
    const [priceRange, setPriceRange] = useState([0, 1000]); // Начальное значение изменено
    const [sortOption, setSortOption] = useState("");
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [inStock, setInStock] = useState("");
    const { id } = useParams();
    const location = useLocation();

    const isBrandPath = location.pathname.includes('brands/catalog');
    const isCategoryPath = location.pathname.includes('categories/catalog');

    useEffect(() => {
        fetchCategories();
        fetchBrands();
        fetchMaxPrice();
    }, []);

    useEffect(() => {
        fetchData();
    }, [page, limit]);

    useEffect(() => {
        if (maxPrice !== null) {
            setPriceRange([0, maxPrice]); // Обновление priceRange при изменении maxPrice
        }
    }, [maxPrice]);

    const fetchData = async () => {
        try {
            const brandIds = isBrandPath ? [id, ...selectedBrands].filter(Boolean) : selectedBrands;
            const categoriesId = isCategoryPath ? [id, ...selectedCategories].filter(Boolean) : selectedCategories;

            const response = await axios.get(`${process.env.API_BASE_URL}/products`, {
                params: {
                    brandId: brandIds.join(','),
                    categoryId: categoriesId.join(','),
                    limit,
                    page,
                    minPrice: priceRange[0],
                    maxPrice: priceRange[1],
                    inStock,
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
            console.error('Error fetching brands:', error);
        }
    };

    const fetchMaxPrice = async () => {
        try {
            const response = await axios.get(`${process.env.API_BASE_URL}/products/max-price`);
            const maxPriceValue = response.data;
            if (maxPriceValue) {
                setMaxPrice(maxPriceValue);
            } else {
                console.error('Max price not found in response');
            }
        } catch (error) {
            console.error('Error fetching max price:', error);
        }
    };

    const handlePriceSliderChange = (event, newValue) => {
        setPriceRange(newValue);
    };

    const handleSortChange = (event) => {
        const selectedOption = event.target.value;
        setSortOption(selectedOption);
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handlePaginationChange = (event, value) => {
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
            sorted.sort((a, b) => b.name.localeCompare(a.name));
        }
        return sorted;
    };

    const handleCategoryChange = (category) => {
        const updatedCategories = selectedCategories.includes(category)
            ? selectedCategories.filter((cat) => cat !== category)
            : [...selectedCategories, category];
        setSelectedCategories(updatedCategories);
    };

    const handleBrandChange = (brandId) => {
        const updatedBrands = selectedBrands.includes(brandId)
            ? selectedBrands.filter((br) => br !== brandId)
            : [...selectedBrands, brandId];
        setSelectedBrands(updatedBrands);
    };

    const applyFilters = () => {
        setPage(1);
        fetchData();
    };

    const handleMinPriceChange = (e) => {
        const minPrice = parseInt(e.target.value);
        setPriceRange([minPrice, priceRange[1]]);
    };

    const handleMaxPriceChange = (e) => {
        const maxPriceValue = parseFloat(e.target.value);
        setPriceRange([priceRange[0], maxPriceValue]);
    };

    const updatePage = () => {
        window.location.reload();
    };

    return (
        <div>
            <main className={styles.catalogPage}>
                <section className={styles.catalogWindow}>
                    <div className={styles.container}>
                        <form className={styles.fromCatalog}>
                            <div className={styles.filter}>
                                <div className={styles.filterCategory}>
                                    <button type="reset" className={styles.hideFilter} onClick={updatePage}>
                                        Сбросить фильтр(ы) и сортировку
                                    </button>
                                    {!isCategoryPath && (
                                        <div className={styles.category}>
                                            <p className={styles.selectName}>Категории</p>
                                            <div className={styles.list}>
                                                {categories.map((category) => (
                                                    <Checkbox
                                                        key={category.id}
                                                        label={category.name}
                                                        checked={selectedCategories.includes(category.id)}
                                                        onChange={() => handleCategoryChange(category.id)}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {!isBrandPath && (
                                        <div className={styles.brand}>
                                            <p className={styles.selectName}>Бренды</p>
                                            <div className={styles.list}>
                                                {brands.map((brand) => (
                                                    <Checkbox
                                                        key={brand.id}
                                                        label={brand.name}
                                                        checked={selectedBrands.includes(brand.id)}
                                                        onChange={() => handleBrandChange(brand.id)}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    <div className={styles.stock}>
                                        <p className={styles.selectName}>В наличии</p>
                                        <div className={styles.pointStock}>
                                            <label>
                                                <input
                                                    type="radio"
                                                    value="yes"
                                                    checked={inStock === "yes"}
                                                    onChange={() => setInStock("yes")}
                                                />
                                                Да
                                            </label>
                                            <label>
                                                <input
                                                    type="radio"
                                                    value="no"
                                                    checked={inStock === "no"}
                                                    onChange={() => setInStock("no")}
                                                />
                                                Нет
                                            </label>
                                        </div>
                                    </div>
                                    <div className={styles.price}>
                                        <p className={styles.selectName}>Цена</p>
                                        <Slider
                                            value={priceRange}
                                            onChange={handlePriceSliderChange}
                                            min={0}
                                            max={Math.ceil(maxPrice)}
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
                                        <div className={styles.blockPrice}>
                                            <input
                                                type="number"
                                                className={styles.minPrice}
                                                value={priceRange[0]}
                                                onChange={handleMinPriceChange}
                                            />
                                            <input
                                                type="number"
                                                className={styles.maxPrice}
                                                value={priceRange[1]}
                                                onChange={handleMaxPriceChange}
                                            />
                                        </div>
                                    </div>
                                    <button type="button" className={styles.applyFilter} onClick={applyFilters}>
                                        Применить фильтр(ы)
                                    </button>
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
                                        sortedProducts().map((product) => (
                                            <CatalogProductCard key={product.id} product={product} />
                                        ))
                                    ) : (
                                        <img src={noStock} alt="Нет доступных товаров" className={styles.noProducts} />
                                    )}
                                    <ToastContainer />
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
    );
}
