import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import shape_1 from "@assets/img/support/shape-img.png";
import shape_2 from "@assets/img/support/shape-bg.png";
import AngleArrow from '@/src/svg/angle-arrow';
import LineArrowTwo from '@/src/svg/line-arrow-2';

import BASEURL from "@src/baseurl";

const FaqArea = () => {
   const [activeIndex, setActiveIndex] = useState(null);
   const [homeFaq, setHomeFaq] = useState([])

   function handleClick(index) {
      setActiveIndex(index === activeIndex ? null : index);
   }


   const geHomeFaq = async () => {
      try {
         const response = await fetch(`${BASEURL}/api/home-frequentlies`);
         const data = await response.json();
         setHomeFaq(data.data);
      } catch (error) {
         console.log("error", error);
      }
   };

   useEffect(() => {
      geHomeFaq();
   }, [])


   return (
      <>
         <section className="tp-support-area tp-support-bg p-relative pb-110">
            <div className="container container-large">
               <div className="tp-support-shape">
                  <Image className="shape-1" src={shape_1} alt="theme-pure" />
                  <Image className="shape-2" src={shape_2} alt="theme-pure" />
               </div>
               <div className="row justify-content-center">
                  <div className="col-xxl-8 col-xl-10">
                     <div className="tp-support-title-wrapper text-center">
                        <span className="tp-section-title__pre">
                           best IT <span className="title-pre-color">Support</span>
                           <AngleArrow />
                        </span>
                        <h3 className="tp-section-title">Frequently Ask <span className="title-color">Question?</span>
                           <span className="title-center-shape">
                              <LineArrowTwo />
                           </span>
                        </h3>
                     </div>

                     <div className="tp-support-faq faq-style-1">
                        <div className="tp-faq-tab-content tp-accordion">
                           <div className="accordion" id="general_accordion">
                              {homeFaq.map((item, i) =>
                                 <div key={i} className={`accordion-item`}>
                                    <h2 className="accordion-header" id={`heading${item.attributes.accordion_id}`}>
                                       <button
                                          className={`accordion-button ${item.attributes.collapsed}`}
                                          type="button"
                                          data-bs-toggle="collapse"
                                          data-bs-target={`#collapse${item.attributes.accordion_id}`}
                                          aria-controls={`collapse${item.attributes.accordion_id}`}
                                       >
                                          {item.attributes.question}
                                       </button>
                                    </h2>
                                    <div
                                       id={`collapse${item.attributes.accordion_id}`}
                                       className={`accordion-collapse collapse hide`}
                                       aria-labelledby={`heading${item.attributes.accordion_id}`}
                                       data-bs-parent="#general_accordion"
                                    >
                                       <div className="accordion-body">
                                          <p>{item.attributes.answer}</p>
                                       </div>
                                    </div>
                                 </div>
                              )}
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </>
   );
};

export default FaqArea;