import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { colorTelusPurple, colorShuttleGrey } from '@tds/core-colours'
import Link from '@tds/core-link'
import { media } from '@tds/core-responsive'
import Text from '@tds/core-text'
import { sizeSmall, sizeMedium } from '@tds/shared-typography'

import ColoredTextProvider from '../../../shared/components/ColoredTextProvider/ColoredTextProvider'

const item = {
  display: 'inline',
  ...sizeSmall,

  ...media.from('md').css({
    ...sizeMedium,
  }),
}

const StyledItemContainer = styled(ColoredTextProvider)(({ isCurrent }) => ({
  ...item,
  color: isCurrent ? colorTelusPurple : colorShuttleGrey,
  ...(isCurrent && {
    fontWeight: 700,

    '&:after': {
      content: `''`,
      borderRight: 0,
      margin: 0,
    },
  }),
}))

const StyledSlash = styled.span({
  ...item,
  margin: '0 0.5rem',
})

const Item = ({ href, reactRouterLinkComponent, children, current, ...rest }) => {
  const linkOptions = { ...rest }
  if (reactRouterLinkComponent) {
    linkOptions.to = href
    linkOptions.reactRouterLinkComponent = reactRouterLinkComponent
  } else {
    linkOptions.href = href
  }
  return (
    <StyledItemContainer tag="li" isCurrent={current}>
      {current ? (
        <Text>{children}</Text>
      ) : (
        <span>
          <Link {...linkOptions}>{children}</Link>
          <StyledSlash aria-hidden="true">/</StyledSlash>
        </span>
      )}
    </StyledItemContainer>
  )
}

Item.propTypes = {
  /**
   * Target URL.
   */
  href: PropTypes.string.isRequired,
  /**
   * @ignore
   *
   * React Router Link component. The reactRouterLinkComponent property will be passed down from from the parent `<Breadcrumbs>`.
   */
  reactRouterLinkComponent: PropTypes.func,
  /**
   * Breadcrumb text
   */
  children: PropTypes.node.isRequired,
  /**
   * @ignore
   *
   * Indicates whether or not the Item should be as current/activ
   */
  current: PropTypes.bool,
}

Item.defaultProps = {
  reactRouterLinkComponent: undefined,
  current: false,
}

export default Item
