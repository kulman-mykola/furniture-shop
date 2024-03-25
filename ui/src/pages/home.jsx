import background from '../assets/backgrounds/home_brown.png';
import { position, Text } from '@chakra-ui/react';

export const Home = () => {
    return (
        <div style={{
            zIndex: -1,
            position: 'absolute',
        }}>
            <div style={{
                backgroundImage: `url(${background})`,
                backgroundSize: 'cover',
                top: 0,
                width: '100vw',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'start'
            }}>
                <Text style={{marginTop: 280, textShadow: 'black 2px 2px 6px'}} color={'white'} fontSize={20} width={900} fontFamily={'monospace'}>
                    Welcome to Furniture Shop, where elegance meets functionality in every piece.
                    Discover a curated selection of furniture designed to elevate your living space,
                    crafted with precision and attention to detail. Whether you're seeking timeless
                    classics or contemporary designs, our collection offers something for every taste and style.
                    Transform your home into a sanctuary of comfort and sophistication with our exquisite range
                    of furniture. Explore now and indulge in the art of living beautifully.
                </Text>
            </div>
            <div
                style={{
                    backgroundColor: '#33100E',
                    width: '100vw',
                    height: '100vh'}}>
            </div>
        </div>
    );
};
