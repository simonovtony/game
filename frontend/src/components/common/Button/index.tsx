import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';

export interface ButtonProps extends DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {}

const Button: FC<ButtonProps> = ({
  ...rest
}) => {
  return (
    <button {...rest} />
  )
};

export default Button;