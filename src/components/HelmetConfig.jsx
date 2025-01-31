import React from 'react';
import { Helmet } from 'react-helmet-async';

const HelmetConfig = () => {
  return (
    <Helmet>
      {/* Basic meta tags */}
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>VenueVendor</title>

      {/* Security headers */}
      <meta httpEquiv="Content-Security-Policy" 
        content="default-src 'self'; 
                img-src 'self' data: blob: https: http: *; 
                script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://www.google.com https://www.gstatic.com; 
                style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; 
                connect-src 'self' https://localhost:5500 https://localhost:3000; 
                font-src 'self' https://cdn.jsdelivr.net data:;
                object-src 'none';
                media-src 'self';
                frame-src 'self' https://www.google.com;" 
      />
      
      {/* External resources */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
        crossOrigin="anonymous"
      />
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
        crossOrigin="anonymous"
      />
    </Helmet>
  );
};

export default HelmetConfig; 