const TeamPage = ({
  params: { teamSlug },
}: {
  params: { teamSlug: string };
}) => {
  return <div>Team: {teamSlug}</div>;
};

export default TeamPage;
