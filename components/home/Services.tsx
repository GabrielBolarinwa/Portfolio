"use client";
import { services } from "@/src/constants";
import { useScrollAnimationList } from "@/src/hooks/useScrollAnimationList";
import { useWindowSize } from "@/src/hooks/useWindowSize";
import React from "react";
import Heading from "./Heading";

export function Services() {
  const { width } = useWindowSize();
  const middleIndex = Math.ceil(services.length / 2);
  const ref = useScrollAnimationList();
  return (
    <section className="services" id="services">
      <div className="services-container">
        <Heading
          headingWord="My"
          headingGradientWord="Services"
          description="Production-grade engineering for the web"
        />
        <ul className="flex flex-wrap gap-4 w-full flex-col md:flex-row">
          {services.slice(0, middleIndex).map((service, index) => (
            <li
              key={`service-${index}`}
              className="service"
              tabIndex={0}
              style={{ "--i": `1.${index + 1}` } as React.CSSProperties}
              ref={ref}
              data-animation={width < 768 ? "hoverInTop" : "lightSpeedInLeft"}
            >
              <div className="h-25">
                <div className="icon-container">
                  <service.icon />
                </div>
              </div>
              <div className="service-content h-40 lg:h-25">
                <h3 className="service-name mb-4">{service.serviceName}</h3>
                <p className="service-description">
                  {service.serviceDescription}
                </p>
              </div>
            </li>
          ))}
        </ul>
        <ul className="flex flex-wrap gap-4 w-full flex-col md:flex-row">
          {services.slice(middleIndex).map((service, index) => (
            <li
              key={`service-${index}`}
              className="service"
              tabIndex={0}
              style={{ "--i": `1.${index}` } as React.CSSProperties}
              ref={ref}
              data-animation={width < 768 ? "hoverInTop" : "lightSpeedInRight"}
            >
              <div className="h-25">
                <div className="icon-container">
                  <service.icon />
                </div>
              </div>
              <div className="service-content h-25">
                <h3 className="service-name mb-4">{service.serviceName}</h3>
                <p className="service-description">
                  {service.serviceDescription}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
