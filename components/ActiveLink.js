import { useRouter } from 'next/router';
import Link from 'next/link'
import PropTypes from 'prop-types';

const ActiveLink = ({ children, href, ...props }) => {
    const { asPath } = useRouter();

    // Define the styles for active and non-active links
    const activeStyle = { color: 'red' };
    const nonActiveStyle = { color: 'black' };

    // Choose the right style based on the current path
    const style = asPath === href ? activeStyle : nonActiveStyle;

    return (
        <Link href={href} style={style} {...props}>
            {children}
        </Link>
    );
};

ActiveLink.propTypes = {
    children: PropTypes.node.isRequired,
    href: PropTypes.string.isRequired,
};

export default ActiveLink;
