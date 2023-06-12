import React, { use, useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../layout';
import Card from '../../components/Card';
import { set } from 'date-fns';

interface userInfo {
  id: string;
  balance: number;
}

interface itemInfo {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  description: string;
  quantity: number;
}
export const getStaticProps = async () => {
  const requestBody = {
    query: `
      query {
        items{
          nodes{
            id,
            title,
            price,
            imageUrl,
            description,
            quantity
          }
        }
      }
    `,
  };
  const headers = {
    'content-type': 'application/json'
  };
  const options = {
    method: 'POST',
    headers,
    body: JSON.stringify(requestBody),
  };
  
  
  console.log(process.env.GRAPHQL_BASE_URL)
  const response = await fetch(process.env.GRAPHQL_BASE_URL, options);
  const data = await response.json();
  console.log('RESPONSE FROM FETCH REQUEST', data?.data?.items?.nodes);
  return {
    props: {
      data
    },
  };
}

const ItemPage = ({data}) => {
  console.log(data)
  return (

      <div style={{ textAlign: 'center' }}>
        <h1>Rise Online Parası Satın Al</h1>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
          }}
        >{/* 
          <Card
            imageUrl="/images/homepage.jpg"
            title="Title"
            description="Description"
          />
          <Card
            imageUrl="/images/homepage.jpg"
            title="Title"
            description="Description"
          />
          <Card
            imageUrl="/images/homepage.jpg"
            title="Title"
            description="Description"
          /> */}
          {data?.data?.items?.nodes.map((item) => (
            <Card
              key = {item.id}
              id = {item.id}
              imageUrl={item.imageUrl}
              title={item.title}
              description={item.description}
              price={item.price}
              quantity={item.quantity}
            />  
          ))}
        </div>
        
      </div>
  );
};

export default ItemPage;
