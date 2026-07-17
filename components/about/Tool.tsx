"use client";
import { useScrollAnimationList } from "@/src/hooks/useScrollAnimationList";
import { IconType } from "@icons-pack/react-simple-icons";

interface Props {
  tool: { tool: string; icon: IconType };
  index: number;
}

function Tool(props: Props) {
  const { tool, index } = props;

  const setRef2 = useScrollAnimationList();
  return (
    <li
      className="bg-card-background p-6 flex flex-col items-center justify-center gap-4 font-headings font-medium w-[130px] aspect-[1] border border-card-background hover:border-accent-pink hover:-translate-y-3 shadow-md group hover:shadow-md hover:scale-x-[98%]"
      ref={setRef2}
      data-animation="hoverInTop"
      style={{ "--i": `0.${index}` } as React.CSSProperties}
    >
      <tool.icon className="text-accent-neon group-hover:text-accent-pink" />{" "}
      {tool.tool}
    </li>
  );
}

export default Tool;
