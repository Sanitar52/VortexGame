// UnknownPage.js or UnknownPage.tsx
import NotFound from '../components/NotFound'
import { useGlobalContext } from '../contexts';

const UnknownPage = () => {
  const { loading } = useGlobalContext();


  // You can redirect the user to a specific page or display an error message
  // based on your application's logic

  // Example: Redirect to the homepage

  // Example: Show an error message
  return <NotFound />
    
};

export default UnknownPage;
