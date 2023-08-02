import React, {ComponentType, ReactNode, Suspense} from 'react';
import {Preloader} from "components/common/Preloader/Preloader";

type WithSuspensePropsType = {
    children: ReactNode
}
const WithSuspense= (Component: any) => {
    return (props:any)=>{
        return <Suspense fallback={<Preloader/>}>
            <Component {...props}/>
        </Suspense>
    }
};

export default WithSuspense;

