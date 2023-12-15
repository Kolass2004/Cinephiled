import DominantColor from "components/DominantColor/DominantColor";
import { HeroInfoTitle, HeroInfoWrapper, Span } from "components/MovieInfo/MovieDetailsStyles";
import SocialMediaLinks from "components/SocialMediaLinks/SocialMediaLinks";
import { blurPlaceholder } from "globals/constants";
import Image from "next/image";
import { Fragment, useMemo } from "react";
import {
  DetailsHeroWrap,
  HeroDetailsContainer,
  HeroImg,
  HeroImgWrapper
} from "styles/GlobalComponents";
import { Bio, Details } from "./PersonDetails.styles";
import PersonPageTab from "./PersonPageTab";

const PersonDetails = ({ details }) => {
  const casting =
    details?.combined_credits?.cast?.map((item) => ({
      ...item,
      department: item.department || "Acting",
      job: item.job || "Actor"
    })) || [];
  const crew = details?.combined_credits?.crew || [];
  const combinedCredits = casting?.concat(crew)?.sort((a, z) => z.vote_count - a.vote_count);
  const movieCredits = combinedCredits.filter((item) => item.media_type === "movie");
  const tvCredits = combinedCredits.filter((item) => item.media_type === "tv");

  const getGender = (g) => {
    switch (g) {
      case 0:
        return "-";
      case 1:
        return "Female";
      case 2:
        return "Male";
      case 3:
        return "NB / Trans / Others";
    }
  };

  const getAge = (b, alive) => {
    if (alive) {
      const today = new Date();
      const age = Math.floor(
        (today - new Date(details.birthday)) / (1000 * 3600 * 24 * 30.4375 * 12)
      );

      return age;
    } else {
      const diedAt = Math.floor(
        (new Date(b) - new Date(details.birthday)) / (1000 * 3600 * 24 * 30.4375 * 12)
      );

      return diedAt;
    }
  };

  const selectedItem = useMemo(() => {
    const random = Math.floor(Math.random() * 20);
    return combinedCredits[random];
  }, [combinedCredits]);

  const { external_ids } = details;

  return (
    <div className='mb-auto'>
      <HeroDetailsContainer className='relative mb-auto person-details'>
        <DominantColor tint isUsingBackdrop flip image={selectedItem?.poster_path} />
        <div className='relative z-10'>
          <DetailsHeroWrap style={{ minHeight: "auto" }} className='pb-0'>
            <HeroImgWrapper>
              <HeroImg className='no-shadow relative text-center'>
                <Image
                  src={
                    details.profile_path
                      ? `https://image.tmdb.org/t/p/w500${details.profile_path}`
                      : "/Images/DefaultImage.png"
                  }
                  alt='cast-image'
                  layout='fill'
                  objectFit='cover'
                  placeholder='blur'
                  blurDataURL={blurPlaceholder}
                />
              </HeroImg>

              <SocialMediaLinks links={external_ids} />
            </HeroImgWrapper>

            <HeroInfoWrapper className='w-full me-auto max-w-3xl'>
              <HeroInfoTitle>{details.name}</HeroInfoTitle>

              <Details className='my-4'>
                <div>
                  <Span className='block font-bold'>Gender</Span>
                  <Span className='block font-normal text-lg'>{getGender(details.gender)}</Span>
                </div>

                {!details.deathday && details.birthday && (
                  <div>
                    <Span className='block font-bold'>Age</Span>
                    <Span className='block font-normal text-lg'>
                      {getAge(details.birthday, true)} years old
                    </Span>
                  </div>
                )}

                {details?.birthday && (
                  <div>
                    <Span className='block font-bold'>Birthday</Span>
                    <Span className='block font-normal text-lg'>
                      {new Date(details.birthday).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                      })}
                    </Span>
                  </div>
                )}

                {details?.deathday && (
                  <div>
                    <Span className='block font-bold'>Death Day</Span>
                    <Span className='block font-normal text-lg'>
                      {new Date(details.deathday).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                      })}
                    </Span>
                  </div>
                )}

                {details?.deathday && (
                  <div>
                    <Span className='block font-bold'>Died at</Span>
                    <Span className='block font-normal text-lg'>
                      {getAge(details.deathday, false)} years old
                    </Span>
                  </div>
                )}

                {details?.place_of_birth && (
                  <div>
                    <Span className='block font-bold'>Place of Birth</Span>
                    <Span className='block font-normal text-lg'>{details.place_of_birth}</Span>
                  </div>
                )}

                <div>
                  <Span className='block font-bold'>Known For</Span>
                  <Span className='block font-normal text-lg'>{details.known_for_department}</Span>
                </div>

                <div>
                  <Span className='block font-bold'>Known Credits</Span>
                  <Span className='block font-normal text-lg'>{combinedCredits.length}</Span>
                </div>
              </Details>
            </HeroInfoWrapper>
          </DetailsHeroWrap>

          {details.biography && (
            <div className='mt-6 md:mt-14'>
              {details.biography && (
                <Fragment>
                  <Span className='block text-3xl md:text-4xl font-bold'>Biography</Span>
                  <Bio>{details.biography}</Bio>
                </Fragment>
              )}
            </div>
          )}
        </div>
      </HeroDetailsContainer>

      {combinedCredits?.length > 0 && (
        <PersonPageTab movieCredits={movieCredits} tvCredits={tvCredits} />
      )}
    </div>
  );
};

export default PersonDetails;
