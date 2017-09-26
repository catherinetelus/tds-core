import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

/**
 * <span class="docs--badge__deprecated">deprecated</span>
 *
 * **This component is deprecated and should not be used. Use the
 * [DecorativeIcon](#decorativeicon) or [StandaloneIcon](#standaloneicon) instead.**
 */
const Icon = ({ glyph, variant, fixedWidth, size, className, children, ...rest }) => {
  const classes = classNames(
    'icon',
    `icon-core-${glyph}`,
    className,
    {
      'icon--fw': fixedWidth,
      [`icon--${variant}`]: variant,
      'icon--large': size
    }
  )

  return (
    <i {...rest} className={classes}>
      {children}
    </i>
  )
}

Icon.propTypes = {
  /**
   * Name of the icon glyph.
   */
  glyph: PropTypes.oneOf([
    'caret-down',
    'caret-up',
    'checkmark',
    'chevron',
    'left-chevron',
    'exclamation-point-circle',
    'expander',
    'hamburger',
    'incomplete',
    'location',
    'minus',
    'plus',
    'question-mark-circle',
    'spyglass',
    'times'
  ]).isRequired,
  /**
   * The appearance of the Icon.
   */
  variant: PropTypes.oneOf([
    'primary',
    'secondary',
    'disabled',
    'error'
  ]),
  /**
   * Whether or not to give the icon a fixed width.
   */
  fixedWidth: PropTypes.bool,
  /**
   * @ignore
   */
  size: PropTypes.oneOf(['large']),
  /**
   * One or more CSS class names separated by spaces to append onto the icon.
   * Don't advertise as we plan on removing this feature soon.
   *
   * @ignore
   */
  className: PropTypes.string,
  /**
   * This can be used to add screen-reader content into the icon, but it must
   * be hidden from view. This behaviour is better accomplished with aria-* attributes.
   *
   * @ignore
   */
  children: PropTypes.node
}
Icon.defaultProps = {
  variant: null,
  fixedWidth: false,
  size: null,
  className: '',
  children: null
}

export default Icon
