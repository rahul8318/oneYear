import { motion, useReducedMotion } from 'framer-motion'
import Section from './ui/Section'
import Photo from './ui/Photo'
import { memories } from '../data/site'

const EASE = [0.16, 1, 0.3, 1]

export default function MemoriesGallery() {
  const reduced = useReducedMotion()

  return (
    <Section
      id="memories"
      eyebrow="our memories"
      title="A few frames I never deleted."
      subtitle="Not in order. Not perfectly framed. Just the ones that made it."
      className="bg-[linear-gradient(to_bottom,transparent,rgba(255,107,138,0.035),transparent)]"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
        {memories.map((memory, i) => (
          <motion.figure
            key={memory.src + i}
            className={`group relative ${memory.span}`}
            initial={reduced ? false : memory.reveal.hidden}
            whileInView={reduced ? { opacity: 1 } : memory.reveal.show}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 1.15, ease: EASE }}
          >
            <Photo
              src={memory.src}
              alt={memory.alt}
              ratio={memory.ratio}
              className={`rounded-3xl shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)] ring-1 ring-white/[0.07] ${
                i % 2 === 0 ? 'rounded-[2.5rem_0.9rem_2.5rem_0.9rem]' : 'rounded-[0.9rem_2.5rem_0.9rem_2.5rem]'
              }`}
            />

            <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-t from-ink-950/85 via-ink-950/10 to-transparent opacity-80 transition-opacity duration-700 group-hover:opacity-100" />

            <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-7">
              <span className="translate-y-2 font-script text-xl text-cream opacity-0 transition-all duration-700 ease-out group-hover:translate-y-0 group-hover:opacity-100 sm:text-2xl">
                {memory.caption}
              </span>
              <span className="ml-auto text-[0.6rem] tracking-[0.3em] text-cream-faint uppercase">
                {String(i + 1).padStart(2, '0')}
              </span>
            </figcaption>

            <p className="mt-4 pl-1 text-xs font-light text-cream-faint md:hidden">
              {memory.caption}
            </p>
          </motion.figure>
        ))}
      </div>
    </Section>
  )
}
