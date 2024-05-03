import React, { useState, useEffect, useRef } from "react";
import styles from "./Modal.module.css";
import axios from 'axios';
import CatalogProductCard from "../catalogProductCard/CatalogProductCard";

export default function Modal({ isOpen, onClose, searchQuery, setSearchQuery }) {
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (searchQuery.trim() !== '') {
                const response = await axios.get(`${process.env.API_BASE_URL}/products/search`, {
                    params: { query: searchQuery }
                });
                setSearchResults(response.data);
            } else {
                setSearchResults(getFirstFourProducts());
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    const handleModalClose = () => {
        onClose();
    };

    const handleProductSelect = () => {
        onClose();
    };

    return (
        <div className={styles.modalOverlay} style={{ display: isOpen ? 'block' : 'none' }} onClick={handleModalClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <form onSubmit={handleSearch}>
                    <div className={styles.inputButton}>
                        <input
                            placeholder="Поиск товаров..."
                            type="text"
                            className={styles.searchInput}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            ref={inputRef}
                        />
                        <button type="submit" className={styles.searchButton}>Искать</button>
                    </div>
                </form>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className={styles.productList}>
                        {searchResults.length > 0 ? (
                            searchResults.map((product) => (
                                <CatalogProductCard
                                    key={product.id}
                                    product={product}
                                    onClick={handleProductSelect}
                                />
                            ))
                        ) : (
                            <div className={styles.empty}>Увы, ничего не найдено.</div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
