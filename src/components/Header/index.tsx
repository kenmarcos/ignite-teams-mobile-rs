import { BackButton, BackIcon, Container, Logo } from "./styles";
import logoImg from "@/assets/logo.png";

interface HeaderProps {
  showBackButton?: boolean;
}

export const Header = ({ showBackButton = false }: HeaderProps) => {
  return (
    <Container>
      {showBackButton && (
        <BackButton>
          <BackIcon />
        </BackButton>
      )}

      <Logo source={logoImg} />
    </Container>
  );
};
