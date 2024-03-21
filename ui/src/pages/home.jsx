import background from '../assets/backgrounds/home.png';

export const Home = () => {
    return (
        <div style={{
            backgroundImage: `url(${background})`,
            backgroundSize: 'cover',
            position: 'absolute',
            top: 0,
            zIndex: -1,
            width: '100vw',
            height: '100vh'
        }}></div>
    );
};
