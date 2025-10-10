import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from '../Loader/Loader';
import NotFound from '../NotFound/NotFound';
import { useTranslation } from 'react-i18next';
const TermsCondition = () => {
    const [termscondition, setTermscondition] = useState(null);
    const [loading, setLoading] = useState(true);
    const apiUrl = import.meta.env.VITE_API_URL;
    const { t } = useTranslation();

    useEffect(() => {
        const fetchTermscondition = async () => {
            try {
                const response = await fetch(`${apiUrl}api/terms-and-conditions`);
                const data = await response.json();
                setTermscondition(data);

            } catch (error) {
                console.error('Error fetching privacy policy:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTermscondition();
    }, [apiUrl]);

    if (loading) {
        return <Loader />;
    }

    if (!termscondition) {
        return <div className="mian_not_found"><NotFound/></div>;
       
    }

    return (
        <div className="about-us-container">
            <div 
                className="about-us-banner"
                style={{ backgroundImage: `url(${apiUrl + termscondition.terms_condition_banner})` }}
            >
                <div className="about-us-overlay">
                    <h1>{t('terms_condition')}</h1>
                    <p className="about-us-breadcrumbs">
                        <Link to="/">{t('home')}</Link> ➜ <span>{t('terms_condition')}</span>
                    </p>
                </div>
            </div>
            <div className="about-us-content">
                {termscondition && termscondition.terms_and_condition ? (
                    <div dangerouslySetInnerHTML={{ __html: termscondition.terms_and_condition }} />
                ) : (
                    <p>No content available</p>
                )}
            </div>
        </div>
    );
};

export default TermsCondition;
