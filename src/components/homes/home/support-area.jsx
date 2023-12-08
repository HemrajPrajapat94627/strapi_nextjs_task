import Count from '@/src/common/count';
import React, { useEffect, useState } from 'react';
import BASEURL from "@src/baseurl";

const SupportArea = () => {
    const [homeSupport, setHomeSupport] = useState([]);

    const geHomeSupport = async () => {
        try {
            const response = await fetch(`${BASEURL}/api/home-supports`);
            const data = await response.json();
            setHomeSupport(data.data);
        } catch (error) {
            console.log("error", error);
        }
    };


    useEffect(() => {
        geHomeSupport();
    }, []);

    return (
        <>
            <section className="tp-support-feature-area pb-100">
            <div className="container container-large">
               <div className="row">
                {homeSupport.map((item, i) =>
                    <div key={i} className="col-lg-4">
                        <div className="tp-support-feature-item d-flex p-relative fadeRight">
                        <div className="tp-support-feature-counter">
                            <div className="tp-support-feature-thumb">
                                <img src="/assets/img/brand/shape-2.png" alt="theme-pure" />
                            </div>
                            <h3 className="support-feature-title"><span data-purecounter-duration="4" className="purecounter pr-2">
                                <Count number={item.attributes.count}  text={item.attributes.symbol}  />
                            </span></h3>
                        </div>
                        <div className="tp-support-feature-content">
                            <h4 className="tp-support-feature-content-title">{item.attributes.title}</h4>
                            <p dangerouslySetInnerHTML={{ __html: item.attributes.info }} />
                        </div>
                        </div>
                    </div>                
                )}  
               </div>
            </div>
         </section>
        </>
    );
};

export default SupportArea;