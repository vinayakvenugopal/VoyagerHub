import React from 'react'
import HeaderHome from '../../components/HeaderHome/HeaderHome'
import { HomeSearchBox } from '../../components/HomeSearchBox/HomeSearchBox'

export const HomeScreen = () => {
  return (
    <>
    <HeaderHome/>
    <section className="masthead -type-1 z-5">
      <div className="masthead__bg">
        <img alt="image" src="/img/home/bg.webp" className="js-lazy" />
      </div>
      <div className="container">
        <div className="row justify-center">
          <div className="col-auto">
            <div className="text-center">
              <h1
                className="text-60 lg:text-40 md:text-30 text-white"
                data-aos="fade-up"
              >
                Find Next Place To Visit
              </h1>
              <p
                className="text-white mt-6 md:mt-10"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                Discover amzaing places at exclusive deals
              </p>
            </div>
            {/* End hero title */}

            <div
              className="tabs -underline mt-60 js-tabs"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <HomeSearchBox />
            </div>
            {/* End tab-filter */}
          </div>
        </div>
      </div>
    </section>
    
    </>
  )
}
