import PropTypes from 'prop-types'
import React from 'react'
import Draggable from 'react-draggable'

import { METRICS } from '../../../../../const'
import { typePoint } from '../../../../../prop-types'

// -----------------------------------------------------------------------------
// Const
// -----------------------------------------------------------------------------

const { WIDTH, HEIGHT } = METRICS.CORNER_POINT

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const CornerNode = ({ id, position, onDrag, onDoubleClick }) => {
  const nodeRef = React.useRef(null)

  return (
    <Draggable
      nodeRef={nodeRef}
      position={position}
      bounds="#work-area"
      onDrag={onDrag(id)}
      handle=".corner-handle"
    >
      <div
        className="corner-handle group pointer-events-auto absolute -left-[12px] -top-[12px] cursor-move"
        ref={nodeRef}
        id={id}
        data-tid={`corner-point-${id}`}
        onDoubleClick={onDoubleClick(id)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          overflow="visible"
          viewBox={`${-WIDTH * 0.5} ${-HEIGHT * 0.5}  ${WIDTH} ${HEIGHT}`}
          width={`${WIDTH}px`}
          height={`${HEIGHT}px`}
          className="scale-1 transition-transform hover:scale-125 group-[.react-draggable-dragging]:scale-125"
        >
          <circle
            stroke="black"
            strokeWidth="3"
            fill="white"
            cx="0"
            cy="0"
            r={WIDTH * 0.5}
          />
          <circle
            fill="black"
            cx="0.25"
            cy="0.25"
            r={WIDTH * 0.25}
          />
        </svg>
      </div>
    </Draggable>
  )
}

CornerNode.propTypes = {
  id: PropTypes.string.isRequired,
  position: typePoint.isRequired,
  onDrag: PropTypes.func.isRequired,
  onDoubleClick: PropTypes.func.isRequired,
}

export default CornerNode
