import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BrandItem from '../../common/brand/BrandItem';
import styles from '../brandsList/BrandsList.module.css';

export default function BrandsList() {
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.API_BASE_URL}/brands`);
                const sortedBrands = response.data.sort((a, b) => a.id - b.id).slice(0, 8);
                setBrands(sortedBrands);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className={styles.brandsList}>
            {brands && brands.length > 0 ? (
                brands.map((brand) => <BrandItem key={brand.id} brand={brand} />)
            ) : (
                <p>No brands found.</p>
            )}
        </div>
    );
}
