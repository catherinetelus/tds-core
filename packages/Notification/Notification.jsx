import React from 'react'
import PropTypes from 'prop-types'

import FlexGrid from '@tds/core-flex-grid'
import DecorativeIcon from '@tds/core-decorative-icon'
import StandaloneIcon from '@tds/core-standalone-icon'
import Paragraph from '@tds/core-paragraph'
import Box from '@tds/core-box'
import { Reveal, Fade } from '@tds/shared-animation'

import safeRest from '../../shared/utils/safeRest'
import joinClassNames from '../../shared/utils/joinClassNames'
import { warn } from '../../shared/utils/warn'

import styles from './Notification.modules.scss'

const iconByVariant = {
  success: {
    symbol: 'checkmark',
    color: 'primary',
  },
  error: {
    symbol: 'exclamationPointCircle',
    color: 'error',
  },
}

const isImportant = variant => variant === 'success' || variant === 'error'

const renderIcon = icon => <DecorativeIcon symbol={icon.symbol} variant={icon.color} />

/**
 * A banner that highlights important messages.
 *
 * @version ./package.json
 */
class Notification extends React.Component {
  state = {
    dismissed: false,
    contentWrapperHeight: undefined,
  }

  componentDidMount() {
    if (this.props.dismissible) {
      this.adjustContentHeight()
    }
  }

  componentDidUpdate() {
    if (this.props.dismissible) {
      this.adjustContentHeight()
    }
  }

  adjustContentHeight = () => {
    if (this.contentWrapper.offsetHeight !== this.state.contentWrapperHeight) {
      this.setState({ contentWrapperHeight: this.contentWrapper.offsetHeight })
    }
  }

  renderNotification() {
    const { variant, dismissible, dismissibleA11yLabel, children, ...rest } = this.props

    return (
      <Box
        {...safeRest(rest)}
        vertical={3}
        className={joinClassNames(styles.base, styles[variant])}
      >
        <FlexGrid>
          <FlexGrid.Row>
            <FlexGrid.Col>
              <FlexGrid gutter={false}>
                <FlexGrid.Row>
                  <FlexGrid.Col xs={dismissible ? 11 : undefined}>
                    <Box inline between={3}>
                      {isImportant(variant) ? renderIcon(iconByVariant[variant]) : undefined}
                      <div
                        className={joinClassNames(
                          isImportant(variant) ? styles.withIcon : styles.withoutIcon
                        )}
                      >
                        <Paragraph bold={isImportant(variant)}>{children}</Paragraph>
                      </div>
                    </Box>
                  </FlexGrid.Col>
                  {dismissible && (
                    <FlexGrid.Col>
                      <Box className={styles.dismissContainer}>
                        <div className={styles.dismiss}>
                          <StandaloneIcon
                            symbol="times"
                            size={24}
                            a11yText={dismissibleA11yLabel}
                            variant={variant === 'instructional' ? 'secondary' : undefined}
                            onClick={() => this.setState(() => ({ dismissed: true }))}
                          />
                        </div>
                      </Box>
                    </FlexGrid.Col>
                  )}
                </FlexGrid.Row>
              </FlexGrid>
            </FlexGrid.Col>
          </FlexGrid.Row>
        </FlexGrid>
      </Box>
    )
  }

  render() {
    if (
      (this.props.dismissible || this.props.dismissibleA11yLabel) &&
      !(this.props.dismissible && this.props.dismissibleA11yLabel)
    ) {
      warn(
        'Notification',
        'The props `dismissible` and `dismissibleA11yLabel` must be used together.'
      )
    }
    if (this.props.dismissible) {
      return (
        <Reveal
          timeout={400}
          in={!this.state.dismissed}
          height={this.state.contentWrapperHeight || 0}
        >
          {() => (
            <Fade unmountOnExit timeout={500} in={!this.state.dismissed}>
              {() => (
                <div
                  ref={c => {
                    this.contentWrapper = c
                  }}
                >
                  {this.renderNotification()}
                </div>
              )}
            </Fade>
          )}
        </Reveal>
      )
    }
    return this.renderNotification()
  }
}

Notification.propTypes = {
  /**
   * The appearance.
   */
  variant: PropTypes.oneOf(['instructional', 'branded', 'success', 'error']),
  /**
   * Whether or not to allow the Notificiation to be dismissed.
   *
   * @since 1.2.0
   */
  dismissible: PropTypes.bool,
  /**
   * A label for assistive technology
   *
   * @since 1.2.0
   */
  dismissibleA11yLabel: PropTypes.string,
  /**
   * The message. Can be raw text or text components.
   */
  children: PropTypes.node.isRequired,
}

Notification.defaultProps = {
  variant: 'instructional',
  dismissible: false,
  dismissibleA11yLabel: undefined,
}

export default Notification
