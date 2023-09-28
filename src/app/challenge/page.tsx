import Container from '@mui/joy/Container';
import { Header } from '@/components/header';
import ChallengeContent from './_partials/challenge-content.mdx';

/**
 * A page that shows the challenge content.
 * Testing the MDX support in the same time.
 */
export function ChallengePage() {
  return (
    <Container>
      <Header />
      <ChallengeContent />
    </Container>
  );
}

export default ChallengePage;
