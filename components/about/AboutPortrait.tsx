"use client";
import { getCldImageUrl } from "next-cloudinary";

function AboutPortrait() {
  const landscapeUrl = getCldImageUrl({
    src: "about-portrait_i1ulaq.png",
    quality: "auto",
    format: "auto",
  });
  const portraitUrl = getCldImageUrl({
    src: "12563_uriilh.jpg",
    quality: "auto",
    format: "auto",
  });
  return (
    <div className="w-full md:w-auto h-[300px] md:aspect-[1] float-left border-white/20 border rounded-lg overflow-hidden mr-5 max-md:mb-5 bg-card">
      <picture>
        <source media="(max-width: 768px)" srcSet={landscapeUrl} />
        <img
          src={portraitUrl}
          alt="Bolarinwa Gabriel Portrait"
          className="w-full h-full object-cover object-top"
          loading="eager"
        />
      </picture>
    </div>
  );
}

export default AboutPortrait;
