import { Screenshot } from "@/types/projects";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CldImage } from "next-cloudinary";
import { useState } from "react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";
interface Props {
  images: Screenshot[];
}
export default function CaseStudyImageSlider(props: Props) {
  const { images } = props;
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  return (
    <div className="w-full mx-auto max-w-[800px] p-4">
      <div className="relative mb-4">
        <Swiper
          modules={[Navigation, Thumbs]}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          navigation={{ nextEl: ".custom-next", prevEl: ".custom-prev" }}
          className="rounded-md bg-bg border border-bg h-64 overflow-hidden  max-w-[500px]"
        >
          {images.map((image) => (
            <SwiperSlide key={image.src}>
              <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
                <CldImage
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  quality={"auto"}
                  format="auto"
                  className={"object-cover h-full w-auto object-center"}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <button className="custom-prev absolute border-white/20 border rounded-full bg-bg left-3 top-1/2 -translate-y-1/2 z-10 text-accent-neon hover:text-accent-neon/80">
          <ChevronLeft className="size-8" />
        </button>
        <button className="custom-next absolute border-white/20 border rounded-full bg-bg right-3 top-1/2 -translate-y-1/2 z-10 text-accent-neon hover:text-accent-neon/80">
          <ChevronRight className="size-8" />
        </button>
      </div>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={12}
        slidesPerView={3}
        watchSlidesProgress={true}
        modules={[Thumbs]}
        className="thumbs-slider max-w-[500px]"
      >
        {images.map((image) => (
          <SwiperSlide key={image.src}>
            {({ isActive }) => (
              <div
                className={`cursor-pointer rounded-sm h-20 flex items-center justify-center text-xs font-medium border transition-all overflow-hidden ${isActive ? "border-accent-neon bg-bg" : "border-transparent bg-bg/60"}`}
              >
                <CldImage
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  quality={"auto"}
                  format="auto"
                  className={"object-cover h-full w-auto object-center"}
                />
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
