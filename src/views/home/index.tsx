import LayoutContainer from '@/components/layout/Container';
import Typography from '@/components/typography';

import './index.scss';

export default function HomeView() {
  return (
    <LayoutContainer type='section'>
      <Typography type='h1' size={22} sizeDesktop={32}>
        Hello <strong>Thread!</strong>
      </Typography>
    </LayoutContainer>
  );
}
