import Link from 'next/link';
import Image from 'next/image';
import { Navigation } from "swiper";
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import AngleArrow from "@/src/svg/angle-arrow";
import LineArrowTwo from '@/src/svg/line-arrow-2';
import shape_1 from "@assets/img/about/shape-1.png";
import about from "@assets/img/about/about-1.png";
import BASEURL from "@src/baseurl";

const setting = {
    slidesPerView: 3,
    spaceBetween: 82,
    navigation: {
        nextEl: ".about-button-next-1",
        prevEl: ".about-button-prev-1",
    },
    breakpoints: {
        '1860': {

        },
        '1800': {
            spaceBetween: 40,
        },
        '1701': {

        },
        '1600': {

        },
        '1560': {

        },
        '1400': {
            spaceBetween: 60,
        },
        '1200': {
            spaceBetween: 30,
            slidesPerView: 2,
        },
        '992': {
            spaceBetween: 60,
            slidesPerView: 2,
        },
        '767': {
            slidesPerView: 2
        },
        '576': {
            slidesPerView: 2
        },
        '0': {
            slidesPerView: 1
        },
    },
}


const AboutArea = () => {
    const [isLoop, setIsLoop] = useState(false)
    const [homeAbout, setHomeAbout] = useState([])

    const geHomeAbout = async () => {
        try {
            const response = await fetch(`${BASEURL}/api/home-services?populate[img][populate]=true&populate[img][fields][0]=url`);
            const data = await response.json();
            setHomeAbout(data.data);
        } catch (error) {
            console.log("error", error);
        }
    };


    useEffect(() => {
        setIsLoop(true)

        geHomeAbout();
    }, [])

    return (
        <>
            <section className="tp-about-area pb-45 box-plr p-relative">
                <div className="tp-about-shape d-none d-xl-block">
                    <Image className="shape-1" src={shape_1} alt="theme-pure" />
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-4 col-lg-12">
                            <div className="tp-about-wrapper-thumb text-center text-xl-start fadeLeft">
                                <Image src={about} alt="theme-pure" />
                            </div>
                        </div>
                        <div className="col-xl-8 col-lg-10">
                            <div className="tp-about-wrapper pl-50">

                                <div className="row">

                                    <div className="col-lg-8">
                                        <div className="tp-about-title-wrapper p-relative">
                                            <span className="tp-section-title__pre">
                                                best <span className="title-pre-color">it service</span>
                                                <AngleArrow />
                                            </span>
                                            <h3 className="tp-section-title">It Industries We’re Offering
                                                <span className="title-left-shape">
                                                    <LineArrowTwo />
                                                </span>
                                            </h3>
                                        </div>
                                    </div>

                                    <div className="col-lg-4">
                                        <div className="tp-about-nav d-none d-md-block p-relative">
                                            <button type="button" className="about-button-prev-1">
                                                <i className="fa-regular fa-arrow-left"></i>
                                            </button>
                                            <button type="button" className="about-button-next-1">
                                                <i className="fa-regular fa-arrow-right"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="tp-about-item-wrapper">
                                    <Swiper {...setting}
                                        modules={[Navigation]}
                                        loop={isLoop}
                                        className="about-active swiper-container"
                                    >
                                        {homeAbout.map((item, i) =>
                                            <SwiperSlide key={i} className="tp-about-item mb-30">
                                                <div className="tp-about-item-thumb">
                                                    <img
                                                        src={`${BASEURL + item.attributes.img.data.attributes.url}`}
                                                        alt="theme-pure"
                                                        width={item.attributes.img.data.attributes.width}
                                                        height={item.attributes.img.data.attributes.height}
                                                    />
                                                </div>
                                                <div className="tp-about-item-content">
                                                    <h4 className="about-title">{item.attributes.title}</h4>
                                                    <p>{item.attributes.description}</p>
                                                    <div className="tp-about-item-btn">
                                                        <Link href="/about">
                                                            <i className="fa-regular fa-arrow-right"></i>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        )}
                                    </Swiper>

                                    <div className="tp-about-call">
                                        <a href="tel:01310-069824">
                                            <p><i className="fa-solid fa-phone"></i>
                                                Provide IT services to hundreds customers <span>+88 01310-069824</span></p>
                                        </a>
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

export default AboutArea;