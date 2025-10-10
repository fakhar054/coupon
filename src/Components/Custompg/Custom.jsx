import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Loader from '../Loader/Loader';
const Custom = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { slug } = useParams();
  const [pageData, setPageData] = useState(null);
  const { t } = useTranslation();  

  useEffect(() => {fetch(`${apiUrl}api/pages/${slug}`)
          .then(response => response.json())
          .then(data => setPageData(data))
          .catch(error => console.error('Error fetching page:', error));
  }, [slug]);
 
  if (!pageData) return <div><Loader /></div>; 
    const imageUrl = `${apiUrl}${pageData.banner_image}`;
  return (
   <div className="about-us-container">
<div className="about-us-banner"style={{ backgroundImage: `url(${imageUrl})`, }}>

  <div className="about-us-overlay">
    <h1>{pageData.page_name}</h1>
    <p className="about-us-breadcrumbs">
      <Link to="/">{t('home')}</Link> ➜ <span>{pageData.page_name}</span>
    </p>
  </div>
</div>
<div className="about-us-content">
{pageData && typeof pageData === 'object' && pageData.description ? (
<div dangerouslySetInnerHTML={{ __html: pageData.description }} />
) : (
<p>No content available</p>
)}
</div>

</div>
  );
};

export default Custom;