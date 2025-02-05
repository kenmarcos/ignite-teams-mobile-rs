import { TouchableOpacityProps } from "react-native";
import { Title } from "../HighLight/styles";
import { ButtonTypeStyleProps, Container } from "./styles";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  type?: ButtonTypeStyleProps;
}

export const Button = ({ title, type = "PRIMARY", ...rest }: ButtonProps) => {
  return (
    <Container type={type} {...rest}>
      <Title>{title}</Title>
    </Container>
  );
};
