import { useParams } from 'react-router-dom';

const Checkout = () => {

    const {id} = useParams()

    return (
        <>{id}</>
    );
};

export default Checkout
