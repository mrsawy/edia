import './style1.css';

const Loader1: React.FC = () => {
    return (
        <div className='h-screen w-full z-[99999] bg-black opacity-90 flex justify-center items-center absolute'>
            <div className="loader">
                <div className="container">
                    <div className="carousel">
                        <div className="love"></div>
                        <div className="love"></div>
                        <div className="love"></div>
                        <div className="love"></div>
                        <div className="love"></div>
                        <div className="love"></div>
                        <div className="love"></div>
                    </div>
                </div>
                <div className="container">
                    <div className="carousel">
                        <div className="death"></div>
                        <div className="death"></div>
                        <div className="death"></div>
                        <div className="death"></div>
                        <div className="death"></div>
                        <div className="death"></div>
                        <div className="death"></div>
                    </div>
                </div>
                <div className="container">
                    <div className="carousel">
                        <div className="robots"></div>
                        <div className="robots"></div>
                        <div className="robots"></div>
                        <div className="robots"></div>
                        <div className="robots"></div>
                        <div className="robots"></div>
                        <div className="robots"></div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Loader1;