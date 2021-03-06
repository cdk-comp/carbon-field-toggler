/**
 * The external dependencies.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers, setStatic } from 'recompose';

/**
 * The internal dependencies.
 */
import withStore from 'fields/decorators/with-store';
import withSetup from 'fields/decorators/with-setup';

/**
 * Render a number input field.
 *
 * @param  {Object} props
 * @param  {Object} props.field
 * @param  {Function} props.togglerHelper
 * @param  {Function} props.addCollapsed
 * @return {React.Element}
 */
export const TogglerField = ({
    field,
    togglerHelper,
    addCollapsed
}) => {
    window.addEventListener('load', addCollapsed);
    return <div onClick={togglerHelper} className={'collapsed carbon-toggler ' + field.id} disabled={!field.ui.is_visible}>
    <h3>{field.label}</h3>
    </div>;
};

/**
 * Validate the props.
 *
 * @type {Object}
 */
TogglerField.propTypes = {
    field: PropTypes.shape({
        label: PropTypes.string,
    }),
    togglerHelper: PropTypes.func,
    addCollapsed: PropTypes.func,
};

/**
 * The enhancer.
 *
 * @type {Function}
 */
export const enhance = compose(
    /**
     * Connect to the Redux store.
     */
    withStore(),

    /**
     * Attach the setup hooks.
     */
    withSetup(),

    /**
     * The handlers passed to the component.
     */
    withHandlers({

        togglerHelper: ({ field }) => () => {
            const target = document.getElementsByClassName(field.id);
            const targetFields = document.querySelectorAll('[data-toggled="' + field.id +'"]');

            if(target[0].dataset.collapsed === 'close') {
                target[0].dataset.collapsed = 'open';
            } else {
                target[0].dataset.collapsed = 'close';
            }

            for (let i=0; i<targetFields.length; i++) {

                if(targetFields[i].dataset.collapsed === 'open') {
                    targetFields[i].dataset.collapsed = 'close';
                } else {
                    targetFields[i].dataset.collapsed = 'open';
                }

            }
        },

        addCollapsed: ({ field }) => () => {
            const toggle = document.getElementsByClassName(field.id)[0];

            toggle.classList.toggle('collapsed-enabled');

            function nextElementSibling(element) {
                if(element.nextSibling && !element.nextSibling.classList.contains('carbon-toggler')) {

                    element.nextSibling.dataset.toggled = field.id;

                    nextElementSibling(element.nextSibling);
                } else {
                    return false;
                }

            }

            nextElementSibling(toggle);

            return false;

        }
    })
);

export default setStatic('type', [
    'toggler',
])(enhance(TogglerField));
