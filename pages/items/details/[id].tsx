import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Layout from '../../layout';
import axios from 'axios';
import Image from 'next/image';

interface itemInfo {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  description: string;
  quantity: number;
}

export default function Page() {
  const router = useRouter();
  const [itemData, setItemData] = useState<itemInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const webUrl = `https://vortex-game-production.up.railway.app/api/Item/AllItemData?id=${router.query.id}`;
        const response = await axios.get(webUrl);
        if (response.status === 200) {
          const { id, title, price, imageUrl, description, quantity } = response.data;
          const item: itemInfo = { id, title, price, imageUrl, description, quantity };
          setItemData(item);
        } else {
          setItemData(null);
        }
      } catch (error) {
        console.error('Error fetching item data:', error);
        setItemData(null);
      } finally {
        setLoading(false);
      }
    };

    if (router.query.id) {
      fetchData();
    }
  }, [router.query.id]);

  if (loading && itemData === null) {
    return (

          <p>Loading...</p>

    );
  }
  if (itemData === null) {
    return (

                <p>Item not found.</p>

    )
    };

  return (

      <div>
        <Image alt={itemData.title} src = {itemData.imageUrl} width={200} height={200}></Image>
        <p>Post: {router.query.id}</p>
        {/* Render the fetched data */}
        <p>Title: {itemData.title}</p>
        <p>Price: {itemData.price}</p>
        <p>Description: {itemData.description}</p>
        {/* ... */}
      </div>

  );
}
