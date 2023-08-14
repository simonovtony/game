import { DetailedHTMLProps, FC, AnchorHTMLAttributes } from "react";
import classes from './index.module.scss';
import classnames from 'classnames';

export interface LinkProps extends DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {

}

const Link: FC<LinkProps> = ({
  ...rest
}) => {
  return (
    <a className={classnames(classes.link, classes['link_menu-link'])} {...rest} />
  )
};

export default Link;