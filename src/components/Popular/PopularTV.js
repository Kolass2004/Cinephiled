import { motion } from "framer-motion";
import { blurPlaceholder } from "globals/constants";
import useGetReleaseDates from "hooks/useGetReleaseDates";
import Image from "next/image";
import Link from "next/link";
import {
  CardsContainerGrid,
  Cards,
  CardImg,
  Rating,
  CardInfo,
  InfoTitle,
  ReleaseDate
} from "./PopularStyles";

const PopularTV = ({ TV }) => {
  const releaseDates = useGetReleaseDates(TV);

  return (
    <CardsContainerGrid>
      {TV.length > 0 &&
        TV.map(
          (TV, i) =>
            TV.poster_path && (
              <Cards key={TV.id}>
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.1 }
                  }}
                  whileTap={{ scale: 0.95 }}>
                  <Link
                    href={`/tv/${TV.id}-${TV.name.replace(/[' ', '/']/g, "-")}`}
                    passHref
                    scroll={false}>
                    <a className='position-relative d-block'>
                      <CardImg className='d-flex justify-content-end'>
                        <Image
                          src={
                            TV.poster_path
                              ? `https://image.tmdb.org/t/p/w500${TV.poster_path}`
                              : "/Images/DefaultImage.png"
                          }
                          alt='movie-poster'
                          layout='fill'
                          objectFit='cover'
                          className='poster'
                          placeholder='blur'
                          blurDataURL={blurPlaceholder}
                        />
                      </CardImg>

                      <Rating className='d-flex justify-content-center align-items-center'>
                        {!TV.vote_average ? "NR" : TV.vote_average.toFixed(1)}
                      </Rating>
                    </a>
                  </Link>
                </motion.div>
                <CardInfo>
                  <InfoTitle>{TV.name}</InfoTitle>
                  <ReleaseDate>{releaseDates[i]}</ReleaseDate>
                </CardInfo>
              </Cards>
            )
        )}
    </CardsContainerGrid>
  );
};

export default PopularTV;
