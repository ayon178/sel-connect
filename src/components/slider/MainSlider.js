// CustomSlider.js
import { GoHomeFill } from 'react-icons/go'

import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/effect-fade' // Add this import if you want to use the fade effect
// import mainImage from '../../assets/main_slider.jpg'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

SwiperCore.use([Pagination])

const slides = [
  {
    image:
      'https://img.freepik.com/free-photo/modern-luxury-domestic-room-comfortable-relaxation-generative-ai_188544-12679.jpg?w=826&t=st=1703757257~exp=1703757857~hmac=5f4d70dcd27ac71eee72e3f3e978633ec91e970edfae34df4ba67b9bfca08f19',
    text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    image:
      'https://img.freepik.com/free-photo/luxury-house-real-estate-sale-property-generative-ai_169016-29360.jpg?w=826&t=st=1703757009~exp=1703757609~hmac=2b47a6e3d2b264cbc517cecc4299974ca5183b8ee0d4d6893441c116e3985ad0',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    image:
      'https://img.freepik.com/free-photo/office-buildings_1127-3158.jpg?w=740&t=st=1703757400~exp=1703758000~hmac=5af38f0edb48ccf6879aca6cf28a0b21ca5f094aed9ab205f0ccb4a7f831c542',
    text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
  },
]

const MainSlider = () => {
  const [swiper, setSwiper] = useState(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const router = useRouter()

  const handleClick = index => {
    if (swiper && swiper.slideTo) {
      swiper.slideTo(index)
    }
  }

  const handleSwiperUpdate = swiper => {
    setSwiper(swiper)

    // Update the active index when the Swiper slides
    swiper.on('slideChange', () => {
      setActiveIndex(swiper.activeIndex)
    })
  }

  useEffect(() => {
    // Initial setup to handle the active index
    if (swiper) {
      setActiveIndex(swiper.activeIndex)
    }
  }, [swiper])

  return (
    <div className="relative">
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        onSwiper={handleSwiperUpdate}
        pagination={false}
        className="h-screen md:h-[70vh]" // Set height based on the screen size
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="relative">
            <div className="md:flex items-center relative h-full">
              <div className="w-full md:w-2/3 h-full">
                <img
                  src={slide.image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div
                onClick={() => handleClick(index)}
                className={`w-full md:w-1/3 p-8 flex items-center text-center flex-col justify-center cursor-pointer absolute md:static inset-0 ${
                  index === activeIndex ? 'md:flex' : 'hidden'
                }`}
              >
                <h1 className="text-3xl font-semibold">
                  Be <span className="text-primary">Different.</span>
                </h1>
                <h1 className="text-3xl font-semibold">
                  Choose <span className="text-primary">Differently.</span>
                </h1>
                <button
                  onClick={() => router.push('/my-property')}
                  className="bg-primary text-white px-10 py-2 rounded-lg mt-4 flex flex-col items-center justify-center"
                >
                  <GoHomeFill size={35} />
                  <span className="text-lg">My Properties</span>
                </button>

                <small className=" mt-5">{slide.text}</small>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="custom-pagination rounded-md z-50 bg-white shadow-xl w-[10rem] px-6 py-3 absolute bottom-[-1rem] left-[35%] sm:left-[38%] md:left-[26.5%] right-0 flex justify-center">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => handleClick(index)}
            className={`h-1 px-[1px] py-[1.5px] rounded-md w-20 mx-1 cursor-pointer  ${
              index === activeIndex
                ? 'bg-[#732318] border-[1px] border-primary'
                : 'bg-white border-[1px] border-primary'
            }`}
          ></div>
        ))}
      </div>
    </div>
  )
}

export default MainSlider
