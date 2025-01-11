import React, { useState, useEffect } from 'react';
import axios from 'axios';
import winston from 'winston';

const logger = winston.createLogger({
  level: 'error',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log' }),
  ],
});

const fetchPageConfig = async () => {
  try {
    const response = await axios.get('https://api.example.com/page_config');
    const pageConfig = response.data;

    // Log error details
    logger.error('Error fetching page config:', {
      error: response.error,
      statusCode: response.status,
      statusText: response.statusText,
    });

    // Log request and response data
    logger.error('Request data:', {
      url: response.config.url,
      method: response.config.method,
      headers: response.config.headers,
      body: response.config.data,
    });
    logger.error('Response data:', {
      statusCode: response.status,
      statusText: response.statusText,
      headers: response.headers,
      body: response.data,
    });

    // Log error stack trace
    logger.error('Error stack trace:', {
      stack: response.error.stack,
    });

    // Log error timestamp
    logger.error('Error timestamp:', {
      timestamp: new Date().toISOString(),
    });

    // Log error severity
    logger.error('Error severity:', {
      severity: 'error',
    });

    // Log error context
    logger.error('Error context:', {
      userId: '12345',
      sessionId: '67890',
      requestId: 'abcde',
    });

    return pageConfig;
  } catch (error) {
    logger.error('Error fetching page config:', {
      error: error.message,
      statusCode: error.status,
      statusText: error.statusText,
    });
    return [];
  }
};

const App = () => {
  const [pageConfig, setPageConfig] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPageConfig();
      setPageConfig(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      {pageConfig.map((item) => (
        <div key={item.id}>
          <h2>{item.title}</h2>
          <p>{item.content}</p>
        </div>
      ))}
    </div>
  );
};

export default App;
