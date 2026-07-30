import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { motion } from 'framer-motion'
import quotes from '../data/quotes'
import { FaQuoteLeft } from 'react-icons/fa'

export default function FriendshipQuotes() {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-900/10 to-transparent" />

      <div className="max-w-4xl mx-auto relative">
        <motion.h2
          className="font-dancing text-5xl md:text-6xl text-center mb-4 gradient-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Words of Friendship
        </motion.h2>
        <p className="text-center text-gray-400 mb-12 text-lg">Quotes that define our bond</p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            className="pb-12"
          >
            {quotes.map((quote) => (
              <SwiperSlide key={quote.id}>
                <div className="glass-card p-8 md:p-12 text-center mx-4">
                  <FaQuoteLeft className="text-4xl text-pink-400 mb-6 mx-auto opacity-50" />
                  <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-6 font-light italic">
                    "{quote.text}"
                  </p>
                  <p className="text-pink-300 font-medium">— {quote.author}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  )
}
