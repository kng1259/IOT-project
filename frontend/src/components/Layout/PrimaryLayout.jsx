import PropTypes from 'prop-types';
import Sidebar from '../Sidebar/Sidebar';

function PrimaryLayout({ children }) {
    return (
        <div className="flex">
            <Sidebar className="" />
            <div className="min-h-dvh w-full flex-1 bg-background px-12 py-8">{children}</div>
        </div>
    );
}
PrimaryLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default PrimaryLayout;
