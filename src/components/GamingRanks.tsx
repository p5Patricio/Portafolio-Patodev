import { motion } from 'framer-motion'

const ranks = [
  {
    game: 'Overwatch',
    rank: 'Master',
    image: '/ranks/overwatch.webp',
    alt: 'Overwatch — Master',
    accent: 'text-color-accent',
    border: 'border-color-accent/20',
  },
  {
    game: 'Rocket League',
    rank: 'Diamante III',
    image: '/ranks/rocket-league.webp',
    alt: 'Rocket League — Diamante III',
    accent: 'text-color-accent-alt',
    border: 'border-color-accent-alt/20',
  },
]

function GamingRanks() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
      className="mt-8 flex flex-row items-center justify-center gap-3 sm:gap-5 md:gap-8"
    >
      {ranks.map((item) => (
        <motion.article
          key={item.game}
          whileHover={{ y: -3 }}
          transition={{ type: 'spring', stiffness: 420, damping: 30, mass: 0.75 }}
          className={`group/rank relative w-36 rounded-2xl border bg-white/[0.018] px-3 py-4 backdrop-blur-xl transition-[border-color,background-color] duration-200 ease-out hover:bg-white/[0.028] sm:min-w-[10.5rem] sm:w-auto sm:px-5 sm:py-5 ${item.border}`}
        >
          <div className="flex flex-col items-center gap-3">
            <img
              src={item.image}
              alt={item.alt}
              className="h-14 w-14 object-contain opacity-90 transition-transform duration-300 ease-out group-hover/rank:scale-[1.03] sm:h-[4.5rem] sm:w-[4.5rem] md:h-20 md:w-20"
              loading="lazy"
              decoding="async"
              width={80}
              height={80}
            />

            <div className="flex flex-col items-center gap-1.5">
              <span className="text-[0.52rem] font-bold uppercase tracking-[0.18em] text-color-tinta/50 sm:text-[0.6rem] sm:tracking-[0.25em] md:text-[0.65rem]">
                {item.game}
              </span>
              <span className={`text-[0.68rem] font-black uppercase leading-none tracking-[0.12em] sm:text-sm sm:tracking-[0.18em] md:text-base ${item.accent}`}>
                {item.rank}
              </span>
            </div>
          </div>
        </motion.article>
      ))}
    </motion.div>
  )
}

export default GamingRanks
