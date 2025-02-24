import PropTypes from 'prop-types';
import Sidebar from '../Sidebar/Sidebar';

function PrimaryLayout({ children }) {
    return (
        <div className="flex">
            <Sidebar className="" />
            <div className="bg-background flex-1">{children}</div>
        </div>
    );
}
PrimaryLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default PrimaryLayout;
