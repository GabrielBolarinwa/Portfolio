export default function GradientDefs() {
  return (
    <svg width={0} height={0} style={{ position: "absolute" }}>
      <defs>
        <linearGradient
          id={"grad-whatsapp"}
          x1={"0%"}
          y1={"0%"}
          x2={"100%"}
          y2={"100%"}
        >
          <stop offset={"0%"} stopColor={"#25d366"} />
          <stop offset={"100%"} stopColor={"#128c7e"} />
        </linearGradient>
        <linearGradient
          id={"grad-facebook"}
          x1={"0%"}
          y1={"0%"}
          x2={"100%"}
          y2={"100%"}
        >
          <stop offset={"0%"} stopColor={"#1877f2"} />
          <stop offset={"100%"} stopColor={"#0c4cb3"} />
        </linearGradient>
        <linearGradient id="grad-angular" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E40035" />
          <stop offset="50%" stopColor="#F6105F" />
          <stop offset="100%" stopColor="#FD5E3A" />{" "}
        </linearGradient>
        <linearGradient id="grad-app" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00f3ff" />
          <stop offset="100%" stopColor="#ff0055" />
        </linearGradient>
      </defs>
    </svg>
  );
}
