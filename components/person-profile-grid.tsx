import { ContentGrid } from "@/components/content-grid";
import { PersonProfileCard } from "@/components/person-profile-card";

type PersonProfile = {
  name: string;
  era: string;
  role: string;
  summary: string;
  imageSrc?: string;
  url?: string;
};

type PersonProfileGridProps = {
  people: readonly PersonProfile[];
  className?: string;
};

export function PersonProfileGrid({
  people,
  className = "",
}: PersonProfileGridProps) {
  return (
    <ContentGrid minCardWidth="14rem" className={className}>
      {people.map((person) => (
        <PersonProfileCard key={person.name} {...person} />
      ))}
    </ContentGrid>
  );
}
