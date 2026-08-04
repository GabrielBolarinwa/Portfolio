import { getGitHubStats } from "@/lib/github";
import StatsCard from "./StatsCard";

async function Status() {
  const { commits, repos, since } = await getGitHubStats();
  const stats = [
    {
      label: "Total Public Repos",
      value: repos,
    },
    {
      label: "Total commits",
      value: commits,
    },
    {
      label: "Developer since",
      value: since,
    },
  ];
  return (
    <section
      className="grid stats grid-cols-6 place-items-center place-content-center gap-4 min-h-[50dvh] p-12"
      id={"stats"}
    >
      {stats.map((stat, index) => (
        <StatsCard
          label={stat.label}
          value={stat.value}
          index={index}

          key={`${stat.value}-${index}`}
        />
      ))}
    </section>
  );
}

export default Status;
