import React from 'react';
import preloader from "../../../assets/images/preloader1.svg";

type PreloaderPropsType={

}

export const Preloader: React.FC<PreloaderPropsType> = ({}) => {
    return (
        <div>
            <img src={preloader} alt={'...loading'}/>
        </div>
    );
};

