"use client";
import { services } from "@/src/constants";
import { useWindowSize } from "@/src/hooks/useWindowSize";
import { RefObject } from "react";

interface Props {
  servicesRow1: RefObject<HTMLUListElement | null>;
  servicesRow2: RefObject<HTMLUListElement | null>;
  servicesSection: RefObject<HTMLElement | null>;
}
export function Services({
  servicesRow1,
  servicesRow2,
  servicesSection,
}: Props) {
  const { width } = useWindowSize();
  const middleIndex = Math.ceil(services.length / 2);
  return (
    <section ref={servicesSection} className="services" id="services">
      <div className="services-container">
        <h2 className="text-center section-title">Services</h2>
        <ul
          ref={servicesRow1}
          className="row"
          data-animation={width < 768 ? "hoverInTop" : "lightSpeedInLeft"}
          style={{ "--i": "0" } as React.CSSProperties}
        >
          {services.slice(0, middleIndex).map((service, index) => (
            <li key={`service-${index}`} className="service" tabIndex={0}>
              <div className="service-icon">
                <div className="icon-container">
                  <span
                    className={`${service.icon}  service-icon`}
                    aria-hidden="true"
                  ></span>
                </div>
              </div>
              <div className="service-content">
                <h3 className="service-name">{service.serviceName}</h3>
                <p className="service-description">
                  {service.serviceDescription}
                </p>
              </div>
            </li>
          ))}
        </ul>
        <ul
          ref={servicesRow2}
          className="row"
          data-animation={width < 768 ? "hoverInTop" : "lightSpeedInRight"}
          style={{ "--i": "0.2" } as React.CSSProperties}
        >
          {services.slice(middleIndex).map((service, index) => (
            <li key={`service-${index}`} className="service" tabIndex={0}>
              <div className="service-icon">
                <div className="icon-container">
                  <span
                    className={`${service.icon}  service-icon`}
                    aria-hidden="true"
                  ></span>
                </div>
              </div>
              <div className="service-content">
                <h3 className="service-name">{service.serviceName}</h3>
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
