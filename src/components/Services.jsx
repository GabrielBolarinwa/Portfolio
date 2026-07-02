export function Services({ servicesRow1, servicesRow2, servicesSection }) {
  return (
    <section ref={servicesSection} className="services" id="services">
      <div className="services-container">
        <h2 className="text-center section-title">Services</h2>
        <div
          ref={servicesRow1}
          className="row"
          data-animation={
            window.innerWidth < 768 ? "hoverInTop" : "lightSpeedInLeft"
          }
          style={{ "--i": "0" }}
        >
          <div className="service" tabIndex={"0"}>
            <div className="service-icon">
              <div className="icon-container">
                <span
                  className="fa fa-solid fa-desktop service-icon"
                  aria-hidden="true"
                ></span>
              </div>
            </div>
            <div className="service-content">
              <h3 className="service-name">Web Development</h3>
              <p className="service-description">
                Build fast, responsive websites with clean code and essential
                features
              </p>
            </div>
          </div>
          <div className="service" tabIndex={"0"}>
            <div className="service-icon">
              <div className="icon-container">
                <span
                  className="bi bi-phone
                  service-icon"
                  aria-hidden="true"
                ></span>
              </div>
            </div>
            <div className="service-content">
              <h3 className="service-name">Web App Development</h3>
              <p className="service-description">
                Build dynamic web apps with React, Angular, and Vue. Flexible
                PWAs that adapt to your needs
              </p>
            </div>
          </div>
          <div className="service" tabIndex={"0"}>
            <div className="service-icon">
              <div className="icon-container">
                <span
                  className=" fa fas fa-signal service-icon"
                  aria-hidden="true"
                ></span>
              </div>
            </div>
            <div className="service-content">
              <h3 className="service-name">
                Web Performance Analysis and Optimization
              </h3>
              <p className="service-description">
                Optimize code, assets, and images for faster load times and
                enhanced security
              </p>
            </div>
          </div>
        </div>
        <div
          ref={servicesRow2}
          className="row"
          data-animation={
            window.innerWidth < 768 ? "hoverInTop" : "lightSpeedInRight"
          }
          style={{ "--i": "0.2" }}
        >
          <div className="service" tabIndex={"0"}>
            <div className="service-icon">
              <div className="icon-container">
                <span
                  className="fa fa-solid fa-bug service-icon"
                  aria-hidden="true"
                ></span>
              </div>
            </div>
            <div className="service-content">
              <h3 className="service-name">Software Application Debugging</h3>
              <p className="service-description">
                Identify and resolve bugs by tracing error sources in feature
                implementations
              </p>
            </div>
          </div>
          <div className="service" tabIndex={"0"}>
            <div className="service-icon">
              <div className="icon-container">
                <span
                  className="fa fas fa-check-to-slot service-icon"
                  aria-hidden="true"
                ></span>
              </div>
            </div>
            <div className="service-content">
              <h3 className="service-name">Code Testing</h3>
              <p className="service-description">
                Test code thoroughly before deployment to ensure functionality
                and maintain consistency across sites
              </p>
            </div>
          </div>
          <div className="service" tabIndex={"0"}>
            <div className="service-icon">
              <div className="icon-container">
                <span
                  className="fa
                  fab
                  fa-figma
                  service-icon"
                  aria-hidden="true"
                ></span>
              </div>
            </div>
            <div className="service-content">
              <h3 className="service-name">UI/UX Design</h3>
              <p className="service-description">
                Design user interfaces and prototypes using Figma following best
                practices for optimal user experience
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
