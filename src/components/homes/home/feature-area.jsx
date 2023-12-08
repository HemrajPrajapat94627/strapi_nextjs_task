import React from 'react';  
import Link from 'next/link';
import Image from 'next/image';

import AngleArrow from '@/src/svg/angle-arrow'; 
import LineArrowFive from '@/src/svg/line-arrow-5';

import shape_1 from "@assets/img/feature/shape-1.png"; 
import shape_2 from "@assets/img/feature/shape-2.png"; 
import shape_3 from "@assets/img/feature/img-shape.png"; 

import {useState, useEffect} from "react";
import BASEURL from "@src/baseurl";


const FeatureArea = ({about}) => {
    const [homeFuture, setHomeFuture] = useState([]);

    const geHomeFuture = async () => {
        try {
          const response = await fetch(`${BASEURL}/api/futures?populate[image][populate]=true&populate[image][fields][0]=url`);
          const data = await response.json();
          setHomeFuture(data.data);
        } catch (error) {
          console.log("error", error);  
        }
      };

    useEffect(() => {
        geHomeFuture();
    }, []);

    return (
        <> 
           <section className={`tp-feature-area ${about ? "feature-breadcrumb pb-100" : ""}`}>
            {about ? null : 
            <div className="tp-feature-shape">
               <Image src={shape_1} alt="theme-pure" />
            </div> 
            }
            <div className="container container-large">
               <div className="row align-items-center">
                  <div className="col-lg-6">
                     <div className="tp-feature-title-wrapper">
                        <span className="tp-section-title__pre">
                           feature <span className="title-pre-color">IT Solutions</span>
                           <AngleArrow />
                        </span>
                        <h3 className="tp-section-title">We’ve Been Thriving In <span className="title-color">38 Years</span>
                           <span className="title-right-shape"> 
                              <LineArrowFive />
                           </span>
                        </h3>
                     </div>
                  </div>
                  <div className="col-lg-6">
                     <div className="tp-feature-wrapper p-relative">
                        <p>As the complexity of buildings to increase, the field of architecture <br />
                         became multi-disciplinary with technological expertise.</p>
                     </div>
                  </div>
               </div>
               <div className="row">
                {homeFuture.map((item, i)  => 
                    <div key={i} className="col-lg-4 col-md-6">
                        <div className="tp-feature-item-box p-relative wow fadeInUp" data-wow-duration="1s" data-wow-delay=".3s">
                        <div className="tp-feature-item p-relative mb-30">
                            <div className="tp-feature-item-shape">
                                <Image src={shape_2} alt="theme-pure" />
                            </div>
                            <div className="tp-feature-item-wrapper">
                                <div className="tp-feature-item-thumb">
                                    <div className="shape">
                                    <Image src={shape_3} alt="theme-pure" />
                                    </div>
                                    <img 
                                        src={`${BASEURL + item.attributes.image.data[0].attributes.url}`} 
                                        className="thumb" 
                                        alt="theme-pure"
                                        width={item.attributes.image.data[0].attributes.url}
                                        height={item.attributes.image.data[0].attributes.url}
                                    />
                                </div>
                                <div className="tp-feature-item-content">
                                    <h3 className="feature-title">
                                        <Link href="/about">{item.attributes.title}</Link>
                                    <span> 
                                        <AngleArrow />                                
                                    </span>
                                    </h3>
                                    <p>{item.attributes.description}</p>
                                </div>
                            </div>
                        </div>
                        <div className="tp-feature-item-btn">
                            <Link href="/about"><i className="fa-regular fa-arrow-right"></i></Link>
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

export default FeatureArea;